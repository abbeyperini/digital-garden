# What is ICO?

Planted: 05/03/2022
Tags: images
Series: [Images](/series.html?series=images)

![a rocky river in a lush green forest](https://images.abbeyperini.com/images-series/river.jpeg)

I didn't even know about this image file format until I went to make my first favicon. What's the deal with ICO?

## ICO

Introduced in Microsoft Windows 1.0, the ICO file format was intended for app icons. (MacOS uses the ICNS file format for icons. Windows also allows you to use CUR files, which are meant for non-animated cursors.) Originally 32 x 32 pixels and monochrome, color support wasn't added until Microsoft Windows 3.0. As time went on more color, size, and feature options, like shadows, were added. These days, ICO files can be 256 x 256 pixels and contain 24 bits of colors and 8 bits of transparency.

Windows does recommend images that are 256 x 256 pixels be compressed PNGs to save space, which highlights the unique attribute of a file type like ICO - it's actually several images in either BMP or PNG format. An ICO file contains a directory called ICONDIR that lists the images within it and information like their file size, height, width, and colors. I've [covered PNG in depth](/blog.html?blog=images#image-types) before, but BMP is the bitmap image format. Before Microsoft Windows 3.0, devices needed a device-independent format for transferring images, and [BMP](https://docs.microsoft.com/en-us/previous-versions/ms969901(v=msdn.10)?redirectedfrom=MSDN) was the solution.

As a result, ICO is a file format that is used for situations in which machines will need to pick the optimal image from a group of images based on requirements like size. Raster images like BMP and PNG can only scale so far, so when you need multiple options in one file, reach for ICO or similar formats.

ICO files have native support on both Mac and Windows, and it looks like you should be able to open and create them with most image viewing and editing software. There are so many ways to convert images to ICO format, I can't even list them all here. I cannot overemphasize [how](https://favicon.io/favicon-converter/) [many](https://www.favicon-generator.org/) [free](https://realfavicongenerator.net/) [ICO](https://www.favicon.cc/) [generators](https://favicon.io/) [exist](https://www.favicongenerator.com/). You can also use tools like [GIMP](https://www.gimp.org/) and Photoshop with a plugin. Combining [Inkscape](https://inkscape.org/) with [ImageMagick](https://www.imagemagick.org/script/download.php) allows you to create ICO files in the terminal. You can even [convert JPEGs to ICO in paint](https://www.techwalla.com/articles/how-to-create-an-ico-file-from-a-jpeg-in-paint) in like 4 clicks.

## Conclusion

Sure ICO's cool, makes sense for app icons, and has a lot of support, but how does it relate to web development? Check out the sister blog to this article, [What are Favicons?](/blog.html?blog=favicons)
