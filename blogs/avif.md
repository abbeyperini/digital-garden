# What is AVIF?

Planted: 04/26/2022
Tags: images

![a yellow flower in front of a red background with white numbers](https://images.abbeyperini.com/images-series/flower.JPG)

When I was researching WebP, AVIF came up a lot as a newer alternative. What are the benefits in using this file type?

## AVIF

AVIF or AV1 Image File Format, was only finalized in 2019, so its [middling browser support](https://caniuse.com/avif) is actually pretty impressive.

Created by Alliance for Open Media and worked on by Netflix, Microsoft, and Google developers, AVIF is [open source](https://github.com/AOMediaCodec/av1-avif) - you can even weigh in on [image processing and spec issues](https://github.com/AOMediaCodec/av1-avif/issues).

AVIF has lossless and lossy compression. It supports transparency, animation, and even live photos. Its 12 bit color depth provides support for high quality photos with lots of colors.

Netflix wanted to use HDR images. HDR uses software to increase the light and color in a photograph, producing larger images with large ranges of color. This meant they also needed to improve their image hosting. AVIF is a tool they're favoring. They have even documented their [reasoning and testing](https://netflixtechblog.com/avif-for-next-generation-image-coding-b1d75675fe4), and you can clone their [repo comparing different types of image compression](https://github.com/Netflix/image_compression_comparison).

As you can imagine, Netflix has a lot of images to host, and lot of those images have gradients, text and graphics. PNG would struggle to keep file size small with gradients. JPEG struggles with text. SVGs would be fine for graphics alone, but they also want to maintain detail in a photograph with a graphic in it. AVIF can handle all these things without creating jagged edges around the text and graphics. Plus, it'll create higher quality images half the size of the same file compressed with JPEG, even if they're HDR.

The Alliance for Open Media's AVIF encoding and decoding library is also in a [Github repo](https://github.com/AOMediaCodec/libavif). [Sharp](https://sharp.pixelplumbing.com/), a Node module, has AVIF support. To make AVIF images, you can use [avif.io](https://avif.io/), [Squoosh](https://squoosh.app/), and the [Squoosh command line tool](https://www.npmjs.com/package/@squoosh/cli) aimed at supporting [Node.js](https://nodejs.org/en/) apps. [GIMP](https://www.gimp.org/), [ImageMagick](https://imagemagick.org/), and Paint.net support AVIF and there are Photoshop plugins. Mac has no plans to support AVIF, but you can easily [install a codec plugin on Windows 10](https://avif.io/blog/tutorials/windows/) for native support.

The main downside is the lack of browser and CDN support. To use AVIF in your website today, you'll have to employ [progressive enhancement](https://www.smashingmagazine.com/2021/09/modern-image-formats-avif-webp/#progressive-enhancement), the type of which depends on how you're hosting your images. Another option is a [polyfill](https://github.com/Kagami/avif.js). The other downside is the slow encoding speed and higher CPU requirements, which make dynamically creating images harder. However, the team has already made massive strides in speed in the short time AVIF has been around.

## Conclusion

AVIF is an exciting new image format, and most resources posit it is a direct competitor of WebP. They're comparable in creating high quality images, but text and graphics in images is where AVIF shines. Netflix's use of it has undoubtedly given it a popularity boost, so hopefully it will get easier and easier to incorporate AVIF images in your websites.
