# Sourcing Images and Optimizing Them for the Web

Planted: 08/30/2021
Tags: images

![mountain range in Mount Rainier National Park](https://images.abbeyperini.com/images-series/cover.webp)

When I sat down to write about my [Shiba Inu SVGs](https://dev.to/abbeyperini/adding-shiba-inu-loading-and-error-svgs-to-my-react-site-lnj), it became clear that I was writing two blogs. One, a tutorial for SVGs in React, and this one, demystifying sourcing images for your website. Here are the topics this article will cover:

1. [Image Types](#image-types)
2. [Image Optimization for the Web](#image-optimization-for-the-web)
3. [SVGs for Your Site](#svgs-for-your-site)
4. [PNGs and JPEGs for Your Site](#pngs-and-jpegs-for-your-site)
5. [HTML and CSS to Take Your Images to the Next Level](#html-and-css-to-take-your-images-to-the-next-level)
6. [Conclusion](#conclusion)

## Image Types

I enjoy making logos and other graphics for my apps, and I use Adobe Illustrator, a vector-editing tool, to do it. Vector images are made using mathematical formulas and code. When I create one in Illustrator, I save it as an `.svg` file.

SVGs in a `.svg` file work just like [a coded `<svg>`](https://www.w3schools.com/graphics/svg_intro.asp). In contrast, JPEGs (`.jpg`) and PNGs (`.png`) are raster images, made with static pixels. Vector images can scale up and down without pixelating (looking grainy and blurry), while raster images are limited by the number of pixels saved in the image. You can save an `.svg` file as a `.jpg` or `.png` file of any size.

At this point, you might be thinking, why would I use anything other than SVGs? Each image format has its pros and cons to consider when using them in a site.

JPEG stands for Joint Photographic Experts Group, which is the committee that made the JPEG format. Back when file extensions were limited to 3 letters, they chose `.jpg`. JPEGs are great for color and photography. It's easy to keep their file sizes small and they are basically universally supported in browsers and email clients. They don't support transparency or animation and text images form jagged edges. They support descriptive metadata, which is good for accessibility.

JPEGs can be compressed in a lossy or lossless fashion. They are typically used to take a huge [RAW photograph](https://www.lifewire.com/what-is-raw-photography-4707721) with lots of pixels and compress them in a lossy fashion that still looks lossless to the naked eye. As a result, just re-saving a JPEG file is lossy compression and you will use quality.

PNGs, on the other hand, use lossless compression. They support transparency and are good for images with text and logos because they don't form jagged edges. Using PNG-8, with a limited color palette, is usually lightweight and ideal for web graphics. They also support descriptive metadata.

PNGs do not support animation. Older email clients can have trouble with them. Their file size grows quickly with the complexity of the image. PNG-24 has unlimited colors and their file size gets bigger than you usually want for the web.

GIFs are the precursor to PNGs and they are not ideal for the web due to their large file size. They are only recommended if you need them for the animation. They use lossless compression and support descriptive metadata, but do not support transparency and are limited to 256 colors.

SVGs are lightweight, use lossless compression, and can use unlimited colors. They're easy to resize and support transparency and animation.

SVGs have limited support in degraded browsers and email clients. To add descriptive metadata, you'd have to use a [`<metadata>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/metadata). Furthermore, making them can get complicated - the more complex your lines, the more likely it is the lines will form jagged edges when scaled up or down. Plus, they're often treated differently than raster images in code. My [Adding Shiba Inu Loading and Error SVGs to My React Site](https://dev.to/abbeyperini/adding-shiba-inu-loading-and-error-svgs-to-my-react-site-lnj) example details the 4 different ways you could import an SVG into a React app.

## Image Optimization for the Web

After you've picked a file type for your use case, you'll still need to optimize your image for the web. If you're creating your images, that starts with working in RGB color mode and checking that your colors are accessible. When you save your file, give it a name with keywords in it for SEO.

Before adding your image file to your site repo, you'll want to compress it. If you're creating your image, there will be settings in your tool when you go to save. If you've got a saved image that needs compressing, you can use tools like Photoshop, [Photopea](https://www.photopea.com/), [Gimp](https://www.gimp.org/), [tinyjpg](https://tinyjpg.com), [compressor](https://compressor.io/) or the Mac utility [ImageOptim](https://imageoptim.com/mac).

Finally, after compressing, you'll want to look at your code/site design. What's the maximum size you'll want that image to appear on the screen? Resize the photo to match that. No need to send a giant photo to your user's browser if you're only going to show it at a quarter that size. Mac and Windows' default photo editor tools both have a resize option that will scale your image for you. Sometimes, you'll want to crop instead of resizing (e.g. banners and cover images).

## SVGs for Your Site

### Free to Use SVGs

My portfolio site includes SVGs from my two favorite sources - [DevIcon](https://devicon.dev/) for your skills, languages, and technologies section and [HOLA SVG](https://holasvg.com/icons/) for SVGs in basic shapes and their demos and tutorials. Another excellent resource is [heroicons](https://heroicons.com/). You can also use icon libraries like [Font Awesome](https://fontawesome.com/v6.0) and [Bootstrap Icons](https://icons.getbootstrap.com/). Check out [undraw](https://undraw.co/) for illustrations.

### Coding SVGs

You don't have to start from scratch - the turning arrow on my landing page was a caret from HOLA SVG to which I added a `<line>`.

![Transparent button with a black outline and a black arrow. On hover, the button turns black and the arrow turns white and to point downwards.](https://images.abbeyperini.com/images-series/svg.gif)

However, if you even remotely like math, geometry, or playing around with x and y coordinates, I recommend [working through a tutorial](https://www.aleksandrhovhannisyan.com/blog/svg-tutorial-how-to-code-svg-icons-by-hand/). Essentially, coding an SVG starts with an `<svg>` with some basic properties like `width` and `height`. The `viewbox` property takes 4 coordinate parameters to form a box that is the actual size of your SVG. The `width` and `height` properties will only affect the size of your `<svg>`'s children elements. The children elements are things like `<line>`, `<circle>`, and `<polygon>` that take different parameters to create different shapes.

### Using a Vector-Editor

I've been making SVGs in Illustrator for about 11 years now, so I prefer using a vector-editor over coding an `<svg>`. I don't think Illustrator is the end all be all of vector-editing tools, but it's the tool with which I'm most familiar. (Still, I have to relearn a lot every time I use it.) There are [a number of alternatives](https://www.creativebloq.com/features/illustrator-alternatives), some of which are free.

Essentially, I start by getting a working outline of my idea. In Illustrator, I draw a line using the brush tool with the smoothing feature enabled. Illustrator turns that line into a path with a series of anchor points. Each anchor point has handles. I can move the anchor points within the path individually so that my line looks how I want. I can adjust the handles to get the line curving just right. Ideally, the image will be simple enough that the anchor point at the end of each path will touch an anchor point on the end of another path. If these two anchor points are touching, I can right click and join them and fill the lines I've made with color (just like MS Paint). The result looks something like this:

![a green spiky plant in a round yellow planter](https://images.abbeyperini.com/images-series/plantr.png)

For an actual Adobe Illustrator tutorial, check out a [getting started video](https://www.youtube.com/watch?v=AinkCNooh2A) or [Adobe's free course for beginners](https://www.youtube.com/watch?v=Ib8UBwu3yGA).

The Shiba Inu SVGs in [this example](https://dev.to/abbeyperini/adding-shiba-inu-loading-and-error-svgs-to-my-react-site-lnj) were not that simple. After getting the lines done, there were only a few I could fill. I ended up making a new layer and setting it to sit behind my lines. Then I copied and pasted the original lines on my new layer, and turned them into orange and cream blobs to color in my Shiba. They do not scale as well as simpler, one-layer SVGs.

When I feel they're close to done, I take an extended break. I revisit the SVGs later and catch more things I want to fix with fresh eyes.

Finally, I flatten my layers, save, export, and optimize the images I want to use on my site. The result looks something like this:

![a chibi shiba inu smiling and sticking its tongue out with a yellow construction hat](https://images.abbeyperini.com/shibas/construction-shib-inu.png)

Finally, before importing SVGs into your site, check out CSS-Tricks' guide to [making SVGs accessible](https://css-tricks.com/accessible-svgs/).

## PNGs and JPEGs for Your Site

The easiest way to get free PNGs and JPEGs for your site is to make them. Since PNGs are typically used for images with a transparent background, they're often made by saving SVGs as a `.png` file. However, you can also convert a JPEG to a PNG to take advantage of the transparent background using a tool like Photoshop, [Gimp](https://www.gimp.org/), or [Kapwing](https://www.kapwing.com/tools/png-maker).

Since JPEGs are typically used for photos, you can just use a camera. If you take the image, the only thing you have to worry about is not taking pictures of things other people have copyrighted. This includes pictures of other people - models own their own likeness, but should be willing to sign a model release. You don't even have to have a fancy camera - I've used plenty of images I took with my phone.

You can pay for stock images or source free images that use licenses or creative commons. Often the website you're getting them from will tell you exactly what you have to do to use them. Typically, it looks like [a caption attributing credit to the owner of the photo](https://creativecommons.org/use-remix/).

For more information on licensing, creative commons, model releases, and other types of photo copyrighting you can encounter, checkout these resources:

- [pixsy](https://www.pixsy.com/academy/image-user/using-copyrighted-images/)
- [pixelrockstar](https://www.pixelrockstar.com/the-risks-of-using-creative-commons-photos/)
- [websolutions](https://www.websolutions.com/blog/what-images-can-you-use-on-your-website-for-free/)

Here are a few lists of websites with images free to use:

- [buffer](https://buffer.com/library/free-images/)
- [snappa](https://blog.snappa.com/free-stock-photos/)
- [wpbeginner](https://www.wpbeginner.com/showcase/16-sources-for-free-public-domain-and-cc0-licensed-images/)

Take diversity into account when choosing your images:

- [wocintechchat](https://www.wocintechchat.com/blog/wocintechphotos)
- [unsplash](https://unsplash.com/s/photos/african-american)
- [nappy](https://nappy.co/)
- [blackillustrations](https://www.blackillustrations.com/)
- [createherstock](https://createherstock.com/)

Finally, when you import your PNGs and JPEGs into your site, don't forget your [descriptive alt-text](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML#text_alternatives).

## HTML and CSS to Take Your Images to the Next Level

I highly recommend [Mozilla Developer Network's Getting Started with the Web series](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web), and the guides for [responsive image HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) and [responsive image CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Images_media_form_elements) are must-reads.

You can also use images for fun, repeating backgrounds for your HTML elements [using the CSS `background-image` property](https://www.freecodecamp.org/news/css-background-image-with-html-example-code/).

Finally, you can do a lot with your SVGs. My [Shiba Inu SVG](https://dev.to/abbeyperini/adding-shiba-inu-loading-and-error-svgs-to-my-react-site-lnj) and [Toggle Dark Mode In React](https://dev.to/abbeyperini/toggle-dark-mode-in-react-28c9) blogs have fun color animations. CSS-Tricks has a great [animated text example](https://css-tricks.com/animating-svg-css/). Furthermore, [GreenSock](https://greensock.com/) is doing the good work of reviving the animations like moving along a path that the dying [SMIL](https://css-tricks.com/guide-svg-animations-smil/) used to provide.

## Conclusion

I've dabbled in creating images since 2009, including a semester of college where I thought I might become a graphic designer. I've never become more than a dilettante, but now an app doesn't feel "real" to me until I've made the logo. I hope this article has helped you become confident in choosing and even making images for your website. If you're left with questions, please leave a comment!
