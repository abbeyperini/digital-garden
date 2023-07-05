## A Beginner's Guide to HTTP - Part 5: Authentication

Knowledge Level: Evergreen

Planted: 05/14/2022

Last Tended: 06/21/2023

Topics: [web development](/topic.html?topic=webDevelopment)

Series: [A Beginner's Guide to HTTP](/series.html?series=HTTP)

![Gandalf holding a sword and staff captioned HTTP 403 Forbidden you shall not pass](https://images.abbeyperini.com/HTTP-series/403-Forbidden.png)

It's good for APIs to put limits on who can make requests to their server. Unfortunately for the developer building a side project, this necessary security often provides extra hurdles. Let's talk about the common ways to get your app authenticated for public APIs.

### Introduction and Table of Contents

This blog assumes you've read the first four parts of the series or are familiar with basic command line, async Javascript, HTTP messages, and consuming public APIs. You can view all the code from this series in the [Github repo](https://github.com/abbeyperini/HTTP101).

1. [Authentication and Authorization](#authentication-and-authorization)
2. [Can You Authenticate?](#can-you-authenticate)
3. [URL Parameters, Filters, and More](#url-parameters-filters-and-more)
4. [URL Parameter Key](#url-parameter-key)
5. [Authorization Header](#authorization-header)
6. [OAuth2.0](#oauth20)
7. [OIDC](#oidc)

### Authentication and Authorization

Authentication is proving who you are. Authorization is being granted access based on who you are.

You authenticate yourself when you log into an app with your username and password. If you are an admin in an app, you are authorized to view the admin page in the app. If your keycard gets you into the lobby of the office building, you are authenticated as an employee. If your keycard lets you use the elevator to get to the 6th floor, you are authorized to access the 6th floor.

![A tank has a hole in it and water is pouring out captioned "Authorization or authentication?" a man slaps FlexTape over the hole captioned "Auth"](https://images.abbeyperini.com/HTTP-series/tape.png)

Authentication and authorization keys, tokens, and codes are all strings. They're encoded using cryptography to obscure the data contained within them.

The IANA and other organizations maintain [lists of authorization protocols](https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml) for the web. This article will cover passing a key in a URL parameter, the 5 most common authorization protocols, and the most common authentication protocol used in public APIs.

### Can You Authenticate?

For authentication, you'll usually need to create an account to get a key or register your app. Some APIs make getting a key difficult by limiting the number of keys or developer accounts, requiring paid accounts, or other hurdles.

When I was in bootcamp, I wanted to make a beer app. The [Brewer's Friend](https://docs.brewersfriend.com/api) docs act like you can get an API key by default, but once you make an account, you find that you have to have a paid subscription. [RateBeer](https://www.ratebeer.com/api.asp) has a 7-10 business day delay for getting a key. One API I tried to use lets you go through the whole sign up process before letting you know that they aren't giving out new keys indefinitely.

There was another time where I had to email the owner of the API. They took a few days to get back to me, and then I had to have the app already hosted and provide a URL for my app to get the key. There are many times when you will need to provide the URL for your app and cannot authenticate while running your app locally.

![A fence captioned token based authentication, Eric Andre captioned me, Eric Andre running towards the fence captioned let me in, Eric Andre shaking the fence and yelling let me iiiiiiiiiin!](https://images.abbeyperini.com/HTTP-series/auth.jpeg)

### URL Parameters, Filters, and More

So far, we've used simple server URL parameters defined in server routes that came right after a `/`. There are quite a few ways to interact with an API using the URL, and another URL parameter syntax.

For example, [Socrata's APIs](https://dev.socrata.com/consumers/getting-started.html) have commonly used filter options, their own pagination syntax, and a query language (a language that requests and retrieves data from a database, like SQL). Resources that will return a lot of data, like Socrata, will often have pagination by default. Pagination limits the number of results as in "return 50 per page." Socrata's pagination syntax provides the user a way to increase or decrease the number of results per page and the number of pages they want to receive.

Socrata's filters use the syntax referred to as URL parameters, query parameters, and query strings. They are key value pairs attached to the end of the URL with a `?` and `=` like `www.url.com/endpoint?filter_name=value`. You can chain them using an `&` like `www.url.com/endpoint?filter_name=value&variable2=value&variable3=value`. URL parameters have [many possible uses](https://www.semrush.com/blog/url-parameters/#:~:text=URL%20Query%20String%20Examples). For example, weather APIs often have you [pass latitude and longitude](https://www.postman.com/flexweather/workspace/flexweather/api/877c26f9-77c7-4897-b5f6-11fc2d7f3c06/version/33468665-dd59-49c6-b038-d654fc75f9f7?tab=documentation) this way.

You should never pass sensitive information in a URL parameter - it is insecure.

### URL Parameter Key

Often, public APIs will ask you to authenticate by passing a key in a URL parameter. But wait! I just said never pass sensitive information in a URL parameter! ...you will still see this all the time.

After following the [get started instructions](https://developer.nytimes.com/get-started) and enabling the [New York Times Movie Reviews API](https://developer.nytimes.com/docs/movie-reviews-api/1/overview), I want to get some reviews! I start by adding a new component file to my HTTP101 app and import it in index.js:

```JavaScript
function NYTMovies() {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    axios.get('https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=batman&api-key=YOUR_API_KEY').then((response) => {
  
    let counter = -1;
    
    setReviews(response.data.results.map((review) => {
      counter++

      return (
        <li key={counter}>
          <h2><a href="https://www.nytimes.com/2022/03/01/movies/the-batman-review.html">{review.display_title}</a></h2>
          <p>{review.summary_short}</p>
        </li>
      )
      }))
    })

  }, [])



  return (
    <div>{reviews}</div>
  )

}

export default NYTMovies;
```

All you have to do is replace `YOUR_API_KEY` with the API key generated for your app, and you too would see this unstyled list of batman movie reviews.

![A list of batman movie reviews titles that are links to the reviews with a short summary underneath them](https://images.abbeyperini.com/HTTP-series/display-text.png)

### Authorization Header

It's better to pass authentication keys in the headers, where they will be encrypted by HTTPS. Still, HTTPS requests are not infallible, and much of the cryptography used in these standards is easily reversed.

The authorization header almost always uses a redirect workflow. The HTTP request is sent to the server, the server sends back a `401 Unauthorized` response and provides information on how to authorize with a `WWW-Authenticate` response header. The client then sends the request with the `Authorization` header.

If the header has an invalid value, the server will send another `401` or `407 Proxy Authentication Required` response. If the value is valid, but not authorized to access the requested resource, the server will send a `403 Forbidden` response back.

#### Basic

Basic is authenticating using a username and password.

The [Ravelry API](https://www.ravelry.com/api) (login required) allows you to use a few different types of authentication based on the information you want to access. To authenticate myself to the Ravelry API and get authorized to receive data, I add the following code to my server.

```JavaScript
const { default: axios } = require('axios');
global.Buffer = global.Buffer || require('buffer').Buffer;

function setAuthenticationHeader() {
    let data = `${USERNAME}:${PASSWORD}`;
    let buff = new Buffer.from(data);
    let base64data = buff.toString('base64');
    axios.defaults.headers.common['Authorization'] = 'Basic ' + base64data;      
}

app.use(cors());
app.get('/projects/:user', (req, res) => {
    setAuthenticationHeader();
    let user = req.params.user;
    let url = `https://api.ravelry.com/projects/${user}/list.json`;
    axios.get(url).then((response) => res.send(response.data))
    .catch((error) => res.send(error.response.data))
})
```

Instead of passing the header when I call `axios.get()`, I'm attaching the header to this instance of `axios`. Every time I use axios, it will pass the `Authorization` header, and the value of that header will be 'Basic ' and my username and password encoded in a [base64](https://en.wikipedia.org/wiki/Base64) string.

#### Bearer

Bearer is authenticating using a token or key.

If I wanted to request data from a server that used a bearer token instead, I'd update my setAuthenticationHeader function like this:

```JavaScript
function setAuthenticationHeader() {
  let token = `YOUR_TOKEN`;
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;      
}
```

A token is already encoded, so it's not required to be base64 encoded.

#### Digest

Digest is a Basic authentication header with cryptography on top.

With the `401 Unauthorized` response and `WWW-Authenticate` response header, the server sends back data. The client combines that data with data like a username and password and sends it back to the server, encrypted. The information the server sends to the client includes things like a nonce, a unique string that can only be used once.

To authenticate the client, the server generates its own encrypted string and compares it with the encrypted string it was just sent. If they match, the server considers the request authenticated and can begin processing the request.

Usually, you'd use [a package](https://www.npmjs.com/package/http-auth) that creates a digest HTTP server instead of express. You can also try it out [with Postman](https://learning.postman.com/docs/sending-requests/authorization/#digest-auth) or check out [Mahesh's node.js sample code](https://www.dotnetcurry.com/nodejs/1237/digest-authentication-nodejs-application).

#### Custom

Custom is whatever the server you want to get data from wants to define. For example, the server could require you send a custom key header like `X-API-Key: abcdefgh123456789` or require you send the key in the body.

### OAuth2.0

It's even better to implement authentication and authorization using an established protocol with many security considerations. Unfortunately, that becomes very complicated very quickly.

![Samuel L. Jackson in Pulp Fiction captioned say Oauth is an authentication standard again](https://images.abbeyperini.com/HTTP-series/authN.jpeg)

[OAuth2.0](https://oauth.net/2/) is an authorization protocol standard that defines a way to set up servers, HTTP requests, and redirects for a client to be authorized to access data on a user's behalf. It's such a hugely complicated topic that if you are interested in truly understanding it, I recommend reading an in-depth tutorial like [DigitalOcean's](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2) or [Okta's](https://www.oauth.com/). [OAuth1.0](https://www.synopsys.com/blogs/software-security/oauth-2-0-vs-oauth-1-0/) is still in use. It does not have to use HTTP and uses a lot of cryptography to secure messages where OAuth2.0 uses codes, tokens, and HTTP.

Essentially, OAuth2.0 sends codes and tokens via multiple HTTP redirect flows to authorize a client to get data from a resource like another application on behalf of a user. The user grants the client authorization for the request. The client sends that authorization grant to an authorization server and the server sends back a token. The client then sends that token to the resource it wants data from, that resource sees the client is authorized, and sends the data to the client.

![OAuth in a nutshell, a man captioned client server watches a woman captioned resource server walk by, when he goes to follow her, another man captioned authorization server stops him](https://images.abbeyperini.com/HTTP-series/server.jpeg)

The Ravelry API authentication recommended for projects you don't want to give full access to your account is OAuth2.0. To use it, you have to register your client's URL and any URLs it will use in the redirect flows. Only those URLs associated with your app will be granted access to the authorization process and data.

Your client must send a CLIENT_ID, CLIENT_SECRET, and scope to Ravelry's server to get an authorization code. For example, the 'forum-write' scope would allow you to create, edit, and delete forum posts. The CLIENT_ID and CLIENT_SECRET are authenticating the client like a username and password because you must be logged into an account to generate them. Your client sends the authorization code it received to another endpoint in the authorization server. The server sends back an access token. The client can now include the access token with requests to prove it is authorized to get the user's data from the Ravelry API until it expires.

You can view their [Javascript & Node.js example code](https://glitch.com/~ravelry-test-oauth).

### OIDC

[OpenID Connect (OIDC)](https://openid.net/connect/) is a package that creates an authentication layer on top of the OAuth2.0 authorization protocol. It also uses tokens to pass information about the user and client identity via HTTP request. In the previous example, Ravelry used a CLIENT_ID and CLIENT_SECRET to authenticate and had authorization scopes as part of its authorization server. OIDC provides authentication scopes for accessing information about the user (like their email address). Where Ravelry stored authentication tokens in their own app, OIDC has methods for authenticating users without storing any tokens or passwords.

Because it still uses OAuth2.0's redirect flows with the added layer on top, you'll want to get comfortable with OAuth2.0 terminology first. To learn more about OIDC, check out [IBM's guide](https://www.ibm.com/docs/en/acvfc?topic=designer-securing-your-apis-openid-connect) or [OIDC's sample code](https://developers.onelogin.com/openid-connect/samples).

### Conclusion

Authentication and authorization are complicated topics that often include a lot of cryptography. Hopefully this guide will help you parse API documentation you will come across in the future.
