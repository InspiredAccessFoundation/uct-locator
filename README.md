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

### Database Migrations
In order to keep databases up-to-date with schema changes, this repo uses [migrate-mongo](https://github.com/seppevs/migrate-mongo) to manage and run schema migrations. `migrate-mongo` is configured to use the current `MONGO_URI` environment variable defined in the **.env** file.

Use the following commands for common tasks for schema migrations:

1. Check migrations status for the current db: `npx nx run:db-status`
2. Run any pending migrations: `npx nx run:db-up`
3. Revert db changes from the last migration: `npx nx run:db-down`
4. Add a new migration script:

    ```sh
    cd back-end
    npx migrate-mongo create <migration-name>
    ```

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
