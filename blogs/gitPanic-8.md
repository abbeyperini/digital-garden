## #gitPanic - Removing and Restoring Work

Planted: 11/22/2022
Tags: git, #gitPanic
Series: [#gitPanic](/series.html?series=gitPanic)

![The hulk in a lab with his arms outstretched captioned git reset --hard time travel!](https://images.abbeyperini.com/gitPanic/reset.jpg)

When you think you've lost work, don't #gitPanic. As far as your commit history goes, git may as well be Ironborn, repeating "what is dead may never die."

This blog assumes you have an intermediate understanding of git or have read [Git 101](/blog.html?blog=gitPanic-1), [Merging and Rebasing](/blog.html?blog=gitPanic-2), [HEAD](/blog.html?blog=gitPanic-4), and [Interactive Rebase](/blog.html?blog=gitPanic-5).

1. [Discard Changes](#discard-changes)
2. [Reflog](#reflog)
3. [Refs Again](#refs-again)
4. [Reset](#reset)
5. [Revert](#revert)

### Discard Changes

If you haven't committed yet, there are a few ways to wipe all your local changes and start again with a blank working directory.

If at any time you want to see what local changes are staged or unstaged, you can run

```bash
git status
```

Note: effectively, git doesn't save your changes until they're in a commit. If you discard your local changes in your working directory and undo (cmd/ctrl + z) doesn't work, you'll have to follow instructions for recovering deleted files based on your OS ([Mac](https://setapp.com/how-to/how-to-recover-deleted-files-after-emptying-trash), [Windows](https://support.microsoft.com/en-us/windows/recover-lost-or-deleted-files-7bf065bf-f1ea-0a78-c1cf-7dcf51cc8bfc), [Linux](https://adamtheautomator.com/linux-to-recover-deleted-files/)).

If you really want to start over, there's always [deleting the branch and fetching the remote](/blog.html?blog=gitPanic-2#fetching).

Don't forget [stashing](/blog.html?blog=gitPanic-6).

Stashing has an option for untracked changes, but what if you want to delete them, not keep them? Run

```bash
git clean -n
```

and then

```bash
git clean -f
```

Without configuring anything, you can't use `git clean` without passing an option because it can be just as dangerous as [`sudo rm -rf`](https://itsfoss.com/sudo-rm-rf/). The `-n` option will show you what running `git clean -f` will do. The `-f` stands for force and will do it. There are [more options](https://www.atlassian.com/git/tutorials/undoing-changes/git-clean) for things like deleting directories, deleting ignored files, and use the interactive mode.

Next, there's

```bash
git restore .
```

This command restores all tracked files in your working directory. You can restore by one or more file names, like `git restore index.html app.js`. Like stashing, you can restore parts of files using the `--patch` option.

What git restore is really doing is checking out a previous version. In other words, `git restore .` is the same as saying `git checkout HEAD` or "restore the HEAD." The only time git restore doesn't act like a checkout is when you run

```bash
git restore --staged
```

You won't lose your changes. Any staged changes in the index will move to unstaged in the working directory.

Say you realized you don't even want the changes from the last commit you have in `index.html` in your local branch. You can pass a ref, and restore an earlier commit like

```bash
git restore --source 12a3b4f index.html
```

I've talked about HEAD and passed a SHA here, but that's just the tip of the ref iceberg. Before I talk about discarding changes with [reset](#reset), let's dig into the reflog and refs.

### Reflog

I touched on git log, git show, and git diff in [Interactive Rebase](/blog.html?blog=gitPanic-5), but reflog is even more powerful.

When you run `git reflog`, you're asking git to show you the log of refs it keeps in `.git/logs/refs`. Like refs, this directory has information about head logs in `.git/logs/refs/heads`, the HEAD log in `.git/logs/HEAD`, stash in `.git/logs/refs/stash` and so on.

![Ancient aliens meme captioned repository history](https://images.abbeyperini.com/gitPanic/history.jpg)

Running `git reflog` is the same as `git reflog show HEAD`. This will give you a list of all the commits in the branch you're in with a short SHA, reflog shortname, and commit message. In fact, `git reflog show` is an alias for `git log -g --abbrev-commit --pretty=oneline`. In other words, git reflog is a formatted version of git log, with one key difference. The `-g` option tells `git log` to show the reflog and not the log. The reflog is on your local machine and private. The log is pushed to the remote and public. This means interactive rebase will overwrite the log, but not the reflog.

Because the reflog will only be lost after months or by running `git reflog expire` or `git reflog delete`, you can always rely on the reflog to keep a secret record of your recent commits.

If you pass a ref to reflog, you can see other branches or commits that aren't HEAD. The next section will cover reflog shortnames and all the possible refs I could find. If you're just interested in how to use what reflog prints out to get back lost work, skip ahead to [Reset](#reset).

### Refs Again

I covered reflog shortnames as they apply to the stash in [#gitPanic - stash](/blog.html?blog=gitPanic-6#:~:text=Each%20of%20them%20will%20have%20stash%40%7Bx%7D). They work the same when you apply them to HEAD or a branch name, because any reflog, including the stash, is basically an array of logs of refs. The reflog shortname `main@{0}` refers to the head of main and `main@{1}` refers to the second latest commit on main. Meanwhile, `HEAD@{0}` and `HEAD` would show you the commit you have checked out.

This is also known as git ref pointer syntax and the index of the commit in the reflog file is not the only thing you can pass. Using [time qualifiers](https://www.atlassian.com/git/tutorials/rewriting-history/git-reflog#:~:text=ref.-,Timed%20reflogs,-Every%20reflog%20entry), you can get all the commits on the main branch from the last week like `main@{1.week.ago}`. You can also pass a timestamp if you want to get really specific.

I covered short SHAs, long SHAs, tags, branch names, head, and HEAD in [#gitPanic - HEAD](/blog.html?blog=gitPanic-4). HEAD is one of the [special refs](https://www.atlassian.com/git/tutorials/refs-and-the-reflog#special-refs).

![Cat appears to be dancing captioned "Git down girl go head git down"](https://images.abbeyperini.com/gitPanic/git-down.png)

In that same blog, I also touched on ancestry/relative references with carets (like `HEAD^`). They're called ancestry or relative references because they're referring to commits based on their relation to other commits. You can use any commit ref instead of HEAD. You can also use ancestry references with tildes like `HEAD~`. So if you have 3 commits on a branch, the latest being HEAD, you can access the oldest or grandparent commit using `HEAD~2`. You don't have to use numbers, you can keep adding carets or tildes like `HEAD^^^` or `HEAD~~~`.

Both `HEAD~` and `HEAD^` are the same when dealing with commits that only have one parent. When you have a merge commit, that commit has two parents, and `HEAD^` is the ancestry reference that is built to handle that.

You can even combine the carets and tildes. Let's say I merged two branches together and committed twice after that. If I wanted to access the first parent (or most recently committed parent) of the merge commit, I'd use `HEAD~3^`.

But wait! There's more! You can pass refs to [commit ranges](https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection#commit-ranges), [refspecs](https://www.atlassian.com/git/tutorials/refs-and-the-reflog#refspecs) connect your local to your remote, and sometimes git will run the [garbage collector](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) and create [packed refs](https://www.atlassian.com/git/tutorials/refs-and-the-reflog#packed-refs) to save space for you.

Now that we know how to refer to just about anything in git, how do we use that to remove and restore work?

### Reset

Like interactive rebase, reset rewrites the commit history. For this reason, only use it locally, or in your own branch.

Where `git checkout` changes what the HEAD ref is pointing to, reset changes the branch head ref and points HEAD at it. Checking out a branch will not rewrite the commit history, just move HEAD. Reset will rewrite the commit history, move HEAD, and make a new reset commit.

There are three reset tiers, `--soft`, `--mixed`, and `--hard`. Running

```bash
git reset --soft HEAD~
```

will only update the refs to the commit before HEAD. Your staged changes (index) and unstaged changes (working directory) will remain the same.

Running

```bash
git reset HEAD~
```

is the same as running

```bash
git reset --mixed HEAD~
```

The `--mixed` option will update the refs and your staged changes to match the passed commit. It also puts everything from the commits that came after it into your working directory. You still have your changes you had committed, you'd just have to commit them again.

You can use this to squash commits, similar to interactive rebase. If my last two commit messages are "whoops" and "fix", I could run `git reset --mixed HEAD~~~` and recommit all the changes with a more meaningful commit message.

![Men in Black using the memory wipe captioned git reset --hard](https://images.abbeyperini.com/gitPanic/hard.jpg)

Running

```bash
git reset --hard HEAD~
```

does everything the previous tiers do and resets the working directory to the commit you passed. By running `git reset --hard HEAD~`, you've deleted the last commit on the branch and discarded all your changes.

If you only wanted to discard your changes, you would run

```bash
git reset --hard
```

which is the same as running

```bash
git reset --hard HEAD
```

Like using `git restore --staged`, you can unstage changes with `git reset`. You can also unstage changes by file like `git reset fileName.js`.

Like stash, there's an interactive option, `--patch`, which will take you through the changes hunk by hunk.

No matter what option you use, the commits that you remove with reset still exist in the reflog. They're just no longer in the commit history in your repository. In other words, they're orphaned.

This means we can also use reset to put commits back in our commit history. If I run,

```bash
git reset --hard HEAD~
```

and regret it, I can recover. First by running

```bash
git reflog
```

which will have a record of my new reset commit and will still have my orphaned commit. Running

```bash
git reset --hard <orphaned commit ref>
```

will put us right back where we started.

You could even start a new branch instead, like when you've detached the HEAD. Just run

```bash
git branch <branch name> <orphaned commit ref>
```

### Revert

Revert is designed to safely remove changes in the remote. It doesn't rewrite the commit history.

When you pass a ref to `git reset`, you're telling it the last commit you want to keep. In contrast, you pass the ref of the commit you want to get rid of to revert. Revert will not run without a ref.

![When reverting to your last commit is your only option. Will Smith holding a cell phone captioned it's rewind time.](https://images.abbeyperini.com/gitPanic/rewind.jpeg)

When you run

```bash
git revert 12a3b4c
```

git looks at the changes in commit 12a3b4c and inverts them.

Running `git revert HEAD` is effectively the same as `git reset HEAD~`. Instead of orphaning a commit, revert creates a new commit, similar to a merge commit, but negating changes instead of combining them. In fact, git will open an edit window and prompt you to enter a new commit message explaining your revert. Reset just automatically commits a message saying it rewrote the commit history.

You can create your own new commit manually by passing `--no-commit`. Your index and working directory will be populated with the inverse changes required to revert that commit.

This way, your work and the record of it in the commit history is definitely never lost. You could endlessly revert and re-revert and you'd have a full record of doing so.

### Conclusion

May this knowledge allow you to make all the git mistakes you want, content that the reflog has got your back.
