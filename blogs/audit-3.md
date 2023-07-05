## An Accessible Dark Mode Toggle in React

Knowledge Level: Evergreen

Planted: 11/06/2021

Last Tended: 11/28/2021

Topics: [accessibility audit](/topic.html?topic=audit), [accessibility](/topic.html?topic=accessibility), [web development](/topic.html?topic=webDevelopment), [dark mode toggle](/topic.html?topic=darkModeToggle), [CSS](/topic.html?topic=CSS)

Series: [toggle](/series.html?series=toggle), [accessibility audit](/series.html?series=audit)

![screenshot of the top portion of Abbey's portfolio site with toggle focused](https://images.abbeyperini.com/audit-series/dark-focus.png)

Accessibility Auditing My Portfolio Site - Part 3

Read [Part 1 - The Audit](/blog.html?blog=audit-1) and [Part 2 - Quick Fixes](/blog.html?blog=audit-2).

[When I made my dark mode toggle](/blog.html?blog=toggle) using @dailydevtips1's [tutorial](https://h.daily-dev-tips.com/creating-day-night-css-only-toggle-switch), I focused on making color themes with sufficient contrast across my site. I chose colors unlikely to cause issues for users with colorblindness. I did not consider making sure both keyboard and [screen reader](https://www.boia.org/blog/5-myths-about-screen-readers-that-can-hurt-accessibility) users could use it.

As a result, I got several errors about it during my accessibility audit. I need to make it focusable and add descriptive text. Furthermore, because the visible part of the toggle is a `<label>` tied to a `<input type="checkbox">` hidden with a `display: none;` CSS rule, I need to find a way to put content in the `<label>` that adds accessibility and doesn't take away function. Plus, I got an error about the `for` attribute in my `<label>` not having a valid matching `id` attribute in an `<input>`.

### Let's Focus

My [portfolio Github repository](https://github.com/abbeyperini/Portfolio2.0) has all the [toggle component code](https://github.com/abbeyperini/Portfolio2.0/blob/master/portfolio/src/components/Toggle.js) and the [toggle CSS](https://github.com/abbeyperini/Portfolio2.0/blob/master/portfolio/src/styles/toggle.css). The structure of the toggle looks like this:

```JavaScript
<div className="container--toggle">
    {
        togClass === "light" ? 
            <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} checked />
        :
            <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} />
     }
     <label htmlFor="toggle" className="toggle--label">
          <span className="toggle--label-background"></span>
     </label>
</div>
```

After a bit of [reading](https://fuzzbomb.github.io/accessibility-demos/visually-hidden-focus-test.html), I change the CSS hiding the checkbox from `display: none;` to `opacity: 0;` so that it is focusable.

After a lot of trial and error, I discovered that while you can technically focus a `<label>`, it passes its focus to its `<input>`. Then, I was under the impression the checkbox was not being focused. There was no focus outline. and I was hitting Enter and nothing was happening. Eventually, I realized I hadn't programmed something to happen on Enter! I added a `handleKeypress` function like this:

```JavaScript
const handleKeypress = e => {
  if (e.key === "Enter") {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-light');
      setTogClass('light')
    } else {
      setTheme('theme-dark');
      setTogClass('dark')
    }
  }
}
```

I originally used `e.keyCode === 13`, but nothing was happening. Once I logged the event object in the console, I discovered the `keyCode` property was returning as 0 when I hit Enter. No idea why.

Now that my toggle will do something on Enter, I have two options:

1. add `onKeyPress={handleKeypress}` and `tabIndex="0"` to the `<div>` container, which has a inherited default focus outline
2. add `onKeyPress={handleKeypress}` to the `<input type="checkbox">` and try and get a focus outline working around the `<label>`

I didn't like option #1 because the toggle component is not centered within the `<div>` container, and I remember it taking a while to position the container and toggle to look centered within the `<nav>`.

It took a fair bit of trail and error, but I managed to get #2 working. I tried setting the CSS property `outline` to values like `inherit`, but I couldn't get the default blue focus outline showing. Luckily, when designing my `<nav>` section, I made sure the button borders that activate on focus and hover had sufficient contrast in both dark and light mode. As a result, I knew I could use that CSS color variable for this outline. I made the toggle outline slightly thicker than the button borders so that it is easier to see.

```CSS
.toggle--checkbox:focus + .toggle--label {
    outline: solid 3px var(--button-border);
}
```

![the dark mode toggle being focused and activated in dark mode and light mode](https://images.abbeyperini.com/audit-series/toggleA.gif)

### Labels Within Labels

The first thing I notice is despite the errors, I do have a `htmlFor` and `id` attributes. I'll have to retest now that the label is not set to `display: none;`.

Right off the bat, I added "dark mode toggle" to my `<label>` right after the `<span>`. It fit nicely within my label, so I messed around for a bit trying to find the best way to make the text invisible. I found out the CSS `color` property does not take `hsla()` as a valid value - so I can't make it transparent that way. Eventually, I thought "why not just set the color to the same CSS variable as the background?" and voila! ...or so I thought.

![the moon side of the toggle with one of the three stars looking like a rectangle/line instead of a circle](https://images.abbeyperini.com/audit-series/dark-toggle.png)

The text was hidden, but I noticed one star looked like a rectangle or line instead of a circle. I started moving the text around - putting it before the `<span>` and in the `<span>`, which started breaking the CSS in a variety of comical ways. Turns out I had accidentally gone with the least breaking option first.

I put the text back after the `<span>` and found all I had to do was adjust the value for the `width` property in my `.toggle--label-background` rule from 4px to 6px.

![moon side of the toggle with the third star looking round once again](https://images.abbeyperini.com/audit-series/dark-toggle-dots.png)

Finally, I got to work on how a screen reader interacts with the toggle. Ultimately, I want to convey that the component is a dark mode toggle and for the screen reader to notify the user when dark mode is enabled or disabled. I started with a long `aria-label`, but the screen reader didn't read the text again after the checkbox state was changed. I started looking into `aria-checked` and found `role="switch"`. Now the screen reader I'm using clearly says "dark mode toggle" when you focus it, "on" when dark mode is enabled, and "off" when light mode is enabled. Because of the way my CSS worked out, this is actually the opposite of whether the checkbox is checked. Whoops.

```JavaScript
<div className="container--toggle">
  {
    togClass === "light" ?
      <input aria-label="dark mode toggle" role="switch" aria-checked="false" onKeyPress={handleKeypress} type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} checked />
    :
      <input aria-label="dark mode toggle" role="switch" aria-checked="true" onKeyPress={handleKeypress} type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} />
  }
  <label htmlFor="toggle" className="toggle--label">
    <span className="toggle--label-background"></span>
    dark mode toggle
  </label>
</div>
```

### You Can't Control Me&#33;

When writing this component, I returned an `<input type="checkbox" checked>` or `<input type="checkbox">` using a  conditional operator based on the theme the user has in their browser's localStorage so that the sun will always show with light mode and the moon will always show with dark mode. I could not get the `defaultChecked` attribute to do what I wanted and React will not compile a single [controlled component](https://reactjs.org/docs/forms.html#controlled-components) with conditional logic returning the `checked` attribute or nothing within the component. Since building this, when the toggle is clicked, I've started getting a warning about how I must "decide between using a controlled or uncontrolled input element for the lifetime of the component."

More research revealed that the `defaultChecked` attribute ignores state changes. The game changer was a stackOverflow response showing that you can set the `checked` attribute to true or false. Doing this resulted in another error:

"Warning: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`."

Since `onChange` is for recording user input, I added `readOnly` and now all the controlled component errors are fixed. Next, I refactored my `handleKeypress` and `handleOnClick` logic to call `changeThemeAndToggle` instead of repeating logic.

Finally, because of the way I wrote the CSS and refactored, I have to add an `ariaActive` variable so the screen reader says "on" when dark mode is on and "off" when dark mode is off. Now the component looks like this:

```JavaScript
import React, { useEffect, useState } from 'react';
import '../styles/toggle.css';
import { setTheme } from '../utils/themes';

function Toggle() {
    // false = dark mode because of the way I wrote the CSS
    const [active, setActive] = useState(false)
    // the opposite, for screen readers
    const [ariaActive, setAriaActive] = useState(true)
    let theme = localStorage.getItem('theme')

    const changeThemeAndToggle = () => {
      if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light')
        setActive(true)
        setAriaActive(false)
      } else {
        setTheme('theme-dark')
        setActive(false)
        setAriaActive(true)
      }
    }

    const handleOnClick = () => {
      changeThemeAndToggle()
    }

    const handleKeypress = e => {
      changeThemeAndToggle()
    }

    useEffect(() => {
      if (localStorage.getItem('theme') === 'theme-dark') {
        setActive(false)
        setAriaActive(true)
      } else if (localStorage.getItem('theme') === 'theme-light') {
        setActive(true)
        setAriaActive(false)
      }
    }, [theme])

    return (
      <div className="container--toggle">
        <input aria-label="dark mode toggle" role="switch" aria-checked={ariaActive} onKeyPress={handleKeypress} type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} checked={active} readOnly />
        <label htmlFor="toggle" className="toggle--label">
          <span className="toggle--label-background"></span>
          dark mode toggle
        </label>
      </div>
    )
}

export default Toggle;
```

### Testing

I've been manually testing with keyboard and screen reader, but it's time I fired back up [IBM Equal Access Accessibility Checker](https://chrome.google.com/webstore/detail/ibm-equal-access-accessib/lkcagbfjnkomcinoddgooolagloogehp?hl=en-US).

I really should have retested when I finished the last blog. Immediately, I found out I have two more instances of using "above" and "below" in text that wouldn't make sense without visuals. I already removed one in [Accessibility Auditing My Portfolio Site - Part 2](/blog.html?blog=audit-2) and now I've removed those.

The [ARC Toolkit](https://chrome.google.com/webstore/detail/arc-toolkit/chdkkkccnlfncngelccgbgfmjebmkmce) tells me my [shiba SVGs](/blog.html?blog=shibas) need `focusable="false"`, so I've added that to both of their code. They wouldn't have been visible long enough to get the errors when I was testing on my live site, so good thing I was testing in local with my lambda functions off. Technically, these and my arrow SVG in my landing page button don't need alt-text because they're decorative, but I'm proud of them. Hopefully screen reader users won't mind hearing about some extra flavor I've added to my portfolio site.

I'm also seeing several errors about the way I've used `aria-label` and `aria-labelledby`. After even more reading about landmark roles and aria attributes, I've changed all of my content section `<div>`s to `<sections>` which solves the aria errors and the "multiple `<h1>`" warnings in one fell swoop. I now have a couple new things to fix about the blog preview component heading in the next blog in this series.

My `required` attributes in my contact form are also causing errors. I ended up adding `aria-required="true"` and `autoComplete="on"` to the form fields and the ARC Toolkit is now satisfied.

I only get two warnings about the toggle. One is a contrast warning for hiding the text by making it the same color as the background - that makes sense. The sun and moon visuals convey the text meaning, so I'm not concerned. The other says that because I have labelled the component in multiple ways, I need to check how a screen reader interacts with it, which I have done.

### Update Based on Feedback

I looked into @inhuofficial's report that the toggle was flashing when you hit Space. Turns out I had accidentally taken out the conditional in `handleKeypress()` when I refactored. When there was no conditional, Enter would still trigger the toggle - I speculate because of the HTML. Hitting Space would cause it to flash to the other side and revert back to the original state. I have updated the function to look like this:

```JavaScript
const handleKeypress = e => {
  if (e.code === "Enter") {
    changeThemeAndToggle()
  }
}
```

When I initially changed it, I logged the event object to the console again to verify the code for Space. At that point, I noticed Enter and Space both triggered the toggle perfectly fine. I updated the conditional to `if (e.code === "Enter" || "Space")` and Enter worked but Space flashed again! This code is now live on my site and both Enter and Space are working.

### Conclusion

Shout out to @overtureweb, who commented on my original dark mode toggle blog with the `checked={active}` fix - my apologies for not understanding at the time I responded.

I had a lot of fun with this one. The focus and star fixes were very satisfying, and I'm pleased to have the whole toggle in a much less hacky state.

Read [Accessibility Auditing My Portfolio Site - Part 4](/blog.html?blog=audit-4), where I fix a few things about my blog preview component on the main page.

[Read Part 5 - Blog Page Accessibility Deep Dive](/blog.html?blog=audit-5)
In which I find a security vulnerability, write a surprising number of regexes, and this series becomes a thesis.

[Read Part 6 - The Finale](/blog.html?blog=audit-6)

I fix color contrast issues with the dark mode toggle and speed up its focus outline animation in this one as well.

Stay tuned for Part 6, final testing and thoughts.
