## Dark Mode Toggle in HTML Web Components

![A screenshot of Abbey's digital garden in dark mode](https://images.abbeyperini.com/html-toggle/dark-mode.png)

When designing my digital garden, I knew I wanted a cute dark mode toggle. Once I had drawn my SVG, I started building a web component that had all the same functionality as my [dark mode toggle in React](https://dev.to/abbeyperini/toggle-dark-mode-in-react-28c9). This includes everything I learned while [accessibility auditing my site](https://dev.to/abbeyperini/an-accessible-dark-mode-toggle-in-react-aop).

In addition to changing the theme, the toggle needs to take the user's [`prefers-color-scheme` selection](https://dev.to/abbeyperini/dark-mode-toggle-and-prefers-color-scheme-4f3m) into account and persist the user's preference across reloads. For accessibility, the toggle's screen reader announcement must make sense (e.g. "dark mode toggle on"). Since I want to display an SVG instead of a checkbox with text, I'll have to add focus and hover styling and a label that shows up on hover.

### Toggle Web Component

First, I need a Toggle class that creates an HTML element. Using the [Custom Element API](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements), I'll define `<toggle-component>` using this class.

Using the class's constructor, I set the `innerHTML` of `<toggle-component>` to a `<label>` with an `<input type="checkbox">` and SVG as children. The label has a `title` attribute, giving our toggle a visible "dark mode toggle" label if a user hovers over it or the `<input>`. Because the checkbox is a child of the `<label>`, interacting with the `<label>` is the same thing as interacting with the `<input>` and vice versa. The `title` attribute also makes sure screen readers announce "dark mode toggle" when a user interacts with this component.

![A white daisy on a green background with a label that says "dark mode toggle"](https://images.abbeyperini.com/html-toggle/label.png)

Once the HTML is in place, I add a `connectedCallback` function to the class. This part of the custom elements API defines functions for use within the component and executes code when the component is inserted into the DOM.

```JavaScript
// /components/toggle.js

class Toggle extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <label title="dark mode toggle">
        <input type="checkbox" id="theme-toggle" class="theme-switch" />
        <svg id="daisy">{SVG code removed for brevity}</svg>
      </label>
    `
    this.setAttribute("class", "toggle-component");
  }

  connectedCallback() {
    function switchTheme(e) {
      if (e.target.checked) {
        setTheme('dark');
        return;
      }
    
      setTheme('light');   
    };
    
    function setTheme(themeName) {
      localStorage.setItem('theme', themeName);
      document.documentElement.setAttribute('data-theme', themeName);
    };
    
    function setCheckBox(toggleSwitch, theme) {
      toggleSwitch.checked = theme === 'dark' ? true : false;
    }
    
    function keepTheme() {
      const toggleSwitch = document.querySelector('#theme-toggle');
      toggleSwitch.addEventListener('change', switchTheme, false);
      const theme = localStorage.getItem('theme');
      if (theme) {
        setTheme(theme);
        setCheckBox(toggleSwitch, theme);
        return;
      };
    
      const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)');
      if (prefersLightTheme.matches) {
        setTheme('light');
        return;
      };
    
      setTheme('dark');
      setCheckBox(toggleSwitch, 'dark');
    };
    
    document.addEventListener("DOMContentLoaded", keepTheme);    
  }
}

customElements.define("toggle-component", Toggle);
```

Because `<toggle-component>` is inserted into the DOM before the page loads, the only code that executes immediately adds an event listener. The event listener calls `keepTheme` as soon as the page has loaded. First, `keepTheme` adds an event listener to the `<input>` that calls `switchTheme` when a user interacts with it. `switchTheme` passes 'dark' to `setTheme` if the checkbox is checked and 'light' if it is not. The string passed to `setTheme` is set as the CSS theme and saved in `localStorage` which will persist across reloads.

The rest of `keepTheme` is dedicated to choosing the right theme on load. First, it checks [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to see if the user's preference is already set. Next, it checks if `prefers-color-scheme` is set to 'light'. Finally, it defaults to dark mode. For both dark and light mode, I call `setTheme.` For dark mode, I also call `setCheckbox`. The checkbox mounts in an unchecked state. A screen reader will announce "dark mode" and whether the checkbox is checked. To get an announcement like "dark mode toggle checked" or "dark mode toggle on", I have to programmatically check the checkbox when I set the theme to 'dark' on load.

![A screenshot showing the toggle in dark mode focused by a screen reader and the announcement is "dark mode toggle, checked, checkbox"](https://images.abbeyperini.com/html-toggle/dark-announcement.png)

![A screenshot showing the toggle in light mode focused by a screen reader and the announcement is "dark mode toggle, unchecked, checkbox"](https://images.abbeyperini.com/html-toggle/light-announcement.png)

### Toggle Styling

I chose to draw a fairly simple design so I could put my SVG code directly in the web component and programmatically change the fill color. This way, the background color of the daisy always matches the theme. Next, I use `opacity: 0;` to hide the checkbox and position it in the middle of the image. Finally, I add the hover and focus styles.

![the toggle cycling through all its possible color combinations as it is clicked and focused and the theme switches](https://images.abbeyperini.com/html-toggle/toggle.gif)

```CSS
/* /styles/styles.css */

[data-theme="light"] {
  --toggle-background: #242D54;
}

[data-theme="dark"] {
  --toggle-background: #282e53;
}

#daisy path {
  fill: var(--toggle-background);
}

.theme-switch {
  position: relative;
  bottom: 30px;
  left: 55px;
  width: 1em;
  height: 1em;
  opacity: 0;
}

.theme-switch:focus + #daisy path,
.theme-switch:hover + #daisy path {
  fill: white;
}

.theme-switch:focus + #daisy {
  outline: 3px solid white;
  outline-offset: 5px;
}
```

### Using the Toggle Web Component

All I need to do is import my stylesheet and component script in the `<head>` of an HTML page. Then I can call `<toggle-component>` anywhere in the page.

```HTML
<!-- index.html -->

<html lang="es">
  <head>
    <link rel='stylesheet' href='../styles/styles.css'/>
    <script src="../components/toggle.js" type="text/javascript" defer></script>
  </head>
  <body>
    <header>
      <toggle-component></toggle-component>
    </header>
  </body>
</html>
```

![A screenshot of Abbey's digital garden in dark mode](https://images.abbeyperini.com/html-toggle/dark-mode.png)

![A screenshot of Abbey's digital garden in light mode](https://images.abbeyperini.com/html-toggle/light-mode.png)

### Conclusion

I had fun getting my dark mode toggle to work just as well in a web component as it does in React. You can see this live in my [digital garden](https://abbeyperini.com) and the full code in the [GitHub repo](https://github.com/abbeyperini/digital-garden).
