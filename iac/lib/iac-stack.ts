import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy, aws_s3 as s3, aws_elasticloadbalancingv2 as elbv2, aws_route53_targets as route53targets, aws_certificatemanager as certman, aws_route53 as route53, aws_rds as rds, aws_ecs as ecs, aws_ec2 as ec2, aws_ecr as ecr, aws_iam as iam, aws_secretsmanager as secretsmanager, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GithubActionsIdentityProvider, GithubActionsRole } from 'aws-cdk-github-oidc';

const domains: string[] = [
  "adultchangingtablemap.com",
  "universalchangingtablemap.com",
  "inclusiverestroommap.com"
]

export class CentralIacStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;
  public readonly frontend_repository: ecr.Repository;
  public readonly backend_repository: ecr.Repository;
  public readonly load_balancer: elbv2.ApplicationLoadBalancer
  public readonly listener: elbv2.ApplicationListener
  public readonly zones: route53.HostedZone[] = []
  public readonly database: rds.DatabaseInstance

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.vpc = new ec2.Vpc(this, "uct-vpc", {
      cidr: "12.20.100.0/24",
      enableDnsHostnames: true,
      enableDnsSupport: true,
      maxAzs: 2,
      natGateways: 0
    })

    this.frontend_repository = new ecr.Repository(this, "uct-frontend-repo", {
      repositoryName: "uct-frontend",
      removalPolicy: RemovalPolicy.DESTROY,
      imageTagMutability: ecr.TagMutability.IMMUTABLE,
      imageScanOnPush: true
    });
    this.frontend_repository.addLifecycleRule({ maxImageCount: 10 });

    this.backend_repository = new ecr.Repository(this, "uct-backend-repo", {
      repositoryName: "uct-backend",
      removalPolicy: RemovalPolicy.DESTROY,
      imageTagMutability: ecr.TagMutability.IMMUTABLE,
      imageScanOnPush: true
    });
    this.backend_repository.addLifecycleRule({ maxImageCount: 10 });

    const provider = new GithubActionsIdentityProvider(this, 'GithubProvider');

    const ecrActionsRole = new GithubActionsRole(this, 'ecrPushGithubActionsRole', {
      provider: provider,           // reference into the OIDC provider
      owner: 'InspiredAccessFoundation',            // your repository owner (organization or user) name
      repo: 'uct-locator',            // your repository name (without the owner name)
      filter: 'ref:refs/tags/v*',   // JWT sub suffix filter, defaults to '*' 
      // TODO Make this not just hardcoded to develop
    });
    this.frontend_repository.grantPullPush(ecrActionsRole)
    this.backend_repository.grantPullPush(ecrActionsRole)

    const envs = ["development", "production"]
    for (const env of envs) {
      const actionsRole = new GithubActionsRole(this, `${env}GithubActionsRole`, {
        provider: provider,           // reference into the OIDC provider
        owner: 'InspiredAccessFoundation',            // your repository owner (organization or user) name
        repo: 'uct-locator',            // your repository name (without the owner name)
        filter: `environment:${env}`,   // JWT sub suffix filter, defaults to '*' 
        // TODO Make this not just hardcoded to develop
      });

      // Allow for pushing and pulling from the ECR repo for docker images
      this.frontend_repository.grantPull(actionsRole)
      this.backend_repository.grantPull(actionsRole)

      // Allow assume cdk iam roles to be able to do CDK things
      actionsRole.addToPolicy(
        new iam.PolicyStatement({
          actions: [
            "sts:AssumeRole"
          ],
          effect: iam.Effect.ALLOW,
          resources: [
            "arn:aws:iam::*:role/cdk-*"
          ]
        })
      )
      actionsRole.addToPolicy(
        new iam.PolicyStatement({
          actions: [
            "secretsmanager:DescribeSecret",
            "secretsmanager:GetSecretValue"
          ],
          effect: iam.Effect.ALLOW,
          resources: [
            `arn:aws:secretsmanager:us-east-1:${cdk.Stack.of(this).account}:secret:/uct-locator/development/dbappuser-??????`
          ]
        })
      )
    }


    // Creates an admin user of uctadmin with a generated password
    const rds_master_creds = rds.Credentials.fromGeneratedSecret('uctadmin')
    // Using the secret
    this.database = new rds.DatabaseInstance(this, "uct-postgres", {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_14 }),
      credentials: rds_master_creds,
      vpc: this.vpc,
      storageEncrypted: true,
      allocatedStorage: 5,
      maxAllocatedStorage: 50,
      allowMajorVersionUpgrade: false,
      autoMinorVersionUpgrade: true,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
      enablePerformanceInsights: true,
      performanceInsightRetention: rds.PerformanceInsightRetention.DEFAULT,
      multiAz: false,
      publiclyAccessible: false,
      backupRetention: Duration.days(1),
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      parameters: {
        "pg_stat_statements.track": "ALL"
      }
    });

    this.load_balancer = new elbv2.ApplicationLoadBalancer(this, 'LoadBalancer', {
      vpc: this.vpc,
      internetFacing: true,
    });

    const subdomains: string[] = ["app", "dev"]
    const hosts: string[] = []
    const certs: certman.Certificate[] = []
    for (const subdomain of subdomains) {
      for (const domain of domains) {
        const hostname = `${subdomain}.${domain}`
        const zone = new route53.HostedZone(this, `${hostname}-HostedZone`, {
          zoneName: hostname,
        });
        const cert = new certman.Certificate(this, `${hostname}-Certificate`, {
          domainName: hostname,
          validation: certman.CertificateValidation.fromDns(zone),
        });
        certs.push(cert)
        hosts.push(hostname)
        this.zones.push(zone)
      }
    }

    this.listener = new elbv2.ApplicationListener(this, 'Listener', {
      loadBalancer: this.load_balancer, // ! need to pass load balancer to attach to !
      port: 443,
      defaultAction: elbv2.ListenerAction.fixedResponse(404),
      certificates: certs
    });
    this.load_balancer.addRedirect()
  }
}

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string,
    vpc: ec2.Vpc,
    frontend_repository: ecr.Repository,
    backend_repository: ecr.Repository,
    load_balancer: elbv2.ApplicationLoadBalancer,
    listener: elbv2.ApplicationListener,
    zones: route53.HostedZone[],
    database: rds.DatabaseInstance,
    frontend_version: string,
    backend_version: string,
    subdomain: string,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    let env = "development"
    let priority = 2;
    let desiredCount = 1;
    // If production allow more than one at a time
    if (subdomain == "app") {
      desiredCount = 2
      priority = 1;
      env = "production"
    }

    const bucket = new s3.Bucket(this, 'image-storage', {
      enforceSSL: true,
      versioned: false,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
    })
    bucket.addLifecycleRule({
      abortIncompleteMultipartUploadAfter: Duration.days(7),
      enabled: true,
      transitions: [
        {
          storageClass: s3.StorageClass.INFREQUENT_ACCESS,
          transitionAfter: cdk.Duration.days(30),
        }
      ]
    });

    const cluster = new ecs.Cluster(this, "uct-cluster", {
      vpc: vpc,
      enableFargateCapacityProviders: true
    })

    const taskDefinition = new ecs.FargateTaskDefinition(this, "taskDef", {
      memoryLimitMiB: 2048,
    });

    taskDefinition.addContainer("frontend-container", {
      image: ecs.ContainerImage.fromEcrRepository(frontend_repository, frontend_version),
      memoryLimitMiB: 512,
      essential: true,
      containerName: "frontend",
      portMappings: [{
        containerPort: 80,
        protocol: ecs.Protocol.TCP
      }],
      logging: ecs.LogDriver.awsLogs({
        streamPrefix: `/uct-locator-${subdomain}`,
        logRetention: cdk.aws_logs.RetentionDays.ONE_DAY
      })
    });

    const databaseUserSecret = new secretsmanager.Secret(this, `${env}-dbappuser`, {
      secretName: `/uct-locator/${env}/dbappuser`,
      generateSecretString: {
        secretStringTemplate: JSON.stringify(
          {
            username: `${env}user`,
            host: database.dbInstanceEndpointAddress,
            port: database.dbInstanceEndpointPort,
            database: `${env}db`
          }),
        generateStringKey: 'password',
      },
    });
    const mongo_uri_secret = secretsmanager.Secret.fromSecretNameV2(this, "mongo-uri-secret", "/uct-locator/mongo-uri")
    const jwt_secret_key = secretsmanager.Secret.fromSecretNameV2(this, "jwt-secret-key", "/uct-locator/secret-key")

    taskDefinition.addContainer("backend-container", {
      image: ecs.ContainerImage.fromEcrRepository(backend_repository, backend_version),
      memoryLimitMiB: 1280,
      essential: true,
      containerName: "backend",
      portMappings: [{
        containerPort: 5000,
        protocol: ecs.Protocol.TCP
      }],
      secrets: {
        "MONGO_URI": ecs.Secret.fromSecretsManager(mongo_uri_secret),
        "SECRET_KEY": ecs.Secret.fromSecretsManager(jwt_secret_key),
        "POSTGRES_DB": ecs.Secret.fromSecretsManager(databaseUserSecret, "database"),
        "POSTGRES_PASSWORD": ecs.Secret.fromSecretsManager(databaseUserSecret, "password"),
        "POSTGRES_USERNAME": ecs.Secret.fromSecretsManager(databaseUserSecret, "username"),
        "POSTGRES_PORT": ecs.Secret.fromSecretsManager(databaseUserSecret, "port"),
        "POSTGRES_HOST": ecs.Secret.fromSecretsManager(databaseUserSecret, "host"),
      },
      environment: {
        "NODE_ENV": env
      },
      logging: ecs.LogDriver.awsLogs({
        streamPrefix: `/uct-locator-${subdomain}`,
        logRetention: cdk.aws_logs.RetentionDays.ONE_DAY
      })
    });

    mongo_uri_secret.grantRead(taskDefinition.taskRole)
    jwt_secret_key.grantRead(taskDefinition.taskRole)

    taskDefinition.taskRole.attachInlinePolicy(
      new iam.Policy(this, "s3-write-no-delete", {
        statements: [
          new iam.PolicyStatement({
            actions: [
              's3:GetObject',
              's3:PutObject',
              's3:Abort*',
              's3:PutObjectTagging'
            ],
            resources: [
              bucket.bucketArn,
              `${bucket.bucketArn}/*`
            ],
          })
        ]
      })
    )


    const ecsSecurityGroup = new ec2.SecurityGroup(this, "ecs-sg", {
      vpc,
      allowAllOutbound: true,
    })

    const ecsService = new ecs.FargateService(this, "ecs-service", {
      cluster,
      taskDefinition,
      desiredCount: desiredCount,
      assignPublicIp: true,
      securityGroups: [ecsSecurityGroup],
      enableExecuteCommand: true,
      circuitBreaker: { rollback: true },
      capacityProviderStrategies: [
        {
          capacityProvider: 'FARGATE_SPOT',
          weight: 4,
        },
        {
          capacityProvider: 'FARGATE',
          weight: 1,
        },
      ],
    });


    const hosts: string[] = []
    for (const domain of domains) {
      hosts.push(`${subdomain}.${domain}`)
    }

    listener.addTargets(`${subdomain}-ecs`, {
      port: 80,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targets: [ecsService],
      conditions: [elbv2.ListenerCondition.hostHeaders(hosts)],
      priority: priority,
      healthCheck: {
        path: "/api/health/check",
      }
    });

    for (const zone of zones) {
      if (zone.zoneName.indexOf(subdomain) > -1) {
        new route53.ARecord(this, `${zone.zoneName}-LBAliasRecord`, {
          zone: zone,
          target: route53.RecordTarget.fromAlias(
            new route53targets.LoadBalancerTarget(load_balancer)
          ),
        });
      }
    }

  }
}
