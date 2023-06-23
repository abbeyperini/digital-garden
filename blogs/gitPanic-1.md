# #gitPanic - Git 101

Planted: 11/04/2022
tags: git, #gitPanic

![programmers and dark souls players shaking hands labelled git gud](https://images.abbeyperini.com/gitPanic/gud.jpg)

Look, git is hard, and it's almost inescapable in software development today.  

`#gitPanic` will be an open ended series on all the git things I've learned - mainly by making git mistakes.

There will be a part of the series where I discuss tools for using git outside of the terminal, but at first, I will be explaining basic concepts with their commands. If you've never used command line, I recommend [Josh W. Comeau's Front-End Developer's Guide to the Terminal](https://www.joshwcomeau.com/javascript/terminal-for-js-devs/) and [Zed Shaw's Command Line Crash Course](https://learnpythonthehardway.org/python3/appendixa.html).

1. [What is git?](#what-is-git)
2. [What is GitHub?](#what-is-github)
3. [Repositories and Branches](#repositories-and-branches)
4. [Commits](#commits)

## What is git?

Basically, git is a save history. Technically, it is distributed version control software you [install on your machine](https://www.atlassian.com/git/tutorials/install-git). Version control is also called revision control, source control, and source code management. You're probably most familiar with [semantic versioning](https://semver.org/). App version 1.0 is the first version released to customers. App version 1.2 has had a couple minor updates, like a patch or bug fix. If you're waiting for a video game update with new content and mechanics updates, that'd be a major version, like App 2.0.

Even if you haven't been working in git, you've probably seen how multiple versions can be helpful. It's easy to tell customers that version 1.2 has a security vulnerability and they should download version 1.3 immediately. As a developer, package versions help you nail down what features are available in the version you're using. If you deploy code and everything breaks, you can roll back to the previous version until you figure out why.

![Boromir from the Lord of the Rings movies saying "One does not simply understand git"](https://images.abbeyperini.com/gitPanic/understand.jpg)

Distributed version control means instead of storing all your code on one machine, multiple machines can access the code. Essentially, it's in the cloud. Technically, it's a peer-to-peer network instead of a centralized client-server model. This allows multiple developers to work on the same code at the same time.

Like a database, multiple people accessing and changing the same thing means the software maintaining the codebase has to have systems and protections in place to allow changes to be added from multiple machines without losing code. That's git's main purpose. When you access a codebase using git, you get all of the information about all of the changes made to the code with the code itself.

## What is GitHub?

[GitHub](github.com) is a website that uses git and has features that facilitate its use and software development. [Making a GitHub account](https://github.com/join) is free.

With an account, you can create codebases, see your code, interact with other users, document your code, track your work, see stats about the code you've written, and much more. In today's job market, a [GitHub profile](https://github.com/abhisheknaiidu/awesome-github-profile-readme) [can easily be your software development portfolio](/blog.html?blog=gitPanic-7).

GitHub is not the only place you can store a codebase and use git with it. There are [plenty of alternatives](https://www.guru99.com/github-alternative.html), but for simplicity's sake, I'll be referring to GitHub.

## Repositories and Branches

The container for your codebase is a repository, often shortened to repo. You can either create a repository [in command line with git](https://www.atlassian.com/git/tutorials/setting-up-a-repository) or using the [GitHub UI](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository). If you use GitHub, you'll have to [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) (functionally download) it. If you create it on your local machine, you'll have to upload it.

The repository on your machine is the local one. The repository in GitHub is the remote. You can change all the code you want in your local repository, and those changes won't show up in the remote repository without you taking multiple steps.

![Oprah saying "You get a local copy. You get a local copy. And... you get a local copy. Everyone gets a local copy!!!"](https://images.abbeyperini.com/gitPanic/local.jpg)

When you create a new repo, you create a main branch. Typically, the main branch is the code you'd have deployed. To take full advantage of version control, you'll create more branches based off the main branch. A new branch will have all of the code and commits of the old branch, but any new commits will only be stored in the new branch. It's like making a copy and saving it separately. Included in the new save is how the copy relates to the original and what you've changed.

To move to a new branch, you'll check it out like

```bash
git checkout -b new-branch
```

The `-b` flag tells git to create a new branch. Once it's created, you'd get to it by running

```bash
git checkout new-branch
```

## Commits

Commits are like individual saves. A branch can hold as many commits as you want. After you make changes and save the file, git considers them unstaged changes.

To stage your all your changes, you run

```bash
git add .
```

The `.` stands for all of them. Were you to only want to stage some changes, you could add them file by file. Why wouldn't you want to add all the changes? Sometimes there are files that are specific to you or have secrets like keys and tokens. If you know you'll never want to add a file, you can make a file called `.gitignore` in the root of your repo and add file names to it.

![A comic showing someone increasingly in danger, on fire, and then jumping out a window captioned "In case of fire, git commit, git push, and git out"](https://images.abbeyperini.com/gitPanic/fire.jpg)

Once changes are staged, they need to be committed to the local instance of your branch. To do this, you run

```bash
git commit -m "my commit message here"
```

The `-m` flag stands for message. It's supposed to describe the changes included in your commit. I'll go into what developers expect from a commit message in the another part of this series, [Working in a Repo](/blog.html?blog=gitPanic-3).

In addition to the message, a commit contains information about your changes, who committed it, who authored the changes, and the date. It also has a unique identifier. It's called a hash or a SHA because it's a [unique string made with SHA-1](https://blog.thoughtram.io/git/2014/11/18/the-anatomy-of-a-git-commit.html). With all this information, git can tell how the changes relate to the code in other branches and commits in the current branch.

"OK," you think, "We've saved my code changes!" However, we're not quite done. These changes are only on your local machine. To add your commit to the remote version of your branch, you'll run

```bash
git push
```

This command is actually `git push [remote] [all the branches]` where remote is the remote repository in GitHub. If you clone a repository from GitHub, the default remote named "origin" is automatically set, so you don't have to specify those options. If I'm pushing from my branch named new-branch to the remote repository automatically set by GitHub, `git push` is the same as `git push origin`. You can [configure your remotes](https://www.atlassian.com/git/tutorials/syncing), so that you have multiple remotes, change your remotes if your remote repository moves, and more.

If you only want to update new-branch, you'd run

```bash
git push origin new-branch
```

## Conclusion

That's a lot! We learned about version control, repositories, local vs remote, branches, staging, committing, and pushing. In the next part of the series, I'll talk about what to do with your changes after you've gotten them in the remote branch including things like pulling, merging, and conflicts.
