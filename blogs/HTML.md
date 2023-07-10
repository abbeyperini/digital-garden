## Semantic HTML: What, Why, and How

![screenshot of codepen with a basic HTML page and { Your content here }](https://images.abbeyperini.com/HTML/your-content.png)

TL;DR - Watch the [lightning talk version!](https://youtu.be/qYPq9Fd-SE4)

Watch my [Front-end Foxes Day 2022 talk](https://cfe.dev/sessions/fefd2022-semantic-html/) or read the transcript!

### What

1. Use HTML elements for their intended purpose.
2. Separate content and presentation.

### Why

It's easier to read and naturally leads to more consistent code. Consistent HTML code is easier to style.

It will help your SEO.

HTML will literally do your work for you, including making your page much more accessible. At its core, a webpage is a document you want anyone to be able to read. Use HTML to create that document. Javascript and CSS are add-ons.

### How

Ask yourself if there’s a tag with more meaning you can use when you reach for a `<div>` or `<span>`.

Google if HTML does it before building it.

### Root Structure of a Page

`<!DOCTYPE html>` and `<html lang=“en”>` tell the machines that this is an HTML document written in English. The `<head>` element contains your metadata. `<meta lang="en" charset="utf-8">` is important. It tells the browser how to decode and encode your characters for machines and humans. Finally, the `<body>` tag wraps the content of your page.

[See the Root Structure CodePen](https://codepen.io/abbeyperini/pen/PoEqRPq)

### SEO

Before we move on to the content in `<body>`, let's talk about the elements that go in `<head>`. First, don't forget your `<title>`! Keep it descriptive and under 60 characters. Include the brand if you've got one.

Use `<link rel="icon" type="image/x-icon" href="/images/favicon.ico">` to set your favicon - the little logo in the browser tab.

`<meta>` tag types:

- description: Keep it under 160 characters, descriptive, with short keywords or let search engines write it for you.
- keywords: If you want to suggest keywords you don't think a search engine will pull, do.
- [open graph](https://ahrefs.com/blog/open-graph-meta-tags/): Control how your content is displayed on social media sites like Facebook and LinkedIn.
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started): Control how your site looks in Twitter Cards.
- [robots](https://www.woorank.com/en/edu/seo-guides/meta-robots-tag-seo): Tell search engine crawlers what to do with your site's information.

Always add your viewport meta tag - it tells search engines you've got a responsive site and prevents devices from resizing your viewport.

```HTML
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Finally, use a `<script>` tag to add [schema markup](https://www.link-assistant.com/news/structured-data-for-seo.html) to control how your site is displayed in search engines.

### Sectioning Content

Getting started:

1. Put your top of the page things like your logo, main navigation, and a heading in `<header>`.
2. Any navigation menu goes in `<nav>`.
3. All that good content unique to the page goes in `<main>`. The main point of your page, if you will.
4. Bottom of the page things like copyright, authorship, contact, and maybe some more navigation (like a link back to the top) go in `<footer>`.
5. Use `<p>` for your text.
6. Use `<ul>` or `<ol>` containing `<li>`s for your lists.

Remember - separate content and presentation. `<nav>` is for site navigation, not lists of links. `<header>` and `<footer>` are branding and navigational content you'd have at the top and bottom of every page on your site.

#### `<article>` vs `<section>` vs `<aside>`

Use `<article>` and `<section>` to group content within `<main>`.

Content in `<article>` should still make sense if it was dropped by itself in a completely different page.

`<section>` groups together content along the same theme. It can even go inside `<article>`.

The stuff that isn’t the main content goes in `<aside>`. It's complementary, but not vital. Nest this element inside the element that contains the content to which it’s related. It can be inside `<main>` as long as it is within another sectioning element like `<article>`. Content wrapped in `<aside>` can be in a sidebar, but "sidebar" is a presentational concept.

![unenchanted Melisandre from game of thrones captioned HTML and enchanted Melisandre from game of thrones captioned HTML + CSS](https://images.abbeyperini.com/HTML/html-meme.jpeg)

#### Headings

We're talking about `<h1>` through `<h6>`. They must be in your page in ascending order starting with `<h1>` without skipping levels. There's rarely any reason to go below `<h3>`.

Using consistent, query-like headings only helps your SEO.

You must have ONE and ONLY ONE `<h1>` per page.

- MYTH: `<section>` restarts heading order.
- TRUTH: Browsers did not implement that feature listed in the HTML5 spec.

#### Tables

Gone are the days of using tables to layout content - that's presentation. Use the `<table>` element to structure tabular data.

A basic 2 column 2 row table:

[See the Tables CodePen](https://codepen.io/abbeyperini/pen/rNpVdLv)

Enhance your tables with `<col>`, `<colgroup>`, `<tbody>`, `<thead>`, `<tfoot>`, and `<scope>`.

#### Forms

Wrap your form in `<form>`. Use `<fieldset>` to group form options together and `<legend>` to label them. You can use `<li>`, `<ul>`, `<ol>`, `<p>`, `<section>`, and headings within the `<form>` element.

More on form controls later.

### Check your Outline

Sectioning and heading elements work together to create a document outline for your page. Once you think you’ve got your page set up, try to navigate it with a screen reader. Check it with an [HTML validator](https://validator.w3.org/).

If you find there are gaps in your document outline, you can add [ARIA landmark roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role) using the `role=“”` attribute in your container elements.

This is manually adding what semantic HTML does for you. A screen reader would read “navigation” to a user for both `<div role=“navigation">` and `<nav>`.

Landmark roles like `<main>`, `<header>`, and `<footer>` should only appear once on a page.

### Enrich Your Content with HTML

`<em>` will produce italicized text. It also tells a screen reader to tell the user that the text has been emphasized.

`<strong>` will produce bolded text. It also tells a screen reader to tell the user that the text has added importance.

Use CSS instead of `<b>` and `<i>`.

If the image content is necessary for understanding the content around it, use `<figure>` and `<figcaption>`.

If not, use `<img>` and don’t forget your alt text!

`<blockquote>` creates a block quote (like `display: block;`).

`<q>` creates a inline quote.

`<blockquote>` and `<q>` will tell a screen reader to tell a user it’s a quote.

Use `<cite>` to cite your sources.

If you wanted to use a quote, say who said the quote, and cite your source, it would look like:

[See the Quote CodePen](https://codepen.io/abbeyperini/pen/zYpGWNJ)

#### Give the Machines More Information

- `<date>` and `<time>` - be nice to the computer and tell it that this is a date or time
- `<abbr>` - always define your abbreviations!
- `<dd>`, `<dl>`, `<dt>` - define other stuff
- `<pre>` - preformatted text
- `<code>` - it’s code!
- `<var>` - it’s a variable!
- `<data>` - machine-readable data
- `<address>` - contact info for the parent element.

Inside `<footer>`, `<address>` is identified as the contact info for the web page owner!

### Let HTML Do Your Work for You

#### Form Controls

`<textarea>` allows the user to submit freeform text. It has a lot of attributes you can use, including enabling spellcheck!

`<select>` creates a drop down for you and using the `multiple` attribute allows users to select multiple options.

`<option>`creates an option for `<select>`. When multiple `<option>`s are wrapped in `<datalist>`, they create suggestions for autocomplete.

`<progress>` and `<meter>` create progress and meter bars for you!

Using `<form>`'s `action` and `method` attributes activates built-in HTTP messaging. `<button>` or `<button type=“submit”>` inside `<form>` will automatically create a submit/send button for your HTTP messaging. `<button type="reset">` inside `<form>` automatically creates a button that will reset all the `<forms>`'s controls.

#### `<input type="">`

Yeah, built-in HTTP messaging is cool, but if you've got users submitting data, you're probably using `<input>`. `<input type="image">` creates an image that acts like a button. Why build your own pickers or file uploader when you have `<input type="color">`, `<input type="datetime-local">`, and `<input type="file">`? Types like email and password have built-in validation options. This CodePen demonstrates all the different types of `<input>`:

[See the Input CodePen](https://codepen.io/abbeyperini/pen/mdpJxXV)

#### `<label>`

Associating a `<label>` with an `<input>` is not only accessible, but also provides programmatic advantages in your code and in HTTP messages. For example, clicking a `<label>` is the same as clicking its associated `<input>`.

Don’t associate a `<label>` with a `<button>` or `<input>` with type=button, reset, or submit. Never put a heading in your `<label>`.

### `<button>` vs `<a>`

Literally never build your own button. Just use `<button>`.

A screen reader treats buttons and links very differently. They have different built-in properties, behaviors, and states. Buttons made with `<a>` (which again, you should never do) will be grouped with other links.

Buttons are for performing an action (unless that action is navigating to another page). Buttons and inputs are in tab order and can be triggered with space and enter for keyboard users. The `<button>` element automatically provides hover and focus states.

Anchor tags (`<a>`) are for links and [provide useful SEO](https://www.semrush.com/blog/what-is-anchor-text-and-how-can-i-optimize-it/). Anchor tags are not in tab order and are only triggered on enter.

#### Special mention: `<button>` vs `<input type="button">`

A `<button>` can have content and is easier to style. A `<button>` inside a `<form>` without a type specified will automatically become a `<button type="submit">`. `<input type="button">` has no default behavior making it less semantic and accessible. It does make it behave more consistently across browsers. This was particularly important when trying to support IE6/IE7. `<input type="submit">` and `<input type="reset">` do have the default behavior of submitting a form or resetting all the form controls when inside a `<form>`, but nothing else.

### Other Elements That Do a Ton of Work

`<details>` and `<summary>` work together to create a toggle. `<audio>` and `<video>` have built-in players with controls.

[See the Hard Working Components CodePen](https://codepen.io/abbeyperini/pen/bGadvZo)

`<picture>` wraps multiple `<img>` or `<source>` elements and chooses the best one based on display/device scenarios. `<iframe>` can be used to trap remote code or user input in a separate context from your page for security reasons.

### Conclusion

Learning and using semantic HTML gives you a ton of functionality without lifting a finger. It also allows you to bake accessibility and SEO in with very little effort. Not to mention it leads to cleaner code and cleaner code is easier to style. There are around 100 semantic HTML elements - don't build what HTML hands to you on a silver platter.
