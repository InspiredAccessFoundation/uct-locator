# Back-End
The back-end of a web application contains everything that happens behind the scenes to make the product work. For the UCT Locator, there is a Node.js/Express web server and a Postgres database. 

## Node.js
[Node.js](https://nodejs.org/en/about/) is a JavaScript runtime environment. It is designed to build network applications, like web servers!

Follow [this guide](https://hylandtechclub.com/web-201/TemplateLiterals/DriversLicenseCodeAlong.html) for an introductory Node.js activity. It is also possible to build full web servers in only Node.js, but there is actually another framework for that...

## Express
[Express](https://expressjs.com/) is a framework that helps build web servers in Node.js. There are several ways to learn Express; [here](https://expressjs.com/en/starter/hello-world.html) is some of the documentation from Express themselves. They also have a quick introduction to [routing](https://expressjs.com/en/starter/basic-routing.html).

A very simple example of an Express web application looks like this:

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

Follow [this guide](https://hylandtechclub.com/web-201/ExpressProjects/ExpressProjectCodeAlong.html) for an introductory Express activity.


## Postgres with PostGIS extension
PostgreSQL is a powerful, open source object-relational database system with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.

There is a wealth of information to be found describing how to [install](https://www.postgresql.org/download/) and [use](https://www.postgresql.org/docs/) PostgreSQL through the official documentation.

[This Web 201 lesson](https://hylandtechclub.com/web-201/DatabasesReplit/StudentDesc.html) introduces databases in general, but it does focus a little more on the specific Replit DB. However, many of the concepts will still be valuable if you do not have much experience with databases.

## Sequelize
[Sequelize](https://sequelize.org/) is a library that allows Node.js applications to communicate with a SQL database via an ORM (object relational model). [Here](https://sequelize.org/docs/v6/getting-started/) is a brief introduction that covers some of the core concepts; however, it might get a little over-complicated.

### Schemas/Models
Sequelize uses [models](https://sequelize.org/docs/v6/core-concepts/model-basics/) to define the type and structure of the data in the database. _Models_ are fancy constructors compiled from schema definitions.

Creating a Sequelize schema/model looks something like this:

```js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'users',
    sequelize,
  });

  return User;
};
```

This example would allow for `User` objects to be stored in the database. Each user object would have:

- A `name` property which would be a required `String`
- An `email` property which would be a required `String`
- A `password` property which would be a required `String`
- A `createdDate` property which would be a `Date`, set to the current data/time
- A `role` property which would be a `String`
    - The `role` would only have two possible values: `'admin'` or `'user'`
    - This property will be set as `'user'` by default

When adding a new `User` to the database, all of these requirements would have to be met.

### Queries
Once the structure of the data has been defined, it will be possible to interact with the objects! There are four basic interactions:

- **C**reate: add an object to the database
- **R**ead: view an object from the database
- **U**pdate: update the data for an existing object in the database
- **D**elete: delete an object from the database

[Here](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/) is a rundown of the available queries that can be run once the database has some data in it.

#### Create
Here is a basic way to add an object to the database:

```js
// Load User model
const models = require("../../models");

// Create User object
const newUser = models.User.build({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password
});

// Save User in the DB
newUser.save()
  .then(user => res.json(user))
  .catch(err => console.log(err));
```

#### Read
There are a few different ways to view different data in the database. Note that the `User` model must be loaded into the script for this to work.

This query will return _all_ `User` objects:

```js
const users = await models.User.findAll();
```

This query will return _one_ `User` object with an `email` of `"mark@facebook.com"` (if it exists):

```js
const userByEmail = await models.User.findOne({ where: { email: "mark@facebook.com" } });
```

There are many other ways to filter the results as well!

#### Update & Delete
It is also possible to [update](https://sequelize.org/docs/v6/core-concepts/model-instances/#updating-an-instance) or [delete](https://sequelize.org/docs/v6/core-concepts/model-instances/#deleting-an-instance) objects from the database, but the UCT Locator actually hasn't implemented those interactions yet!
