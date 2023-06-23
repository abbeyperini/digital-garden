# Web Security 101 - Part 2: User Input

Planted: 11/30/2022
Tags: security, web development

![stick woman on the phone. The person on the other end of the phone says "Hi, this is your son's school. we're having some computer trouble." She says "oh dear - did he break something?" They say "in a way - did you really name your son Robert'); DROP TABLE Students;--?" She responds "oh. yes. little bobby tables we call him." The school says "well, we lost this year's student records. I hope you're happy." She responds "and I hope you've learned to sanitize your database inputs."](https://images.abbeyperini.com/security-series/exploits_of_a_mom.png)

Never trust anything a user puts into your app.

1. [Listing](#listing)
2. [Input Validation](#input-validation)
3. [Encoding](#encoding)
4. [Sanitization](#sanitization)
5. [XSS](#xss)
6. [SQL Injection](#sql-injection)
7. [Command Injection](#command-injection)
8. [Client-Side Authorization](#client-side-authorization)

## Listing

Cybersecurity has multiple types of listing.

- Whitelisting is making a list of values that are allowed. For example, a CORS policy that only allows requests from a list of certain sites.
- Blacklisting is making a list of values that aren't allowed. For example, blocking a number on your phone.
- Allowlisting is making a list of trusted files, applications, and processes that are allowed to run.
- Greylisting is making a list of values that are temporarily allowed. Called grey because it's in between black and white, this is typically for access control. For example, a user only needs write permissions for the database for one task, and you want to revoke access afterwards.

All of these are tools in your toolbelt, to be used with other tactics. Whitelisting is typically more useful than blacklisting. If attackers come up with a new thing, it'll be allowed by your blacklist, but it still won't be allowed by your whitelist.

## Input Validation

Input validation isn't just for thwarting attacks. Making sure your data is properly formatted will also prevent errors.

Syntactic validation checks for the correct syntax. When you check that a user's input in an email field is in an email format, that's syntactic validation.

Semantic validation checks the values of the user input. For example, that they entered a date that already happened in a date field.

![Brad Pitt in Fight club captioned first rule of web security is you don't trust user input](https://images.abbeyperini.com/security-series/club.jpg)

### Client-side

You encounter client-side validation often. For example, when a field is required in a form.

The first line of defense on the client-side is built-in HTML validation attributes. This is true in frameworks, too. HTML form elements have attributes like `required` that will do your work for you. Other examples include `minlength`, `maxlength`, and `pattern`. With `pattern`, you can check the input against a [regular expression](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#the_constraint_validation_api).

By only allowing through values we know to be in a good format, we are whitelisting. If we were to only blacklist certain values we know to be malicious, we'd probably miss malicious values and allow badly formed data into our app.

The HTML element `<input>` has 21 possible values for the `type` attribute. Many of them automatically validate the user input, like `email`.

```HTML
<label for="email">e-mail address</label>
<input type="email" id="email" name="email">
```

Just like that, your input will validate that the user entered text in an email format. Anything else will be invalid. In JavaScript, you have access to the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#the_constraint_validation_api) for these elements. With it, you can set custom error messages and get information about the validity of the user input.

If you can't use an HTML form control, are sending the data to the back-end, and/or need to do semantic validation, you'll need to verify the data looks how you'd expect using JavaScript or your programming language of choice. TypeScript, for example, would validate the types automatically. In JavaScript, syntactic validation would probably look something like

```JavaScript
const email = document.getElementById("email");
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function isValidEmail() {
  if (email.value.length > 0 && typeof(email.value) === string) {
    return emailRegExp.test(email.value);
  }
  return false
}
```

### Server-side

Even with client-side defenses, you still want to validate input on the back-end. If you're sending form responses over HTTP, you might have used something like Postman to check your endpoint will take the form data without filling out the form itself. So can anyone else.

Input validation looks very similar on the back-end except instead of validating individual fields, you're usually validating the entire form in the body of an HTTP request. If you want to syntactically and semantically validate the whole form in one fell swoop, you can use [schema validation](https://apisyouwonthate.com/blog/server-side-validation-with-api-descriptions). Like making a type in a [statically-typed language](https://developer.mozilla.org/en-US/docs/Glossary/Static_typing#:~:text=A%20statically%2Dtyped%20language%20is,not%20indicate%20their%20variable%20types.), you can create a file with a schema, the format you expect, and check against it with a package like [ajv](https://ajv.js.org/).

## Encoding

Encoding converts data into another format. For security and utility, your encoding should be context-sensitive. For example, React will not take children elements in an object. You would have to encode them in an array.

Encryption is beyond the scope of this blog, but it is a type of encoding.

Another type of encoding is serialization or turning data into a string so it can be transmitted easily. In JavaScript, `JSON.stringify` serializes JSON.

`JSON.parse`, on the other hand, takes a JSON string and encodes it as a JavaScript object. `JSON.parse` will not execute code, but if you encode a script inside a valid string of JSON, it might execute wherever you pass it.

To prevent that, we sanitize data.

## Sanitization

Where serialization and parsing ensure your code is valid, sanitization ensures your code is safe and desired. It is also context-sensitive. HTML in a string on the back-end is fine. HTML in a web page would execute and needs to be run through a sanitizer that anticipates it being in a web page. Tags and attributes that can execute code, such as `<script>` and `onClick`, will be removed. Illegal characters will be removed.

Characters will also be escaped. Escaping takes one character a parser might recognize as code to execute and turns it into another. Sometimes, this is done with "escape characters". For example, `/s` might mean something, but once we add the escape character `/`, it becomes `//s` which means nothing.

![A black child very enthusiastically drawing captioned sanitize all the things](https://images.abbeyperini.com/security-series/sanitize.jpg)

### HTML and SVG

A webpage will execute code in HTML and SVG. Use [DomPurify](https://github.com/cure53/DOMPurify) on them.

### Markdown

Like HTML, code in markdown can be executed. You can use a [markdown sanitizer](https://www.npmjs.com/package/sanitize-markdown) or encode the markdown as HTML and use DOMPurify.

### JSON

Stringified JSON placed in an HTML document will execute code. The Open Web Application Security Project (OWASP) has a [JSON sanitizer](https://github.com/owasp/json-sanitizer).

### URL

Yes, you can send malicious code in a URL too. In JavaScript,  [`encodeURI()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) and [`encodeURIComponent()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) will escape characters. You'll have to manually check and filter the rest of it, but the [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL_API) can help.

For a more complete list of things to sanitize, check out [OWASP's XSS Filter Evasion Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/XSS_Filter_Evasion_Cheat_Sheet.html).

## XSS

If you take input from a user and then display it on a page, that is an attack vector for [Cross-Site Scripting](https://owasp.org/www-community/attacks/xss/) (XSS). An attacker will include code that will execute in a web page in their input. Your web page will execute that code when it tries to display it. I'll discuss more defenses against XSS in future blogs in this series, but for now know that validating, encoding, and sanitizing user input is one of those defenses.

## SQL Injection

Like XSS, but for the database, [SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection) is when an attacker includes [SQL](https://en.wikipedia.org/wiki/SQL) commands in data sent to the database and the SQL command is executed. This way, an attacker can access all your data and drop all your tables.

![A genie says 3 rules no wishing for death, no falling in love, no bringing back dead people. The person says I wish for `; DROP TABLE RULES --. The genie says there are 0 rules](https://images.abbeyperini.com/security-series/drop.png)

The best way to stop this kind of attack is to never use user input in a SQL command. If you absolutely have to, you can use parameterization and stored procedures. Check out [OWASP's guide](https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html) for tutorials.

## Command Injection

Like, SQL Injection, but for your computer, [Command Injection](https://owasp.org/www-community/attacks/Command_Injection) is when a malicious Operating System (OS) command is included in user input. Instead of being executed in your application, this code is executed by system commands on your computer.

Again, the best way to stop this kind of attack is to never use user input in an OS command in your server. If you absolutely have to for some reason, validate, encode, and sanitize.

## Client-Side Authorization

Since I touched on access control in listing and it kind of applies here, I wanted to briefly mention something I see a lot - client-side authorization.

As I harped on in [Secrets](/blog.html?blog=security-1), the user has access to everything in the browser. If you conditionally load components using state variables based on the user's role, it's pretty dang easy for a user to figure it out and change the value in DevTools. Same goes for using the router, e.g. just changing the URL. Once you start seeing patterns in URL parameters, it's trivial to start guessing at what other values might get you.

If you don't validate that the user is who they say they are on the back-end every time they try to access information, anyone can impersonate another user or role. These checks are  important if there's user input and doubly so if that user input is put into the database.

## Conclusion

Web Developers build a lot of forms, so learning how to protect yourself from malicious user input is key. Never ever ever trust any user input.
