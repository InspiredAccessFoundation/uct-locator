#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CentralIacStack, AppStack } from '../lib/iac-stack';

const app = new cdk.App();
const { vpc, cluster } = new CentralIacStack(app, 'CentralIacStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-1" },
});

const appStack = new AppStack(app, 'AppStack',
  vpc,
  cluster,
  {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-1" },
  }
);