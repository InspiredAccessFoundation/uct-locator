# U.C.T. Locator
This is a web application that allows caregivers to locate accessible universal changing stations.

## Getting Started
There are some things you'll want to read through before you get into the project.

- Follow the [Developer Setup Guide](Setup/DeveloperSetupGuide.md) to get the app up and running locally.
- Follow the [Start-Up Learning](Setup/StartupLearning.md) guide to learn more about the technologies in the app.

Make sure to read everything thoroughly, and try to complete all the steps. Some of it may be somewhat confusing, but stick with it. It may take some time, but we believe in you!

![](Assets/YouCanDoIt.gif)

## Advanced
Beyond the basics, there is some advanced tooling that may help with the development of the project.

Create an **.env** file in the `back-end` directory and add the following

```sh
SECRET_KEY="<secret key>"
```

The Secret Key can be any string, its the key for the JWT.

Once the **.env** file has been created, `cd` into the **back-end** directory, and run these:

```sh
npm install
npm run server
```

#### Database 

The backing database for this project is Postgres. Easiest way to get one of those running locally is simply to use Docker. You can use the following command to get a Postgis enabled Postgres instance up and running. 

```
docker run --name postgresql -e POSTGRES_USER=uct-user -e POSTGRES_PASSWORD=uct-password -p 5432:5432 -v pg-data:/var/lib/postgresql/data -d postgis/postgis
```

#### Migrations

In order to keep databases up-to-date with schema changes, this repo uses [sequelize-auto-migrations-v2](https://github.com/brianschardt/sequelize-auto-migrations) to manage and run schema migrations. 

Use the following commands for common tasks for schema migrations:

1. Check migrations status for the current db: `npx sequelize-cli db:migrate:status` or `npm run db-status`
2. Run any pending migrations: `npx sequelize-cli db:migrate` or `npm run db-up`
3. Revert db changes from the last migration: `npx sequelize-cli db:migrate:undo` or or `npm run db-down` 
4. Add a new migration script by updating your models and then running:

    ```sh
    cd back-end
    NODE_ENV=local npx makemigration --name '<name that describes you changes>'
    ```

### Front-End

For the front-end, you should be able to simply `cd` into the **front-end** directory, and run this:

```sh
npm install
npm run start
```

## Advanced

### Nx
You can also use [Nx](https://nx.dev/) to build, run, and manage projects in this repository.

First, install Nx with `npm install nx --location=global`.

Next, it's possible to run any script for any project anywhere in the repo, with no need to change directories to that project.

Use `nx <script-name> <project-name>` where `script-name` is the npm script defined in the project's package.json to run, and `project-name` is the name specified in the project's `package.json` name field.

#### Examples
Here are some examples showing how to run the front-end and back-end.

1. Start UCT Locator Front-End

    ```sh
    nx start uct-locator-front-end
    ```

2. Start UCT Locator Back-End

    ```sh
    nx server uct-locator-back-end
    ```
