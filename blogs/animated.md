
## CSS Animated Button with Offset Border

![on a teal and blue background, a yellow button that says 'add' with an offset yellow border](https://images.abbeyperini.com/animated/cover.webp)

I’m a believer in finding joy in the little things, and during my last project, that little thing was this button. I have been reading a lot about web design, and wanted my primary buttons to stand out in a big way. I had seen an image of a square button with an offset border while researching a design for an even earlier project, but never got the time to implement it. So for weeks, I’ve been trying to find the time to build this baby, and it was worth the wait.

### To div or not to div

I researched a few ways to make the offset border without wrapping it in a container, but ultimately, I wanted an animation that looked like the button was moving into the offset border. If you are looking for an offset border and are ok with it moving with the button itself, you can use `position: absolute;` and `z-index: -1;` on the button with the `::before` pseudo-selector to create an offset border. (Keep in mind transitions and animations using `::before` are not supported in IE or Safari.) Similarly, you can also use an offset box shadow to create a double box effect that will move with the button.

### The div solution

First create a div container — using `position: relative;` and `left:`, we’ll position the whole button where we want it on the page. Changing the `left:` property will change its position horizontally, and you can use `top:` or `bottom:` to move it vertically. Adjusting the margin will also help.

```CSS
.primary-button-container {
  position: relative;
  display: block;
  left: 5px;
  width: 90px;
  margin-top: 30px;
  padding: 30px;
  border: 2px solid #EBCBAD;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);
}
```

Next, the actual button:

```CSS
.primary-button {
  display: block;
  height: 58px;
  width: 82px;
  background-color: #EBCBAD;
  border: solid #EBCBAD;
  border-width: 0 10px;
  color: #123440;
  font-size: 18px;
  margin: -37px 0px -25px -37px;
  padding: 15px;
  padding-left: 10px;
}
```

And, finally, the animation:

```CSS
.primary-button:active {
  transform: translateY(9px) translateX(9px);
}
```

If you’d like to prevent the blue focus outline, you can use this:

```CSS
button:focus {    
   outline: none;    
}
```

However, you should add something else in its place. Check out [Transforming Tired Tabbing](/blog.html?blog=tabbing-3) for lots of options.

### Conclusion

![on a teal and blue background, a yellow button that says 'add' moves into a yellow border when clicked](https://images.abbeyperini.com/animated/click.gif)

Tag me on Twitter (or Github or somewhere…) if you end up using this button! I would be thrilled to see it out in the world spreading more joy.
