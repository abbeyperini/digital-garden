# Tabbing Tactfully

Planted: 08/08/2022
Tags: accessibility
Series: [tabbing](/series.html?series=tabbing)

![blue, pink, navy, and white keys with dessert icons and a clay Luna the cat key on a white mistel keyboard](https://images.abbeyperini.com/tabbing/keyboard.jpg)

Try your hand at [HOCUS :FOCUS](https://focus.hteumeuleu.com/) or spend today tabbing instead of your typical mouse navigation. Frustrating? Let's talk about tabbing on the web.

1. [How to Tab](#how-to-tab)
2. [tabindex](#tabindex)
3. [DOM Order](#dom-order)
4. [Keyboard Controls](#keyboard-controls)
5. [Event Listeners and KeyboardEvent](#event-listeners-and-keyboardevent)
6. [Special Mention: Labels and Inputs](#special-mention-labels-and-inputs)

## How to Tab

A user should be able to [visibly](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0#focus-visible) [focus and operate](https://www.w3.org/WAI/WCAG21/quickref/#keyboard-no-exception) every interactive element on your page with their keyboard.

The tab order, the order interactive elements are focused when using the tab key, should make sense. Tabbing between elements should happen in a [logical, intuitive order](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0#focus-order) that [aligns with the content of the page](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0#meaningful-sequence).

Logical order for a website in English means left to right and top to bottom because that's the way it's going to be read.

If you were trying to fill out a form or read an article on the page, tabbing around should follow the same order you would when accessing the content with a mouse. This includes things like preventing [keyboard traps and loops](https://www.w3.org/WAI/WCAG21/quickref/#no-keyboard-trap), providing [skip links](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-skip.html) to make it easy to reach the main navigation and content on a page, and being able to interact with buttons and things like you would with a mouse.

Visibility comes back into play here, because if you can't tell where you are on a page, you start to feel like Homer Simpson trying to guess the right button.

![Homer Simpson with his hand over his eyes, pressing buttons. The van he's in has a nuclear symbol on the side and begins to jump around and turn green. 4 scientists run away in fear.](https://images.abbeyperini.com/tabbing/homer-simpson.gif)

## tabindex

The HTML `tabindex` attribute (`tabIndex` in React) takes numerical values.

- `tabindex="0"` puts elements into the tab order.

- `tabindex="-1"` takes elements out of the tab order.

- `tabindex="1"` or any other positive integer changes the tab order. This is TABoo!!! Never use it.

If you need to change the tab order, you really need to change the order the elements appear in the DOM.

## DOM Order

Your HTML [acts as a document](/blog.html?blog=HTML#:~:text=form%20controls%20later.-,Check%20your%20Outline,-Sectioning%20and%20heading). That document is interpreted by the browser and exposed to screen readers and keyboards as the [accessibility tree](https://web.dev/the-accessibility-tree/). Screen readers and keyboards are going to follow that tree, so your document outline needs to make sense, and tab order will follow.

Tabbing is going to focus elements in the order they appear in the DOM/accessibility tree, not the order in which they're positioned.

```HTML
<div className="button-container">
  <button id=1>1</button>
  <button id=2>2</button>
  <button id=3>3</button>
</div>
```

```CSS
.button-container {
  display: flex;
  flex-direction: row-reverse;
}
```

With this code, these buttons will appear on the page in a row starting with button 3 and ending with button 1, but using the tab key will focus button 1 then 2 then 3.

This also means the reverse is true.

```HTML
<div className="button-container">
  <button id=close>Close</button>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
  <button>Click me!</button>
</div>
```

```CSS
.button-container {
  display: flex;
  flex-direction: row-reverse;
}
```

My close button would appear on the right side of the container after the list and "Click me!" button, but it would still be the first thing focused by tab. This way, you could position the close button at the top right of a container and it will look nice and still be focused first.

To inspect the accessibility tree, you can use the [Chrome DevTools full accessibility tree](https://developer.chrome.com/blog/full-accessibility-tree/) or the Firefox DevTools Accessibility Inspector, which has a fancy [tab order view](https://firefox-source-docs.mozilla.org/devtools-user/accessibility_inspector/#show-web-page-tabbing-order).

## Keyboard Controls

These articles are focused on tabbing, but some other keyboard controls quickly come into play when you start tabbing around. For instance, links should open when you press enter and buttons should activate when you press enter or space. Meanwhile, you can focus a group of radio buttons with tab, but use the arrow keys to move between them. Take a look at [WebAIM's list of keyboard controls](https://webaim.org/techniques/keyboard/#testing) when testing your site to make sure your interactive elements have the behavior a keyboard user would expect.

## Event Listeners and KeyboardEvent

When you interact with an element using a keyboard, screen reader, or mouse, this registers an [HTML DOM Event](https://www.w3schools.com/jsref/dom_obj_event.asp). That event object contains information on the user input. When a keyboard is used, it creates a KeyboardEvent object that contains a string representing the key, whether the alt key or option key was pressed too, and other information for the key used. Checkout the [JavaScript KeyCode Event Tool and List](https://www.toptal.com/developers/keycode) for a demonstration and information associated with a key press.

We can capture all this information using event listeners. HTML exposes these events with attributes in the element and you can attach JavaScript event listeners by querying the DOM.

Inline HTML:

```HTML
<button onclick="doThings()">Click me to do things!</button>
```

JavaScript:

```JavaScript
<button id="doThings">Click me to do things!</button>

document.getElementById('doThings').addEventListener("click", doThingsFunction)
```

Since JavaScript frameworks like React add complexity, their event listener and object syntax often works differently. In React, events like `onclick` are in camel case like `onClick`. While HTML has deprecated properties like `keyCode` and `keyChar` in favor of the `key` property which returns a string, React 17 added support for a `code` property on its events.

To access event object properties, all we have to do is pass the event object to our event handler.

Inline HTML:

```HTML
<button onclick="doThings(event)">Click me to do things!</button>
```

JavaScript:

```JavaScript
<button id="doThings">Click me to do things!</button>

function doThingsFunction(event) {
  console.log(event.key)
}

document.getElementById('doThings').addEventListener("click", doThingsFunction)
```

React JSX:

```JSX
<button onClick={(event) => doThings(event)}>Click me to do things!</button>
```

## Special Mention: Labels and Inputs

Always be associating labels with your inputs.

```HTML
<label for="name">Name:</label>
<input id="name" type="text">
```

Focusing the `<label>` is the same as focusing its associated `<input>`. This makes focusing, clicking, and interacting with them easier, and [can be used creatively](/blog.html?blog=audit-3). It can also make troubleshooting focus a little trickier!

Speaking of, the next article will discuss troubleshooting when tabbing goes topsy-turvy.
