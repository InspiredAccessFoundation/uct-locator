# U.C.T. Locator
This is a web application that allows caregivers to locate accessible universal changing stations.

New developers can [click here](Setup/DeveloperSetupGuide.md) to see how to get the app running locally.

## Getting Started
The front-end React app is in the [front-end](front-end/) folder, and the back-end Node/Express server is in the [back-end](back-end/) folder.

### Back-End
First, you will need to create a **.env** file in the [back-end](back-end/) directory. It should look something like this:

```
MONGO_URI="<secret uri>"
SECRET_KEY="<secret key>"
```

To get a Mongo URI, you can create a free DB using [Mongo Atlas](https://www.mongodb.com/docs/atlas/getting-started/). The Secret Key can be any string.

Once the **.env** file has been created, `cd` into the **back-end** directory, and run these:

```
npm install
npm run server
```

### Front-End
For the front-end, you should be able to simply `cd` into the **front-end** directory, and run this:

```
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
```
$ nx start uct-locator-front-end
```

2. Start UCT Locator Back-End
```
$ nx server uct-locator-back-end
```