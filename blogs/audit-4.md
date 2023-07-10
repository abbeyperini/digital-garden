## Accessibility Auditing My Portfolio Site - Part 4

![screenshot of the blog component on Abbey's portfolio site](https://images.abbeyperini.com/audit-series/blog.png)

Read [Part 1 - The Audit](/blog.html?blog=audit-1), [Part 2 - Quick Fixes](/blog.html?blog=audit-2), and [Part 3 - Dark Mode Toggle](/blog.html?blog=audit-3).

This blog will focus on making the [blog preview component code](https://github.com/abbeyperini/Portfolio2.0/blob/master/portfolio/src/components/Blog.js) on the main page of my site more accessible.

### The Problems

First, I want to update the blog preview component to always return a `<section>` and `<h1>`. Currently, the error or loading text is returned with just a [Shiba Inu SVG](/blog.html?blog=shibas). Also, I need revisit the CSS so this component is uniform with the rest of the site.

Next, the individual blog previews within the component aren't focusable when you're using a keyboard. Once I've made the previews focusable, keyboard and screen reader users need to be able to scroll horizontally... without getting trapped.

Finally, when I was manually testing, I noticed that it wasn't obvious to a screen reader that you can interact with each blog preview heading. Luckily, the answer to this may also be the answer to making the previews focusable.

### Uniformity, but with Meaning

This is the easiest to do, and requires my [lambdas](/blog.html?blog=serverless) to be off, so I'm starting here. I import Error and Loading components into my blog preview component, so I'll need to add the `<section>` and `<h1>` within them. To maintain functionality, I also had to pass down my `chooseComponent` function in `props`.

For example, my Error component now looks like this:

```JavaScript
function Error(props) {

  const chooseComponent = (component) => {
    props.chooseComponent(component);
  }

  return (
    <section className="container_blog">
      <h1 aria-label="button to open full blog page" ><button className="blog-section_title" onClick={() => chooseComponent("FullBlog")}>Blog</button></h1>
      <div className="container_error">
        <ConfusedShiba className="error-graphic"/>
        <p>There was an error! Try again later.</p>
      </div>
    </section>
  )
}

export default Error
```

Now for [the CSS](https://github.com/abbeyperini/Portfolio2.0/blob/master/portfolio/src/styles/App.css)! Getting the font size of the "Blog" button/heading the same as the other sections only required changing the value of the `font-size` property in my `.blog-section_title` rule to `1.5em`.

Next, I want the spacing between the headings and content containers to be more uniform. Plus I want the Error and Loading components to always be the same width as the rest of the sections. I revisited all of my media queries, adjusting `margin` and `width` properties.

Finally, I set up my local lambda server so I can verify that the spacing of the blog preview component still looks correct. The width is a little off, so I go through all my media queries again and find a couple spots where the heading spacing needed to be tweaked too.

### Totally Tabbular

The first thing I want to try is putting my preview headings in a `<button>` instead of just in an `<h2>` with an `onClick` handler. I suspect this will also make it more obvious to a screen reader that they are interactive.

Adding the `<button>` does make it focusable, but I end up removing the `<h2>` entirely. Now, the screen reader I'm testing with clearly states the title of the blog, that you're on a button, the item number, and how many items there are in the list when you focus on a blog title. The structure of the individual blog previews now looks like this:

```JavaScript
return (
  <li key={blog.id} className="preview">
    <button className="preview_button" onClick={() => chooseComponent({id: blog.id})}>{blog.title}</button>
    <img className="preview_image" alt={altText} src={blogImage}></img>
  </li>
)
```

Honestly, I have no idea why I didn't just use a `<button>` in the first place. I mean, the CSS class is called `preview_button`, for heaven's sake. I would like to say I was focused on heading hierarchy, but I wrapped the "Blog" `<button>` in an `<h1>` in [Part 2](/blog.html?blog=audit-2) of this blog series. However, my `preview_button` rule applies perfectly, including the focus/hover outline:

![screenshot of abbeyperini.dev in light mode with one of the blog preview title buttons focused](https://images.abbeyperini.com/audit-series/light-blog-tab.png)

### Horizontal Scrolling

Now that the items are focusable, and you can tell when using a screen reader that you can interact with them, I need to manually test the horizontal scrolling.

The first thing I notice is that it is much easier to avoid having to scroll through the entire list of blog previews on a screen reader. The second is that I need to set `alt-text=""` on all of the cover images, so the screen reader will skip over them. Hearing both the heading text and cover image alt-text becomes very repetitive. Plus, one could say the cover images are decorative. This will also solve a warning I got about one of the cover images having alt-text longer than 150 characters.

Next I add `aria-label="previews of Abbey's blog posts"` to the `<ul>` that holds all of my blog preview `<li>`s:

```JavaScript
return (
  <section aria-label="Blog Previews" className="container_blog">
    <h1 aria-label="button to open full blog page" ><button className="blog-section_title" onClick={() => chooseComponent("FullBlog")}>Blog</button></h1>
    <div className="scroll-cropper">
        <ul aria-label="previews of Abbey's blog posts" className="blog-preview">
          {blogPreviewList}
        </ul>
    </div>
  </section>
)
```

Now instead of just "list," the screen reader I am using says "list preview of Abbey's blog posts." At this point, keyboard navigation is working fine, if a bit lengthy, and navigating this component with a screen reader makes much more sense.

### It's Not a Trap&#33;

Turns out, I had no idea what a [keyboard trap](https://www.nomensa.com/blog/what-are-keyboard-traps) was! As long as the user can escape the component using just the keyboard or screen reader and not a mouse, it's ok! Very glad this component passes the test. I'll be doing some more research on [skip links](https://webaim.org/techniques/skipnav/) for the next blog post. I may add one in here as this 19 item list is only growing with every blog post I write. Up until this point, I haven't been adding any because a user would only have to tab through the navigation bar to hit the main content. Plus, the navigation bar buttons load single sections, allowing a user to skip directly to what they want to read.

### Conclusion

That's an audit, some quick fixes, and 2 problematic components down - one massive blog styling revamp to go! I am quite relieved this component was so easily fixed.

[Read Part 5 - Blog Page Accessibility Deep Dive](/blog.html?blog=5)
In which I find a security vulnerability, write a surprising number of regexes, and this series becomes a thesis.

[Read Part 6 - The Finale](/blog.html?blog=6)
