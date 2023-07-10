## Knitting as Programming

### or how I learned programmers owe it all to fiber

![an ocean blue knit sweater with an octopus pattern in off-white](https://images.abbeyperini.com/knitting/octopus.jpeg)

Knit by Abbey Perini, pattern by Maia E. Sirnes, yarn is Malabrigo Yarn Rios

As part of my bootcamp, I was asked to present for 10 minutes on any topic. I've been crocheting since 2013 and knitting since 2018, and I had noticed some similarities between the way I approached a project in either fiber arts or programming. What I did not expect to find was a rich history of fiber arts and programming influencing each other.

### The Beginning

Fiber arts, like knitting, are crafts using yarn, string, thread, etc. This encompasses thousands of years of history, starting in 6500 BCE with Viking [Nålbinding](https://theknittinggenie.com/2018/03/06/nalbinding-crash-course/). Other crafts included under this umbrella are crochet, embroidery, weaving, and textile making.

Historically, fiber arts and programming have been very intertwined, starting with the Jacquard Loom, an attachment for powered fabric looms. It was the first machine to use a chain of punch cards to automate instructions. It enabled the loom to make intricate patterns in textiles based on the punch cards it was fed. It inspired Charles Babbage in making his analytical machine. A century later, his designs and Ada Lovelace's notes were read by the people who built the first computer.

The relationship between fiber arts and programming gets even more overt with [Core Rope Memory](http://drhart.ucoz.com/index/core_memory/0-123-0-123) (also called Little Old Lady Memory). Used in the 1960's by NASA, software written by MIT programmers was woven into core rope memory by female workers.

![a woman weaves wire to create core rope memory](https://images.abbeyperini.com/women-in-programming/weaving.jpeg)

The direction the current was forced through the wires induced field forces to circulate in a clockwise or counterclockwise direction. One direction is a stored 1, while the other is a stored 0. The result was non-volatile storage, which could retain a large amount of information without power - roughly 2.5 megabytes per cubic meter. This was an 18-fold improvement over magnetic-core memory, the standard solution used at the time.

### Now

Like computers, the textile industry has come a long way since the Jacquard Loom, integrating more and more automated manufacturing. Perhaps you'd like to [3D print a lot of knit toys](https://textiles-lab.github.io/publications/2019-visualknit/)? Makers will find a way, so when home knitting machines were no longer produced, [people built the system themselves](https://xxxclairewilliamsxxx.wordpress.com/hack-ta-machine-a-tricoter/).

[Ravelry](https://www.ravelry.com/) was established in 2007 with free membership and only fiber arts ads. Today, Ravelry is the locus of the fiber arts community with over 9 million users. Their website was the first to allow people to exchange information, tools, materials, and patterns in pdf format on a large scale and in every language, revolutionizing the industry. Furthermore, they offer discussion groups, so people can get help with patterns and techniques.

Owned and operated by 6 women, they employ a tech stack of about 10 Gentoo Linux servers, MySQL 8.0, Ruby on Rails, Manticore Search, Amazon S3 for image storage and a CDN, Redis, memcached, nginx, and haproxy.

By removing barriers to entry, Ravelry is credited with creating an explosion of interest in knitting and crochet, driving innovation in easier to follow patterns. I've personally talked with local yarn store owners about their experience before and after Ravelry, and they describe it like night and day. Knitters are now primarily 25–35 years old. Local, regional, and international knitting groups, fiber festivals, and yarn crawls have cropped up everywhere. Indie dyed yarn is now a huge business. There's renewed interest in fiber shows, which educate people on where their yarn comes from. The audience for blogs and podcasts related to fiber arts in general has grown exponentially.

### A Knitting Primer

When you knit something, you use two knitting needles. All of your stitches will be live, meaning if you drop a stitch the fabric you're creating will unravel. Patterns are created by alternating types of stitches or yarn of different colors. For example, K2P2 would mean 2 knit stitches followed by 2 purl stitches. The difference between stitches is how you feed the new loop of yarn through the live stitch on your needle. Effectively, a knit stitch goes through the front of the loop. A purl stitch goes through the back of the loop. Repeating this for several rows is how you would get a ribbed brim on a hat.

![a diagram of stockinette stitches with K2P2 ribbing](https://images.abbeyperini.com/knitting/K2P2.png)

K2P2 Ribbing

### Patterns as Programming

* Knitting pattern designers follow DRY.
* Pattern repeats are for loops, typically surrounded by brackets, asterisks, or parentheses.
* It's common to see while loops like 'until the end of the round' or 'to n stitches before marker'.
* Higher level languages like Python and Javascript use symbols and keywords to tell the computer what the desired output is, just like knitting charts.
* Like assembly languages, operands are pushed and popped onto the needles.
* Patterns are tested and retested by users for correctness, scalability, and the look of the finished object (aka expected output).
* Pattern developers prefer open source software ([Darktable](https://www.darktable.org/), [Gimp](https://www.gimp.org/), [Libre](https://www.libreoffice.org/download/download/), [Stitchmastery](https://www.stitchmastery.com/), etc.).
* Different placements of yarn and needles produce different outputs.

This shawl was created using 8 stitches - all knit based (no purl). One row was written like this: **k3, SM, (k2tog, yo) 2 times, [k1, yo, ssk, yo, sk2p, yo, k2tog, yo] to 5 stitches before marker, k1, (yo, ssk) 2 times), SM, k3**

![a lacy Dowland shawl knit in sparkly burgundy yarn](https://images.abbeyperini.com/knitting/dowland.jpeg)

Knit by Abbey Perini, pattern by Dowland by Dee O'Keefe, yarn is Meeker Street by The Jewelry Box

There have even been two (no longer supported) programming languages designed specifically for hand knitting - KnitML, a markup language, and KEL, inspired by Groovy, a Java language.

### Patterns as Regular Expressions

Say we want to make a square of ribbing. `kp` is the [regular expression](https://regexone.com/) for one knit stitch followed immediately by one purl stitch. Curly brackets are used for repeats, so `kp` repeated 10 times looks like this: `(kp){10}`. For a new row we use a new line, written, `\n`. The full regular expression for the row is then `(kp){10}\n`. Since we turn the square to knit the next row, the following line must be `pk`s, or `(pk){10}\n`. We want our square to be 40 rows, so they are in turn wrapped up in yet more brackets, producing: `((kp){10}\n(pk){10}\n){20}`. A more general pattern would look like `((kp){x}\n(pk){x}\n){y}`.

### Patterns as Tools for Teaching Programming

> "Knitting patterns have evolved from vague, chatty discourse written for experts to precise, line-by-line procedures that are akin to programs."

-- "[Following a thread: Knitting patterns and program tracing](https://www.researchgate.net/publication/241623956_Following_a_thread_Knitting_patterns_and_program_tracing)" by Michelle Craig, Andrew Peterson, Sarah Peterson

Craig, Peterson and Peterson go on to say that programmers can learn from the way the online knitting community has developed standard conventions for communicating concepts like iteration, conditions, and documenting design decisions. Specifically, the way they've come about while trying to make the patterns understandable to beginners. For example, using termination cases with "until" makes the while loop easier to understand. They also say that creating a knitted final object is analogous to tracing, as it demonstrates an understanding of the pattern.

### Conclusion

Having taught myself programming and knitting and crochet, I can safely say the mindset required is very similar. From figuring out how to make a project work as you go to regular expressions in patterns, there are a lot of parallels. Programming as it is today would not exist without fiber, and programmers could learn a thing or two about teaching beginners from the online knitting community.

I hope you enjoyed this brief overview of the history of fiber arts and programming. For general recognition and brevity's sake, I stuck to knitting, but my first fiber love will always be crochet. I personally believe in crafting as therapy for anyone, and we could all use a little self-care these days. If you've never thought of yourself as a fiber artist, but have a penchant for coding, try picking up some yarn and tools. You may be surprised.

If you're already a programming fiber artist with Ravelry projects, check out my project, [Knitworthy](http://knitworthy.net/)!

### Additional Fun

[Knitting is Coding and Yarn Is Programmable in This Physics Lab](https://www.nytimes.com/2019/05/17/science/math-physics-knitting-matsumoto.html)

[Knitting is an acceptable Lisp](http://wetpixels.blogspot.com/2009/02/knitting-is-acceptable-lisp.html?m=1)

A programmer worked with his daughter to [convert text instruction to charts using Perl](http://www.mcmanis.com/chuck/graphics/knit-chart.svg)

### Additional Sources

[Knitters and Coders: separated at birth?](http://www.cs4fn.org/regularexpressions/knitters.php)

[Carrie and Dave Stokes - K2P1 or How Your Programming Language Evolved from Knitting](https://www.youtube.com/watch?v=UR8iHwOczfI&ab_channel=southeastlinuxfest)

[Knitting as Programming](https://news.ycombinator.com/item?id=3986758)

Cover picture was knit by Abbey Perini. The pattern is Embrace Octopus Sweater by Maia E. Sirnes. The yarn is Malabrigo Rios in Whale Road and Natural.
