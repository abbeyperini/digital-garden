# Adding Shiba Inu Loading and Error SVGs to My React Site

Planted: 08/30/2021
Tags: images

![a chibi shiba inu smiling and sticking its tongue out with a yellow construction hat in a light blue box with "Blogs loading!" on a darker background](https://images.abbeyperini.com/shibas/cover.png)

When I [updated the blog section of my portfolio site](https://dev.to/abbeyperini/a-walkthrough-of-updating-my-portfolio-site-with-netlify-functions-and-the-dev-to-api-dd2), I realized I had a great opportunity to draw some cute SVGs and take my loading and error messages to the next level.

When I started, the loading text looked like this:

![A nav bar on a light blue background, the blog button is highlighted by a border, and text on a peach background saying "Blogs loading!"](https://images.abbeyperini.com/shibas/light-loading.jpeg)

and the error text looked like this:

!["There was an error! Try again later." in dark text on a blue grey background looking out of place compared to the rest of the site.](https://images.abbeyperini.com/shibas/dark-loading.png)

I spent a handful of hours making my loading graphic:

![a chibi shiba inu smiling and sticking its tongue out with a yellow construction hat](https://images.abbeyperini.com/shibas/construction-shiba-inu.png)

and my error graphic:

![a confused-looking chibi shiba inu with a question over its head](https://images.abbeyperini.com/shibas/confused-shiba-inu.png)

and I'm ready to add them to my site!

For more information on how I made these Shiba Inu graphics, and how to find or make images of your own, check out my post, [Sourcing Images and Optimizing Them for the Web](https://dev.to/abbeyperini/sourcing-images-and-optimizing-them-for-the-web-1j5b).

## Putting the SVGs in my React App

My complicated Shiba SVGs are a little big (30 - 35 KB), but I'm choosing an `.svg` format over a `.png` format for a few reasons:

1. I just removed hundreds of KBs of photos from my app by rewriting my blog to pull from the DEV API
2. the PNG compression only takes them down to 21KB
3. ease of resizing
4. animation

I start by making two new components - Error.js and Loading.js. My initial Error component looks like this:

```JavaScript
import React from 'react';

function Error() {
  return (
    <div>  
      <p>There was an error! Try again later.</p>
    </div>
  )
}

export default Error
```

There are a few ways I can import my SVGs into my components. If I were using CDN or another image hosting tool, I could use an `<img>` with a `src` link like this:

```HTML
<img src="https://someSvgLink.com/svgID" alt="very descriptive alt text" />
```

Or I could use an `<img>` with the SVG saved and imported like a JPEG or PNG:

```JavaScript
import React from 'react';
import ConfusedShiba from '../images/confused-shiba-inu.svg'

function Error() {
  return (
    <div>
      <img src={ConfusedShiba} alt="Confused Shiba Inu"></img> 
      <p>There was an error! Try again later.</p>
    </div>
  )
}

export default Error
```

Neither of these would let me animate or change my SVGs programmatically. Pasting the code directly into the React component would allow me to do that, but the complexity of my Shiba SVG makes for very long code. Here's an example of a React wrapper for a very simple SVG from my site. The code is for the turning arrow in the 'view my work' button on my landing page and that `<line>` was my first SVG code!

```JavaScript
function Error() {
  return (
    <div>
      <svg role="img" aria-labelledby="arrowTitle arrowDesc" fill='none' stroke='#0E1A27' stroke-width='8' stroke-dashoffset='0' stroke-dasharray='0' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
    <title id="arrowTitle">Arrow</title>
    <desc id="arrowDesc">arrow that spins on hover</desc>
    <line x1="70" y1="50" x2="0" y2="50" />
    <polyline fill="none" points="30,10 80,50 30,90 "/>
    </svg>
      <p>There was an error! Try again later.</p>
    </div>
  )
}
```

Ultimately, I choose to take advantage of `create-react-app`'s option to import an SVG as a component. Translating SVGs to the DOM this way [is expensive](https://twitter.com/garrett_codes/status/1382842270647517188), but in this case, I have less than 10 SVGs on my site imported this way, and they're all in use. For a larger site, I would look into packages like [SVGR](https://react-svgr.com/), using the Webpack [Asset Modules](https://webpack.js.org/guides/asset-modules/) or an icon library like [Font Awesome](https://fontawesome.com/). My Error component now looks like this:

```JavaScript
import React from 'react';
import {ReactComponent as ConfusedShiba} from '../images/confused-shiba-inu.svg'

function Error() {
  return (
    <div>
      <ConfusedShiba />
      <p>There was an error! Try again later.</p>
    </div>
  )
}

export default Error
```

And I import both my Error component and my very similar Loading component into my Blog component like this:

```JavaScript
import Error from '../components/Error';
import Loading from '../components/Loading';
```

```JavaScript
  } else if (!state.isLoading && state.error) {
    return (
      <Error />
    )
  } else {
    return (
      <Loading />
    )
  }
}
```

Now my Shibas are in my site but because there's no styling, they're HUGE and still on the wrong background. Time to add some CSS. First, I know I'll want some padding and a `max-width` rule for my Shibas.

```CSS
/* error and loading graphics */

.error-graphic {
  padding: 20px 20px 0px 20px;
  max-width: 200px;
}

.loading-graphic {
  padding: 20px 20px 0px 20px;
  max-width: 200px;
}
```

200px is looking nice on my laptop screen, so that's probably about the largest I'll want to go. That means that I need to add in media queries and change the width in this rule to the smallest I'll go, as I used mobile-first design to make my site responsive down to 280px.

```CSS
.error-graphic {
  padding: 20px 20px 0px 20px;
  max-width: 100px;
}

.loading-graphic {
  padding: 20px 20px 0px 20px;
  max-width: 100px;
}

@media screen and (min-width: 350px) {
  .error-graphic, .loading-graphic {
    max-width: 150px;
  }
}

@media screen and (min-width: 525px) {
  .error-graphic, .loading-graphic {
    max-width: 200px;
  }
}
```

Next, I add container styling to match the rest of my site, and the result looks like this:

![a chibi shiba inu smiling and sticking its tongue out with a yellow construction hat in a light blue box with "Blogs loading!" on a darker background](https://images.abbeyperini.com/shibas/blogs-loading-full.png)

But that's not all! I noticed that my error Shiba's question mark doesn't meet minimum contrast standards on my container background. Because this image doesn't add information to the page, it's not super important that it does, but I could animate it to cycle through many colors, at least one of which should meet standards. Plus, using CSS variables to change the color of my SVGs was one of my favorite parts of my [Toggle Dark Mode In React](https://dev.to/abbeyperini/toggle-dark-mode-in-react-28c9) post.

To do this, I'm going to have to edit my SVG code directly. First, using `right click > inspect` in my Chrome browser, I find the `<path>`s and the `<circle>` I want to animate. Then, I add "questionMark", "questionMarkFill", and "questionMarkDot" `id` properties to them, so I can always find them. Next, I remove the `<style>` Illustrator created in my SVG with my colors and rewrite them into CSS rules. Both this SVG and my other Shiba Inu have the same Illustrator-named classes like "cls-1", so I also rename the classes. After a fair amount of Googling variations of "SVG CSS color rotate" and settling upon using `@keyframes` and `hsla()`, I found [Dan Wilson's expert color math](https://danielcwilson.com/blog/2019/09/huedini/). Using that, I write two CSS animations to cycle through colors gradually:

```CSS
@keyframes colorRotate-fill {
  0%, 100% {
    fill: hsl(0,100%,50%);
  }
  10% {
    fill: hsl(36,100%,50%);
  }
  20% {
    fill: hsl(72,100%,50%);
  }
  30% {
    fill: hsl(108,100%,50%);
  }
  40% {
    fill: hsl(144,100%,50%);
  }
  50% {
    fill: hsl(180,100%,50%);
  }
  60% {
    fill: hsl(216,100%,50%);
  }
  70% {
    fill: hsl(252,100%,50%);
  }
  80% {
    fill: hsl(288,100%,50%);
  }
  90% {
    fill: hsl(324,100%,50%);
  }
}

@keyframes colorRotate-fill-hsla {
  0%, 100% {
    fill: hsla(0,100%,50%,.2);
  }
  10% {
    fill: hsla(36,100%,50%,.2);
  }
  20% {
    fill: hsla(72,100%,50%,.2);
  }
  30% {
    fill: hsla(108,100%,50%,.2);
  }
  40% {
    fill: hsla(144,100%,50%,.2);
  }
  50% {
    fill: hsla(180,100%,50%,.2);
  }
  60% {
    fill: hsla(216,100%,50%,.2);
  }
  70% {
    fill: hsla(252,100%,50%,.2);
  }
  80% {
    fill: hsla(288,100%,50%,.2);
  }
  90% {
    fill: hsla(324,100%,50%,.2);
  }
}

```

The 'a' in 'hsla' represents transparency, where 0 is completely transparent and 1 is completely opaque. The way I made my SVG requires a third rule called `colorRotate-stroke` which looks exactly like `colorRotate-fill`, but with the property `stroke` instead of the property `fill`. Then I apply the rules to the appropriate new classes:

```CSS
.error-graphic_qm_dot {
  fill:#a19ece;
  stroke:#524f77;
  stroke-miterlimit:10;
  stroke-width:3px;
  animation-name: colorRotate-stroke, colorRotate-fill-hsla;
  animation-duration: 3000ms;
  animation-fill-mode: forwards;
  transition: all 360ms ease-in;
  animation-iteration-count: infinite;
}
```

The result looks like this:

![A confused-looking chibi shiba inu with a ? over its head - the question mark gradually cycles through colors. "There was an error! Try again later."](https://images.abbeyperini.com/shibas/error-shibe-animation.gif)

## A note on SVG accessibility

In doing research on SVGs, I found [the recommended tags to include](https://css-tricks.com/accessible-svgs/) to make SVGs accessible. I've updated all the svgs on my site to have a `<title>`, `<desc>`, and the `role="img"` and `aria-labelledby="titleID descID"` properties in the `<svg>` tag.

While looking into animating SVGs, I saw color animation could trigger some accessibility issues, so I applied a rule I learned about in my [demo of the updated blog portion of my site](https://dev.to/abbeyperini/a-walkthrough-of-updating-my-portfolio-site-with-netlify-functions-and-the-dev-to-api-dd2):

```CSS
@media (prefers-reduced-motion) {
  .error-graphic_qm-fill, .error-graphic_qm-lines, .error-graphic_qm-lines {
    animation-name: dissolve;
  }
}
```

## Conclusion

I really enjoyed making and styling these Shiba Inu SVGs. For an in depth breakdown of image types for the web and how to make or find your own for free, check out this article's sister blog, [Sourcing Images and Optimizing Them for the Web](https://dev.to/abbeyperini/sourcing-images-and-optimizing-them-for-the-web-1j5b). You can check these Shibes out live at `https://abbeyperini.dev` and see all the code for my site in [the repo](https://github.com/abbeyperini/Portfolio2.0).
