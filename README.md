# U.C.T. Locator
This is a web application that allows caregivers to locate accessible universal changing stations.

New developers can [click here](Setup/DeveloperSetupGuide.md) to see how to get the app running locally.

## Getting Started

The front-end React app is in the [front-end](front-end/) folder, and the back-end Node/Express server is in the [back-end](back-end/) folder.

### Back-End

First, you will need to create a **.env** file in the [back-end](back-end/) directory. It should look something like this:

```sh
MONGO_URI="<secret uri>"
SECRET_KEY="<secret key>"
```

To get a Mongo URI, you can create a free DB using [Mongo Atlas](https://www.mongodb.com/docs/atlas/getting-started/). The Secret Key can be any string.

Once the **.env** file has been created, `cd` into the **back-end** directory, and run these:

```sh
npm install
npm run server
```

#### Database Migrations

In order to keep databases up-to-date with schema changes, this repo uses [migrate-mongo](https://github.com/seppevs/migrate-mongo) to manage and run schema migrations. `migrate-mongo` is configured to use the current `MONGO_URI` environment variable defined in the `.env`.

Use the following commands for common tasks for schema migrations:

1. Check migrations status for the current db: `npx nx run:db-status`
2. Run any pending migrations: `npx nx run:db-up`
3. Revert db changes from the last migration: `npx nx run:db-down`
4. Add a new migration script:

    ```sh
    cd back-end
    npx migrate-mongo create <migration-name>
    ```

### Front-End

For the front-end, you should be able to simply `cd` into the **front-end** directory, and run this:

```sh
npm install
npm run start
```

## Advanced

You can also use [Nx](https://nx.dev/) to build, run, and manage projects in this repository.

First, install Nx with `npm install nx --location=global`.

Next, it's possible to run any script for any project anywhere in the repo, with no need to change directories to that project.

Use `nx <script-name> <project-name>` where `script-name` is the npm script defined in the project's package.json to run, and `project-name` is the name specfied in the project's `package.json` name field.

### Examples

1. Start UCT Locator Front-End

    ```sh
    nx start uct-locator-front-end
    ```

2. Start UCT Locator Back-End

    ```sh
    nx server uct-locator-back-end
    ```
