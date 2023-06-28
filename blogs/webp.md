## What is WebP?

Planted: 04/26/2022
Tags: images
Series: [Images](/series.html?series=images)

![a green bush with many delicate white flowers](https://images.abbeyperini.com/images-series/flowers.JPG)

I `right click > save` images off the web constantly, and I've started coming across `.webp` file types more and more. What is this Google-made [open source](https://www.webmproject.org/code/#:~:text=webmproject/bitstream%2Dguide/-,WebP%20Repositories,-libwebp%3A%20WebP%20Image) image file format?

### WebP

The stated goal for this file format is improving website speed, so WebP may become another tool in your [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) toolbox. WP Rocket even has a glowing review of the format in their [page speed and caching tutorials](https://wp-rocket.me/blog/webp-use-image-format-wordpress/).

Based off of the VP8 video encoding format, the WebP format provides lossy and lossless compression for creating small images for the web. Both types of compression support transparency and provide [smaller images](https://developers.google.com/speed/webp/docs/webp_study) than PNG or JPEG compression. Essentially this means you can get images that look the same with a file size 25% or more smaller than you would with JPEG or PNG.

You can [download tools](https://developers.google.com/speed/webp/download) for viewing WebP files, encoding JPEG, PNG, and TIFF images into WebP images, and decoding WebP images into PNG. There's a [gif2webp tool](https://developers.google.com/speed/webp/docs/gif2webp), which means this format supports animation, as well. I know from experience Preview on macOS will view these files and export into several formats. It looks like it's a bit trickier [on Windows](https://www.intowindows.com/4-ways-to-open-webp-images-in-windows-10/).

The format has been around for about a decade now, so browser support is [pretty good](https://caniuse.com/webp), but not yet universal like JPEG and PNG. Considering older email clients still have trouble with PNG, WebP may not yet be the file format for your emails.

WebP is also limited to 8-bit color precision and the lossy compression algorithm sacrifices color information and fine detail. This means it's not great for high quality photographs and compressing a low quality JPEG with WebP encoding will compound upon your problems.

The other downside is many places where you can upload images do not support you uploading WebP, even if they're using it themselves when hosting the uploaded images. Hopefully this begins to change, garnering WebP more support and popularity.

### Conclusion

Unless you're making a site like a photographer's portfolio, requiring high quality, vivid color, and fine detail in your images, WebP seems like a pretty useful image format to reach for when building a site. It provides all the benefits of a PNG and GIF with smaller file sizes. It makes sense that websites that host a lot of images are incorporating this file format more and more.
