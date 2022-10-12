# Front-End
The front-end of a web application contains everything the user sees when they load up your site. The front-end for this project is a React app.

## React
[React](https://reactjs.org/) is a JavaScript library for building user interfaces.

### JSX
React uses [JSX](https://reactjs.org/docs/introducing-jsx.html) - this is basically a way to stick HTML directly into JavaScript code! Most React components will ultimately return a bit of JSX, usually including some custom dynamic logic or data.

It ends up looking something like this:

```js
function HomePage(props) {
  const userName = props.name;

  // This function returns a piece of JSX
  return (
    <div>
      <h1>Welcome!</h1>
      <p>You're my best friend, {userName} 😊</p>
      <Link to="/find">Find a Table</Link>
    </div>
  );

};
```

### Component-Based
React is _component-based_, which means that developers basically create their own custom HTML elements! These elements are called _components_, and their behavior is defined with JavaScript code.

It ends up looking something like this:

```js
// Creates a component named <Welcome />, with a property of name
function Welcome(props) {
  const name = props.name;

  return <h1>Hello, {name}</h1>;
}

// Creates another component named <App /> that uses the <Welcome /> component
function App() {
  return (
    <div>
      <Welcome name="Sarah" />
      <Welcome name="Beatrice" />
      <Welcome name="George Washington" />
    </div>
  );
}
```

In this example, `<App />` would render in HTML as:

```html
<div>
  <h1>Hello, Sara</h1>
  <h1>Hello, Beatrice</h1>
  <h1>Hello, George Washington</h1>
</div>
```

### Guidance
There are some good ways to [get started learning React](https://reactjs.org/docs/getting-started.html). Most of them assume a basic knowledge of JavaScript, so make sure you have that before moving forward!

- [Tutorial](https://reactjs.org/tutorial/tutorial.html): This tutorial runs through everything fairly quickly - it's good if you want to get started quickly!
    - The tutorial mostly uses _class components_; however, most code in the UCT Locator front-end uses [_functional components_](https://www.twilio.com/blog/react-choose-functional-components).
- [Documentation](https://reactjs.org/docs/hello-world.html): This documentation is more in-depth, and provides a more comprehensive view of React.

Feel free to jump around between the different pieces of guidance, and perhaps even the UCT Locator code itself!

## Library: MUI
[Material UI](https://mui.com/material-ui/getting-started/usage/) is a library of React UI components. Essentially, there are a bunch of nice-looking pieces of functionality that can plug right into a React application!

If you're planning to use some HTML element in your code, you will want to check if there is an MUI component that already exists. For example, instead of using the basic HTML `<button>` element, you could use the MUI `<Button>`:

```js
import * as React from 'react';
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Hello World</Button>;
}
```

Note the `import` statement that pulls the `<Button>` from the `@mui` package!

## Library: Axios
[Axios](https://axios-http.com/docs/intro) is a library that helps React apps make HTTP requests. Basically, this is how the front-end will retrieve data from the back-end, or send data to the back-end. It looks something like this:

```js
try {
  let response = await axios.get("api/tables/all");
  setTableLocations(response.data);
} catch (e) {
  alert("Something wrong with getting tables");
  console.log(e);
}
```

Axios is _promise-based_, so most of the UCT Locator code uses `async`/`await` to handle these functions. For the UCT Locator front-end, the library can be included with an `import` statement like this:

```js
import axios from "../../axiosRequests";
```
