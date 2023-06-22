# From Research to Writing Reference Material

Planted: 02/07/2023
Tags: on writing

![the tips of colored pencils on a white background](https://images.abbeyperini.com/pencils.jpeg)

I don't know about you, but I send a lot of links to my coworkers about why I've chosen to build something a certain way. Here's how to take that kind of research and turn it into reference material.

## Style Guides

For 10+ years in school, I wrote a lot of research papers and had to follow a couple style guides.

In middle and high school English class, it was the [Modern Language Association (MLA)](https://owl.purdue.edu/owl/research_and_citation/mla_style/mla_formatting_and_style_guide/mla_formatting_and_style_guide.html) style guide. While doing psychological research, I had to follow the [American Psychological Association (APA)](https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/general_format.html) style guide. One that I have not used but is often used in publishing is [The Chicago Manual of Style (CMOS)](https://owl.purdue.edu/owl/research_and_citation/chicago_manual_17th_edition/cmos_formatting_and_style_guide/chicago_manual_of_style_17th_edition.html).

Like the [PEP](https://peps.python.org/pep-0008/) has rules for writing Python, style guides have rules for writing up your research. They include things like punctuation, how to group your paragraphs, sections you must include, and best practices. They often exist to communicate industry expectations you must meet to get published.

Most relevant to writing up your research, they have guidelines for how to [cite your sources](https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/in_text_citations_the_basics.html). They cover concepts like using short and long quotations, paraphrasing, and reference lists if you'd prefer to use those over in-text citations.

Because I'm not aiming to get published in a psychological journal anymore, I have more freedom in how I'm citing my sources in my technical blog writing. However, developers (including me) love being technically correct, so my goal is to link to something backing up every assertion or paraphrase I write.

I use direct quotes more rarely in my technical blogging.

"Luckily, I was able to attend [Todd Libby's Lunch and Learn](https://www.youtube.com/watch?v=BhUtMZtv-DQ&ab_channel=VirtualCoffee).  ...Todd said 'No site is 100% accessible, especially as you update it, but we can aim to get close,' so let's aim for close." - [Accessibility Auditing My Portfolio Site - Part 1](https://dev.to/abbeyperini/accessibility-auditing-my-portfolio-site-part-1-2k8k#:~:text=Luckily%2C%20I%20was,aim%20for%20close.)

Paraphrasing flows more naturally.

"Both types of compression support transparency and provide [smaller images](https://developers.google.com/speed/webp/docs/webp_study) than PNG or JPEG compression." - [What is WebP?](https://dev.to/abbeyperini/what-is-webp-2pob#:~:text=Both%20types%20of%20compression%20support%20transparency%20and%20provide%20smaller%20images%20than%20PNG%20or%20JPEG%20compression.)

I also link to things I think a reader might want to know more about, like larger technical concepts and packages I'm using.

"In this way, the browser is functioning as a [runtime environment](https://www.codecademy.com/article/introduction-to-javascript-runtime-environments) for client or client-side code." - [A Beginner's Guide to HTTP - Part 1: Definitions](https://dev.to/abbeyperini/a-beginners-guide-to-http-part-1-definitions-38m7#:~:text=In%20this%20way%2C%20the%20browser%20is%20functioning%20as%20a%20runtime%20environment%20for%20client%20or%20client%2Dside%20code.)

## The Note Card Method

I am forever grateful to my middle school science teacher who took us to the library and walked us through how to take notes on note cards for writing research papers. Each note card was for one or more quotes you would use in your paper. Additionally, it would include the information you would use to cite it - the author, the page number, and the title of the book (or a code or abbreviation if the title was really long). That way, you could use your library time to research and write the paper itself later.

Since we're mainly digital with coding blogs and not following a specific style guide, we can just copy that information and paste it into the blog while we're writing.

The title of the book translates to a link.

Instead of a page number, we'll want to link to specific part of a page. You can use a [URL fragment identifier](https://www.oreilly.com/library/view/web-design-in/0596009879/ch11s02s01.html) if there's a heading. If not, a [text fragment](https://developer.mozilla.org/en-US/docs/Web/Text_fragments) will work. You can easily make one with [copy link to highlight](https://support.google.com/chrome/answer/10256233?hl=en&co=GENIE.Platform%3DDesktop). You can even include the author or publication in your link text.

Put all together, a direct quote looks like this:

`[According to the World Wide Web Consortium](https://www.w3.org/WAI/standards-guidelines/aria/#:~:text=more%20accessible%20to%20people%20with%20disabilities.), WAI-ARIA, the Accessible Rich Internet Applications Suite, aims to make the web "more accessible to people with disabilities."`

Some paraphrasing and defining an acronym with a link looks like this:

`Specifically, WAI-ARIA [defines ways to provide functionality for users dependent on screen readers or pointer systems other than a mouse](https://www.w3.org/WAI/standards-guidelines/aria/) when building [UI](https://en.wikipedia.org/wiki/User_interface) controls developed with HTML, JavaScript, and related technologies.`

## Evaluating Sources

I would be remiss if I didn't mention your primary job while researching is evaluating your sources. Everyone has bias and a point of view.

Say you're looking to write an unbiased review of a development tool. You're unlikely to find anything critical of the tool on the website of the company that made it. You may find a big list of cons of using that tool on a competitor's site, but none of the pros. Neither stance is particularly nuanced, but together they provide a picture that you can use to start evaluating the tool.

I copy code from Stackoverflow with the best of them, but I got the advice early in my programming studies that you always want to type out and understand the code you're using. This goes double for code you're publishing. Always run it to make sure it works. More than once I've caught a mistake or misconception just by running every code block I'm about to publish.

I love [Mozilla Developer Network](https://developer.mozilla.org/en-US/). I recommend their Getting Started with the Web guide often, especially the [Accessibility section](https://developer.mozilla.org/en-US/docs/Learn/Accessibility). However, like Wikipedia, [anyone can contribute](https://github.com/mdn/content). I link to them for plain English explanations of basic web concepts and lists of HTML element attributes, CSS properties, and JavaScript methods. When I do, I try to make sure there's a link to the specification or double-check the information against another source.

Reference documentation or the specification for a programming language is usually a safe bet. You just have to check the version and last edit date. We all know from experience how easy it is to let documentation fall out of date.

## Conclusion

I hope this answers [@teejay128 's question](https://dev.to/teejay128/comment/23ahn) on [Writing a Technical Blog](https://dev.to/abbeyperini/writing-a-technical-blog-79o).

Furthermore, I hope this encourages those who feel they have to be an expert to write more blogs. Hundreds of research papers taught me you just need to cite and think critically about what you're citing.
