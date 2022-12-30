import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy, aws_ecs as ecs, aws_ec2 as ec2, aws_ecr as ecr } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CentralIacStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;
  public readonly cluster: ecs.Cluster;
  public readonly repository: ecr.Repository;


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

    this.repository = new ecr.Repository(this, "uct-private-repo", {
      repositoryName: "uct-private-repo",
      removalPolicy: RemovalPolicy.DESTROY
    });
    this.repository.addLifecycleRule({ maxImageCount: 10 });
  }
}

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string,
    vpc: ec2.Vpc,
    cluster: ecs.Cluster,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDef');

    taskDefinition.addContainer('DefaultContainer', {
      image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
      memoryLimitMiB: 512,
    });

    const ecsSecurityGroup = new ec2.SecurityGroup(this, 'ecs-sg', {
      vpc,
      allowAllOutbound: true,
    })

    const ecsService = new ecs.FargateService(this, 'Service', {
      cluster,
      taskDefinition,
      assignPublicIp: true,
      securityGroups: [ecsSecurityGroup]
    });

  }
}
