## A Beginner's Guide to HTTP - Part 3: Requests

![a picture of Dwight from the office captioned HTTP request? XMLHTTPREQUEST](https://images.abbeyperini.com/HTTP-series/dwight.png)

In this part of the series, I'll demonstrate generating HTTP requests from a simple React app using XHR, Fetch, and Axios. You can view all of the code in the [Github repository](https://github.com/abbeyperini/HTTP101). After this, in A [Beginner's Guide to HTTP - Part 4: APIs](/blog.html?blog=HTTP-4), we'll have some fun with APIs other people have built. Finally, we'll discuss authentication and authorization in [A Beginner's Guide to HTTP - Part 5: Authentication](/blog.html?blog=HTTP-5).

I covered terms and definitions necessary for understanding HTTP messages in [part 1](/blog.html?blog=HTTP-1). Then, I demonstrated how to generate response messages in [part 2](/blog.html?blog=HTTP-2). So we know before sending the request message with instructions for the server, the client has to encode it and attach the information the server will need to decode it. Then, after the client receives a response back from the server, it will also need to be decoded. Let's dive in to the code required to do all that.

### Introduction and Table of Contents

This article assumes familiarity with basic JavaScript, [command line](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line), and the terms defined in [part 1](/blog.html?blog=HTTP-1). It also assumes you followed [part 2](/blog.html?blog=HTTP-2).

1. [A Simple React App](#a-simple-react-app)
2. [JSON.parse() and JSON.stringify()](#jsonparse-and-jsonstringify)
3. [XHR](#xhr)
4. [Fetch](#fetch)
5. [Axios](#axios)

### A Simple React App

Now, we need a client! At the same level as your server folder, make a folder called client. Navigate to the folder in a terminal and run `npm install react`.

After it finishes installing, run `npx create-react-app <app-name>` and follow the prompts. When you see `<word>` in code, it means replace `<word>` with your own new word without the `< >`. So for my code, I ran `npx create-react-app http101`. [npx](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/) is bundled with npm. Where npm installs packages, npx executes/runs them. [create-react-app](https://create-react-app.dev/docs/getting-started) will generate all the files you need for a React app.

After it's done, in addition to the new folders and files, you should see "Success! Created `<app-name>`" and other successful build logs in your terminal. Run `npm start`, and you should see build logs and "Compiled successfully!". Your browser should open a new tab navigated to the URL `http://localhost:3000/` with the boilerplate React app displayed.

Like with the Node.js Express server, use ctrl + c to kill the app. Unlike with the server, the React development build will watch for changes and rebuild for you.

Open `client > src > index.js` in your text editor. This file is the JavaScript entry point. In other words, any components we create need to be imported here to be rendered when the app runs. I import my 3 components like this:

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import XHR from './Components/XHR';
import Fetch from './Components/Fetch';
import Axios from './Components/Axios';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <XHR />
    <Fetch />
    <Axios />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

In the src folder created by create-react-app, I made a folder named Components and added three component files, XHR.js, Fetch.js, and Axios.js. The structure of my Fetch component looks like this:

```JavaScript
import React from 'react';

function Fetch() {
  return (
    <p>"This is how I make Fetch a thing."</p>
  )
}

export default Fetch;
```

The other two look almost exactly the same. When I run `npm start` from my terminal and my browser tab opens `http://localhost:3000`, I see all three of my components' strings displayed.

![3 strings displayed on a browser page - "XOXO -HR." "This is how I make Fetch a thing." "I'm isomorphic! (="](https://images.abbeyperini.com/HTTP-series/localhost.png)

### JSON.parse() and JSON.stringify()

Before we get into the code for the HTTP requests individually, let's talk about JavaScript's built-in methods for converting JSON to JavaScript and vice versa. `JSON.parse()` takes a JSON object or array and turns it into valid JavaScript. `JSON.stringify()` takes valid JavaScript and turns it into valid JSON, sometimes referred to as a JSON string.

In the following code block, the first log would print out a JavaScript object, and the second would print a JSON string.

```JavaScript

let yarn = JSON.parse({
    "yarn": {
        "id": 5,
        "name": "Wonderland Yarns & Frabjous Fibers Mary Ann",
        "weight": "Light Fingering",
        "meters": 539.5
    }
})

console.log(yarn)

let newBody = JSON.stringify(yarn)

console.log(newBody)
```

It's manually doing what the `express.json()` body parser was doing for us in the Express server.

### XHR

We don't have to import XMLHttpRequest into our React app - it's already available because you're writing JavaScript for the browser. For every request, we will have to instantiate XHR and build the request using a handful of methods.

#### GET

To build a GET request to my `/yarn` endpoint, I instantiate an XHR object I've called `gXHR`, open the request while passing the method and URL, and then send the request. Finally, I write a `gXHR.onload()` function to handle what happens when the response is received. In my `gXHR.onload()` function, I parse the JSON I received into a valid JavaScript object with `JSON.parse()` and log the first item in the array that was returned.

```JavaScript
function getRequest() {
    // create a request object
    let gXHR = new XMLHttpRequest()

    // set method and URL
    gXHR.open("GET", "http://localhost:8080/yarn")

    // send GET request
    gXHR.send()

    // what happens when the response is received
    gXHR.onload = function() {
      if (gXHR.status !== 200) {
        console.log(gXHR.status, gXHR.statusText)
      } else {
        let yarns = JSON.parse(gXHR.response)
        console.log(yarns[0])
      }
    }
  }
```

`.onload()` is a listener, essentially a loop that runs until the `.send()` method finishes. The function I wrote and assigned to `.onload()` is a callback function to run after the HTTP request has concluded.

#### POST

The POST request looks similar, but we also have to pass a body. I start by defining my POST body and passing it to `JSON.stringify()` to turn the JavaScript object into JSON. I also have to set the `Content-Type` header so XHR knows to send the body formatted as JSON. Then, when I create my request, I pass my JSON string to the `pHXR.send()` method. Finally, I don't `JSON.parse()` the response in `pXHR.onload()` because the response is a string.

```JavaScript
function postRequest() {

    let body = JSON.stringify({
      yarn: {
        id: 5,
        name: "Wonderland Yarns & Frabjous Fibers Mary Ann",
        weight: "Light Fingering",
        meters: 539.5
      }
    })

    let pXHR = new XMLHttpRequest()

    pXHR.open("POST", "http://localhost:8080/yarn/create")

    // set request header
    pXHR.setRequestHeader('Content-type', 'application/json; charset=utf-8')

    pXHR.send(body)

    pXHR.onload = function() {
      if (pXHR.status !== 200) {
        console.log(pXHR.status, pXHR.statusText)
      } else {
        console.log(pXHR.response)
      }
    }
  }
```

#### DELETE

Finally, my DELETE request:

```JavaScript
function deleteRequest() {
    let dXHR = new XMLHttpRequest()

    dXHR.open("DELETE", 'http://localhost:8080/yarn/delete/3')

    dXHR.send()

    dXHR.onload = function() {
      if (dXHR.status !== 200) {
        console.log(dXHR.status, dXHR.statusText)
      } else {
        console.log(dXHR.response)
      }
    }
  }
```

If this was a real app, I would pass the id of the yarn I wanted deleted to `deleteRequest()` and add it dynamically to the URL in a template string like this:

```JavaScript
`http://localhost:8080/yarn/delete/${id}`
```

However, passing an id to an `onClick` handler in React is a tutorial for another time.

#### Putting It All Together

I use these functions as `onClick` handlers for three buttons:

```JavaScript
return (
    <section>
      <button onClick={getRequest}>GET</button>
      <button onClick={postRequest}>POST</button>
      <button onClick={deleteRequest}>DELETE</button>
    </section>
  )
```

To test, I run the client in one terminal using `npm start` and the server in a second terminal using `node app.js`. In the browser, I watch the console tab in the [browser developer tools](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools). As I press the buttons, the different strings I expect to see appear.

![GET, POST, and DELETE buttons from the XHR component are rendered in the browser tab. In the console tab of Chrome developer tools are the 3 string responses we expect from the server.](https://images.abbeyperini.com/HTTP-series/buttons.png)

We've built our first full HTTP conversation! The buttons trigger JavaScript that builds and encodes an HTTP request and then sends it to our server. Our server receives the HTTP request, decodes it, and based on the instructions, sends back an encoded request message. When the client receives the encoded request message, it decodes it and logs part of it to the console.

### Fetch

Having worked mainly in newer HTTP packages at this point, XHR feels very manual to me. To write one request, we have to use multiple methods. With Fetch, we can write a GET request in one line. Fetch is also a Web API, so we don't have to import it either. We don't even have to instantiate it - `fetch()` is a function all on its own.

#### GET

Here is the one line GET request:

```JavaScript
function getRequest() {
    fetch("http://localhost:8080/yarn")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }
```

`fetch()` is doing a lot of work for us. Because we didn't pass configuration options, Fetch is using the default settings. The method is automatically set to GET. In the first `.then()`, `response.json()` is using Fetch's built-in JSON parser to convert the JSON body to JavaScript.

Similarly, the next few lines do a lot in a few characters. In fact, they're on new lines for readability for humans, as far as JavaScript is concerned, it's actually all one line.

```JavaScript
fetch("http://localhost:8080/yarn").then(response => response.json()).then(data => console.log(data[0])).catch(error => console.log(error))
```

Because Fetch is based on promises under the hood, it returns a promise object. This means we can use chained `.then()` and `.catch()` functions to handle the result of the HTTP request. So this code is saying after the promise object is returned as fulfilled, take the response message body and parse the JSON. Then take the newly parsed data and log the first result in the array. If the promise object is instead returned as failed, catch it, and log the error.

Learning the arrow function syntax and async chaining at the same time can be confusing - I know from experience. The `.then()` function is waiting for the execution of the function before it to finish and then executing the function passed to it. We could rewrite it like this:

```JavaScript
function parseData(response) {
  response.json()
}

fetch("http://localhost:8080/yarn").then(parseData(response))
```

Not to mention, this is essentially like creating a callback, but outside of the function that needs to run before the callback is executed. We could rewrite the getRequest function using async/await syntax and a callback with the same result:

```JavaScript
function parseData(response) {
  return response.json()
}

async function getFetch() {
  fetch("http://localhost:8080/yarn")
}

function getRequest(callback) {
  let response = await getFetch()
  
  callback(response)
}

getRequest(parseData)
```

Notice I didn't write any error handling to replace `.catch()`. `.catch()` is there to handle errors that happen within the Fetch request. It is triggered by a JavaScript error. To handle a response with a 500 status code, or server error, I would have to check the response after I've received it to verify it's an error. We'll go into this more in [part 4](/blog.html?blog=HTTP-4).

#### POST

To make the POST request to my `/yarn/create` endpoint work, we'll have to pass configuration options to the `fetch()` method. I start by building my body and converting it to JSON. Then, when I create my Fetch request, I pass a config object after my URL. Finally, because the response is a string, we have to parse it using `.text()` instead of `.json()` before we can log it to the console.

```JavaScript
function postRequest() {

    let bodyString = JSON.stringify({
      yarn: {
        id: 5,
        name: "Wonderland Yarns & Frabjous Fibers Mary Ann",
        weight: "Light Fingering",
        meters: 539.5
      }
    })

    fetch("http://localhost:8080/yarn/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: bodyString
    }).then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }
```

#### DELETE

The DELETE method also requires a config object and the `.text()` method to parse the body.

```JavaScript
function deleteRequest() {
    fetch("http://localhost:8080/yarn/delete/2", {
      method: "DELETE"
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }
```

#### Putting It All Together

Like with my XHR component, I hooked those three functions up to three buttons. When I run my client in one terminal and my server in another and click them, the responses I expect are logged to the console.

![Two rows of GET, POST, and DELETE buttons from the XHR and Fetch components are rendered in the browser tab. In the console tab of Chrome developer tools are the 3 string responses we expect from the server.](https://images.abbeyperini.com/HTTP-series/more-buttons.png)

### Axios

Axios is an npm package, so I run `npm install axios` in my terminal to install it. I also have to import it at the top of my file:

```JavaScript
import axios from 'axios';
```

#### GET

Now that it's been imported, we can use the `.get()` method to write a request. Since Axios also uses promises, we can still chain with `.then()` and `.catch()`.

```JavaScript
function getRequest() {
    axios.get('http://localhost:8080/yarn')
    .then(response => console.log(response.data[0]))
    .catch(error => console.log(error))
  }
```

Right off the bat you can see how this format is closer to the Express server than XHR. Furthermore, you may have noticed I didn't have to parse the body of the response - Axios does that for us. As part of that formatting, the structure of the response object we can reference is changed - instead of `response.body`, I have to reference `response.data`. Because they have it [in the docs](https://github.com/axios/axios#request-config), I knew to expect that. We'll delve into evaluating response format when you don't know what to expect in [part 4](/blog.html?blog=HTTP-4).

#### POST

Next up, the POST request. Thanks to Axios, I don't have to `JSON.stringify()` my body and the `.post()` method allows you to pass an object to add to the body after the URL.

```JavaScript
function postRequest() {
    axios.post('http://localhost:8080/yarn/create', {
      yarn: {
        id: 5,
        name: "Wonderland Yarns & Frabjous Fibers Mary Ann",
        weight: "Light Fingering",
        meters: 539.5
      }
    }).then(response => console.log(response.data))
    .catch(error => console.log(error))
  }
```

I didn't even have to pass a header - Axios tries to `JSON.stringify()` all request bodies and `JSON.parse()` all response bodies. You can also use the [config object](https://www.npmjs.com/package/axios#request-config) to set the headers, method, and more.

#### DELETE

Finally, the DELETE request to my `/yarn/delete/:id` endpoint, looking much like the GET request:

```JavaScript
function deleteRequest() {
  axios.delete('http://localhost:8080/yarn/delete/1')
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
  }
```

#### Putting It All Together

Once again, I hook these functions up to buttons, and now I have 3 rows of ugly buttons returning the responses I expect.

![Three rows of GET, POST, and DELETE buttons from the XHR, Fetch, and Axios components are rendered in the browser tab. In the console tab of Chrome developer tools are the 3 string responses we expect from the server.](https://images.abbeyperini.com/HTTP-series/most-buttons.png)

### Conclusion

Starting with XHR and ending with Axios, you can really see how HTTP request packages and async methods for JavaScript have evolved and been abstracted over the years. Because there's so much going on under the hood but the methods themselves are easy to use, a lot of these concepts are glazed over when teaching students about how to use HTTP. I hope this series is giving you a better understanding of the inner workings of HTTP messages as a whole.

If you're left confused or have any questions about any of the topics I've touched on in this part of the series, please don't hesitate to leave a comment!

Now we know how requests and responses are generated in JavaScript. Checkout [A Beginner's Guide to HTTP - Part 4: APIs](/blog.html?blog=HTTP-4) for evaluating APIs other people have built and displaying the data you get back in your own app.
