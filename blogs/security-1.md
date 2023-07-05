## Web Security 101 - Part 1: Secrets

Knowledge Level: Evergreen

Planted: 11/29/2022

Last Tended: 06/22/2023

Topics: [security](/topic.html?topic=security), [web development](/topic.html?topic=webDevelopment)

Series: [security](/series.html?series=security)

![black man tapping his finger to the side of his forehead captioned you can't leak passwords if you don't store passwords](https://images.abbeyperini.com/security-series/password.png)

Starting my web security series by sharing my secrets - just kidding! Let's talk about keeping our secrets safe.

1. [Environment Variables](#environment-variables)
2. [Secret Servers](#secret-servers)
3. [Tokens](#tokens)
4. [Cookies](#cookies)
5. [Man-in-the-Middle](#man-in-the-middle)
6. [Web Storage API](#web-storage-api)
7. [IndexedDB API](#indexeddb-api)
8. [Session Hijacking](#session-hijacking)

### Environment Variables

Environment variables are like global server variables. They're often used for secrets and sensitive information. There are ways to expose them to front-end code in the browser, but then they're not secrets anymore. Anyone can find them.

There are packages like [dotenv](https://www.npmjs.com/package/dotenv) that allow you to configure environment variables in files (just remember to put them in your [`.gitignore`](/blog.html?blog=gitPanic-1#:~:text=a%20file%20called-,.gitignore,-in%20the%20root)). You can configure them when you host a site using a platform like [Heroku](https://devcenter.heroku.com/articles/config-vars) or [Netlify](https://docs.netlify.com/configure-builds/environment-variables/).

You can also set them in your terminal environment [manually](https://www.schrodinger.com/kb/1842) or in [files your terminal uses](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-linux#:~:text=has%20been%20unset.-,Setting%20Environmental%20Variables%20at%20Login,-We%E2%80%99ve%20already%20mentioned).

Another common use case for environment variables is for information that will change by environment. For example, you'd have an environment variable denoting the environment like `NODE_ENV=testing` or `NODE_ENV=production`. Then you'd have code like:

```JavaScript
if (NODE_ENV=testing) {
  URL_BASE=http://localhost:3000
} else {
  URL_BASE=http://mydomain.net
}
```

Depending on how you deploy, it's also possible to have separate projects for each environment, and just change the values of the variables.

![two strong men holding hands. One man is labelled biologists. One man is labelled programmers. Their hands are labelled environment variables.](https://images.abbeyperini.com/security-series/variables.jpg)

### Secret Servers

You may be asked to use a secret server to store your secrets. Some are set up similar to a password manager - just  to share credentials. Others are servers that allow you retrieve secrets with an [authenticated](/blog.html?blog=HTTP-5) [HTTP request](/blog.html?blog=HTTP-3).

Products like [Google Cloud](https://cloud.google.com/secret-manager) have the authentication, [authorization](/blog.html?blog=HTTP-5#:~:text=Authentication%20is%20proving%20who%20you%20are.%20Authorization%20is%20being%20granted%20access%20based%20on%20who%20you%20are.), secret storage, and secret retrieval built into the system you use to deploy your code.

If secrets are stored this way, instead of hardcoded in an environment variable, it's much easier to rotate them frequently.

### Tokens

Tokens are a string representing information that has been encrypted, often using a [cryptographic hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function). The information is for authentication and authorization purposes. When you're a user of an app, they're typically using tokens to authenticate and authorize you. You'll usually get keys, or tokens, from APIs to authenticate and authorize your app as a developer.

There are lots of encryption algorithms, but one you'll commonly come across in web development is a JWT. A JSON Web Token has cryptography features around JSON. In other words, they're designed to be compact, URL-safe, and easily consumed in JavaScript. Perfect for HTTP requests in web development. They're even formatted like an HTTP request with headers, a payload with the JSON data, and a signature. The signature is another type of cryptography, [code signing](https://en.wikipedia.org/wiki/Code_signing). In short, code signing aims to guarantee you can trust the information by verifying the source.

Like many cryptographic standards, the JWT algorithms are not secret. You can paste a JWT into [Auth0's JWT debugger](https://jwt.io/) and see the information inside. This is why you should keep JWTs, and all tokens you receive, secret. Rotate them often. Only send them over HTTPS.

As secrets, tokens should stay in the server, but we often need to store information about users in the browser. Let's talk about cookies.

### Cookies

![Cookie monster being handed many cookies captioned "when you open any website"](https://images.abbeyperini.com/security-series/cookie-monster.jpeg)

After you login and a server has received your authentication/authorization token, it will repackage the information the front-end needs into a cookie and send it via HTTP.

There's a specific `set-cookie` header. You can use multiple `set-cookie` headers and each takes one key value pair (e.g. a JavaScript object or a Python tuple).

The most secure cookie has the `secure`, `SameSite`, and `HttpOnly` attributes set. The first means it can only be sent over HTTPS. The second prevents CORS requests from accessing the cookie if it's set to `strict`. The `lax` value  sends the cookie when a user navigates to the same origin. The value `none` doesn't restrict requests for the cookie.

`HttpOnly` only allows the cookie to be read by HTTP request. You won't be able to access it with the [cookie API](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie). In other words, if you don't set `HttpOnly` and `SameSite=strict`, anyone can access your cookie in the browser with JavaScript.

If you need to store session information about a user in the front-end, you don't have to put anything secret in your cookie. Instead, the front-end will store a token or id that expires, essentially a [public key](https://en.wikipedia.org/wiki/Public-key_cryptography). It doesn't matter if someone knows the public key if the private key is stored on the back end for verification. Only when the two are put together is sensitive information revealed.

### Man in the Middle

Why should you guard your tokens and cookies so closely? [Man in the Middle](https://owasp.org/www-community/attacks/Manipulator-in-the-middle_attack) attacks. They go by [many names](https://en.wikipedia.org/wiki/Man-in-the-middle_attack), and monster in the middle is my personal favorite.

Using HTTP as an example, the monster intercepts the information in the middle, between the sender and the recipient. Then, they'll repackage the information like they never opened it and send it on its way. Sometimes they want the secrets in your cookies. Other times they're more interested in how you're code signing or encoding the information.

Check out the [OWASP article](https://owasp.org/www-community/attacks/Manipulator-in-the-middle_attack) for more information.

![3 game of thrones actors posing for a photo. Two tall conventionally attractive women stand on either side of a chubby short man. Captioned man in the middle attack.](https://images.abbeyperini.com/security-series/man-in-the-middle.jpg)

### Web Storage API

If you're already planning on storing non-secret information in the front-end, you can also use the Web Storage API.

The Web Storage API has two parts - [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) and [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Session storage only stores things for a session - as soon as you close the browser or tab, it's gone. Local storage has no expiration. Both store key value pairs.

There are built in methods, so storing and accessing information in Web Storage is as easy as:

```JavaScript
localStorage.setItem(key, value)
sessionStorage.getItem(key)
```

### IndexedDB API

The [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) is like the Web Storage API, but bigger. It's a whole object-oriented database, right in the browser. This means you can store a lot of not secret information.

It's persistent storage and works online and offline. For more information, check out [Mozilla Developer Network's guide](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB).

### Session Hijacking

Why am I so adamant you shouldn't store secrets in the browser? Session hijacking.

There are multiple types, including a man in the middle attack. A common one is to gain access to session information stored in the browser. The goal is either to send it to the server and gain access there or maintain your session, impersonating you.

Attackers can use [trojan horses](https://owasp.org/www-community/attacks/Man-in-the-browser_attack), [clickjacking/UI redressing](https://www.geeksforgeeks.org/clickjacking-ui-redressing/), and [XSS](https://owasp.org/www-community/attacks/xss/) to session hijack as well. Always assume anything stored in the browser is compromised.

### Conclusion

This advice comes from experience. I've exposed keys to the browser, not realizing how dangerous that was. My husband has been the victim of a session hijack.

I thought I'd get started with a general overview of secrets and where not to store them. Web security boils down to making it so time consuming that it's not worth it and assuming your secrets are going to be compromised. Tokens, with their encoding algorithms and recommended frequent rotation, are a great example of that.

I'll talk more about server, HTTP, JavaScript and HTML vulnerabilities in other blogs in this series.
