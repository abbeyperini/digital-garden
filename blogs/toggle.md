## Toggle Dark Mode in React

Knowledge Level: Evergreen

Planted: 03/05/2021

Last Tended: 04/20/2022

Topics: [dark mode toggle](/topic.html?topic=darkModeToggle), [CSS](/topic.html?topic=CSS), [react](/topic.html?topic=react), [web development](/topic.html?topic=webDevelopment)

Series: [dark mode toggle](/series.html?series=toggle)

![screenshot of Abbey's portfolio site in both light and dark mode](https://images.abbeyperini.com/toggle/cover.png)

When I rebuilt my [portfolio site](https://abbeyperini.dev), I knew I wanted to have some fun with the design, and a dark and light mode fit the bill. I enjoyed a lot of the discoveries I made during this project, but my favorite has to be the color changing SVGs. This tutorial assumes familiarity with React, and I am using v17.0.1 and functional components.

First, I created a base layout. Next, I put together my [dark](https://coolors.co/292929-2f4550-586f7c-b8dbd9-f9f8f8) and [light](https://coolors.co/eddcd2-fff1e6-dbe7e4-bcd4e6-1d2c35) color schemes. It took a little trial and error, but after testing all my combinations for [sufficient contrast](https://webaim.org/resources/contrastchecker/) and experimenting with placement, I found I needed 6 CSS variables. I guess you could say I used “dark first” development, because the variable names make sense in the context of the dark theme. The light theme has less variation, but needed `--button-border` where `--accent` would be the same color as the background.

```CSS
.theme-dark {
  --dark-text: #292929;
  --light-text: #F9F8F8;  
  --dark-background: #2F4550;
  --light-background: #586F7C;
  --accent: #B8DBD9;
  --button-border: #B8DBD9;
}
```

```CSS
.theme-light {
  --dark-text: #5E4B56;
  --light-text: #5E4B56;
  --dark-background: #DBE7E4;
  --light-background: #EDDCD2;
  --accent: #DBE7E4;
  --button-border: #5E4B56;
}
```

Then, I set about applying colors to my base layout:

```CSS
html, #root {
  background-color: var(--dark-background);
  color: var(--dark-text);
}

nav {
  background-color: var(--dark-background);
  color: var(--light-text);
}

.main-container {
  background-color: var(--light-background);
}
```

I also set the backgrounds of the sections of content that I wanted to pop to `--accent`. `--dark-text` would have worked on all backgrounds in the dark theme, but I set the section titles to `--light-text` to make them stand out more.

I found Musthaq Ahamad‘s [basic theme switcher tutorial](https://medium.com/@haxzie/dark-and-light-theme-switcher-using-css-variables-and-pure-javascript-zocada-dd0059d72fa2), and set about applying it to functional React components.
I put functions for changing the theme and checking localStorage for theme preferences into a file called `themes.js`.

```JavaScript
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function keepTheme() {
  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
    } else if (localStorage.getItem('theme') === 'theme-light') {
      setTheme('theme-light')
    }
  } else {
    setTheme('theme-dark')
  }
}

module.exports = {
  setTheme,
  keepTheme
}
```

In my `App.js` file, I added `keepTheme()` to my `useEffect()`.

```JavaScript
import { keepTheme } from './utils/themes';

function App() {
  useEffect(() => {
      keepTheme();
  })
}
```

Next, I added the toggle component to my navigation bar component. I styled the toggle following [Chris Bongers’ Tutorial](https://h.daily-dev-tips.com/creating-day-night-css-only-toggle-switch) based on [Katia De Juan’s Dribbble](https://dribbble.com/shots/3220898-Day-Night-toggle-DailyUI-015). Then I [adjusted the size and flipped it to default to dark mode](https://github.com/abbeyperini/Portfolio2.0/blob/master/portfolio/src/styles/toggle.css). While this toggle is so cute that you could die, this tutorial will work with any `<button>` or clickable `<input>`. First, I set up the basic JSX, the local state, and a variable to hold the theme we get from localStorage:

```JavaScript
import React, { useEffect, useState } from 'react';
import '../styles/toggle.css';
import { setTheme } from '../utils/themes';

function Toggle() {
  const [togClass, setTogClass] = useState('dark');
  let theme = localStorage.getItem('theme');
  return (
        <div className="container--toggle">
           <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} />
            <label htmlFor="toggle" className="toggle--label">
                <span className="toggle--label-background"></span>
            </label>
        </div>
    )
}

export default Toggle;
```

When a user clicks the toggle, I want the theme on the page to change and the toggle to change with it. I added the imported `setTheme()` function and `setTogClass()` from the local state to a handleOnClick function. You can see where it is passed to the clickable part of the toggle in the JSX above.

```JavaScript
const handleOnClick = () => {
  if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-light');
      setTogClass('light')
  } else {
      setTheme('theme-dark');
      setTogClass('dark')
  }
}
```

I used this component’s `useEffect()` to make sure the local state togClass always loads with the correct theme.

```JavaScript
useEffect(() => {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTogClass('dark')
    } else if (localStorage.getItem('theme') === 'theme-light') {
        setTogClass('light')
    }
}, [theme])
```

Because my toggle is a checkbox, the dark theme should show the unchecked (moon) state and the light theme should show the checked (sun) state. I couldn’t get [`defaultChecked`](https://reactjs.org/docs/uncontrolled-components.html) to work how I wanted, so I replaced the unchecked `<input>` with this conditional rendering [ternary operator](https://twitter.com/dan_abramov/status/1365107258280071168) (conditional operator):

```JavaScript
{
    togClass === "light" ?
    <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} checked />
    :
    <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} />
}
```

If you used a `<button>`, you could easily use conditional rendering like this to change the className attribute within the `<button>` tag and get the same effect.

Put all together, the code for the toggle component looks like this:

```JavaScript
import React, { useEffect, useState } from 'react';
import '../styles/toggle.css';
import { setTheme } from '../utils/themes';

function Toggle() {
    const [togClass, setTogClass] = useState('dark');
    let theme = localStorage.getItem('theme');

    const handleOnClick = () => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('theme-light');
            setTogClass('light')
        } else {
            setTheme('theme-dark');
            setTogClass('dark')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTogClass('dark')
        } else if (localStorage.getItem('theme') === 'theme-light') {
            setTogClass('light')
        }
    }, [theme])
    
    return (
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
    )
}
```

### Update

To see how I have refactored the logic of this component and made it accessible, read [An Accessible Dark Mode Toggle in React](/blog.html?blog=audit-3).

Finally, my favorite part: the color switching SVGs! CSS variables work in SVG code too!

I got my SVG code for the Github and Chrome icons from [DEVICON](https://devicon.dev/). For the Github icon all I had to change was one fill attribute in a `<g>`:

```HTML
<g fill="var(--dark-text)">
```

The Chrome icon had a fill attribute in a `<circle>` and a `<path>`:

```HTML
<circle fill="var(--dark-text)" cx="63.624" cy="64.474" r="22.634"></circle><path fill="var(--dark-text)" ...>
```

The result looks like this:

![desktop - toggle looks like a moon with stars click changes the site from dark mode to light mode and the toggle now looks like a sun with clouds](https://images.abbeyperini.com/toggle/toggleD.gif)

![mobile - toggle looks like a moon with stars click changes the site from dark mode to light mode and the toggle now looks like a sun with clouds](https://images.abbeyperini.com/toggle/mobile.gif)

### Conclusion

I tried to include all of the relevant code, but you can also see the full code for my site in its [Github repository](https://github.com/abbeyperini/Portfolio2.0). If you enjoyed this article or are left with questions, please leave a comment! I would also love to see anything built following this tutorial.
