# What are Favicons?

Planted: 05/08/2022
Tags: images
Series: [Images](/series.html?series=images)

![Abbey Perini Full-Stack Web Developer with a logo that looks like a brain with a threaded needle coming off of it](https://images.abbeyperini.com/images-series/banner.png)

I mentioned `<link rel="icon" type="image/x-icon" href="/images/favicon.ico">` as part of webpage SEO in [Semantic HTML: What, Why, and How](/blog.html?blog=HTML). Someone asked a great question - why does the MIME type in the `<link>` tag `type=""` attribute have to be `image/x-icon`? The answer is it doesn't, but it's still a good idea to include an ICO file. Let's dig into how to leverage favicons to their fullest.

## Table of Contents

1. [Favicons](#favicons)
2. [MIME Types](#mime-types)
3. [Image Files](#image-files)
4. [Code](#code)

## Favicons

Favicon is short for favorite icon. It is an image, usually a logo, associated with your webpage. The World Wide Web Consortium (W3C) standardized favicons in 2000 as part of HTML, and since then, relatively few things have changed. In Internet Explorer 5, a favicon was a `favicon.ico` file in the root directory of a site (`/favicon.ico`), and browsers still check for that.

A favicon can be used in the tab or address bar in your browser window when you open your webpage, in the bookmarks bar when your site is bookmarked, in the browser history, and as a desktop or mobile icon. Google will even [display your favicon with your website in search results](https://developers.google.com/search/docs/advanced/appearance/favicon-in-search). However, because each browser has a different set of allowable use cases for the favicon and each checks for favicons in a different way, this adds up to a lot of situations a developer has to anticipate. For example, all the little logos except the bookmark folders in the following screenshot of a Chrome browser window are favicons:

![tabs navigated to google.com and eshakti, currently selected blank tab has shortcuts with favicons and there are bookmarks](https://images.abbeyperini.com/images-series/tabs.png)

To make matters more confusing, W3C never standardized the `rel=` attribute in the `<link>` tag so there are inconsistencies. For example, `rel="shortcut"` is still allowed for legacy reasons, but shortcut doesn't refer to anything. Then there are OS and device differences. If supplied with `<link rel="apple-touch-icon">`, an Apple mobile device will use the favicon when creating a shortcut to a webpage on the home screen. If not, it will use a thumbnail image of the site.

There are also security concerns - attackers can change the favicon of a site to make it look like it's using HTTPS for a phishing scam, query for the favicon to see if a user is logged in, and use favicons for tracking users across browser sessions.  

## MIME Types

[MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) are a way to communicate file or data format to a browser. For favicons, they're used in the `type=""` attribute in the `<link>` tag.

In 2003, the [ICO format](/blog.html?blog=ico) was registered under the MIME type `image/vnd.microsoft.icon`, but it wasn't registered by Microsoft, and Internet Explorer doesn't recognize it. The ICO MIME type used today is `image/x-icon`.

These days, you aren't limited to using just the ICO format. You can use the Apple Icon Image format (ICNS), non-animated GIFs, [PNGs, and SVGs](https://caniuse.com/?search=favicon). However, Apple has moved away from ICNS files to using an [asset catalogue](https://developer.apple.com/documentation/xcode/configuring-your-app-icon) in apps and they're less supported than ICO. One of the reasons the ICO format exists is because raster images have trouble scaling up. As favicons, PNGs (MIME type `image/png`) almost have full browser support. SVGs (MIME type `image/svg+xml`) have almost reached 75% browser support. Finally, there's no real benefit to using non-animated GIFs over PNG. (I cover raster vs vector images, SVG, PNG, JPEG, and GIF in [Sourcing Images and Optimizing Them for the Web](/blog.html?blog=images).)

![aliens meme captioned MIME types](https://images.abbeyperini.com/images-series/mime.jpeg)

Mozilla Developer Network (MDN) may [warn against](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#:~:text=be%20well%20supported.-,Warning%3A,-ICO%20files%20should) using the ICO format for web content, but their [`<head>`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML) and [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) guides recommend using a `/favicon.ico` file for backwards compatibility. There are a few reasons why:

1. Internet Explorer 6-10 (PNG support was added in 11.)
2. If your pathing in your `<link>` tag breaks, browsers will check for `/favicon.ico` and show users a 404 if it's not found.
3. Tools like RSS readers will only query for `/favicon.ico`.

## Image Files

Favicons are always square, so here are the sizes we're trying to cover (in pixels):

- 16x16: default for browsers
- 24x24: Pinned Site in Internet Explorer 9
- 32x32: Tab in Internet Explorer, taskbar button in Windows 7+ and Safari’s ”Read Later” sidebar
- 57x57: Standard iOS home screen
- 72x72: iPad home screen icon
- 96x96: Google TV
- 114x114: iPhone 4+ home screen
- 128x128: Chrome Web Store
- 195x195: Opera Speed Dial
- 512x512: Progressive Web App (PWA) loading splash image

For the simplest favicon solution that covers all these sizes, is backwards compatible, and provides fallbacks, we're looking at a favicon.ico file with 3 sizes and three other PNG files that scale down well. If you already have a square image 512 x 512 pixels or larger with a background color, you can just upload it to [Favicon Generator](https://favicon.io/favicon-converter/) and move on to the code section. If you want to know more about how I'm manipulating my images and why, keep reading this section.

You could theoretically provide just the largest one if it scales down well, but one of the main tenants of [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) is asking browsers to load the smallest images possible.

Normally, I'm a big fan of SVGs over raster images when you have multiple sizes needed, but they have more limited browser support as favicons. I'm not saying don't use them, just it'll probably take more than 4 files. Plus, even if you want a transparent background on most devices, you'll want a file with a background color and some padding for Apple icons. If you want to create a cool SVG favicon that will change colors based on `@media (prefers-color-scheme: )`, check out [Andrey Sitnik's favicon guide](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs#:~:text=A%C2%A0single%20SVG%20icon%20with%20a%C2%A0light/dark%20version%20for%20modern%20browsers).

I'll be updating my files to all have a light background color because I'm noticing detail is lost in dark mode in Chrome with my portfolio site's favicon:

![Abbey's website favicon in a tab in a browser, dark lines not showing on a dark background, just looks like a brain](https://images.abbeyperini.com/images-series/brain.png)

To create my image files, I open the original SVG I drew in Photoshop. I add an off-white background layer, change the image size to be 450 pixels in width, change the canvas size to 512 x 512 pixels, and export a PNG named logo512.png.

![Abbey's logo, a brain with a thread and needle coming off the side with an off-white background](https://images.abbeyperini.com/images-series/square-logo.png)

Then, I locate the file in Finder, `right click > duplicate` twice, and use Preview's adjust size option (under Tools) to create two PNG files - logo192.png that is 192 x 192 pixels and apple-touch-icon.png that is 180 x 180 pixels. The only Apple size the second PNG won't cover is the 195 x 195 pixels Opera Speed Dial image. I double check with Preview that scaling apple-touch-icon.png up doesn't look too terribly pixelated before moving on.

There are [many many ways to create ICO files](/blog.html?blog=ico#:~:text=There%20are%20so%20many%20ways%20to%20convert%20images%20to%20ICO%20format). I upload the logo512.png image to [Favicon Generator](https://favicon.io/favicon-converter/). Not only do I get a favicon.ico file in seconds, but the folder also includes the sizes I've already made and more.

## Code

Like how the `type=""` attribute in the HTML `<link>` tag tells the browser what format my image file is in, the `sizes=""` attribute tells browsers the size of my file so it can choose the best option to display.

To update my favicon, I need to update two `<link>` tags in my [index.html](https://github.com/abbeyperini/Portfolio2.0/blob/master/portfolio/public/index.html) file. Because of how React works, the two paths in my `href=""` attributes start with `%PUBLIC_URL%` before the `/`, but here's the code with a more universal path:

```HTML
<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" type="image/x-icon">
<link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png">
```

Next, I put the 4 new files in the [public folder](https://github.com/abbeyperini/Portfolio2.0/tree/master/portfolio/public), which acts as the root directory for my built site in React.  

For a PWA to recognize the images, we'll also need a [web app manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest). If you use `create-react-app`, this JSON file is provided for you as `public/manifest.json`. The typical image sizes for a favicon.ico file are 48x48, 32x32, and 16x16 in pixels, but the manifest.json provided by `create-react-app` lists 64x64, 32x32, 24x24, and 16x16. I update the sizes listed to match the file I got from the generator.

```JavaScript
{
  "short_name": "Abbey Perini",
  "name": "Abbey Perini Portfolio",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "48x48 32x32 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

Now my favicon has a nice background and looks good in a variety of sizes:

![Abbey's website favicon in a Chrome tab, now with a white background so you can see more detail](https://images.abbeyperini.com/images-series/favicon.png)

![Abbey's website favicon in a Safari tab, search suggestion, recently visited, and reading list, all different sizes](https://images.abbeyperini.com/images-series/safari.png)

![Abbey's website favicon in a mobile Firefox window under Jump Back In and Recently Visited](https://images.abbeyperini.com/images-series/jump.png)

![Abbey's website favicon in a tab in a mobile Firefox window](https://images.abbeyperini.com/images-series/focus.png)

## Conclusion

Favicons are deceptively complicated, and this blog was very focused on finding the simplest code solution. If you're interested in a guide on how I go from app idea to logo, accessible color theme, and image sets, just leave a comment!
