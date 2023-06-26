# Live Regions in React

Planted: 06/26/2023
Tags: accessibility, react

![A lush green forest in the background, a green brown pond in the middle ground, a green lawn in the foreground and a water bird at the edge of the pond](https://images.abbeyperini.com/live-regions/cover.jpg)

1. [What is a Live Region?](#what-is-a-live-region)
2. [Live Regions, Browsers, and Screen Readers](#live-regions-browsers-and-screen-readers)
3. [The Code](#the-code)

## What is a Live Region?

[Accessible Rich Internet Applications (ARIA)](https://www.w3.org/TR/wai-aria-1.2) is a set of roles and attributes you can add to HTML elements to give more information to the accessibility tree. Assistive technologies like a screen reader use the accessibility tree to give necessary information about your web page to users. To learn more about ARIA in general, check out [WAI-ARIA Overview](https://www.w3.org/WAI/standards-guidelines/aria/), [Making Sense of WAI-ARIA](https://www.smashingmagazine.com/2022/09/wai-aria-guide/), and [WAI-ARIA Basics](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics).

[Live regions](https://www.w3.org/TR/wai-aria-1.2/#dfn-live-region) announce content as it is added to the page after load. You don't want the screen reader user to be inundated in announcements. You do want to update them when new content is added to the page like in chat logs, news feeds, and other things that update periodically. These updates may or may not be the result of a user action.

![Scumbag Steve meme captioned uses aria-live on body element](https://images.abbeyperini.com/live-regions/scumbag.jpg)

Adding `aria-live` to an element creates a live region. Other ARIA roles and attributes add a live region implicitly. For example, `role=status`, `role=alert`, or `aria-modal=true` will turn an element into a live region. This makes sense. A status update, alert, or modal is something you'd want announced to a screen reader user as soon as it's put on the page.

`aria-live` has 3 possible values. `aria-live=polite` will announce the live region updates the next time the screen reader is idle. `aria-live=assertive` will announce the updates immediately and thus should be used sparingly. `aria-live=off` is the default and a way to turn off the implicit live region set by an element's role.

If you add `aria-atomic=true`, the entire content of the live region will be announced, even if only a portion of it was updated. This is necessary when the update needs context. For example, "8" doesn't help a screen reader user out, but "8 Notifications" does.

## Live Regions, Browsers, and Screen Readers

Often, the difficult thing about web development is that different browsers implement the same thing in different ways. Multiple screen readers compound this problem. For example, [VoiceOver (VO)](https://support.apple.com/guide/voiceover/welcome/mac) will announce a disabled button is "dimmed" and [NVDA](https://www.nvaccess.org/download/) will announce "unavailable".

a11ysupport.io has a breakdown of [how live regions act differently](https://a11ysupport.io/tech/aria/aria-live_attribute) with different screen reader and browser combinations, and there are some quirks. [JAWS](https://www.freedomscientific.com/products/software/jaws/) won't interrupt other announcements with assertive live region content and VO on MacOS will interrupt other announcements with polite live region content.

In my own testing, I found the content in a live region would be announced when it was added to the DOM in React in VO/Chrome and VO/Safari, but not NVDA/Chrome.

## The Code

Normally, you see live region examples in HTML and JavaScript.

```HTML
<button onchange="addOne()">add 1</button>
<div aria-atomic="true" aria-live="polite">
  <p id="count">9</p>
</div>
```

```JavaScript
function addOne(event) {
  const count = parseInt(document.getElementById("count"));
  const newCount = count += 1
  countString.innerHTML = newCount.toString();
  }
}
```

So when I ran into weird issues building React live regions and found [complex solutions for them](https://almerosteyn.com/2017/09/aria-live-regions-in-react), I assumed it was a React problem. In reality, I didn't understand how live regions are designed.

> Live regions announce content as it is added to the page after load.

If I add

```HTML
<div aria-live="polite">
  <p>Announce me</p>
</div>
```

to a page, it should not be announced. On the other hand, if I add

```HTML
<div aria-live="polite">
  <p></p>
</div>
```

and then update to

```HTML
<div aria-live="polite">
  <p>Announce me</p>
</div>
```

the screen reader should announce "Announce me".

When using `aria-live`, there is one simple rule to follow for reliable live region updates in VO/Safari, VO/Chrome, and NVDA/Chrome. Don't unmount the container with the `aria-live` attribute. Always leave it in the DOM.

This JSX will produce reliable screen reader announcements.

```JSX
<div aria-live="polite">
  <p>{liveRegionContent}</p>
</div>
```

This code will not work in NVDA/Chrome. You can get it to work with VO, with a lot of effort and state updates.

```JSX
{showRegion && (
  <div>
    <div aria-live="polite">
      {liveRegionContent !== "" ? <p>{liveRegionContent}</p> : null}
    </div>
  </div>
)}
```

This JSX will announce the whole string even though only part of it is being updated. Without `aria-atomic`, only the variable will be announced.

```JSX
<div aria-live="polite" aria-atomic={true}>
  <p>The count is {liveRegionContent}</p>
</div>
```

If you need to unmount the visible text, you can hide your live region with an offscreen class, and it'll still announce.

```CSS
.offscreen {
   position: relative;
   height: 1px;
   width: 1px;
   overflow: hidden;
   clip: rect(1px, 1px, 1px, 1px);
   margin-top: -1px;
 }
```

I also find this useful when I need to reformat the text based on the way the screen reader announces it. For example, given "1-100" VO only announces "one one hundred," so I pass "1 through 100" to my hidden live region and "one through one hundred" is announced.

## Conclusion

Once again, really understanding HTML helps solve issues when building in a JavaScript framework. I hope this clears up live regions if you've run into issues. If you find this doesn't work in a browser/screen reader combination I haven't tried, leave a comment!
