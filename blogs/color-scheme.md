# Dark Mode Toggle and prefers-color-scheme

Planted: 04/21/2023

![screenshot of abbey's portfolio site menu with dark mode toggle in it](https://images.abbeyperini.com/color-scheme/cover.png)

When I wrote [An Accessible Dark Mode Toggle in React](/blog.html?blog=audit-3) back in 2021, @grahamthedev suggested I implement a [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) check in my theme setter. I finally got around to it.

1. [What is `prefers-color-scheme`?](#what-is-prefers-color-scheme)
2. [Emulating User Preference for Testing](#emulating-user-preference-for-testing)
3. [Detecting `prefers-color-scheme` with JavaScript](#detecting-prefers-color-scheme-with-javascript)
4. [Solution for My Toggle](#solution-for-my-toggle)
5. [Refactoring](#refactoring)

## What is `prefers-color-scheme`?

`prefers-color-scheme` is a [media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_features). Media features give information about a user's device or user agent. A [user agent](https://developer.mozilla.org/en-US/docs/Glossary/User_agent) is a program representing a user, in this case, a web browser or operating system (OS).

You're probably most familiar with media features used in media queries, like in responsive CSS.

```CSS
@media (max-width: 800px) {
  .container {
    width: 60px;
  }
}
```

[The default for `prefers-color-scheme` is "light".](https://www.w3.org/TR/mediaqueries-5/#prefers-color-scheme:~:text=However%2C%20user%20agents%20converged%20on%20expressing%20the%20%22default%22%20behavior%20as%20a%20light%20preference%2C%20and%20never%20matching%20no%2Dpreference.) If the user explicitly chooses a dark mode setting on their device or in their browser, `prefers-color-scheme` is set to "dark". You can use this in a media query to update your styling accordingly.

```CSS
@media (prefers-color-scheme: dark) {
  .theme {
    color: #FFFFFF,
    background-color: #000000
  }
}
```

## Emulating User Preference for Testing

In Chrome DevTools, you can emulate `prefers-color-scheme` and other media features in the [rendering tab](https://developer.chrome.com/docs/devtools/rendering/).

![screenshot of chrome DevTools and abbeyperini.dev in light mode](https://images.abbeyperini.com/color-scheme/emulate.png)

If you prefer Firefox DevTools, [it has `prefers-color-scheme` buttons](https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/how_to/examine_and_edit_css/index.html#view-media-rules-for-prefers-color-scheme) right in the CSS inspector.

## Detecting `prefers-color-scheme` with JavaScript

Unfortunately, I am not changing my theme in CSS. I'm using a combination of [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and swapping out class names on a component. Luckily, as always, the Web APIs are here for us.

[`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) will return a `MediaQueryList` object with a boolean property, `matches`. This will work with any of your typical media queries, and looks like this for `prefers-color-scheme`.

```JavaScript
window.matchMedia('(prefers-color-scheme: dark)');
```

## Solution for My Toggle

You can check out all the code for this app in my [portfolio repo](https://github.com/abbeyperini/Portfolio2.0).

First, I need to check if the user has been to my site and a `localStorage` "theme" item has already been set. Next, I want to check if the user's preference isn't dark mode via `prefers-color-scheme`. Then I want to default to setting the theme to dark mode. I also need to make sure that the toggle can update the theme after the user's initial preference is set.

My themes utility file ends up looking like this:

```JavaScript
function setTheme(themeName, setClassName) {
    localStorage.setItem('theme', themeName);
    setClassName(themeName);
}

function keepTheme(setClassName) {
  const theme = localStorage.getItem('theme');
  if (theme) {
    setTheme(theme, setClassName);
    return;
  }

  const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)');
  if (prefersLightTheme.matches) {
    setTheme('theme-light', setClassName);
    return;
  }

  setTheme('theme-dark', setClassName);
}

module.exports = {
  setTheme,
  keepTheme
}
```

My main component calls `keepTheme()` in its `useEffect`, and `setClassName` comes from its state. I'm using `useState` to default to dark mode before the `localStorage` item is set.

```JSX
const [className, setClassName] = useState("theme-dark");
```

The toggle uses `setTheme()` to update the theme.

## Refactoring

Previously, `setTheme()` wasn't using `setClassName`.

```JavaScript
function setTheme(themeName) {
    document.documentElement.className = themeName;
    localStorage.setItem('theme', themeName);
}
```

Since I'm using React, I wanted to move away from manipulating the DOM directly. Now my main component uses a dynamic class name on its outermost element.

```HTML
<div className={`App ${className}`}>
```

I want to refactor my component architecture at some point in the future, which may help me cut down on the number of times I'm passing `setClassName` as a callback.

`keepTheme()` used to be a lot of nested conditionals.

```JavaScript
  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
    } else if (localStorage.getItem('theme') === 'theme-light') {
      setTheme('theme-light');
    }
  } else {
    setTheme('theme-dark');
  }
```

My instinct is always to explicitly state the `else`, so my next solution still checked too many things. I did at least start using [guard clauses](https://refactoring.guru/replace-nested-conditional-with-guard-clauses).

```JavaScript
const theme = localStorage.getItem('theme');
  if (theme) {
    if (theme === 'theme-dark') {
      setTheme('theme-dark');
    } 
    
    if (theme === 'theme-light') {
      setTheme('theme-light');
    }
    return;
  }

  const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
  if (prefersDarkTheme.matches) {
    setTheme('theme-dark');
    return;
  } 

  const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)');
  if (prefersLightTheme.matches) {
    setTheme('theme-light');
    return;
  }

  setTheme('theme-dark');
```

At this point, I realized that if I'm already defaulting to dark mode, I don't need to check for `(prefers-color-scheme: dark)`. Then I learned `localStorage` items are [tied to the window's origin](https://html.spec.whatwg.org/multipage/webstorage.html#dom-localstorage-dev:~:text=Returns%20the%20Storage%20object%20associated%20with%20window%27s%20origin%27s%20local%20storage%20area.). Since I don't need to check the value, I can just check `theme` exists and then pass it to `setTheme()`.

## Conclusion

It was a little nostalgic to come back to this toggle. It helped me get my first developer job almost exactly two years ago. Sometimes, it can be hard to look back on code you wrote when you knew less. In this case, I was already doing the kind of updates you have to do after two years, and it was nice to see how much I've learned. It makes me want to refactor the rest of the app and excited to see what I learn in the next two years.
