#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CentralIacStack, AppStack } from '../lib/iac-stack';

const app = new cdk.App();
// Shared infra stack since dev and prod run in the same account
const {
  vpc,
  frontend_repository,
  backend_repository,
  load_balancer,
  listener,
  zones,
  database
} = new CentralIacStack(app, 'CentralIacStack', { env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-1" } });

// Production stack
new AppStack(app, 'ProdStack',
  vpc,
  frontend_repository,
  backend_repository,
  load_balancer,
  listener,
  zones,
  database,
  "0.0.1",
  "0.0.2",
  "app",
  {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-1" },
  }
);

// Development stack
new AppStack(app, 'DevStack',
  vpc,
  frontend_repository,
  backend_repository,
  load_balancer,
  listener,
  zones,
  database,
  "v0.0.3",
  "v0.0.3",
  "dev",
  {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-1" },
  }
);