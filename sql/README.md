# Initializing the database

Until we get CI setup to be able to run this and the Sequelize migrations we will do this manually. 

## Creating a connection to the RDS instance

1. Login to console and get the cluster you want to use as portfoward host
2. Copy Cluster name
3. Copy Task ID
4. Copy Container ID for the `backend` container
5. Copy the RDS host name you are connecting to
6. Login to your profile via the terminal
7. Run the following to enable port forwarding after replacing all values wrapped in `<>`

```
AWS_PROFILE=<your profile> aws ssm start-session --region us-east-1 --target ecs:<cluster name>_<task id>_<container id> --document-name AWS-StartPortForwardingSessionToRemoteHost --parameters host="<rds hostname>",portNumber="5432",localPortNumber="6432"
```

# Running migrations

1. Start a port forward connection from above
2. Update your .env.migrate<env> file to point to have the correct connection details to the db you are connecting to
3. Run `NODE_ENV=migrate<env> npm run db-status -- --debug` to validate what is going to run
3. Run `NODE_ENV=migrate<env> npm run db-up -- --debug` to execute the migrations