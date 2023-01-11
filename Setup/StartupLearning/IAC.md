# Infrastructure as Code (aka IAC)

Infrastructure as Code (IaC) is the managing and provisioning of infrastructure through code instead of through manual processes. In this project we are deploying to [AWS](https://aws.amazon.com/) and are utilizing [AWS Cloud Development Kit or CDK](https://aws.amazon.com/cdk/).

## Structure

The AWS CDK project lives under `iac` directory and is a typescript project. It consists of a few different constrcuts. 

App is the top level of a CDK project that contains, Stacks and inside those Stacks contains the Constructs or resources that you are creating in the AWS account.

We have 3 Stacks, one to manage shared infrastructure (CentralIacStack), one for development (DevStack) and another for production (ProdStack). 

## CDK

Our CDK project is utilizing typescript language. It's a basic typescript project with aws-cdk library imported. Project was created by executing `cdk init app --language typescript`. More details on getting started can be found [here](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html).