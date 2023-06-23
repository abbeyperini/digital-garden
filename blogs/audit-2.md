# Accessibility Auditing My Portfolio Site - Part 2

Planted: 11/04/2021
Tags: audit, accessibility

![a screenshot of the contact section with updated links on abbeyperini.dev](https://images.abbeyperini.com/audit-series/contact.png)

[Read part 1 - The Audit](/blog.html?blog=audit-1)

This article is comprised of several accessibility vignettes. It's a collection of short stories about quick fixes - some amuse-bouches, if you will. Researching, coding fixes, and writing the bulk of this blog took me less than three hours.

Accessibility Auditing My Portfolio Site - Parts 3, 4, and 5 will cover the dark mode toggle fixes, solving the blog preview component issues, and finally, a deep dive into getting my full blog page into a more accessible state.

## The Quick Fixes

### Problem 1&semi;

Make sure words like "below" still makes sense without visual context.

### Solution 1&semi;

I removed the word "below" from the description of my Old Wall Site project in my portfolio section. Even with visuals, it only made sense on mobile. I'm pretty sure I just copied it directly from the original static portfolio site I was using and didn't think about it.

### Problem 2&semi;

Redundant [alt-text](https://supercooldesign.co.uk/blog/how-to-write-good-alt-text)

### Solution 2&semi;

I updated my headshot (the old one was so 2019) and added descriptive alt-text. Previously, it was just my name. I also tweaked the alt-text for my Old Wall Site screenshots in my portfolio section so they were both more descriptive and not the exact same thing.

![a screenshot of the About Abbey section with an updated headshot on abbeyperini.dev](https://images.abbeyperini.com/audit-series/about.jpeg)

### Problem 3&semi;

While using a screen reader, I noticed my blog preview component heading was just read as a button and my page title was just "Abbey Perini."

### Solution 3&semi;

I changed my page title to "Abbey Perini's Portfolio and Blog" and wrapped my blog preview component heading button in an `<h1>`. In testing with a screen reader, I found I needed to add an `aria-label` attribute to make it obvious it was also a button. The size of the container also changed, so I had to take my `font-size` CSS property value down from `2em` to `1em`.

### Problem 4&semi;

I received multiple warnings to check that my SVGs had attributes like `focusable` and `aria-labelledby.` I got errors because they did not have unique ids. I have 1 decorative arrow SVG on my landing page, 1 - 2 SVGs to indicate links in the descriptions of my portfolio projects, and a section of skills badge SVGs in my about section. While manually testing with a screen reader, I was pleased to find the skill badges had accessible labels, but they were long and redundant.

### Solution 4&semi;

For the decorative arrow and skill badges, I added the unique ids in the SVG code itself. For all the SVGs, I added the appropriate `focusable` attributes (set to true or false) where they were imported in the components. I had followed a tutorial in [this blog](/blog.html?blog=shibas#:~:text=A%20note%20on%20SVG%20accessibility) and given all my SVGs `aria-labelledby` attributes that included both the `<title>` and `<desc>`. I updated them to only include the `<desc>` to decrease redundancy when they are read by a screen reader.

Before:

```HTML
<svg role="img" aria-labelledby="arrowTitle arrowDesc" fill='none' stroke='#0E1A27' stroke-width='8' stroke-dashoffset='0' stroke-dasharray='0' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
<title id="arrowTitle">Arrow</title>
<desc id="arrowDesc">arrow that spins on hover</desc>
<line x1="70" y1="50" x2="0" y2="50" /><polyline fill="none" points="30,10 80,50 30,90 "/></svg>
```

After:

```HTML
<svg id="arrow" role="img" aria-labelledby="arrowDesc" fill='none' stroke='#0E1A27' stroke-width='8' stroke-dashoffset='0' stroke-dasharray='0' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
<title id="arrowTitle">Arrow</title>
<desc id="arrowDesc">arrow that spins on hover</desc>
<line x1="70" y1="50" x2="0" y2="50" /><polyline fill="none" points="30,10 80,50 30,90 "/></svg>
```

The SVGs for the Github and Chrome links in my portfolio section were special. I took the `<title>` and `<desc>` elements and the `aria-labelledby` attribute out of the SVG code. Because I want to use the same code with different ids and attributes multiple times, I added unique ids and `aria-label` and `focusable` attributes where they are imported in my components.

```HTML
<span className="subwork_links">
  <a className="link-new-tab" href="https://github.com/abbeyperini/BujoToGo" target="_blank" rel="noreferrer"><Github id="BujoToGoGithub" aria-label="open BujoToGo Github repository in a new tab" focusable="true" className="work_icon"/></a>
  <a className="link-new-tab" href="http://bujo-to-go.surge.sh/#/index" target="_blank" rel="noreferrer"><Chrome id="BujoToGoChrome" aria-label="open BujoToGo website in a new tab" focusable="true" className="work_icon"/></a>
</span>
```

### Problem 5&semi;

Users must be warned if a link opens a new tab, both visually and with screen reader text, because it can be disorienting.

### Solution 5&semi;

Obviously, the easiest way to fix this would be not to have links that open a new tab. Because it was recommended to me that my portfolio site open links in new tabs for potential interviewers, and I've designed my site so that if you leave the page, you have to click a button on the landing page and navigate back to where you were, I've gone in the opposite direction and updated all of my links to open a new tab.

I updated all my links' `aria-label` attributes to say they'll open in a new tab - you can see examples in the 3rd codeblock for Problem 4. Then I added external link SVGs I grabbed from [Heroicons](https://heroicons.com/) to the links I have in in my contact section. I used CSS to size and position these appropriately:

```CSS
.external-link {
  height: 1em;
  width: 1em;
  top: .15em;
  position: relative;
}
```

If I wanted these to be the most accessible, I would also add another visual cue that showed "this link will open in a new tab" on hover or focus. This would be ideal for the links attached to the Github and Chrome SVGs and for keyboard and unassisted users that don't know what the external icon link means. However, I would want to spend time I don't have today designing a nice-looking version of that, so I've [added this to my Github repository](https://github.com/abbeyperini/Portfolio2.0/issues/3) as my first backlog issue for this site.

### Problem 6&semi;

I received warnings to add accessible labels for my `<aside>` elements and to add [landmark roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/roles/landmark_role) where necessary.

### Solution 6&semi;

I didn't immediately understand what these warnings meant. When I used the screen reader, I heard "main" when I focused on my site and "complementary" when I reached my contact section. Turns out semantically, [`<aside>` has a role of complementary](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Complementary_role). If you have multiple `<aside>` elements, you want to add accessible labels so a screen reader can differentiate between them. As the few landmark roles I would want to add are covered by semantic HTML, I've added `aria-label` attributes for my content sections. Now all my content sections have descriptive screen reader text.

### Problem 7&semi;

PDFs have lots of accessibility issues and I have two links to download my resume as a PDF.

### Solution 7&semi;

For those file downloads, I needed to develop [accessible PDFs](https://sfgov.org/developing-accessible-pdfs) either by adding an HTML resume or formatting and tagging the existing file appropriately. Luckily, I found an excellent tool for formatting and tagging PDFs - [PAVE](https://pave-pdf.org/?lang=en). With this tool, I was able to edit my PDF with appropriate tags and headings based on their recommendations in the browser for free. I've also grabbed a download icon SVG from [Heroicons](https://heroicons.com/) and added it to these two links.

![a screenshot of the contact section with updated links on abbeyperini.dev](https://images.abbeyperini.com/audit-series/contact.png)

## Conclusion

Part of what's overwhelming about accessibility auditing a site is the number of nitty gritty details. I hope this shows that even bite-sized accessibility improvements can go a long way.

It is far easier to navigate my site with a screen reader with all these `aria-label` updates.  Writing good descriptive alt-text takes practice. I highly recommend using a screen reader for context and adding alt-text to images in your social media posts for practice. I'll never look at links, file downloads, or PDFs the same way again.

[Read Part 3 - An Accessible Dark Mode Toggle in React](/blog.html?blog=audit-3)
I make my dark mode toggle accessible, refactor it, and re-test my site.

[Read Part 4 - Blog Preview Component](/blog.html?blog=audit-4)
In which I find out what a keyboard trap really is.

[Read Part 5 - Blog Page Accessibility Deep Dive](/blog.html?blog=audit-5)
In which I find a security vulnerability, write a surprising number of regexes, and this series becomes a thesis.

[Read Part 6 - The Finale](/blog.html?blog=audit-6)
