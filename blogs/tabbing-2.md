# Troubleshooting Tabbing

Planted: 08/22/2022
Tags: accessibility
Series: [tabbing](/series.html?series=tabbing)

![sage, light green, pink, and white keys with swords, snakes, leaves, and moons and a clay Luna the cat key on a white mistel keyboard](https://images.abbeyperini.com/tabbing/keyboard-2.jpg)

I've been tackling tabbing trouble a lot recently, so I thought I'd share some debugging tips.

1. [Adding tabindex=0](#adding-tabindex0)
2. [Keyboard Trap/Loop](#keyboard-traploop)
3. [Scrolling](#scrolling)
4. [Roving tabindex](#roving-tabindex)
5. [Skip Links](#skip-links)
6. [Can't Focus an Element](#cant-focus-an-element)
7. [The Default Focus Indicator is So Ugly](#the-default-focus-indicator-is-so-ugly)

## Adding tabindex=0

There are some elements that are automatically focusable, like links and buttons. Others, like `<div>`s will not be focusable. You can make elements like a `<div>` focusable using `tabindex="0"`, but that means you also have to program that element to be properly interactive and exposed to the accessibility tree.

For example, an element acting like a button should be activated with space and enter. You'll have to add event listeners for key presses. Its role and states will have to be managed with ARIA so that a screen reader knows how to interact with it. When needing an interactive element, it's easier to use semantic HTML elements with these things already built in for you.

## Keyboard Trap/Loop

![Admiral Akbar from Star Wars saying "It's a trap!"](https://images.abbeyperini.com/tabbing/trap.png)

A keyboard trap is when a keyboard user can use the tab key to focus inside an element and then can't focus outside the element no matter how many times they press tab.

A keyboard loop is when the keyboard user is stuck tabbing through a lot of elements and it takes a really long time to get to get out of the list.

If a person is trying to buy something on your site, but can never reach the cart because they're stuck in or looping through a list of items, the item they want quickly starts to seem less appealing.

Often, the order of the elements in the DOM is what's creating a keyboard trap or loop, so fixing it is as simple as [re-ordering the DOM](/blog.html?blog=tabbing-1#dom-order).

You may also run into this with scrollable elements.

## Scrolling

Scrollable elements must be focusable, and applying `tabindex="0"` to a container does not apply it to its children. So if you have a `<div>` full of elements you want a user to be able to interact with, you will have to create a way for a keyboard user to focus the element and the elements inside it to scroll.

This is one of many examples of accessibility issues that can be prevented in the design stage. When you reach for a `<div>` with `overflow: scroll;` and a list of elements inside, ask yourself if there's a more robust design you could use. Could you use cards, a tabbed interface, or collapsible sections? If it's a small list, could you switch to an element that has keyboard navigation built in, like a radio button or select?

Here are some examples of accessible design patterns you can reference:

- [Inclusive Components](https://inclusive-components.design/)
- [WAI patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [a11y style guide](https://a11y-style-guide.com/style-guide/)
- [Carnegie Museums](http://web-accessibility.carnegiemuseums.org/)
- [ebay](https://opensource.ebay.com/mindpatterns/index.html)
- [atlassian](https://atlassian.design/components)
- [Deque University](https://dequeuniversity.com/library/)

## Roving tabindex

![Yoda from Star Wars captioned "Focus you must"](https://images.abbeyperini.com/tabbing/focus-meme.jpg)

Also called roving focus, this can be a solution for managing tabbing in scrollable elements and could help fix a keyboard trap.

With roving tabindex, the currently focused element has `tabindex="0"` and the surrounding elements have `tabindex="-1"` so they can't be focused. Using event listeners, when a user presses an arrow key, the next element to focus is set to `tabindex="0"` and focused using `focus()`. The element the user was just focusing is set to `tabindex="-1"`. Once the user reaches the end of the grouped elements, you focus and set `tabindex="0"` on the first. This way, the user can scroll through elements using the arrow keys and exit the component using tab.

You can check out [W3C's example code](https://www.w3.org/WAI/ARIA/apg/example-index/radio/radio).

Since this method depends solely on JavaScript, it will not work if JavaScript is turned off. Furthermore, you'll have to thoroughly check the component works with screen readers and in every browser.

## Skip Links

Skip links allow a keyboard user to bypass large or repetitive blocks of content instead of having to use the tab key many times. You can have multiple skip links, but the focus should still be reducing the number of times a user has to use the tab key. The typical use is before the main navigation, allowing users to skip all the navigation links that are repeated on every page.

Skip links work using fragment identifiers, or an id that starts with #. You can use an anchor tag to link to an element id.

```HTML
<a href="#heading-1">Skip to main content</a>
<h1 id="heading-1">Main Content</h1>
```

You can also use fragment identifiers to link to an anchor tag with a name attribute.

```HTML
<a href="#main-content">Skip to main content</a>
<h1><a name="main-content">Main Content</a></h1>
```

Skip links have to be visible while they're focused, but can be hidden while they're not. There are many ways to hide an element, and plenty of accessibility concerns to go with them.

`display: none;` and `visibility: hidden;` will remove elements from the accessibility tree. The `hidden` attribute is essentially `display: none;`.

`width: 0px;`, `height: 0px;`, `font-size: 0px`, and `line-height: 0;` will either remove elements from the accessibility tree by removing them from the flow of the page or be interpreted as malicious by search engines.

There are two recommended ways to hide skip links. Positioning the element off the page is one.

```CSS
.skip-link {
  position: absolute;
  left: -999px;
  width: 1px;
  height: 1px;
  top: auto;
}

.skip-link:focus {
  display: inline-block;
  height: auto;
  width: auto;
  position: static;
  margin: auto;
}
```

The second uses CSS `clip` to hide everything outside a 1 pixel rectangle. For this, the element has to be positioned using `absolute` or `fixed`.

```CSS
.skip-link {
  position: absolute;
  top: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
}

.skip-link:focus {
  clip: unset;
  clip-path: unset;
  height: auto;
  width: auto;
}
```

The only caveat for these two solutions is that the sudden appearance and disappearance of the component may confuse users. It is suggested to animate the element so that it moves on and off the screen more slowly.

## Can't Focus an Element

To start, I have an important caveat: tab focus and moving through a page with a screen reader are different things. Tabbing is for focusing interactive elements, so being unable to focus a `<p>` is intended behavior. Screen reader users use the commands associated with the screen reader, usually with a combination like Ctrl + Opt + arrow keys.

If an interactive element can't be focused using tab, here are few things to check.

### Check where the element is positioned

This is to verify that the element is not positioned offscreen or behind another element. It will also show you if the element is not actually on the page at all.

Open the [DevTools Elements view](https://developer.chrome.com/docs/devtools/dom/) and select the element you want to focus in the DOM tree. When you select, hover over, or focus the node, a flag will appear on the page close to the element with some more information.

![A button selected in the DOM tree in the DevTools Elements view and a flag showing where the element is on the page and its size](https://images.abbeyperini.com/tabbing/things.png)

### Check that the element is focusable

Use the accessibility inspector in Chrome or Firefox DevTools. Either will tell you whether the accessibility tree considers them focusable.

![A button selected in the DOM tree in Chrome DevTools Accessibility tree. The computed properties section shows focusable: true](https://images.abbeyperini.com/tabbing/button.png)

### Is it CSS or JavaScript?

In DevTools, [you can apply pseudostates](https://developer.chrome.com/docs/devtools/css/#pseudostates) like `:hover` and `:focus` to elements manually, to see what CSS applies when you do. This can help you catch rules not applying. They'll either not show up or the tool will tell you that you have an invalid value. If it is CSS, you'll find some handy tips in the next blog in this series.

You can also [track focus with Live Expressions](https://developer.chrome.com/docs/devtools/accessibility/focus/) and see the JavaScript values that result from a change in focus.

## The Default Focus Indicator is So Ugly

I know. I know. People still use ugly headlights on cars, though. Showing when your interactive element is focused or active makes using your page easier for everyone. Plus, it takes very little effort to doll it up like you would an F1 helmet.

On that topic, in the next article I'll take you through styling your focus outlines for some terrific looking tabbing.
