# 8 Things I've Learned Working in a Legacy Codebase

Planted: 09/16/2021
Tags: career

![The Jurassic Park logo edited to say "Legacy Code". Captioned "It Worked For 65 Million Years. No One Knows How. No One Knows Why."](https://images.abbeyperini.com/legacy/cover.png)

My first dev job threw me into a huge legacy codebase. My last big ticket involved getting a modern library to work within the deprecated UI framework it uses. After that journey, I wanted to share some tips I've learned along the way.

## (1) Learn the codebase by fixing bugs&period;

![A cockroach sits at a table in the Krusty Krab, happily eating a Krabby Patty](https:////images.abbeyperini.com/legacy/bug-eating.gif)

Ideally your company will have good documentation, but often legacy codebases are the ones that used to be maintained by that one developer who left. Reading through the entire codebase to get up to speed may be nigh impossible. I've found fixing bugs is a great way to get to know your app's "personality" while getting more familiar with its workflows. Even just reading backlog tickets gives you an idea of the company's priorities, abbreviations, and what the users want fixed.

## (2) Tutorials and reference materials may be hard to find&period;

This is especially true if any of the packages, libraries, or tools in the codebase have been deprecated. Get familiar with the versions of what you have installed. Include the version in your Googling. Even if you can find tutorials, your app may be written in a different design pattern. Plus, a lot of tutorials act like the app is built around the tool they're demonstrating. Getting something to work inside an established, opinionated app is a whole new ballgame. Don't be afraid to try literally any idea that occurs to you.

## (3) You'll want to lean on people who have more experience with the app&period;

This doesn't just mean other devs. QA, data science, and project managers who have worked on the app for years will know things that will help you immensely. When I get stuck trying to find where a bug is coming from, I'll often ask them "Is there a workflow that could affect this that I'm missing?" Sometimes, knowing how a feature was implemented will give you an idea of why a bug has only started happening now, was just reported, or not a priority to fix.

## (4) Always check to see if someone has solved the problem previously before writing a whole new way to solve it&period;

Lean on utilities and code previously written. If you're not adding in a new type of data, the interactions with the database you're trying to implement probably already exist. Don't forget to look at workflows outside of the one you're currently trying to fix. Previous developers were only looking at their tickets not yours.

## (5) Try not to ever duplicate code&period;

Get familiar with your codebase's utilities and import methods so you can use the already written code you need anywhere in the codebase. No need to add complexity or have to change things in multiple places. A legacy codebase that has already had plenty of developers on it probably has more than one example of both. Plus, they may have known about a quirk in the system you don't.

## (6) On the flip side, lots of utilities means lots of abstraction&period;

![A seagull and crab discuss the crab's mysterious journey in a small row boat, ending with "any details will remain a mystery."](https://dev-to-uploads.s3.amazonaws.com/i/88u7xuipr0mj1kxlwkn5.png)
*[Source](http://www.poorlydrawnlines.com/comic/your-story/)*

Functions that rely on the established utilities can become very dense to read from start to finish. It's ok to only have a high level understanding of what a utility does. If you ever need to implement it in another place or something has gone horribly wrong within it, that's the time to dig deep into how it works.

## (7) If you don't have an answer for how you'd improve it, don't complain about it&period;

You don't know the time constraints that developer was under or if they were told to go in a direction they didn't personally agree with. If you do have an answer, discuss with your team whether that's a priority you can dedicate time to. If it's a small ticket or something you can break into small tickets, you can use those passion projects as rewards for completing the bugs that really challenged you or didn't challenge you at all.

## (8) "Let's limit the scope of this." is your new motto&period;

You want to try to affect as few workflows as possible. A legacy codebase is usually pretty stable and something people are counting on to work. Sweeping reform is tempting, but often your job is just to patch up the small holes.
