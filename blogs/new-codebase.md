## Getting Started in a New Codebase

![Mufasa says to Simba "One day, son... All this legacy code will be yours"](https://images.abbeyperini.com/new-codebase/simba.jpg)

[Watch the talk version on The Monthly Dev](https://www.youtube.com/watch?v=XWW1hQEnERQ)

Whether it's contributing to open source or starting a new job, the first step is familiarizing yourself with the codebase, and it can be daunting. Here are some tips to help you hit the ground running.

### 1. Don't Panic

Even if everything about the codebase is new to you, the first step is always the same.

Make a local copy of the application on your computer.

### 2. Try to Get it Running Locally

For once, Yoda is wrong - there is "try" and "do" in this step. If you're unable to get the project running based on the information you have, you can help mitigate the problem now, before the next developer is onboarded. Plus, regardless of the outcome, you'll still move on to steps 3 and 4.

Ideally, there should be a file called `README` in the root directory of the application. This should have details about the project and instructions on how to run the codebase. If you're using GitHub and visit the repository page, this is the file displayed after the file directory.

If there's no README or documentation, try to find the run scripts. Manifest files are a good place to start. For example, in an application using [Node.js](https://nodejs.org/en), [npm](https://www.npmjs.com/), or [yarn](https://classic.yarnpkg.com/en/), the manifest file is called `package.json`. In addition to metadata about the project, the file may have a scripts section.

```JSON
"scripts": { 
  "build": "next build",
  "start": "next build && start", 
  "test": "jest --watchAll --verbose" 
}
```

These scripts are run with your package manager in the terminal like `npm run start` or `yarn run test`.

If the manifest file doesn't exist or doesn't have a run script, try executing outermost files that are named "index" or have the same name as the directory or project. If you navigate to the directory the file is in, you can execute a file in the terminal like `./index.js`.

Ideally, projects like this will also have a help flag. Executing `./index.js --help` may print out helpful instructions, including a list of commands you can use.

If you're on a mac or using linux, you can also try `man <command>`. This will print out a user manual for the command. If it exists, it'll have more information than the `--help` flag did. If it doesn't exist, you'll see "No manual entry for `<command>`". Running `man ./index.js` will just print out the file itself. If you're on Windows, you'll have to use a package, like [groff](https://gnuwin32.sourceforge.net/packages/groff.htm). You may even want to use groff with macOS or linux - it displays the manual in the browser instead of in the terminal.

### 3. Look for Documentation

Developer-focused documentation may exist outside the project. It could be in the GitHub repository wiki, a company-owned docs site, or a Google Doc that's sent to you on your first day. Get access to a deployed environment as soon as you can. You'll learn a lot playing around with a working version with test data.

You can also find value in documentation for users or other teams within the company. More than once, I've learned about a feature or new ways to use a feature from the user manual. These are also less technical, so they are easier to absorb when you're already taking in a lot of information.

![escape room concept: You are a software engineer. There is a production issue related to a legacy codebase. No one knows how it works. Various credentials are scattered around the office on post-it notes. There's some printouts of git diffs. You have an hour to fix this.](https://images.abbeyperini.com/new-codebase/escape.jpg)

There are multiple other ways a project is documented that people don't think of as docs. This can be helpful at companies that unfortunately don't prioritize documentation. For example, tests are usually a one-sentence description of functionality. They often describe what the app is supposed to do as well as what it's not supposed to do.

Even if no developer on the project has ever written a descriptive commit message, git and GitHub will still have useful documentation. Check out branches to see if there's a branch naming convention. Read old pull requests to get an idea of the code review process. `git log` and [git blame](https://git-scm.com/docs/git-blame) will give you an idea of feature and fix timelines.

Whether the team uses GitHub Issues, JIRA, or another work tracking system, I highly recommend searching to see if a ticket exists before you complain about something. Tickets will also give you a good idea of team goals, users' complaints, bottlenecks, and processes.

### 4. Talk to People

Ask developers what they wish they knew when they started. Ask what tools (e.g. browser extensions, editor plugins, state inspectors, etc.) they find useful for this project.

Ask to pair with other developers on their work or as soon as you hit your first roadblock. If the idea of asking for help with your code makes you nervous, check out [Virtual Coffee's Guide to Asking Questions About Your Code](https://virtualcoffee.io/resources/developer-resources/developer-tips/asking-coding-questions).

If you hear about a bug fix, ask the developer working on it what they checked first. This is how you find out where the useful logs are and which parts of the app are most flaky.

![Two people with a small dog. One asks "does he bite?". The other person responds "No. But he can hurt you in other ways." The dog asks "How many users have you involved during product development?" The first person cries.](https://images.abbeyperini.com/new-codebase/users.png)

Schedule meetings with team members who aren't developers. The Product Manager can tell you the big goals for the project. The Product Owner can tell you what's prioritized for the short term. QA can tell you what's flaky, what kinds of bugs are high priority, and if they need something fixed to help them catch more bugs.

If you're working in open source, join any communities related to the project. Listening to the maintainers, other contributors, and community forums can tell you a lot about what part of the app needs more love.

### 5. Know the Business

Understanding the code is much easier with context. This is especially true when it comes to variable names. It behooves you to understand common industry terms and acronyms.

It may seem like it's outside of your role to understand the industry. However, if you hear about a service a direct competitor just started providing and know how to implement it in your product, that's a big win to bring to your boss. In highly regulated industries, like healthcare, some industry knowledge could help you catch a vulnerability in the product design early. That could save the company a ton of money and looks great when you go to negotiate a raise or interview somewhere else.

At the very least, it'll be easier to understand meetings and predict edge cases.

### 6. Mental Models

A great way to conceptualize any application is creating some high-level mental models.

I really love drawing flow charts and diagrams for applications. Tools like [miro](https://miro.com/) and [whimsical](https://whimsical.com/) make it easy and shareable. These can be as simple as a tree of components or files and how they relate to each other. Flow charts following the flow of data are super useful, especially if there are any integrations, micro-services, or [pub/sub](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern).

You don't just have to use drawings to create these mental models. It's common to write out what each API endpoint does, including request and response structure.

There are a few reasons I'm recommending manual methods for creating these diagrams and documentation. You may not have or be able to get permission to feed the code into a code visualization tool or AI. You may not have the requisite knowledge to recognize if the tool spit out some incorrect information. Finally, manually reorganizing all of the information you've learned so far is a different type of learning than reading a summary a tool made. Putting it all into context yourself increases the chances that the information will make it into your long-term memory.

Once you're finished, ask a developer who is more familiar with the project if you missed anything.

### 7. Break It

![elmo, raising his hands triumphantly in front of flames](https://images.abbeyperini.com/new-codebase/elmo.jpeg)

Run into a long function you're having trouble grasping? Delete a line. See what happens. Repeat.

Unable to follow the data flow? Use breakpoints in a debugger.

Feed the app bad data. I dare you.

Remove some props passed to a component just to see what errors pop up.

Read the logs you've created with your mess.

If you've seen the app break that way before, it's easier to narrow down what part of the app is broken when a bug comes up.

### 8. Fix It

Even senior developers have to get used to the process in a new repository. Just fixing a typo will allow you to watch the team's process from ticket creation all the way to deployment.

### 9. Give It Time

Learning the codebase feels URGENT, but you can't learn everything at once. With every PR you learn a little bit more, so give yourself time and grace. A typical expectation is six months to ramp up, so if your code is getting merged in before then, you're doing great.

### Conclusion

If I missed your favorite tip for learning a new codebase, tell us about it in the comments!
