# Full-Stack Architecture
One of the more difficult parts of this project will be understanding the big picture of how everything works together.

Many of the concepts of a full-stack architecture are explained in the [Full-stack Overview](https://hylandtechclub.com/web-201/FullStackOverview/StudentDesc.html) from Web 201. However, the architecture from that course is not exactly the same as the architecture for the UCT Locator.

There are two basic parts of the product: the **front-end**, and the **back-end**. The two parts run separately, and each uses **npm**. You can think of them as two separate applications: the front-end is the **client**, and the back-end is the **server**. They are connected via **HTTP**, and generally follow the **REST API** paradigm.

## Structure
The overall product follows a client-server architecture. The back-end connects to the database, and the front-end connects to the back-end via [HTTP](https://hylandtechclub.com/web-201/HttpOverview/StudentDesc.html). The [REST API](https://aws.amazon.com/what-is/restful-api/) looks something like this:

![](Assets/RestApi.png)

Essentially:

1. A user visits the front-end (surfaced as a website)
1. The front-end figures out what the user wants to do, and makes a _request_ through HTTP to the back-end
1. The back-end server takes that request, talks to the database as needed, and sends back a _response_
1. The front-end then takes that response, and responds to the user appropriately

## NPM
Both the front-end and back-end use [npm](https://www.npmjs.com/) to run. NPM stands for **N**ode **P**ackage **M**anager - it is a tool that allows developers to include libraries (or _packages_) of code that other people have written. It can also be used to manage and run projects. [This video](https://www.youtube.com/watch?v=ZNbFagCBlwo) provides a quick introduction.

For the UCT Locator, there are two important npm _scripts_:

- **back-end**: `npm run server`
    - Executing this command in the **back-end** directory will run the back-end application locally
- **front-end**: `npm run start`
    - Executing this command in the **front-end** directory will run the front-end application locally

In Visual Studio Code, these scripts should be runnable in the **NPM SCRIPTS** section.

## Full-Stack Starter: Authentication Application
This project started as a basic MERN Auth application, following [this tutorial](https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669). More information about the authentication process, and overall starter application, may be found there.
