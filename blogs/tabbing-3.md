# Transforming Tired Tabbing

Planted: 10/14/2022
Tags: accessibility

![paste orange, pink, purple, and white keys backlit by rainbow rgb lights on a white mistel keyboard](https://images.abbeyperini.com/tabbing/keyboard-3.jpg)

Take typical focus indicator styles and turn them totally tabbular!

1. [Minimum Requirements](#minimum-requirements)
2. [Special mention: errors](#special-mention-errors)
3. [CSS Pseudo-classes](#css-pseudo-classes)
4. [Focusing Fun](#focusing-fun)

## Minimum Requirements

For an in depth breakdown of these requirements, check out [Sara Soueidan's excellent guide](https://www.sarasoueidan.com/blog/focus-indicators/) for designing accessible, WCAG-compliant focus indicators.

Essentially, if an element is focused, it must be visible on the page and its focus indicator must have a color contrast ratio of 3:1 with surrounding colors. The minimum coverage area for the focus indicator is 1px thick around the entire perimeter of the element or 4px thick along the shortest side.

This leaves a lot of room for creativity - you can use outlines, background colors, borders, and shadows in a variety of ways. The world's your oyster as long as it's very obvious the state of the element has changed.

## Special mention: errors

If a user is entering information into your page, they want clear errors. Usually, that means moving focus to the element that has an error. People generally expect a focus outline that indicates an error to be red.

First, always check your red for [minimum color contrast](https://webaim.org/resources/contrastchecker/). Second, [color cannot be the only way you communicate information](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html). You will need to provide text ([not placeholder text](https://www.deque.com/blog/accessible-forms-the-problem-with-placeholders/)) clearly describing what went wrong.

![A vintage Windows error pop up with the message "...Well, I don't know what's wrong"](https://images.abbeyperini.com/tabbing/error.png)

Check out [Shell Little's Fix Your Error Flows or Give Me More Spoons axe-con talk](https://www.youtube.com/watch?v=gBptAXqho0w&t=5s) for more dos and don'ts when designing error flows.

## CSS Pseudo-classes

A pseudo-class is a keyword indicating a special state added to a CSS selector like `.class-name:focus` or `button:focus`.

### :focus

This pseudo-class represents an element that has received focus by a click, tap, or the tab key.

### :focus-visible

[Browsers calculate when this state is active](https://css-tricks.com/almanac/selectors/f/focus-visible/#aa-how-do-browsers-determine-when-something-is-focus-visible). We can generally assume this pseudo-class is activated when a user sets focus to "always visible" in their browser settings or the element is focused with the keyboard only.

### :focus-within

Use this pseudo-class if you want to show a focus outline on an element when it or any of its children are focused. This little guy has already come in handy for me a couple of times, most notably when I was trying to create [a dynamic skip link for a page displaying all of my blogs](/blog.html?blog=audit-5#skipping-around:~:text=the-,%3Afocus%2Dwithin,-pseudo%20selector%20to).

## Focusing Fun

My two purples, #231942 and #6B65A4, both have WCAG AA small text minimum contrast with the white text and thus the background. They also have the minimum contrast ratio of 3:1 with each other.

### Outlines

[Manuel Matuzović covers the pros and cons of outlines in depth.](https://www.matuzo.at/blog/2022/focus-outline/) The biggest pro is it won't cause layout shift. It's also [the most universally supported](https://caniuse.com/outline) CSS property in this blog.

All the other styles I demonstrate here will be overridden in [forced color mode](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors). In contrast, only the color of outlines will be removed. It is recommended that if you use other styles, you keep a transparent outline or an outline in the same color.

Many properties of an outline cannot be changed, like its border radius.

Let's start with the most basic outline.

```CSS
button {
  height: 40px;
  width: 80px;
  border-radius: 5px;
  background-color: #231942;
  border: none;
  color: #FFFFFF;
}

button:focus {
   outline: #6B65A4 solid 3px;
}
```

![Screenshot of two buttons. Both are dark purple. The one on the right is focused. It has an outline around the perimeter in the lighter purple.](https://images.abbeyperini.com/tabbing/tabbing1.png)

You can use the `outline-offset` property to create an outline with space between it and the element.

```CSS
button:focus {
  outline: #6B65A4 solid 3px;
  outline-offset: 5px; 
}
```

![Screenshot of two buttons. Both are dark purple. The one on the right is focused. It has an outline 5px away from the perimeter in the lighter purple.](https://images.abbeyperini.com/tabbing/tabbing2.png)

With negative values, you can even put it inside the element.

```CSS
button:focus {
  outline: #6B65A4 solid 4px;
  outline-offset: -8px; 
}
```

![Screenshot of two buttons. Both are dark purple. The one on the right is focused. It has a thicker outline inside the perimeter in the lighter purple.](https://images.abbeyperini.com/tabbing/tabbing3.png)

Because the minimum requirement is 1px thick around the perimeter of the element, you must go thicker if you move the outline inside the element.

I'm only using solid here, but `outline-style` has [quite a few options](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style). If you start using styles like dashed, you'll have to increase the width to ensure it still meets the minimum contrast area requirements.

### Background Colors

The big benefit of `background-color` is the large contrast area. It's also [well supported](https://caniuse.com/?search=background-color).

```CSS
button:focus {
  outline: none;
  background-color: #6B65A4;
}
```

![Screenshot of two buttons. The one on the left is dark purple. The one on the right is focused. Its background color is the lighter purple.](https://images.abbeyperini.com/tabbing/tabbing4.png)

### Borders

Borders are [well supported](https://caniuse.com/?search=border) and the least likely to be cut off by overflow, but they have some quirks. For instance, borders will not stay with their element if it's positioned using `sticky` and you start scrolling.

Like outline, there are plenty of [border-style](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style) options, and you can even add a [border-image](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image).

To prevent layout shift (a visible element on your page changing position or size), your border must already exist before your element is focused. Luckily, if it's the same color as your background, it's not noticeable.

```CSS
button {
  border: 4px solid #231942;
}
```

Then you can change the whole border on focus.

```CSS
button:focus {
  outline: none;
  border: 3px solid #6B65A4;
}
```

![Screenshot of two buttons. Both are dark purple. The one on the right is focused. It has an outline around the perimeter in the lighter purple.](https://images.abbeyperini.com/tabbing/tabbing5.png)

You can also change just one side, remembering it has to be thicker.

```CSS
button:focus {
  outline: none;
  border-left: 4px solid #6B65A4;
}
```

![Screenshot of two buttons. Both are dark purple. The one on the right is focused. It has an outline on the perimeter of the left side in the lighter purple. The top and bottom of the light purple line are angled.](https://images.abbeyperini.com/tabbing/tabbing6.png)

To get a straight line, you can replace padding with the border:

```CSS
button {
  border: none;
  padding-left: 4px;
}

button:focus {
  outline: none;
  padding-left: 0;
  border-left: 4px solid #6B65A4;
}
```

![Screenshot of two buttons. Both are dark purple. The one on the right is focused. It has an outline on the perimeter of the left side in the lighter purple. The top and bottom of the light purple line are straight.](https://images.abbeyperini.com/tabbing/tabbing7.png)

Alternatively, you can use `clip-path`.

```CSS
button {
  border: 4px solid #231942;
  clip-path: inset(8px 0px);
}
```

![Screenshot of two buttons. Both are dark purple. The one on the right is focused. It has an outline on the perimeter of the left side in the lighter purple. The top and bottom of the light purple line are straight. The button has less height.](https://images.abbeyperini.com/tabbing/tabbing8.png)

You can't create an offset border on an element, but you can use an outline to fake an inset border. Any `border-radius` creates odd gaps, but it prevents layout shift.

```CSS
button {
  outline: #231942 solid 3px;
}

button:focus {
  border: 2px solid #6B65A4;
}
```

![Screenshot of two buttons. Both are dark purple. The one on the right is focused. It has a thicker outline inside the perimeter in the lighter purple.](https://images.abbeyperini.com/tabbing/tabbing9.png)

### Box Shadows

All of this you can do with `box-shadow` without causing layout shift. The downside is `box-shadow` [isn't as well supported](https://caniuse.com/?search=box-shadow), especially in older browsers and e-mail clients.

On the perimeter:

```CSS
button:focus {
  outline: none;
  -webkit-box-shadow: 0px 0px 0px 2px #6B65A4;
  -moz-box-shadow: 0px 0px 0px 2px #6B65A4;
  box-shadow: 0px 0px 0px 2px #6B65A4;
}
```

![Screenshot of two buttons. Both are dark purple. The one on the right is focused. It has an outline around the perimeter in the lighter purple.](https://images.abbeyperini.com/tabbing/tabbing10.png)

Inside the perimeter:

```CSS
button:focus {
  outline: none;
  -webkit-box-shadow:inset 0px 0px 0px 4px #6B65A4;
  -moz-box-shadow:inset 0px 0px 0px 4px #6B65A4;
  box-shadow:inset 0px 0px 0px 4px #6B65A4;
}
```

![Screenshot of two buttons. Both are dark purple. The one on the right is focused. It has a thicker outline inside the perimeter in the lighter purple.](https://images.abbeyperini.com/tabbing/fat-border.png)

One side:

```CSS
button:focus {
  outline: none;
  -webkit-box-shadow: -4px 0px 0px #6B65A4;
  -moz-box-shadow: -4px 0px 0px #6B65A4;
  box-shadow: -4px 0px 0px #6B65A4;
}
```

![Screenshot of two buttons. Both are dark purple. The one on the right is focused. It has an outline on the perimeter of the left side in the lighter purple. The top and bottom of the light purple line are straight.](https://images.abbeyperini.com/tabbing/outside-line.png)

One side and inset:

```CSS
button:focus {
  outline: none;
  -webkit-box-shadow: inset 4px 0px 0px #6B65A4;
  -moz-box-shadow: inset 4px 0px 0px #6B65A4;
  box-shadow: inset 4px 0px 0px #6B65A4;
}
```

![Screenshot of two buttons. Both are dark purple. The one on the right is focused. It has an outline inside the perimeter of the left side in the lighter purple. The top and bottom of the light purple line are straight.](https://images.abbeyperini.com/tabbing/line.png)

`box-shadow` conforms to your element's `border-radius`, so you can get some weird looking curves when you're imitating solid lines with it.

Background color:

```CSS
button:focus {
  outline: none;
  -webkit-box-shadow: inset 20px 40px 0px #6B65A4;
  -moz-box-shadow: inset 20px 40px 0px #6B65A4;
  box-shadow: inset 20px 40px 0px #6B65A4;
}
```

![Screenshot of two buttons. The one on the left is dark purple. The one on the right is focused. Its background color is the lighter purple.](https://images.abbeyperini.com/tabbing/color.png)

For more `box-shadow` fun, check out Mozilla Developer Network's [Box-shadow Generator](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Backgrounds_and_Borders/Box-shadow_generator)!

## Conclusion

Look, most people hate the default focus indicator. You should never remove it entirely, but you can provide nice-looking, visible focus indicators with a little CSS!

Thanks for taking the time to read this tabbing tutorial!
