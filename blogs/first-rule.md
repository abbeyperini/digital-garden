## What the First Rule of ARIA Really Means

![Stills from the movie Fight Club captioned "The first rule of ARIA is don't use ARIA"](https://images.abbeyperini.com/first-rule/first-rule.jpg)

I am not an accessibility auditor, but I am frequently asked to give feedback on websites. When that happens, the first thing I do is check basic accessibility things. Multiple times, I have suggested an [`aria-label`](#label-labelledby-or-describedby), and heard "I thought I was never supposed to use ARIA."

ARIA, the [Accessible Rich Internet Applications Suite](https://www.w3.org/WAI/standards-guidelines/aria/), is a huge topic and full of hard concepts. A lot of times, accessibility concepts are hard because the "right answer" is more grey than black. What may make something more accessible for one group of people may make things worse for another group. ARIA is hard because you need to learn those grey accessibility concepts, HTML in-depth, how to test the desired user experience with assistive technology, and ARIA.

Learning it becomes even more intimidating when you hear ["the first rule of ARIA is don't use ARIA"](https://blog.pope.tech/2022/07/12/what-you-need-to-know-about-aria-and-how-to-fix-common-mistakes/#number-one-rule). This common adage doesn't mean ARIA will literally never make your webpage more accessible. It means two things - there's probably an HTML element for that and no ARIA is better than bad ARIA.

- [ARIA Roles Are Semantics](#aria-roles-are-semantics)
- [There's Probably an HTML Element for That](#theres-probably-an-html-element-for-that)
- [No ARIA Is Better Than Bad ARIA](#no-aria-is-better-than-bad-aria)
- [When to Use ARIA](#when-to-use-aria)
  - [Landmark Roles](#landmark-roles)
  - [Label, Labelledby, or Describedby?](#label-labelledby-or-describedby)
  - [Icons and Images That Convey Information](#icons-and-images-that-convey-information)
  - [Icon and Images That Don't Convey Information](#icons-and-images-that-dont-convey-information)
  - [When HTML Elements Aren't Enough](#when-html-elements-arent-enough)
  - [Announcing Additions to the Page](#announcing-additions-to-the-page)
  - [Grouping Interactive Elements Outside of a Form](#grouping-interactive-elements-outside-of-a-form)
- [Learning Resources](#learning-resources)
- [Conclusion](#conclusion)

### ARIA Roles Are Semantics

Semantic HTML elements have semantic ARIA roles. The `<button>` element will expose the role `button` to the [accessibility tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree). Elements with the role `button` will be announced by a screen reader.

A generic HTML element, like a `<span>` or `<div>`, has the ARIA role `generic`. This role is not semantic. When exposed to the accessibility tree, it communicates "this is a nameless container element with no meaning." Unless it is focusable, an element's semantic role can be removed using `role="presentation"` or `role="none"`. Screen readers will not announce generic elements.

![Homer Simpson standing on beer barrels, surrounded by a crowd, and giving the toast "To ARIA! The cause of and solution to all of our accessibility problems!"](https://images.abbeyperini.com/first-rule/aria-toast.jpg)

So even an ARIA role that has no meaning is communicating something. Think of elements with the roles `generic`, `presentation`, and `none` as metadata on a text document. The person reading the document doesn't need to know about the metadata for the text content of the document to make sense. In the same way, a screen reader user doesn't need to know that three elements are grouped together visually by a meaningless `<div>`.

The role of an element can even affect what information is communicated by the elements associated with it. The `<footer>` element has a role of `contentinfo`. If the browser sees an `<address>` element as a child of an element with the `contentinfo` role, it will be exposed to the accessibility tree as the contact address for the owner of the site.

### There's Probably an HTML Element for That

If you're adding an `onclick` handler to a generic element, a semantic element probably exists with all the functionality you want to build (and a lot more you haven't thought about). If you aren't very familiar with how the HTML element works, replacing it with an ARIA role will rob you of functionality you didn't even know you needed.

```HTML
<button>Save</button>
<div role="button">Save<div/>
```

These things are true for the semantic `<button>` element:

- It is focusable.
- A focus outline will show when it is focused.
- It will activate on click, space, and enter.
- When activated and inside a form element, it will trigger a submit event (if it has no type attribute or `type="submit"`).

This is true for both the semantic `<button>` element and the generic element with a `button` role:

- The role `button` will be exposed to the accessibility tree.
- A [name](https://sarahmhigley.com/writing/whats-in-a-name/) for the element ("Save") will be exposed to the accessibility tree.
- A screen reader will announce "Button Save".

What you'd have to add to the generic element to make them equal:

- JavaScript handling click, space, and enter events
- `tabIndex="0"` to make it focusable.
- If it's in a form element, JavaScript creating all the functionality you'd get from a submit event.
- Focus outline styling

If you just use `<div role="button">`, a screen reader will announce the element as a button, but the user will get none of the functionality that comes with a `<button>` element.

### No ARIA Is Better Than Bad ARIA

Until you learn how to use ARIA correctly, [using it will likely make things worse](https://webaim.org/projects/million/#aria). ARIA attributes come with requirements. If you don't know those requirements, you'll start cluttering up your code with useless attributes and creating invalid elements that cause headaches for users.

![A full-stack developer pouring a huge bottle of oil onto a salad. The oil is labelled "ARIA" and the salad is labelled "accessible website" with "accessible" in sarcastic quotes](https://images.abbeyperini.com/first-rule/aria-salad.png)

Many roles require specific attributes and children elements be used with them. Returning to the button example - [the spec requires](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role#required_javascript_features:~:text=Required%20event%20handlers) that you write `onclick` and `onkeydown` handlers when you use `role="button"`. We should use `<input type="checkbox">`. But if we used `role="checkbox"`, we'd also have to use [`aria-labelledby`](#label-labelledby-or-describedby) and [`aria-checked`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-checked). Then we'd have to build all the functionality the `<input>` element already has and keep the value of `aria-checked` up to date.

Some roles' requirements prohibit you from using certain attributes and elements as children. You can't use any element as a child of the `<ul>` element - it has to be a `<li>`, `<script>` or `<template>` element. [Interactive content](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#interactive_content) can't be a child of the `<button>` element. The values you can pass to `aria-checked` depend on the element on which it's used. You can't use `aria-checked` on a button, and you can't use [`aria-pressed`](https://w3c.github.io/aria/#aria-pressed) on a checkbox.

If you've been learning semantic HTML, some of this should sound familiar. A lot of the rules you learn about how to use HTML elements are ARIA under the hood.

### When to Use ARIA

#### Landmark Roles

If you only learn one part of ARIA, it should be the special subset of roles called [landmark roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/landmark_role). Assistive technologies expect these roles in a page and generate a page summary based on them. Screen readers provide users with multiple ways to navigate a page - like a list of landmarks.

![the typical website layout - header element role="banner" at the top, main element role="main" in the middle, and footer element role="contentinfo" at the bottom](https://images.abbeyperini.com/first-rule/landmarks.png)

The typical website layout uses `<header>`, `<main>`, and `<footer>` because they have the landmark roles `banner`, `main`, and `contentinfo`. These three roles can't be duplicated - you can only have one per page. Additionally, you have to keep them separate - a `<header>` element loses the role `banner` if it is a child of an element with another landmark role, like `<main>`.

The `<nav>` element has the landmark role `navigation`. If you provide a `<form>` with a [name](https://sarahmhigley.com/writing/whats-in-a-name/), it gains the `form` landmark role. Some landmark roles, like `navigation` and `form`, can be used multiple times per page. But if you use more than one, screen readers users need to know how they are different. Don't make them read every link in your navigation menu to find out. Use [`aria-labelledby` or `aria-label`](#label-labelledby-or-describedby) to provide them with unique names. The same concept applies to other elements with landmark roles like `<section>` and `<aside>`.

If you use HTML elements with landmark roles appropriately, a screen reader user can use the list of landmarks like a [skip link](https://webaim.org/techniques/skipnav/). With very little effort, you save them from the tedium of navigating through the same header content every time they navigate to one of your pages. Using the list of landmark roles, they'll be able to jump right to your named forms without having to skim the entire page. Once they're done filling out your form, they can jump right back to the navigation menu the same way.

#### Label, Labelledby, or Describedby?

![Oprah saying "You get an aria-label! You get an aria-label! You get an aria-label too! Everybody gets an aria-label!"](https://images.abbeyperini.com/first-rule/aria-label.png)

The attributes [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label) and [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby) are used to give an element a name that can be read by a screen reader. They can't be used on [some elements](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label#associated_roles), including those with role `presentation` or `none`. You can't provide a name for an element that has a role that by definition doesn't have a name. Read Sarah Higley's [What's in a name?](https://sarahmhigley.com/writing/whats-in-a-name/) for a full explanation of element names.

Elements that need a name typically generate that name themselves from associated text content. So every time you reach for ARIA to add a name to an element, ask yourself why you aren't using text inside the element or an associated `<label>` element.

If you can't use either of those, but there is text already on the page, use `aria-labelledby`. You just pass it an [ID Reference List](https://w3c.github.io/aria/#valuetype_idref_list) (one or more IDs separated by a comma). Any ID in the ID Reference List should correspond to the `id` attribute of an element containing the text you want to use.

```HTML
<h3 id="color-heading">Favorite Color</h3>
<input type="text" aria-labelledby="color-heading" />
```

As a last resort, you can pass a name as a string to `aria-label`.

```HTML
<button aria-label="expand menu"><svg>Right Chevron Icon Code</svg></button>
```

You also pass an ID Reference List to [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby), but it doesn't provide the element with a name. Instead, it provides a description. A name should be concise - a few words. A description can be multiple sentences. This attribute is a way to link pertinent text information from another element. Use `aria-describedby` in situations where helpful text is near the element. If you find yourself putting an icon next to an interactive control and expecting a user to know to hover or click to learn more, that's the perfect time to use `aria-describedby`.

```HTML
<button type="button" aria-describedby="warning">Self Destruct</button>
<p id="warning">Only click this button if you don't want an account anymore.</p><svg aria-hidden="true">Warning Icon Code</svg>
```

In the (extremely rare) situation that you need to pass a description as a string instead of an ID, you'd use `aria-description`.

Let's say you have so much information about the element that the user would have to interact with another element or elements to get the information (e.g. clicking a link, expanding a `<details>` element, or reading text in multiple `<p>` elements).

```HTML
<button aria-details="explanation">Self Destruct</button>
<a href="/self-destruct-explanation" id="explanation">Learn more about self destruct</a>
```

By passing the ID of the `<a>` element to the `aria-details` attribute, we associate the `<a>` element with the button. In other words, screen reader users won't get text, they'll be pointed towards the link itself. Assistive technologies will even use the role of the elements referenced in the ID Reference List to provide more information to the user.

#### Icons and Images That Convey Information

If you're using icons to convey information, you need to give screen reader users access to that information. For example, an icon that tells users that the link opens in a new tab. If the icon is a static image, you can use the [alt](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt) attribute. If it's an SVG and you can't edit or dynamically update the SVG code, that *could* be an appropriate time to use `role="img"` to give it a role, so that you can use `aria-label` to give it a unique [name](https://sarahmhigley.com/writing/whats-in-a-name/).

```HTML
<!--Link with "external link" icon-->
<a>Check out the GitHub Repo<svg role="img" aria-label="opens external link">External Link Icon Code</svg></a>
```

There are [many solutions for this problem](https://www.smashingmagazine.com/2021/05/accessible-svg-patterns-comparison/). This is a good a place as any to note - robust testing inclusive of people with disabilities is the only way to determine that your website has an accessible user experience.

It's always better to have a visible label for interactive controls. Still, we often see buttons and links with an image or SVG icon and no text. Those elements [generate a name](https://sarahmhigley.com/writing/whats-in-a-name/#:~:text=How%20do%20you%20name%20an%20element%3F) based on text content and ARIA attributes - not images. You can use `aria-label` to give them a unique name.

```HTML
<button aria-label="expand menu"><svg aria-hidden="true">Right Chevron Icon Code</svg></button>
```

Links must always have content, so the `aria-label` has to go on the image.

```HTML
<a href="https://github.com/repo" target="_blank" rel="noreferrer"><svg role="img" aria-label="open Github repository in a new tab">GitHub logo code</svg></a>
```

#### Icons and Images That Don't Convey Information

On the flip side, a screen reader user probably doesn't need to hear about every icon on your page. If a static image doesn't communicate information, use `alt=""`. If it's an SVG, you can use `aria-hidden="true"`.

```HTML
<!--"Add +" button-->
<button>Add<svg aria-hidden="true">+ Icon Code</svg></button>
```

#### When HTML Elements Aren't Enough

If you are building an interactive element for which no HTML exists, then you want to use ARIA. This is rarer than people think. It's one of the main reasons why the first rule of ARIA is don't use ARIA. "The `<select>` element looks ugly" doesn't fall into this category. Developers are constantly reinventing the wheel when it comes to interactive elements.

Still, it does happen. I have had to build a [tree view](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) with [NodeIterator and Treewalker](https://dev.to/abbeyperini/nodeiterator-and-treewalker-web-apis-278p), and [tablists](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tablist_role) are pretty common. If you're building a component functionality triggered by user actions, use ARIA to tell screen reader users about the actions available to them.

The simplest, most common example is a checkbox that checks or unchecks all the checkboxes below it.

```HTML
<fieldset>
  <legend>Dogs</legend>
<label><input type="checkbox" aria-controls="dog1,dog2,dog3,dog4" aria-checked="mixed">Select All</label>
  <ul class="checkboxes">
    <li>
      <label><input type="checkbox" id="dog1">Shiba Inu</label>
    </li>
    <li>
      <label><input type="checkbox" id="dog2" checked="">Corgi</label>
    </li>
    <li>
      <label><input type="checkbox" id="dog3">Husky</label>
    </li>
    <li>
      <label><input type="checkbox" id="dog4">Mutt</label>
    </li>
  </ul>
</fieldset>
```

How do you communicate to a screen reader user that the "select all" checkbox controls the other checkboxes? You pass an ID Reference List to [`aria-controls`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-controls).

How do you communicate to a screen reader user that only some of the checkboxes controlled by the "select all" checkbox are checked? [`aria-checked="mixed"`](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/).

#### Announcing Additions to the Page

How does a blind user know when new text has been added to the page or they get a notification or when you show an error banner? You'll need to use live regions created with `aria-live`

To learn more, read [Sara Soueidan's extensive guide to ARIA live regions](https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-2/?utm_campaign=coschedule&utm_source=twitter&utm_medium=EqualizeDigital) and my [quick primer on using them in React](https://dev.to/abbeyperini/live-regions-in-react-4dmd).

#### Grouping Interactive Elements Outside of a Form

Within a `<form>` element, a [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset) element gives you useful functionality. Paired with a `<legend>` element, you automatically format your form data and get a semantic name.

```HTML
<!--Will have a border-->
<fieldset>
  <legend>Themes</legend>
  <input type="radio">Light</button>
  <input type="radio">Dark</button>
  <input type="radio">Rainbow</button>
</fieldset>
```

Outside of a `<form>` element, you don't need that functionality and often have to override the styling that comes with a `<fieldset>` and `<legend>`. Instead, you can use the role [`group`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/group_role).

```HTML
<!--Won't have a border-->
<div role="group" aria-labelledby="styling">
  <div id="styling">Text Styling</div>
  <button type="button">Bold</button>
  <button type="button">Italics</button>
  <button type="button">Remove Formatting</button>
</fieldset>
```

You'll have to remember to use `aria-labelledby` or `aria-label`, but you won't have to override the styling. This can be helpful if you have to build interactive components like [toolbars](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role), [menus](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menu_role) and [menubars](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menubar_role).

### Learning Resources

This is by no means an exhaustive lesson in ARIA. If you'd like to learn more, here are a few places to start:

- [WAI-ARIA Overview](https://www.w3.org/WAI/standards-guidelines/aria/)
- [Making Sense of WAI-ARIA](https://www.smashingmagazine.com/2022/09/wai-aria-guide/)
- [WAI-ARIA Basics](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics)
- [Africa Kenyah's Intro to ARIA](https://www.youtube.com/watch?app=desktop&si=X6EvD4L8iBTDS63j&v=kbwe7ab7-tg&feature=youtu.be&ab_channel=AfricaKenyah)

### Conclusion

I hope this helps some people get over their fear of ARIA. Accessibility advocates say "The first rule of ARIA is don't use ARIA" because they constantly have to fix the giant mess caused by developers using ARIA attributes that they don't understand.
