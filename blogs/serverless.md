## A Walkthrough of Updating My Portfolio Site with Netlify Functions and the DEV API

Planted: 07/31/2021

![screenshot of the blog component on Abbey's portfolio site](https://images.abbeyperini.com/serverless/blog.png)

I realized, in talking to newer devs, that most of my blog posts are in a format that implies I followed a linear path from start to finish when building a project. When you're just starting out, it often feels like senior devs already know what the end result will look like when they start. While you, on the other hand, can't even name a place to begin. With that in mind, I wrote this post bit by bit as I was building. The result is a winding journey starting with how I chose this project and got started and ending with deployment, things I'd like to revisit, and Demo Day. In between lies code samples and the detours and motivations behind them.

Ultimately, I wrote this portfolio site update over five days in my spare time for the purpose of presenting it at [Virtual Coffee](https://virtualcoffee.io)'s Demo Day.

### Table of Contents

1. [How to pick what to build?](#how-to-pick-what-to-build)
2. [How do I build it?](#how-do-i-build-it)
3. [Setting up my lambda server](#setting-up-my-lambda-server)
4. [Storing the data in state](#storing-the-data-in-state)
5. [Transforming the data](#transforming-the-data)
6. [Doing It Again for Blog and SingleBlog components](#doing-it-again-for-blog-and-singleblog-components)
7. [Deployment](#deployment)
8. [Demo Day](#demo-day)
9. [Conclusion](#conclusion)

### How to pick what to build?

First, you've got to find a problem to solve. It doesn't have to be an original problem or a problem no one's ever solved before. Just a problem you want to solve.

In this case, I had been handwriting static JSX files for my portfolio site for my blog posts. I knew when I imported 10 of them into my React component that it wasn't the final solution, but it was the quickest solution when I was trying to get my portfolio deployed on a deadline.

When I found out DEV has an API that will send you the HTML of each of your blogs, I made a branch in my [portfolio site repo](https://github.com/abbeyperini/Portfolio2.0), rewrote my FullBlog component, and attempted to call the API from within the established Blog React component. No dice. CORS error. Now I knew that I needed a server so I could use a CORS package or another solution. At this point, I also noticed I'd have to call the DEV API /articles/me endpoint to get the ids of each of my blogs and then call the /articles/{id} endpoint with the id to get the HTML version or find a solution for the markdown version.

For like a month I tried to think of a free server hosting solution I wanted to use. I find Heroku to be too slow. I considered using gcloud because there are some free options, but I don't want to have to parse the gcloud docs anymore than I need to.

It occurred to me to take my own advice and lean into the tools already used in my project. I have a serverless Netlify form, and people love Netlify's serverless AWS lambda functions, so that's where I decided to start. After this conclusion, it was still a few weeks before the #demoInPublic monthly challenge was announced, and I committed to building this for Demo Day.

If Netlify didn't provide an excellent solution, I would have started asking for technology suggestions from friends or picked a technology I've been wanting to use and start building around that.

### How do I build it?

#### When in doubt, just start writing

- Write it out in pseudocode.
- Write the simplest/smallest part.

When I was first getting started, I took every project prompt and wrote out the requirements in pseudocode comments within a function or class like this:

```JavaScript
function getBlogs(requiredData) {
  // http request to API
  // with required headers and data
  // send back response
  // handle errors
}
```

Then I'd pick the smallest part and try and write it in code. I still use pseudocode when I get really stuck or need it to communicate an idea. Most of the time, I can start with writing code, but either way, I still pick the smallest part and just focus on getting it to work. I definitely had to use this approach to get my lambda server set up and do it almost daily at work. Often the most intimidating thing is getting those first few characters in the file.

#### Breaking it down into its smallest parts

I already have styling and the rest of the components built, so for this project I know I'll need to:

1. request the data for all my blogs from the DEV API
2. store the data in state in my FullBlog component
3. transform the data and display it
4. do this all again for my Blog and SingleBlog components

I could definitely break these down further, so I'll start with the smallest piece of the smallest part - writing a [Netlify function](https://www.netlify.com/products/functions/).

### Setting up my lambda server

First, I dug through the documentation and tutorials provided by Netlify and discovered a couple great resources to get me started: [Matt Burrell's Wish You Were Here repo](https://github.com/mattburrell/wishyouwerehere) for passing data from an API call to a component and [Kent C. Dodd's tutorial](https://kentcdodds.com/blog/super-simple-start-to-netlify-functions) for the netlify-lambda package tips.

After an hour and a half of reading documentation and getting a build of the Netlify function up by trial and error, here's what my changes look like:

```bash
npm install netlify-lambda axios
```

A `netlify.toml` file in the root of my project repo which tells `netlify-lambda` where to put the functions during build:

```JavaScript
[build]
  functions = "build/functions"
```

A folder in the root of my repo called functions, with a file called `blogPosts.js` that looks like this:

```JavaScript
const axios = require('axios')

exports.handler = function () {
  
  axios.get('https://dev.to/api/articles/me', {
    headers: {
      "Api-Key": "{{MY_API_KEY}}",
      "Content-Type": 'application/json'
    }
  })
  .then((response) => { return console.log(response.data) })
  .catch((error) => { return console.log(error) })
}
```

To get an API key from DEV, you must be logged into your account, visit `https://dev.to/settings/account`, type in a project name, and click 'Generate API Key.'

At this point, I'm only `return`ing `console.log`s because I want to verify the API call is working without a chance of a CORS error. After this, I spent a fair amount of time getting my `netlify-lambda build` and `serve` commands working so my lambda server would run. I had to add 2 scripts to my `package.json`:

```JavaScript
"start:lambda": "netlify-lambda serve functions",
"build:lambda": "netlify-lambda build functions"
```

"Functions" is the source folder of my Netlify functions to be built into the "build/functions" folder referenced in `netlify.toml`. I got a lot of errors before I finally had the correct folders in the scripts and `netlify.toml`.

So now, I can run `npm run start:lambda` in the terminal and navigate to `http://localhost:9000/.netlify/functions/blogPosts` in the browser and get a `console.log` of the response from `https://dev.to/api/articles/me`.

Next, I want to test calling my lambda function from my component. I added this function to my `FullBlog` component:

```JavaScript
async function fetchBlogs() {
    const res = await axios.get('https://abbeyperini.dev/.netlify/functions/blogPosts')
    .then((response) => { return console.log(response) })
    .catch((error) => { return error })
    
    return await res
  }
```

Then I got a CORS error. I happened to be in a call with some senior devs, so I showed them. They pointed out that link goes to my portfolio domain not localhost! Thanks to [Ray Deck](https://twitter.com/ray_deck) and [David Alpert](https://twitter.com/davidalpert) for CORS suggestions and pointing that out. At that point I stopped coding for the day.

Upon waking up, I briefly considered hardcoding the ids of my blogs to avoid one API call. Thinking about code when I'm not trying to think about code appears to be part of my process.

So at this point I'm not getting a CORS error or my data in the component. After playing around for an hour or so, I realized that nothing was being sent back even though the GET request was being received by my lambda server. I tried to implement a callback a la Matt Burrell, and then did some more digging. Turns out, the Netlify functions operate more like a server route than a JavaScript function, so once I updated `blogPosts.js` to look like this:

```JavaScript
exports.handler = async function (event, context) {
  let response;
  try {
    response = axios.get('https://dev.to/api/articles/me', {
      headers: {
        "Api-Key": "{{MY_API_KEY}}",
        "Content-Type": 'application/json',
        "mode": 'cors'
      }
    })
  } catch (err) {
    return {
      statusCode:err.statusCode || 500,
      body: err.message 
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response
    })
  }

}
```

I started getting a CORS error from my React component again, and also console logs from the Lambda server like:

```bash
Request from ::1: GET /.netlify/functions/blogPosts
Response with status 200 in 3 ms.
```

Whereas before, I was only getting the GET request log.

I also simplified my component. I am trying to use `useReducer()` for the first time, but until I can get my data in my component, I want to reduce the number of possible errors. It's the same reason I currently have the actual API key value hardcoded in my request - I want to know all my values are instantiated, imported, and correct for debugging. Now my entire component looks like this:

```JavaScript
function FullBlog() {
  const [data, setData] = useState("not replaced")
async function get() {
    let res = await axios.get('http://localhost:9000/.netlify/functions/blogPosts')
    return res
  }

  useEffect(() => {
    setData(get())
  }, [])

  return (
      <section className="full-blog">
        <p>Data here:{data}</p>
      </section>
  )
}
```

Note: because I am just slapping the response in a `<p>` tag, I am also getting an "Objects are not valid as a React child (found: [object Promise])." in my browser console, but that at least tells me I am getting something back.

#### Solving the CORS error

At this point I have three options, as I see it, from most time commitment/complexity to least:

1. just write a node express server instead and host it
2. write a proxy
3. see if response/request headers can fix it

So I pull up the header options Ray sent me. After about 25 minutes of googling, testing, and adding headers willy nilly -including to the request to the API at one point- I found [Ben Borger's example](https://benborgers.com/posts/netlify-functions-cors#:~:text=If%20you%20run%20into%20CORS,HTTP%20request%20to%20the%20function). After a little more trial and error, I've got the headers working, but I realized I also needed an `await.` Before I had just been sending an unfulfilled promise. My component is now receiving the data and my lambda function looks like this:

```JavaScript
exports.handler = async function (event, context) {
  let response;
  try {
    response = await axios.get('https://dev.to/api/articles/me', {
      headers: {
        "Api-Key": "{{MY_API_KEY}}",
        "Content-Type": 'application/json'
      }
    })
  } catch (err) {
    return {
      statusCode:err.statusCode || 500,
      body: err.message,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET"
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response
    }),
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET"
    }
  }

}
```

I went with a specific method and origin instead of just `*`, for browser security.

### Storing the data in state

So now I'll go back to getting my `useReducer()` working. Once I have my data stored in state, it'll be easy to manipulate it and display it.

For the sake of brevity, I won't break down writing a reducer or React component from scratch, but if that's another blog you'd be interested in, leave a comment. I wrote this entire component while talking with [Kirk](https://twitter.com/KirkCodes) about the DEV API and `useReducer()` vs Redux. He has a great [pokemon example](https://codesandbox.io/s/github/tkshill/advanced_typescript_example2?file=/src/App.tsx:994-1028) geared towards demonstrating the benefits of typescript, based off of a component using `useReducer()` written by [Dan Ott](https://twitter.com/danieltott). After fixing a couple of my typos, my FullBlog component looks like this:

```JavaScript
function FullBlog() {

  const initialState = {
    isLoading: false,
    blogs: null
  }

  async function fetchBlogs() {
    const res = await axios.get('http://localhost:9000/.netlify/functions/blogPosts')
    dispatch({
      type: "blogFetched",
      payload: res.data
    })
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "blogLoading":
        return {
          ...state,
          isLoading: true
        };
      case "blogFetched":
        return {
          ...state,
          isLoading: false,
          blogs: action.payload
        };
      case "blogFetchFail":
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      default:
        return {
          ...state,
          isLoading: false,
          error: "unknown error"
        };
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function load() {

      dispatch({
        type: "blogLoading"
      })
      
      fetchBlogs()
    }

    load()
  }, [])

  return (
      <section className="full-blog">
        <p>Data here</p>
      </section>
  )
}
```

This was the first time I hadn't set all my action types to variables, which I had been told to do because it is easy to misspell them. Of course, I did misspell an action type, but caught it almost immediately thanks to the `default` block in my reducer.

Nothing's displaying yet, but thanks to the [React Developer Tools Chrome extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en), I can see the state of my component, like this:

![Part of the React Developer Tools pane showing the state structure of my FullBlog component with an array of blog data](https://images.abbeyperini.com/serverless/DevTools.png)

This view also helped me catch that I had changed the variable name in my state to data instead of blogs at some point today. Swapping it back fixed a wonky state structure.

### Transforming the data

If there's one thing I learned in bootcamp, it's that the first step to displaying a list of things returned from an API on a page is mapping the data to `<li>` tags with a key (usually the id returned from the API) and one field to display (usually the title field). To get started, I replaced my original `return` block with this:

```JavaScript
if (!state.isLoading && state.blogs !== null) {
    let blogList = state.blogs.data.map((blog) => {
      return (
        <li key={blog.id}>
          <p>{blog.title}</p>
        </li>
      )
    })

    return (
      <section className="full-blog">
        <ul>
          {blogList}
        </ul>
      </section>
  )
  } else {
    return (
      <p>Blogs loading!</p>
    )
  }
```

Now that I've got a list of titles displaying, I'll look into how I want to display it. The DEV API returns an array of blogs with a `body_markdown` field from the /articles/me endpoint. First, I'll look into displaying the markdown.

Google shows me a few packages like markdown-to-jsx and react-markdown, but code snippets with back ticks can cause issues. You may have noticed reading this post that my blogs often involve a lot of code blocks. Because I'm on a bit of a deadline, I decide at this point to use responses from the /articles/{id} endpoint with the `body_html` field.

Now I need to decide if I want to maintain a static list of blog ids or edit my lambda function to grab all the ids from /articles/me, make a call to /articles/{id} for each of them, and return an array of blogs. I like the idea of the latter, mostly because it doesn't involve maintaining hardcoded data.

After some trial and error, my lambda server now returns an array of blogs with the `body_html` field, and looks like this:

```JavaScript
async function getAllBlogsByID(blogIDs) {
  let blogArray = []

  for (let i = 0; i < blogIDs.length; i++) {
    let blog = await getBlogByID(blogIDs[i])
    blogArray.push(blog)
  }

  return blogArray
}

async function getBlogByID(id) {
  let blog = await axios.get(`https://dev.to/api/articles/${id}`, {
    headers: {
      "Api-Key": "{{MY_API_KEY}}",
      "Content-Type": 'application/json'
    }
  })
  return blog.data
}

exports.handler = async function (event, context) {
  let articlesByUser
  let blogIDs = []
  try {
    articlesByUser = await axios.get('https://dev.to/api/articles/me', {
      headers: {
        "Api-Key": "{{MY_API_KEY}}",
        "Content-Type": 'application/json'
      }
    })
  } catch (err) {
    return {
      statusCode:err.statusCode || 500,
      body: err.message,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET"
      }
    }
  }

  articlesByUser.data.forEach(blog => blogIDs.push(blog.id))
  let allBlogs = await getAllBlogsByID(blogIDs)

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: allBlogs
    }),
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET"
    }
  }

}
```

However, when I insert the `body_html` field into my JSX map, it's just displaying a string with a bunch html tags in it. One quick google showed me [html-react-parser](https://github.com/remarkablemark/html-react-parser) and after the easiest install and application, my blogs are loading beautifully with pictures and links. All I had to add was the import (`import parse from 'html-react-parser';`) and  a couple lines to my blogList map:

```JavaScript
let blogList = state.blogs.data.map((blog) => {
      let blogBody = parse(blog.body_html)
      return (
        <li key={blog.id}>
          <h2>{blog.title}</h2>
          {blogBody}
        </li>
      )
    })
```

All that's left before variable/url cleanup and deployment is styling and the Blog and SingleBlog components, so I'll stop for the day.

I wrote my components assuming I'd be able to apply `classNames` however I wanted to, so my styling will need a little tweaking. I've also noticed some icons under code blocks that DEV has added that I don't want. I followed a BEM naming scheme and organized my CSS with comments, and I am very pleased with how easy it is to apply to the new format.

I'll leave `className="full-blog"` in my component's `<section>` tag, add `className="blog"` to the `<li>` in my map, comment out all the other rules in this section, and delete the two rules with ids. Already, we're in pretty good shape. My blogs have a light background, some spacing, and the text is centered with appropriate margins.

Next I uncomment rules one by one and start changing selectors with class names I can't use to `.blog {element}` selectors. Changing my image rules reminded me I have media query rules to change as well. Now my images and their captions are looking correct. Plus, you've got to appreciate DEV returning all my alt text too.

Looking at the code blocks next, I notice a few things.

![a screenshot of the elements tab in chrome dev tools showing the structure of the code blocks returned by the DEV API](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jj773mqagynij5irvn2g.png)

The space in the class names means I can only use the part of the name before the space as a valid CSS selector. Luckily, that will be sufficient to hide the code block icons. However this causes the container `<div>` and its child `<pre>` to have the same class - "highlight". After my initial attempt to change the selectors, everything is working perfectly except a border is being applied twice to the `<div>` and `<pre>`. Thankfully, the `{{element}}.{{class}}` selector fixes this easily.

Finally, the headings are a little wonky. The title is an `<h2>` but the biggest body heading is an `<h1>`. I'll have to write a `:first-of-type` selector for the title and then selectors for headings in the body of the article. I'm also deleting the `.blog_published-heading` rule I had for my unnecessarily long secondary titles (I love those). The `<h1>` selector seems to catch them for the most part. At some point, I may want to standardize how I'm setting my headings in DEV, but not today.

At this point, scrolling through, I find a few things I want to fix:

- margins around code blocks and body headings
- some of the images are aligned left instead of center
- my code blocks are centered, not left-aligned like I want

Adding margins are simple. The images are all contained in an `<a>` with the class `article-body-image-wrapper`, so to fix that I'll add another rule turning the anchor tag into a flex container, with `justify-content: center`.

Tackling the code block alignment also reminded me I have media queries for those. Updating those got me appropriate widths, but my universal selector `text-align: center` rule is acting more specific than any of the `text-align` rules I've added further down. After a little trial and error, it looks like adding `text-align: left` to the `pre.highlight` rule fixes it. There are some nit-picky things I could try and do, but let's add fiddling with the code block styling to the list of things I'd like to revisit in the future.

At this point, my CSS for the FullBlog component looks like this:

```CSS
/* full blog */

.blog img {
  max-width: 200px;
  margin: 10px;
}

.article-body-image-wrapper {
  display: flex;
  justify-content: center;
}

.blog h2:first-of-type {
  font-size: 2em;
}

.blog h1 {
  font-size: 1.5em;
  margin: 10px;
}

.blog h2 {
  font-size: 1em;
  margin: 10px;
} 

.blog em {
  font-style: italic;
  font-size: 1em;
  max-width: 250px;
  overflow-wrap: break-word;
}

.full-blog {
  background: var(--light-background);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.blog {
  margin: 10px 0px 10px 0px;
  padding: 20px;
  border-radius: 10px;
  background: var(--accent);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.blog ul {
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  width: 50%;
}

.blog li {
  list-style-type: disc;
  margin: 10px;
  text-align: left;
}

.highlight__panel {
  display: none;
}

div.highlight {
  background-color: #eee;
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
}

pre.highlight {
  white-space: pre-wrap;
  max-width: 250px;
  overflow-x: auto;
  text-align: left;
}

code {
  padding: 1px 5px 1px 5px;
}

.blog p, .blog blockquote {
  padding: 0px;
  margin: 5px;
  text-align: left;
  width: 50%;
}
```

With these relevant media queries:

```CSS
/* media queries */

@media screen and (min-width: 350px) {

  pre.highlight {
    max-width: 300px;
  }
}

@media screen and (min-width: 525px) {

  .blog img {
    max-width: 250px;
  }

  pre.highlight {
    max-width: 500px;
  }
}

@media screen and (min-width: 700px) {

  .subAbout, .subContact, .blog {
    margin: 20px;
  }

  .blog img {
    max-width: 300px;
  }

  pre.highlight {
    max-width: 650px;
  }
}

@media screen and (min-width: 900px) {

  .blog img {
    max-width: 500px;
  }

  pre.highlight {
    max-width: 100%;
  }
}

@media screen and (min-width: 1200px) {

  .blog em {
    max-width: 500px;
  }
}
```

### Doing It Again for Blog and SingleBlog Components

The Blog component sits on the main page of my portfolio, displaying previews of all of my blogs with a title and cover image. I want my Blog component to pull the same information as FullBlog, but only display a smaller portion of it. When you click on the title of a blog post in the Blog component, it should load the SingleBlog component with just that blog post.

At this point, I need to think about my state architecture and trying not to duplicate code. I played around with moving my reducer, state, and `fetchBlogs()` into their common parent component, but that really messed up my state. At this point, I'll be duplicating some code, and considering if I even need the FullBlog component or if I can refactor the Blog component from my font page to handle the previews, single blog, and full blog at some point in the future.

My Blog component already has a callback function passed down from the parent component to select a single blog to render. I'll rewrite it to use the blog id and trigger a lambda function, but first let's get this component loading blog previews. After a little fiddling, my previews are loading. Unfortunately, DEV doesn't have alt text for cover images, so my alt text is very non-descriptive. The main difference between Blog and FullBlog is my map for my `<li>`s:

```JavaScript
let blogPreviewList = state.blogs.data.map((blog) => {
      let altText = `cover image for ${blog.title}`
      let blogImage = '';

      if (blog.cover_image) {
        blogImage = blog.cover_image
      } else if (blog.social_image) {
        blogImage = blog.social_image
      }

      return (
        <li key={blog.id} className="blog">
          <h2 onClick={() => chooseComponent({id: blog.id})}>{blog.title}</h2>
          <img alt={altText} src={blogImage}></img>
        </li>
      )
    })
```

Now, I spend a few minutes looking at my callback function, trying to remember how it works. My main component in my `app.js` file, App, has state for which components are showing, and a `chooseComponent()` function that uses `setState()` and is passed to the blog component.

```JavaScript
function App() {
  const [hidden, setHidden] = useState(false);
  const [single, setSingle] = useState(false);
  const [singleShow, setSingleShow] = useState('');
```

```JavaScript
const chooseComponent = (component) => {
      setSingle(true);
      setSingleShow(component);
  }
```

```JavaScript
<MainFull condition={hidden && !single} component={<Blog chooseComponent={chooseComponent} />} />
```

The MainFull component and conditions are my CSS transitions and state for rendering components respectively. Here's what passing `chooseComponent()` looks like in my Blog component:

```JavaScript
function Blog(props) {

  const chooseComponent = (component) => {
      props.chooseComponent(component);
  }
```

My changes to get `chooseComponent()` to work with a blog id look like this in `app.js`:

```JavaScript
const [singleBlogID, setSingleBlogID] = useState(0);
```

```JavaScript
const chooseComponent = (component) => {
    if (component.id) {
      setSingle(true)
      setSingleBlogID(component.id)
      setSingleShow("SingleBlog")
    } else {
      setSingle(true);
      setSingleShow(component);
    } 
  }
```

```JavaScript
<Single condition={hidden && single && singleShow === "SingleBlog"} component={<SingleBlog id={singleBlogID} />}/>
```

Next, I create my SingleBlog component. I'm passing the id from the blog preview in props, adding it to state, and creating a new request to a lambda function. Now I just need to find a way to pass the id to the lambda function. And that's a good place to stop for the day.

After playing around with the lambda function for a bit, I find that passing the id in the url works where a POST request with the id in the body does not. My `SingleBlog.js` file now looks like this:

```JavaScript
const axios = require('axios')

exports.handler = async function (event, context) {

  let id = event.queryStringParameters.id
  try {
    let blog = await axios.get(`https://dev.to/api/articles/${id}`, {
      headers: {
        "Api-Key": "{{MY_API_KEY}}",
        "Content-Type": 'application/json'
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: blog.data
      }),
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000"
        "Access-Control-Allow-Methods": "GET"
      }
    }

  } catch (err) {
    console.log(err)
    return {
      statusCode:err.statusCode || 500,
      body: err.message,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000"
        "Access-Control-Allow-Methods": "GET"
      }
    }
  }

}
```

I had to tweak my `SingleBlog` component a bit, but the CSS applied perfectly once it was loading the data. I took the id out of state and just passed it in the `onClick()` in Blog:

```JavaScript
<h2 className="preview_button" onClick={() => chooseComponent({id: blog.id})}>{blog.title}</h2>
```

My SingleBlog `fetchSingleBlog()` and `useEffect()` functions now looks like this:

```JavaScript
async function fetchSingleBlog(id) {
    const res = await axios.get(`http://localhost:9000/.netlify/functions/singleBlog?id=${id}`)

    dispatch({
      type: "blogFetched",
      payload: res.data.data
    })
  }

useEffect(() => {

    async function load() {

      dispatch({
        type: "blogLoading"
      })
      
      fetchSingleBlog(props.id)
    }

    load()
  }, [])

  if (!state.isLoading && state.blog !== null) {

    let blogBody = parse(state.blog.body_html)

    return (
      <section className="full-blog">
        <ul>
          <li key={state.blog.id} className="blog">
            <h2>{state.blog.title}</h2>
            {blogBody}
          </li>
        </ul>
      </section>
    )
  } else {
    return (
      <p>Blogs loading!</p>
    )
  }
```

My blog preview CSS styles applied fairly effortlessly, as well. The only thing I tweaked was the width and height rules for `.preview` and `.preview_image` because the landscape format of the cover images returned by DEV is different than what I was using. It is, however, much more standardized, which is nice.

#### Error handling in components

The final thing before deployment - I have an error action type, but currently am not sending any errors to the reducer!

First I update my axios requests like this:

```JavaScript
async function fetchBlogs() {
    axios.get('http://localhost:9000/.netlify/functions/blogPosts')
    .then((res) => {
      dispatch({
        type: "blogFetched",
        payload: res.data
      })
    }).catch((error) => {
      dispatch({
        type: "blogFetchFail",
        payload: error
      })
    })
  }
```

Then I add an `else if` statement to my returns at the bottom of my components:

```JavaScript
else if (!state.isLoading && state.error) {
    return (
      <p>There was an error! Try again later.</p>
    )
  } 
```

### Deployment

While trying to get to sleep, I realized I had committed my key to a public repo. Luckily, I could revoke it from my phone. In the morning I generated a new key. Then it was time to clean up my keys and routes.

I had read somewhere that a `.env` file will work with React if you add `REACT_APP_` to the beginning of your environment variable, and that is immediately proven false in my case. However, my error handling is working great!

The regular dotenv package isn't meant for front end, so I'll try dotenv-webpack next. After install and adding a `webpack.config.js` file with the import, I rename my `API_KEY` variable, add a `BASE_URL` variable and an `ORIGIN_URL` variable, and it's still not working.

All my reading assures me that the lambda functions will be able to access my environment variables set in Netlify's UI, and there's a way to set up environment variables for them locally using the netlify-dev package. At this point, I'm less than 48 hrs out from my demo, so I'm going to hardcode the urls, see if deploying works, and make the local environment variables a Later-Abbey problem. It's worth noting that my React component and lambda function will both be at `https://abbeyperini.dev` after deployment, so I probably only had to solve those CORS issues for local development.

After the first deploy, I had to add `props.id` to my dependency array in my SingleBlog component because Netlify builds fail if there's a warning. The second deploy resulted in a successful build, but functions weren't showing up. Netlify will tell you in the build logs if it's deploying functions and there's a functions tab to look at the logs when the function runs. After several more attempts and lots of documentation and forum thread reading, I ended up changing my `netlify.toml` to this, which Matt Burrell uses:

```JavaScript
[build]
  Command = "npm run build && npm run build:lambda"
  Functions = "netlify"
  Publish = "build"
```

I think it solves the problem of my functions not building because it tells Netlify to run the build command. Moving them into the default folder Netlify expects probably didn't hurt either. It may have problems with nested folders.

I added `console.log(error)` to my blogPosts function on deploy attempt 9, and realized I hadn't rotated my API key after revoking it last night. However, everything was working, including the `API_KEY` environment variable set in the Netlify UI! The environment variables seem to be pulled at build, so if you edit one, you'll have to trigger a new build to see it. My site is usually triggered to build by a `git push` to the master branch, but there's a button to trigger deploy in the Deploys tab. Finally, everything is live and working!

At this point, I still have a list of things I'd like to revisit:

- finding a markdown parsing solution to avoid the 429 error I occasionally get from that many API calls - [done!](/blog.html?blog=audit-5)
- code block styling - [done!](/blog.html?blog=audit-5)
- cute error and loading graphics - [done!](/blog.html?blog=shibas)
- possibly refactoring my 3 blog components into 1 or 2 to cut down on duplicated code - [done!](/blog.html?blog=audit-5)

### Demo Day

Historically, Demo Days have not been my strong-suit. Initially I struggled with describing why I built what I built and didn't go into any detail about my code. At this point, I still get very nervous and start talking really fast.

The Virtual Coffee Demo Day went much better for me than past ones. Even though I went last, I managed to start at a normal speed in the beginning and only sped up somewhat. To prepare, I made a quick video of the feature I wanted to show just in case it broke before/during the presentation. I wrote out what I wanted to cover, including the pieces of code I wanted to show, and practiced a few times in the hours leading up to the presentation.

After the presentation, [Justin Noel](https://twitter.com/JustinNoelDev) reached out to let me know that I could make the landing page of my website more accessible by adding the `prefers-reduced-motion` `@media` query. The final addition to my code for this blog looks like this:

```CSS
@media (prefers-reduced-motion) {
  .bg, .bg2, .bg3 {
    animation-name: dissolve;
  }
}
```

You can read more about this query and the user settings that would trigger this rule in the [MDN reference docs](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion). I'm thankful I didn't use any of the very intense animations I tried before landing on this one, and this is exactly the type of feedback I want anytime I share my code.

### Conclusion

My goal for this blog was to make it clear that building things is rarely a linear process. I also hope it gave some insight into how I break down, approach, and solve problems big and small. You can check out all the code in my [portfolio repo](https://github.com/abbeyperini/Portfolio2.0) and watch [my Demo Day recording](https://drive.google.com/file/d/1DXMEfr5-AQn6vk9ntCK5VPKv4C6Ogidc/view?usp=sharing).

Maybe you also noticed I did not do this alone. I used documentation, tutorials, and code snippets written by devs I've never met. (Shout out to the DEV API having response structure examples in their documentation - so helpful!) I briefly paired with senior devs when I hit a CORS issue. The impetus for this specific project was from other senior devs telling me things I didn't know in a video call. Not to mention, I wouldn't have gotten the accessibility tip or found the motivation to finish it without Demo Day from [Virtual Coffee](https://virtualcoffee.io).

#### P.S&colon;

I had mentioned wanting to revisit standardizing the way I write headings in my DEV blog posts. While cross posting to Medium, I noticed I'm the one that made my titles `<h2>`s. I've updated my JSX and CSS to be `<h1>`s so now all the headings on my page are in more of a descending order. I'll still want to go back and downgrade all of my titles on DEV to get `<h2>`s and `<h3>`s for accessibility's sake.
