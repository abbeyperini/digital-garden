# What is JPEG XL?

Planted: 04/27/2022
Tags: images

![a lush green forest](https://images.abbeyperini.com/images-series/forest.JPG)

The JPEG has been an integral image format since 1992, but the Joint Photographic Experts Group didn't stop there.

## JPEG 2000

Finalized in 2000, JPEG 2000's goal was to provide flexibility in decoding images. It only has a modest increase in performance over JPEG. However, the flexibility requires codecs that are complex and computationally demanding. In 2004, the video encoding JPEG 2000 format was selected as the basis of Digital Cinema video compression. The image format is widely used today in diagnostic imagery like MRIs, CT scans, and X-rays. The image format never gained popularity with camera manufacturers or [browser support beyond Safari](https://caniuse.com/jpeg2000), so it remains difficult to use on the web.

## JPEG XL

The JPEG XL format was published in 2019, but is still being [standardized/finalized](https://jpeg.org/jpegxl/index.html). JPEG XL is the Joint Photographic Experts Group's latest and greatest attempt to replace the legacy JPEG. The L in JPEG XL stands for long-term. Since 2000 there have also been JPEG XT, JPEG XR, and JPEG XS.

Currently, JPEG XL can be enabled in Chromium, Firefox, and Opera browsers, but has [no other browser support](https://caniuse.com/jpegxl). JPEG XL is supposed to remain royalty free. You can grab the [encoder and decoder off Github](https://github.com/libjxl/libjxl) and chat with other JPEG XL enthusiasts on [Reddit](https://www.reddit.com/r/jpegxl/) and [Discord](https://discord.com/invite/DqkQgDRTFu). You can install JPEG XL utilities on Mac using [homebrew](https://formulae.brew.sh/formula/jpeg-xl) and [on Windows](https://github.com/saschanaz/jxl-winthumb). Tools like [GIMP](https://www.gimp.org/) and [ImageMagick](https://imagemagick.org/) are beginning to support it.

As far as file size goes, JPEG XL routinely performs [right in between AVIF and WebP](https://blobfolio.com/2021/jpeg-xl/). Unlike JPEG 2000 and the other JPEG Xs, JPEG XL allows you to transcode existing JPEG files into the JPEG XL without any additional loss. Like most JPEG formats, where it really shines is maintaining quality and color in high quality photographs.

Unlike JPEG, JPEG XL supports transparency and animation and has lossless compression in addition to lossy. Its encoding speed is comparable to WebP, and its decoding speed beats AVIF and WebP.

## Conclusion

We can think of JPEG XL as the upgrade for JPEG, currently in beta. We'll see if the Joint Photographic Experts Group's marketing can garner camera manufacturer and browser support for this format.
