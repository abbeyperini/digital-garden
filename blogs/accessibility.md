# Accessibility and React

![a black keyboard with keys backlit with rainbow lights on a desk with a pastel space deskmat and black mouse](https://images.abbeyperini.com/accessibility/keyboard.png)

If you’ve ever read anything about HTML on Mozilla Developer Network, you’ve probably come across the phrase “semantic HTML.”

> “Semantic HTML is the correct use of HTML to reinforce the meaning of content on a web page, rather than merely define its appearance.” — [Springboard SEO](http://www.springboardseo.com/resources/what-is/semantic-html.html)

Meaning that appearance should be left to CSS (instead of using presentational HTML elements like `<b>`). Any developer’s goal should be to make their webpage accessible to as many users as possible, including those that rely on [screen readers](https://webaim.org/techniques/screenreader/) or keyboard navigation. Not to mention, a lot of these practices will bolster your SEO.

Semantic HTML has a lot of [built in features](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML) to take some of the accessibility work off of the developer. For instance, a `<button>` is automatically keyboard accessible! Some of the HTML that should always be included in a page is pretty straightforward — a title for your page, alt text for images that convey information, and make sure to include your headings and labels. All menus, forms, and inputs should be set up for keyboard navigation. Most importantly, a page should be sectioned using HTML sectioning elements or appropriate [ARIA Landmarks](https://www.w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html) (e.g. a `<div>` or a `<span>` should be your last resort).

This is all fairly easy to adhere to when you’re creating static pages or multiple [mustache-express views](https://www.npmjs.com/package/mustache-express), but what happens when you hit single page apps like [React](https://reactjs.org/)?

In React, multiple elements can be rendered at the same time as long as they’re all children of one parent element. As a result, the common method is to throw all of them in `<div>` within `<div>` within `<div>`.

There are a few common sense steps to take right off the bat:

* Read the React [accessibility documentation](https://reactjs.org/docs/accessibility.html).
* Remember that the for attribute is htmlFor in JSX.
* Use `<section>`, `<article>`, `<label>`, headings, and [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) liberally.
* Use buttons to handle onClick events.
* Use links for navigation.
* Always test your page with a screen reader and keyboard navigation to see if you need to switch around tags to make navigation and focus possible.

In addition, really get to know the handy tools React has to help you: [Fragments](https://reactjs.org/docs/fragments.html) and [Refs](https://reactjs.org/docs/refs-and-the-dom.html). Fragments can help you declutter your containers, while still inserting components wherever you need to. Refs can be used to manage focus for keyboard and mobile navigation (and insert a page title after rendering — titles are always read by screen readers).

Finally, [audit your React app](https://web.dev/accessibility-auditing-react/) with [react-axe](https://github.com/dequelabs/react-axe) and [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y).

If tackling accessibility still seems like a huge hurdle, checkout Nozi Nindie’s [POUR principles](https://medium.com/the-school-of-do/making-accessibility-accessible-the-pour-principles-f5ad21eda12f)!
