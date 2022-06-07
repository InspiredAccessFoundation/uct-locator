# U.C.T. Locator
A web application that allows caregivers to locate accessible universal changing stations

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