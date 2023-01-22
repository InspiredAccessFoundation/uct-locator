#!/usr/bin/env bash

STACK=$1




aws ssm start-session --region us-east-1 --target ecs:DevStack-uctcluster3D8CCF0B-MWn6EIZBQkJE_1d4ec664464a4b88bcc78260ee4a6e6d_1d4ec664464a4b88bcc78260ee4a6e6d-2750272591 --document-name AWS-StartPortForwardingSessionToRemoteHost --parameters host="centraliacstack-uctpostgres3491f6cf-jskrutvdbnci.crkxoxttwsft.us-east-1.rds.amazonaws.com",portNumber="5432",localPortNumber="6432"