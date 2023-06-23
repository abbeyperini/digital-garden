# #gitPanic - Interactive Rebase

Planted: 11/16/2022
Tags: git, #gitPanic

![Tony Stark standing in front of an explosion, arms outstretched captioned git rebase](https://images.abbeyperini.com/gitPanic/rebase.jpg)

There is no squash rebasing because you can use an interactive rebase to rewrite your commit history. Once you understand this powerful tool, people will think you're a git wizard.

This blog assumes you have a basic understanding of git or have read [Git 101](/blog.html?blog=gitPanic-1) and [Merging and Rebasing](/blog.html?blog=gitPanic-2).

1. [Warnings](#warnings)
2. [SHA](#sha)
3. [git log](#git-log)
4. [Starting the Rebase](#starting-the-rebase)
5. [Finishing the Rebase](#finishing-the-rebase)
6. [Practical Examples](#practical-examples)
7. [Rebase One Branch Onto Another](#rebase-one-branch-onto-another)
8. [Other Helpful Commands](#other-helpful-commands)

## Warnings

I really mean it when I say interactive rebasing is rewriting your commit history.

If you're working in a public repo, and you're rebasing commits that have already been pushed to the remote, you can literally delete commits. Keeping an accurate commit history can be important. It is recommended only to interactive rebase your local commits for this reason.

![Gandalf captioned You shall not rebase pushed commits](https://images.abbeyperini.com/gitPanic/shall.jpeg)

The exception to this rule is commits in your branch intended for development. If you're opening a PR to [merge your work into develop](/blog.html?blog=gitPanic-3#environments), I'd say they're still fair game.

Deleting commits with interactive rebase also means you can lose work. If you rebase a lot of commits and have a lot of merge conflicts, it is also quite easy to accidentally remove work that way.

I'll be covering how to recover lost work in a future blog. It's almost always recoverable.

## SHA

I've touched on a commit's SHA in a couple of the other blogs in this series. It's a unique identifier for the commit made using the [SHA-1 hash algorithm](https://en.wikipedia.org/wiki/SHA-1). It's essentially the name of the commit, and we'll be passing it to the rebase command.

It's also referred to as reference and hash. I'll be using SHA.

You may see people passing a short SHA - anywhere from 5 - 12 characters. This will definitely work in a small project, and git is [pretty smart about matching SHAs](https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection#Short-SHA-1). Be forewarned - as the number of commits increase, so does the likelihood that you may have 2 commits with the same first few digits. When the Linux kernel hit 875,000 commits, they found they needed 12 characters. The git reference docs recommend using 8 - 10.

## git log

Before you start interactive rebasing, you want to understand your commit history. You can do this by running `git log`. This command has [many options and things you can configure](https://www.atlassian.com/git/tutorials/git-log) to get the most out of it.

![Panel 1 - normal seagull captioned git log. Panel 2 - seagull with mouth open captioned git log --graph. Panel 3 - seagull tossing its head back captioned git log --all --decorate --oneline --graph. Panel 4 - seagull mouth open head forward shooting lasers from its eyes captioned git log --graph --abbrev-commit --decorate --format=a long template string changing colors --all](https://images.abbeyperini.com/gitPanic/seagull.jpeg)

The log will print out the entire commit history, with the latest commits at the top. Without any configuration or passing any options, each commit in the log will have its SHA, the branches it's in, the author, the date, and the commit message. You can always enter `q` to quit.

![screenshot of git log output](https://images.abbeyperini.com/gitPanic/log.png)

Like you're manually merging, you want to find the last commit before the commits you want to edit. It was called the last common commit when merging, and it's often referred to as the parent commit when rebasing. This is the SHA we will pass to the rebase command.

Instead of a SHA, you can use [HEAD](/blog.html?blog=gitPanic-4) shorthand like `HEAD^3` instead.

## Starting the Rebase

This will open an editing window. If you want to do it in the terminal, have the [vim command cheatsheet](https://vim.rtorr.com/) ready. Otherwise, [check out your other options](/blog.html?blog=gitPanic-2#:~:text=cheat%20sheet%20bookmarked.-,You%20can%20also,-associate%20a%20text).

We start by running

```bash
git rebase -i <SHA>
```

This will print out a list of commits you can edit with the oldest at the top. All of them will have the keyword `pick` in front of them. If you want to change a commit, you will replace the keyword.

![screenshot of a list of commits output by running git rebase -i](https://images.abbeyperini.com/gitPanic/pick.png)

Replacing characters in the vi window takes some getting used to. First, you'll move your cursor left with the `h` key, right with `l`, down with `j`, and up with `k`. To insert characters, you use `i` to enter insert mode. To get out of insert mode and be able to move your cursor again, you use esc.

When you're done editing on this screen, every commit should have the short or long version of one of these keywords next to it:

- p, pick = use commit
- r, reword = use commit, but edit the commit message
- e, edit = use commit, but stop for amending
- s, squash = use commit, but meld into previous commit
- f, fixup = like "squash", but discard this commit's log message
- x, exec = run command (the rest of the line) using shell
- d, drop = remove commit

If you needed to re-order commits, just put the commit where you want it in this list.

Finally, when you're done, you can exit with `:wq`, which tells the vi window to write (add) all your edits and then quit.

## Finishing the Rebase

If the only keywords you use are pick and drop, you'll be done except for [resolving any conflicts](/blog.html?blog=gitPanic-2#conflicts).

Just like merge, you can continue by running `git rebase --continue` or escape by running `git rebase --abort`.

If you used reword, edit, or squash, you'll be transported into another edit window to rewrite or write your commit messages using insert mode and ending with `:wq` just like before. Then you'll have to resolve any conflicts.

Once all of that is done, you'll have a shiny new commit history. Run `git log` again to make sure you like it. Because you changed commits, which changes their SHAs, you'll have to `git push --force-with-lease` to get your changes into the remote branch.

![World's most interesting man meme captioned I don't always push --force, but when I do, I use --force-with-lease](https://images.abbeyperini.com/gitPanic/force-with-lease.jpg)

## Practical Examples

Disclaimer: these are terrible commit messages meant only to provide an example commit history. [Read more about writing good commit messages.](/blog.html?blog=gitPanic-3#commit-messages)

### Change an Old Commit Message

Running `git commit --amend` will allow you to change the last commit message, but what if you realized you committed a typo a while ago?

First I run `git rebase -i b95b221368b028816c7af3cc1eee4ea5eb5eec50`, because that's the last common commit for `main` and `fix--button`. I enter interactive mode with `i`, replace "pick" with "reword" for the commit with a typo in the commit message (e24d7d6). Next, I exit interactive mode with esc, and run `:wq`.

![screenshot of list of commits from interactive rebase](https://images.abbeyperini.com/gitPanic/reword.png)

A new edit window opens and I fix the typo in interactive mode and run `:wq` again.

![screenshot of edit window for commit message](https://images.abbeyperini.com/gitPanic/edit-message.png)

I run `git log` and see there's no more typo in my commit history!

![screenshot of git log output after rebase](https://images.abbeyperini.com/gitPanic/log-important.png)

### Squash Some Commits

Ideally, the commit messages in your PR should tell a story. Here's how to convert three commits with useless commit messages into one meaningful message.

First I run `git rebase -i b95b221368b028816c7af3cc1eee4ea5eb5eec50`.

![screenshot of output of git rebase command](https://images.abbeyperini.com/gitPanic/pick-2.png)

I know there are 3 commits I want to squash into one. While in interactive mode, I replace "pick" with "squash" for the most recent two (601d5b0 and 943f2e2 in this case). After exiting interactive mode with esc, I enter `:wq` and a new edit window opens.

![screenshot of 3 separate messages in an edit window](https://images.abbeyperini.com/gitPanic/message.png)

In interactive mode, I edit the three messages down to one, and run `:wq` again.

![screenshot of edit window with new message and :wq at the bottom](https://images.abbeyperini.com/gitPanic/message-2.png)

Finally, I run `git log` and see my beautiful new commit history!

![screenshot of git log output after squash](https://images.abbeyperini.com/gitPanic/log-2.png)

### Remove a Commit You Don't Need

Whoops! I went down the wrong path and committed changes I eventually rewrote completely. Instead of including that commit in my PR, let's remove it.

First I run `git rebase -i b95b221368b028816c7af3cc1eee4ea5eb5eec50`. Then, I add the drop keyword next to the commit I don't need anymore (2d93dd9) in interactive mode. Finally, I run `:wq`.

![screenshot of commit list from interactive rebase command](https://images.abbeyperini.com/gitPanic/drop.png)

Running `git log` shows I've gotten rid of that commit I didn't need!

![git log output after drop](https://images.abbeyperini.com/gitPanic/log-typo.png)

## Rebase One Branch Onto Another

Help! My coworkers have pushed commits into the develop branch! I based my fix--button branch off of the develop branch weeks ago!

There's [a button in the Github PR UI](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/keeping-your-pull-request-in-sync-with-the-base-branch) that will appear in this situation. It gives you two options - merge and rebase. If a fast-forward merge isn't possible, the merge button will create a merge commit and possibly conflicts.

The rebase option is running

```bash
git rebase develop
```

which is the same as

```bash
git rebase develop HEAD
```

Your PR is comparing the fix--button branch to the develop branch. The current [head](/blog.html?blog=gitPanic-4) of the develop branch is the new base. The fix--button branch based off an older commit in `develop` is the old base. HEAD represents the head of `fix--button`.

This takes all of the commits in `fix--button` and puts them after all the commits in develop. In other words, this changes the last common commit for `develop` and `fix--button` to the most recent commit in `develop`. You may still have to resolve conflicts, but as far as git is concerned, your `fix--button` is now based off the current version of `develop`. When you go to merge `fix--button` into `develop`, you may even be able to do a [fast-forward merge](/blog.html?blog=#gitPanic-2:~:text=fast%2Dforward%20merge.-,Fast%2DForward%20Merge,-To%20start%2C%20a).

![Astronaut behind another astronaut with a gun meme. First astronaut, staring at earth is git. Git says This branch is on top of master? The second astronaut with the gun is labelled rebase. Rebase says always has been.](https://images.abbeyperini.com/gitPanic/branch.jpeg)

Manually moving the commits from `develop` to `fix--button`, with `git cherry-pick` and using interactive rebase to do this would change the commit SHAs. When you went to merge the branches, git would consider the same commits with different SHAs as different commits, and you'd have quite the merge on your hands.

Regular rebase works if we don't want to change either of the branches, just change at which commit the fix--button branch diverged from develop. Using the `--onto` option, we can change which branch `fix--button` is based off of, remove commits, and create new branches.

The `--onto` option takes two to three arguments. The first option is new base and parent commit of the commits you want to keep. If I run

```bash
git rebase --onto develop fix--button
```

this is saying put all the commits after the head of `fix--button` onto the head of develop. In other words, delete all commits in this branch.

When you pass three arguments, you are passing a range of commits and creating a new branch. If we wanted to drop commit A and keep all the rest of the commits, we'd run

```bash
git rebase --onto develop <A> HEAD
```

where `<A>` is the SHA or ref for commit A. If we wanted to drop commit A, keep commits B and C, and drop commit D will become our new HEAD, we'd run

```bash
git rebase --onto develop <A> <C>
```

Commit C will become our new HEAD and the head of our new branch.

To create a name a new branch with what you've created, you'd run

```bash
git switch --create <branch name>
```

## Other Helpful Commands

There are a couple git commands that aren't necessary for understanding how to interactive rebase, but can be really helpful if you need more information.

### git diff

[The `git diff` command](https://www.atlassian.com/git/tutorials/saving-changes/git-diff) will give you even more information about the changes in the branch.

I talked about [unified vs split diffs](/blog.html?blog=gitPanic-2#:~:text=showing%20the%20diff%3A-,unified%20and%20split,-.%20Whenever%20possible%2C%20I) in the context of merge conflicts. This allows you to look at the diff without running `git merge` or opening a PR. In addition to comparing branches, you can compare commits and files.

### git show

[The `git show` command](https://www.atlassian.com/git/tutorials/git-show) allows you to view the information git has stored about your repo. You can view changes by file, commit, and branch. You can view commits or ranges of commits. You can view file versions from a specific commit. You can format all of this information by passing options to the command. It's basically an interactive wiki for your repo.

## Conclusion

Like most things git, there's a whole lot more you can do with interactive rebase. This should give you a decent understanding so you can practice and eventually learn those fancy tricks.

This whole #gitPanic series started because I wanted to write a guide for interactive rebasing after I finally understood it. Big thank you to my coworkers, Anastasia and Rachael, for patiently walking me through interactive rebasing when it came up at work.
