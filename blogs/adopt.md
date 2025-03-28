## If They'll Adopt It, It's Right

![a guy in a suit saying "well, you're not wrong"](https://images.abbeyperini.com/adopt/not-wrong.jpg)

It's no secret Andy Bell, Alex Riviere, and I love CSS. Alex recently wrote [Grid First, Flex Third](https://alex.party/posts/2025-03-23-grid-first-flex-third/). (I found the part about how some of us are rewriting `display: block` with `display: flex` especially interesting.) Then [Andy wrote a response](https://piccalil.li/blog/if-it-works-its-right/) eschewing absolutes and talking about how some people will always prefer flex over grid. (His [CUBE system](https://piccalil.li/blog/cube-css/) is similar to how I write CSS when left to my own devices.)

Neither of them are wrong. Both of them have many years of experience and enjoy thinking about how the stylesheets cascade. If you enjoy thinking about the same kind of thing, you should go read both articles.

Andy's main point is absolutely correct.

> If it works, it's right. - [Rachel Andrew](https://rachelandrew.co.uk/)

His CUBE CSS article touches on another important point - the challenge is getting people to use whatever system you come up with. He mentions how people often think a single tool, like Tailwind, will be the silver bullet for a styling system for a large project.

Alex is my boss so I know anger and frustration are typically what drive him to write. I also know what code he's angry about. Alex and I have been repeatedly hitting a point where we can't update something without completely restyling it. We've been trading off ripping out components and page structures and rewriting them. The main issue is that there are tools (e.g. Tailwind and component libraries), but no system. Everything is copy and pasted ooze. (I propose ooze as a term for something that's less organized than soup.)

```HTML
<!-- ooze -->
<div class="flex flex-col">
  <div class="flex gap-2 w-full">
    <div class="flex flex-col flex-1 w-4/5">
      <div class="flex gap-2 flex-2">
       <button class="border border-blue bg-grey flex rounded-lg">
         View More
         <img src="~/assets/down-caret" class="w-24 h-24" />
       </button>
      </div>
      <button class="border border-blue bg-[#cccccc] flex rounded-lg">
        Cancel
      </button>
      <div class="flex gap-2 flex-2">
        <div class="flex gap-4">
         <button class="border border-blue bg-blue flex rounded-lg">
           Apply
         </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

To Andy's point, he'd still be angry if it was CSS grid ooze.

In past articles ([From Idea to Design for Non-Designers](/blog.html?blog=design) and [Tips on Extensible and Maintainable Components article](https://piccalil.li/blog/tips-on-extensible-and-maintainable-components/) that I wrote with Andy), I've talked about how any software project is a living system. Every tool has trade-offs. Updates and new requirements will happen. You need to be able to jump back into it even if you haven't touched it 6 months or years.

I agree with Andy and Alex - we should be thinking about how to use CSS (or any tool) most effectively. It seems to me that developers are often keen to examine trade-offs, refactor, and measure things like readability with most programming languages. When it comes to CSS, many panic and throw that out the window. Part of it is that CSS works differently than any other programming language they've used. But a lot of it is the lack of intentionality most teams have with their styling tool of choice. This isn't the first codebase I've worked in where I've had to overhaul the styling just to get some work done.

I'm sure the developers before us could have made a useable styling system with Tailwind. I do think Tailwind and other CSS frameworks add extra hurdles when you're trying to style intentionally for large projects. The way they are written encourages developers to copy and paste their styling unintentionally. And to make an intentional, easy to adopt system with them requires the same work you'd do with CSS on top of wresting with the framework itself. (Even on a small project, you'll need to override [inaccessible choices](https://github.com/tailwindlabs/tailwindcss/issues/8961), which means you'll still need to know CSS.)

![Gru, a villain, presenting his evil plan - learn to create a website, add HTML to it, and add CSS to it. Then "add CSS to it" is poorly aligned and he looks confused.](https://images.abbeyperini.com/adopt/css.jpeg)

Early in my career, I had already fallen in love with CSS before I was told I should hate it. I also had the honor of working with one of the smartest people I'll ever work with. He was mainly a back-end developer who didn't want to think about CSS. Usually, we would pair and I would build the front-end portion. On one project we worked on together, I logged in hours before a deadline to see that a PR had been merged with a brand-new, full-stack feature. I rushed to look at how he had styled it. It was exactly how I would have styled it. Later that day, he told me "That was so easy to style." I've been chasing that high ever since.

What made it so easy to style? I'd love to say it was that we were using grid, block, and flex in CSS in the right amounts. In reality, it was the same kinds of things people recommend for any other programming language.

- If we found it was repeated 3 times, we'd make a reusable class.
- We gave classes concise, human-readable names.
- Our stylesheets were heavily commented.
- Our stylesheets were grouped by functionality.
- We tried to keep our styling consistent across pages.
- We tried to avoid overriding styles, `!important`, or anything that generated inconsistent results.
- We tried to use local scope over global scope where possible.

It's the right styling system if someone who doesn't want to know CSS can adopt it easily. Use every tool in your toolbox intentionally and effectively. Write your code so that you in 6 months or the back-end dev will immediately understand it.

If they'll adopt it, it's right.
