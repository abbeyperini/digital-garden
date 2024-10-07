## Slots, Slots, Slots, Everybody!

![Lil Jon in a crown and chain holding a goblet captioned "slots slots slots slots slots slots slots slots slots slots slots slots everybody"](https://images.abbeyperini.com/slots/slots.jpg)

Slots turn components into wrappers that enhance your dynamic content.

1. [What Are Slots?](#what-are-slots)
2. [Slots in Web Components](#slots-in-web-components)
3. [Slots in Vue](#slots-in-vue)
4. [Slots in Angular](#slots-in-angular)

### What Are Slots?

In React, you can pass JSX to your component using the `children` prop. Manipulating, transforming, or getting information from the children prop in your component [is not recommended](https://react.dev/reference/react/Children).

```HTML
// parent component
<blog-list>
  <p>My text here</p>
</blog-list>
```

```JSX
function BlogList({children}) {
  return(
    <div>
      {children}
    </div>
  )
}
```

In HTML and other JavaScript frameworks, a `<slot>` element creates a placeholder that allows you to pass content to a component without using props at all.

You can easily make default content without any extra lines of code.

```HTML
// FancyCard component
<div class=“fancy” />
  <slot name="text"><p>Default text</p></slot>
</div>

// parent component
<FancyCard />

// default result
<div class=“fancy” />
  <p>Default text</p>
</div>
```

You can also pass entire elements.

```HTML
// FancyCard component
<div class=“fancy” />
  <slot name="text"><p>Default text</p></slot>
</div>

// parent component
<FancyCard>
  <ul slot="text">
    <li><p>Here’s my text</p></li>
    <li><p>Here’s my text</p></li>
  </ul>
</FancyCard>

// result
<div class=“fancy” />
  <ul>
    <li><p>Here’s my text</p></li>
    <li><p>Here’s my text</p></li>
  </ul>
</div>
```

Slots without a name are called default slots. If you don't add a slot attribute to the content you pass to your component, it will go in the default slot. Using both default and named slots, you can put some content in a specific place and dump the rest of it in another place.

```HTML
// FancyCard component
<div class=“fancy” />
  <slot name="text"><p>Default text</p></slot>
  <slot></slot>
</div>

// parent component
<FancyCard>
  <p slot="text">This is other text</p>
  <p>This is more text</p>
  <button>Click me!</button>
</FancyCard>

// result
<div class=“fancy” />
  <p>This is other text</p>
  <p>This is more text</p>
  <button>Click me!</button>
</div>
```

If the `<slot>` doesn't have any default content and you don't pass anything to it, nothing will mount.

```HTML
// FancyCard component
<div class=“fancy” />
  <slot name="text"><p>Default text</p></slot>
  <slot></slot>
</div>

// parent component A
<FancyCard />

// result A
<div class=“fancy” />
  <p>Default text</p>
</div>
```

### Slots in Web Components

HTML has the [Web Components spec](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) that essentially allows users to create components with HTML.

Creating a custom element that uses `<slots>` requires three parts. The first is an HTML template.

```HTML
<template id="preview">
  <style>
    @import "../styles.css";
  </style>
  <div class="blog-list-container">
    <h2><slot name="title">default title</slot></h2>
    <slot></slot>
  </div>
</template>
```

The second part is a JavaScript class creating a [custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements). Within the constructor of our custom element, we need to create a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) to hold our `<slot>`s. The shadow Dom API creates a scoped, encapsulated, separate [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) inside the DOM created by the rest of your HTML page. To create a shadow DOM and put our `<slot>`s in it, the constructor does three things:

- Access the content of the HTML template from part one with `getElementById` and the `.content` property and assign it to a variable.
- Instantiate a shadow root in open mode, so that the browser and rest of the page can access the content within.
- Clone the content of the HTML template and attach it to the shadow DOM as a child.

```JavaScript
class BlogPreview extends HTMLElement {
  constructor() {
    super();
    const templateContent = document.getElementById("preview").content;
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(templateContent.cloneNode(true));
  }
}

customElements.define('preview-component', Preview);
```

The third part of using `<slot>`s is calling the custom element in an HTML file.

```HTML
<preview-component><span slot="title">My Title</span><p>My Description</p></preview-component>
```

The result displays my `<span>` with my title text in an `<h2>`.

```HTML
<div class="blog-list-container">
  <h2><span>My Title</span></h2>
  <p>My Description</p>
</div>
```

When this custom element is inspected, DevTools will show the shadow root with `<slot>`s and the content you passed to the component..

```HTML
<preview-component>
  #shadow-root (open)
    <div class="blog-list-container">
      <h2><slot name="title">default</slot></h2>
      <slot></slot>
    </div>
  <span slot="title">My Title</span>
  <p>My Description</p>
</preview-component>
```

Both [Chrome DevTools](https://developer.chrome.com/blog/new-in-devtools-104#:~:text=Chromium%20issue%3A%201322808-,Reveal%20assigned%20slot%20of%20an%20element,-Slotted%20elements%20in) and [FireFox DevTools](https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/how_to/examine_and_edit_html/index.html#shadow-roots) have built in tools that will show you where `<slot>` content is coming from with a click.

If you want to learn more about how slots came to be, check out Jan Miksovsky's [A History of the Slot Element](https://jan.miksovsky.com/posts/2019/04-08-a-history-of-the-slot-element.html).

### Slots in Vue

Vue slots have a lot more features, but you can see how they're inspired by the Web Components spec.

#### Default Slots

If you're putting content in an default `<slot>`, you can just wrap it in your component.

```HTML
// blog-list component
<template>
  <div class="blog-list-container">
    <h2><slot>default</slot></h2>
  </div>
</template>

//parent component
<blog-list>
  <span>My Title</span>
</blog-list>

// result
<div class="blog-list-container">
  <h2><span>My Title</span></h2>
</div>
```

#### Named Slots

If you're using a named slot, you'll need a `<template>` with the slot name as an attribute, starting with `#`.

```HTML
// blog-list component
<template>
  <div class="blog-list-container">
    <h2><slot name="title">default</slot></h2>
  </div>
</template>

// parent component
<blog-list>
  <template #title>
    <span>My Title</span>
  </template>
</blog-list>

// result
<div class="blog-list-container">
  <h2><span>My Title</span></h2>
</div>
```

You can also use this syntax with default slots.

```HTML
// blog-list component
<template>
  <div class="blog-list-container">
    <h2><slot name="title">default</slot></h2>
    <slot></slot>
  </div>
</template>

// parent component
<blog-list>
  <template #title>
    <span>My Title</span>
  </template>
  <template #default>
    <p>Put me in, coach!</p>
  </template>
</blog-list>

// result
<div class="blog-list-container">
  <h2><span>My Title</span></h2>
  <p>Put me in, coach!</p>
</div>
```

#### Scoped Slots

Here's where it gets fun. You can pass data from the child component to the slot. You'll be able to access the data when you use the child component in the parent component.

```HTML
// counter component
<script setup>
  const count = ref(0);
  const counterMessage = count < 10 ? "Keep counting!" : "Great job!"
</script>
<template>
  <div class="counter-container">
    <slot :number="count" :message="counterMessage"></slot>
  </div>
</template>

// parent component
<counter v-slot="slotProps">
  <h2>My Counter</h2>
  <p>{{slotProps.number}}</p>
  <p>{{slotProps.message}}</p>
</counter>

// result
<div class="counter-container">
  <h2>My Counter</h2>
  <p>0</p>
  <p>Keep counting!</p>
</div>
```

You can use destructuring, so you don't have to use `slotProps.property`, just `property`.

```HTML
// parent component
<counter v-slot="{number, message}">
  <span>My Counter</span>
  <p>{{number}}</p>
  <p>{{message}}</p>
</counter>
```

This feature uses a slightly different syntax with named slots. Also, if you're mixing default and named slots while passing slot props, you will have to use `<template #default>`.

```HTML
// counter component
<template>
  <div class="counter-container">
    <h2><slot>default</slot></h2>
    <slot name="display" :number="count" :message="counterMessage"></slot>
  </div>
</template>

// parent component
<counter>
  <template #default>
    <span>My Counter</span>
  </template>
  <template #display="{number, message}">
    <p>{{number}}</p>
    <p>{{message}}</p>
  </template>
</counter>

// result
<div class="counter-container">
  <h2><span>My Counter</span></h2>
  <p>0</p>
  <p>Keep counting!</p>
</div>
```

If you've ever used [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to make a JSX list, you can see where Vue is going with this. You can create an extensible list component, and display it however you want.

```HTML
// list component
<script setup>
  defineProps({
    listItems: Array as PropType<String[]>
  })
</script>

<template>
  <ul>
    <li v-for="listItem in listItems" :key="listItem.id">
      <slot name="item" :item="listItem"></slot>
    </li>
  </ul>
</template>

// parent component
<script setup>
  const products = [
    {
      name: "Socks",
      description: "Luxury for your feet",
      count: 12,
    },
    {
      name: "Hat",
      description: "Wear it on your head",
      count: 8
    },
];
</script>
<template>
  <list-component :listItems="products">
    <template #item="{ item }">
      <div class="product">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <span class="count">{{ item.count }}</span>
      </div>
    </template>
  </list-component>
</template>

// result
<ul>
  <li>
    <div class="product">
      <h3>Socks</h3>
      <p>Luxury for your feet</p>
      <span class="count">12</span>
    </div>
  </li>
  <li>
    <div class="product">
      <h3>Hat</h3>
      <p>Wear it on your head</p>
      <span class="count">8</span>
    </div>
  </li>
</ul>
```

It's possible to take this concept even further and create [Higher-Order Components](https://www.freecodecamp.org/news/higher-order-components-in-react) or smart components that don't render elements and only contain logic. Vue calls them [Renderless Components](https://vuejs.org/guide/components/slots.html#renderless-components).

### Slots in Angular

Angular saw the Web Components spec and ran with it. You can play with the [shadow DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) within Angular as a [View Encapsulation Mode](https://angular.dev/api/core/ViewEncapsulation/).

There are also slots, but Angular calls the functionality [content projection](https://angular.dev/guide/components/content-projection). Instead of the `<slot>` element, you use the `<ng-content>` element.

When creating your component, you can create your template one of two ways.

In an HTML file:

```HTML
// blog-list.component.html
<h2>Title</h2>
<ng-content></ng-content>
<ng-content select="[blog-text]"></ng-content>
```

Or in the `@component` decorator:

```JavaScript
@Component({
  selector: 'blog-list'
  template: `
    <h2>Title</h2>
    <ng-content></ng-content>
    <ng-content select="[blog-text]"></ng-content>
  `
})
```

Then, in your parent component, you use the `<ng-content>` selector you just defined on the element you want to pass to it.

```HTML
// parent component
<blog-list>
  <p blog-text>My text here</p>
</blog-list>

// result
<h2>Title</h2>
<p>My text here</p>
```

Just like in the previous examples, the unnamed slot will take all the content you pass without using a defined selector.

You can also use a CSS class as a selector.

```HTML
// child component
<ng-content select=".blog-text"></ng-content>

// parent component
<blog-list>
  <p class="blog-text" >My text here</p>
</blog-list>
```

You can also use a string as a selector and use the `ngProjectAs` attribute.

```HTML
// child component
<ng-content select="blog-text"></ng-content>

// parent component
<blog-list>
  <p ngProjectAs="blog-text" >My text here</p>
</blog-list>
```

You can even configure your ng-module to all for tags as selectors like `<blog-text>`.

Angular also provides [conditional content projection](https://angular.dev/guide/templates/ng-template) using `<ng-template>`.

### Conclusion

Having worked in React (and AngularJS 2013) in the past, it took me some time to start thinking with `<slot>`s, not props when writing Vue components. Creating some `<slot>`s manually with the Web Components spec and inspecting them with Chrome DevTools helped a lot!
