# Back-End
The back-end of a web application contains everything that happens behind the scenes to make the product work. For the UCT Locator, there is a Node.js/Express web server and a MongoDB database. 

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

## MongoDB
[MongoDB](https://www.mongodb.com/) is a document-oriented NoSQL database program. It uses [JSON](https://www.w3schools.com/js/js_json_intro.asp)-like documents with optional schemas.

[This Web 201 lesson](https://hylandtechclub.com/web-201/DatabasesReplit/StudentDesc.html) introduces databases in general, but it does focus a little more on the specific Replit DB. However, many of the concepts will still be valuable if you do not have much experience with databases.

[Here](https://www.tutorialspoint.com/mongodb/mongodb_overview.htm) is a quick overview of MongoDB in particular.

For the UCT Locator, there is an existing test database setup and hosted in the cloud through [MongoDB Atlas](../MongoAtlasSetup.md).

## Mongoose
[Mongoose](https://mongoosejs.com/) is a library that allows Node.js applications to communicate with a MongoDB database. [Here](https://mongoosejs.com/docs/index.html) is a brief introduction that covers some of the core concepts; however, it might get a little over-complicated.

### Schemas/Models
Mongoose uses [schemas](https://www.mongodb.com/docs/atlas/app-services/schemas/) to define the type and structure of the data in the database. _Models_ are fancy constructors compiled from schema definitions.

Creating a Mongoose schema/model looks something like this:

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

module.exports = User = mongoose.model("users", UserSchema);
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

[Here](https://mongoosejs.com/docs/queries.html) is a rundown of the available queries that can be run once the database has some data in it.

#### Create
Here is a basic way to add an object to the database:

```js
// Load User model
const User = require("../../models/User");

// Create User object
const newUser = new User({
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
const users = await User.find({});
```

This query will return _one_ `User` object with an `email` of `"mark@facebook.com"` (if it exists):

```js
const userByEmail = await User.findOne({ email: "mark@facebook.com" });
```

There are many other ways to filter the results as well!

#### Update & Delete
It is also possible to [update](https://mongoosejs.com/docs/api.html#model_Model-updateOne) or [delete](https://mongoosejs.com/docs/api.html#model_Model-deleteOne) objects from the database, but the UCT Locator actually hasn't implemented those interactions yet!
