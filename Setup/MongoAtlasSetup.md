# MongoDB - Creating a Cluster using Atlas
Follow these instructions to set up a database for your project. You will want to go to the [Get Started with Atlas](https://www.mongodb.com/docs/atlas/getting-started/) guide and follow those instructions.

## Create an Atlas Account
Start by creating an account in MongoDB Atlas.

1. [Go here](https://www.mongodb.com/cloud/atlas/register)
1. Fill out the First Name, Last Name, Email, and Password fields, or Sign Up with Google
1. Agree to the terms and service and submit

## Deploy a Free Cluster
Now that you have an account, it's time to make a cluster - this is where the database lives.

1. From the [homepage](https://cloud.mongodb.com/), click "Build a Database"  
    ![](Assets/AtlasBuildDb.png)
1. Find the **FREE** Shared option and click "Create"  
    ![](Assets/AtlasFreeSharedCreate.png)
1. Keep all the default settings, scroll down, and click "Create Cluster"  
    ![](Assets/AtlasCreateCluster.png)

## Set Up the Cluster
Now that the cluster has been created, you will need to setup access rules.

1. Under "Security Quickstart" with "Username and Password" selected, enter a username and password  
  - Feel free to use the "Autogenerate Secure Password" button - just make sure to copy/remember the password!
1. Click "Create User"  
    ![](Assets/AtlasAuthUser.png)
1. Scroll down to the "Where would you like to connect from?" section
1. Click the "Add My Current IP Address" button  
    ![](Assets/AtlasAddIp.png)
1. Click the "Finish and Close" button  
    ![](Assets/AtlasFinClose.png)
1. In the popup, click the "Go to Databases" button  
    ![](Assets/AtlasGoToDb.png)

## Get a Connection String
Now the database should be ready to go! You just need a special URL to connect your application to it.

1. In the "Cluster0" deployment click the "Connect" button  
    ![](Assets/AtlasConnect.png)
1. In the popup that appears, click the "Connect your application" button  
    ![](Assets/AtlasConnectApp.png)
1. Make sure "Node.js" is selected as the driver
1. Click the copy button next to the connection string  
    ![](Assets/AtlasCopyString.png)

In the string that is copied, the `<password>` will need to be replaced with your account's actual password. It should end up looking something like this:

```
mongodb+srv://username:password@cluster0.mfwj72d.mongodb.net/?retryWrites=true&w=majority
```

That URI string can be added to the **.env** file for the `MONGO_URI` variable!
