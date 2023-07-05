## #gitPanic - Working in a Repo

Knowledge Level: Evergreen

Planted: 11/08/2022

Last Tended: 11/16/2022

Topics: [git](/topic.html?topic=git), [github](/topic.html?topic=github), [coding](/topic.html?topic=coding)

Series: [#gitPanic](/series.html?series=gitPanic)

![Kip from Napoleon Dynamite stirring coffee and saying created repo and made na initial commit os I guess you could say things are getting pretty serious](https://images.abbeyperini.com/gitPanic/commit.png)

When I started my current role, I had been using git in a professional setting, but not GitHub. I was surprised to find out how much I had to interact with other developers to get my code deployed. Let's talk about expectations when working with other developers in a repo.

This article assumes you already have a general understanding of git or have read [git 101](/blog.html?blog=gitPanic-1) and [merging and rebasing](/blog.html?blog=gitPanic-2).

1. [Protections](#protections)
2. [Environments](#environments)
3. [Issues](#issues)
4. [Branch Names](#branch-names)
5. [Commit Messages](#commit-messages)
6. [Pull Requests](#pull-requests)
7. [Code reviews](#code-reviews)
8. [Forking](#forking)

### Protections

GitHub has [tons of settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings) for securing your repository. The first is whether you choose to make it public or private. Even if you keep it public, you can restrict who can contribute by [managing access](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-teams-and-people-with-access-to-your-repository).

It is possible in GitHub to enforce [protections by branch](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches). Often automated testing and deployment are built in to the repo using these settings. Running an app locally and deploying it are usually very different. The person in charge of automating this process is a [DevOps](https://www.atlassian.com/devops) engineer. To automate this is called continuous integration and continuous deployment or CI/CD. [GitHub actions](https://github.com/features/actions) are a GitHub feature for this. There are also many other tools out there like [circleci](https://circleci.com/). A CI/CD pipeline is an efficient way to catch issues with new code.

![Anakin Padme meme sr developer says it's running in the dev environment jr developer says Yes. Let's push it to production. It will work. sr developer is silent jr developer says Let's push it to production. It will work, right?](https://images.abbeyperini.com/gitPanic/prod.jpg)

For example, the branch with code that is deployed to production will have limited access. It is typical for force pushing (`git push --force`) to be disallowed in important branches. Same goes for requiring another developer to review and approve any code you want to merge. There will be a branch with more access for untested code. In professional development, teams typically have their branches set up based on the environments they have set up. Every time you merge new code in to one of these protected branches, an established CI/CD process would run tests and deploy to the appropriate environment for you.

### Environments

The main reason to have different environments is testing. The environment you're most familiar with is local, when you're running a server on your local machine and using a localhost URL.

The development environment is for code that was just written. Local is usually treated the same as development, so you'll be creating your branches to work in off of the develop branch and merging into the develop branch.

Code from the develop branch will be merged into the QA branch. QA stands for Quality Assurance and in an ideal world, you'll have a whole QA team testing your code for you.

After QA, you'll sometimes have a UAT or user acceptance testing environment. Developers and QA testers understand technical concepts and the intended use of the code. Users will always surprise you and break things in novel ways.

Finally, you'll have a production environment. You may see a branch named prod, but it's usually the main branch. When developers talking about "pushing to prod," this is what they mean. When the code has made it here, it goes live for the users.

Keeping all these environments separate helps keep development unblocked and testing straightforward. Production should always be as stable and bug free as possible. Development is where you can experiment. If you introduce a bunch of changes to QA at once, that's more things you have to eliminate as the cause when QA finds the bug.

Each of the environments will differ. They'll be deployed to unique URLs. The URL and other values that change based on environment will be passed to the environment and app as [environment variables](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa)

### Issues

![a small brown bird with very large yellow eyes on a black background captioned I create github issues just for the satisfaction of closing them](https://images.abbeyperini.com/gitPanic/github-meme.png)

I mentioned in the first blog that one of GitHub's many features is tracking work. This is where [GitHub issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues) come into play. Your team may use another work tracking tool like [Jira](https://www.atlassian.com/software/jira) to make tickets. They're the same thing as and often integrate with GitHub's issues.

Creating tickets and issues is another blog post entirely, but you'll use the issue number, labels, and title in branch names, commit messages, and pull requests.

### Branch Names

Often people won't care about branch names, just that you delete your branches when you're done with them. We covered a couple ways to delete local branches in the last blog. You can delete a remote branch in the Github UI in the branches tab or run

```bash
git push origin --delete branch-name
```

Name branches in a way that helps you remember them, because you will be switching between them a lot. Don't use camel case. Do separate words with a hyphen. Typically the naming structure is `type--issue-name` or `type/issue-name` where type is a [conventional commit type](https://www.conventionalcommits.org/en/v1.0.0/). You can typically find the type for your branch in a label on the issue, but you assess the type for each commit individually.

### Commit Messages

I recommend reading [How to Write a Git Commit Message](https://cbea.ms/git-commit/). The most commonly used commit message specification I've come across is [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). Some repositories are set up so that commit messages automatically populate their [changelog](https://keepachangelog.com/en/1.0.0/). For example, including "breaking change" in the footer will trigger a [major semantic version](https://semver.org/) change.

The fact is, writing good commit messages only helps you. It's like taking notes on your code changes, with the opportunity to explain why you made those decisions. Basically, it's documentation baked into the version control process. Another developer can come into your repo and understand a lot about your development process just by reading the commit history. GitHub has a feature called [git blame](https://docs.github.com/en/repositories/working-with-files/using-files/viewing-a-file) that lets you read commit message history line by line in a file. There's even a [VS Code extension](https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame) for it.

When I introduced committing, I used

```bash
git commit -m "message"
```

The `-m` option allows you to pass a message string inline. If you don't add this option to the command, this is another time git will [open a window](/blog.html?blog=gitPanic-2#:~:text=will%20need%20to-,open%20a%20window,-to%20allow%20you) to allow you to edit something. I personally use [VS Code's integrated source control management](https://code.visualstudio.com/docs/sourcecontrol/overview) for my commit messages. I've added a blog I wrote about [commit message templates](/blog.html?blog=commit) to this series. A commit message template will remind you of what information to include and how many characters you have to do it when you go to write the message.

There is even an amend option that allows you to edit the last commit you made if you forgot something, including changes you forgot to stage:

```bash
git commit --amend
```

You will encounter repos where no one cares about the quality of your commit messages. You may encounter repos where people really really care about the quality of the commit messages. You'll come across ones where people only care about the quality of your squash merge commit message at the end of a pull request.

![A standing stick figure says to one sitting in front of a computer: "Bob, all your commit messages say 'small changes'! Next time, Please write a meaningful message." Now alone, the programmer thinks "meaningful message..." and then types git commit -m "What is life if full of care. If we have no time to stand and stare..."](https://images.abbeyperini.com/gitPanic/messages.jpeg)

### Pull Requests

After pushing all our commits up to the remote branch, we want to merge them into another branch. It's time to [open a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

A pull request, or PR, compares the branch with your new changes to a base branch that you want to merge those changes into. Once it's opened, a PR shows the diff and commit history along with a description and title you write.

GitHub will try and pull a title from your branch name and commit messages. The title should be clear and descriptive. Including a type at the beginning is helpful and may be required.

The description provides a place to clearly explain the changes to the code. GitHub supports uploading screenshots and screen recordings, so use them liberally. You always want to link the issue number you were working on in the PR. GitHub makes it easy - all you have to do is type in the number starting with #. It's a good idea to include steps on how to replicate what your code does, especially if it's a bug fix. PR descriptions support [GitHub-flavored markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax), so you can include checkboxes with `- [ ]`.

The GitHub UI requests a review from owners of the repo when you open it. If you want more time to work on your description or aren't quite done, you can open a [draft PR](https://github.blog/2019-02-14-introducing-draft-pull-requests/).

After you open your PR, any automation runs successfully, and branch protection requirements are met, you have the option to [merge, squash merge, or rebase to close the PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request). Sometimes the repo owner will have a preference. Squash merging allows you to compress a whole PR down to one commit message, which is a lot cleaner over time.

### Code Reviews

![Snooty British soldier tells the pirate Jack Sparrow that his code is without a doubt the worst I've ever run and Jack Sparrow counters with "but it does run"](https://images.abbeyperini.com/gitPanic/run.jpg)

The most common branch protection requirement you'll have to meet is a code review process. At the end, the reviewer will approve the PR, usually with an accompanying comment. The GitHub UI allows reviewers and authors to add comments and request changes. The PR interface even provides a way for reviewers to suggest code changes you can commit right in the PR.

Giving and receiving feedback about code is a skill that requires practice.

Coding is a creative endeavor, and it can be hard to hear that your code's not perfect. Discussing the pros and cons of the different ways you can code one thing will only help you grow as a developer. Keeping a PR small helps with code reviews. Keep in mind it's work for another developer to understand your code and give feedback. That's why you want to be thorough in your description. When in doubt, request a pairing session to discuss a PR.

I've said it before and I'll say it again - negative feedback without ways to improve is just unsupported criticism. There's a big difference between "This doesn't seem useful." and "Can you explain why you broke this out into its own component?" If something seems obvious to everyone who's been working in the repo for a while, but not to anyone new, it's time to improve the documentation. Not everyone has the bandwidth or skill set to review code properly, so never be afraid to ask for a second set of eyes on your code.

Most importantly, you can add gifs to comments using HTML/markdown or with the [giphy Chrome extension](https://chrome.google.com/webstore/detail/gifs-for-github/dkgjnpbipbdaoaadbdhpiokaemhlphep?hl=en).

### Forking

[Forking](https://docs.github.com/en/get-started/quickstart/fork-a-repo) is something you come across more in an open source project than with a private company. You may not have permission to push to any branch in a repository. Like a branch is a copy of the branch it's based off of, a forked repository has all the information of the original repository, but you own it. You can still [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) in the original repo, but this allows the owner of the repo to merge your code in without giving you access.

Open source contributions are great for your career and growth as a developer. Luckily Virtual Coffee loves open source and maintains some [written resources](https://virtualcoffee.io/resources/open-source) as well as [hosting talks](https://www.youtube.com/playlist?list=PLh9uT23TA65hA-LmhtOcnhrk5J_xVjoFG).

### Conclusion

You can end up spending a lot of your work day in GitHub, so hopefully this introduction gives you the terminology you need to hit the ground running.

Up next I'll cover [refs and HEAD in git](/blog.html?blog=gitPanic-4).
