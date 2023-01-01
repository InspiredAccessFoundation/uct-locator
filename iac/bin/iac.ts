#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CentralIacStack, AppStack } from '../lib/iac-stack';

const app = new cdk.App();
const { vpc, cluster, frontend_repository, backend_repository } = new CentralIacStack(app, 'CentralIacStack',
  {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-1" },
  });

const appStack = new AppStack(app, 'AppStack',
  vpc,
  cluster,
  frontend_repository, backend_repository,
  {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-1" },
  }
);