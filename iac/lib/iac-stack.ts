import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy, aws_ecs as ecs, aws_ec2 as ec2, aws_ecr as ecr, aws_iam as iam, aws_secretsmanager as secretsmanager, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GithubActionsIdentityProvider, GithubActionsRole } from 'aws-cdk-github-oidc';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CentralIacStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;
  public readonly cluster: ecs.Cluster;
  public readonly frontend_repository: ecr.Repository;
  public readonly backend_repository: ecr.Repository;


  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.vpc = new ec2.Vpc(this, "uct-vpc", {
      cidr: "12.20.100.0/24",
      enableDnsHostnames: true,
      enableDnsSupport: true,
      maxAzs: 2,
      natGateways: 0
    })

    this.cluster = new ecs.Cluster(this, "uct-cluster", {
      vpc: this.vpc,
      clusterName: "uct-cluster",
      enableFargateCapacityProviders: true
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
    const developmentActionsRole = new GithubActionsRole(this, 'GithubActionsRole', {
      provider: provider,           // reference into the OIDC provider
      owner: 'InspiredAccessFoundation',            // your repository owner (organization or user) name
      repo: 'uct-locator',            // your repository name (without the owner name)
      filter: `ref:refs/heads/develop`,   // JWT sub suffix filter, defaults to '*' 
      // TODO Make this not just hardcoded to develop
    });

    // Allow for pushing and pulling from the ECR repo for docker images
    this.frontend_repository.grantPullPush(developmentActionsRole)
    this.backend_repository.grantPullPush(developmentActionsRole)

    // Allow assume cdk iam roles to be able to do CDK things
    developmentActionsRole.addToPolicy(
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
  }
}

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string,
    vpc: ec2.Vpc,
    cluster: ecs.Cluster,
    frontend_repository: ecr.Repository,
    backend_repository: ecr.Repository,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDef', {
      memoryLimitMiB: 2048,
    });

    taskDefinition.addContainer('frontend-container', {
      image: ecs.ContainerImage.fromEcrRepository(frontend_repository, "0.0.1"),
      memoryLimitMiB: 512,
      essential: true,
      containerName: "frontend",
      portMappings: [{
        containerPort: 80,
        protocol: ecs.Protocol.TCP
      }],
      logging: ecs.LogDriver.awsLogs({
        streamPrefix: "/uct-locator",
        logRetention: cdk.aws_logs.RetentionDays.ONE_DAY
      })
    });

    const mongo_uri_secret = secretsmanager.Secret.fromSecretNameV2(this, "mongo-uri-secret", "/uct-locator/mongo-uri")
    const jwt_secret_key = secretsmanager.Secret.fromSecretNameV2(this, "jwt-secret-key", "/uct-locator/secret-key")

    taskDefinition.addContainer('backend-container', {
      image: ecs.ContainerImage.fromEcrRepository(backend_repository, "0.0.2"),
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
      },
      logging: ecs.LogDriver.awsLogs({
        streamPrefix: "/uct-locator",
        logRetention: cdk.aws_logs.RetentionDays.ONE_DAY
      })
    });

    mongo_uri_secret.grantRead(taskDefinition.taskRole)
    jwt_secret_key.grantRead(taskDefinition.taskRole)

    const ecsSecurityGroup = new ec2.SecurityGroup(this, 'ecs-sg', {
      vpc,
      allowAllOutbound: true,
    })

    const ecsService = new ecs.FargateService(this, 'Service', {
      cluster,
      taskDefinition,
      assignPublicIp: true,
      securityGroups: [ecsSecurityGroup],
      enableExecuteCommand: true,
    });

  }
}
