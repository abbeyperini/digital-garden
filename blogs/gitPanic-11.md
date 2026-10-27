## #gitPanic - Current vs Incoming Changes

![A brain logo #gitPanic](https://images.abbeyperini.com/gitPanic/gitPanic-banner.png)

During my talk on [restoring lost work in git](https://dev.to/abbeyperini/gitpanic-removing-and-restoring-work-ioi) at TechBash, I got some great questions about resolving conflicts. As a result, I realized people find current changes vs incoming changes very confusing.

I am people.

It doesn't help that some conflict resolution user interfaces switch "current" to "ours" and "incoming" to "theirs". Sometimes all the changes are mine! Who am I sharing them with!?

Most of my git talks boil down to giving people good mental models for reconciling changes ([merging and rebasing](https://dev.to/abbeyperini/gitpanic-merging-and-rebasing-2mo3)). Turns out, understanding current vs incoming changes boils down to more of the same.

### Merging

When you run a merge command, you don't get to specify the base. Wherever you're checked out (HEAD), that's the base. In other words, the base is your current branch. Current changes come from your current branch. Incoming changes are the changes you're trying to merge into the base.

For example, I've checked out the main branch. (HEAD is pointing at the latest commit on `main` and `main`.)  I want to merge changes from `new-branch` into `main`. I run `git merge new-branch`. Current changes are from `main` and incoming changes are from `new-branch`.

### Rebasing

When you're rebasing, you're moving changes from one base to another base. When you create a new branch, you're basing it off of HEAD.

So if I based my feature branch off of the latest commit in main two weeks ago, and my coworkers have added commits to main since then, I can use rebasing to change the base of my feature branch from that old commit to the current latest commit in main.

Just like merging, current changes are in the base. Incoming changes are the ones you're moving from one base to another.

Where a merge command requires a ref to the changes you're reconciling with the base, rebase commands require a ref to the base.

```bash
git rebase <base>
```

The changes you're moving onto this new base come from HEAD, so the incoming changes come from where you are checked out.

However, you can rebase any changes onto any base from anywhere by passing 2 options:

```bash
git rebase <base> <changes to move onto the base>
```

In this case, it doesn't matter where HEAD is. Current changes come from the first option and incoming changes come from the second option.

### Merging and Rebasing Are Opposites

When we're thinking in terms of base and changes we want to reconcile with the base, merging and rebasing are the same. Current changes are the changes in the base, and incoming changes are the changes you're reconciling with the base. The only difference is how git reconciles changes under the hood.

So why, during my research, did I keep seeing "merging and rebasing are opposites"? It's probably for the same reason I've found this concept very confusing.

The option you pass to a command can refer to different things when you're merging vs. when you're rebasing.

#### Pulling

What if I'm running `git pull`? By default, `git pull` is the same as running `git fetch` and `git merge`. Let's say I haven't changed any settings and run

```bash
git pull origin main
```

Because it's a merge, the base is HEAD. The changes I'm merging in are from the main branch in the remote (`origin main`). The option I'm passing to the pull command is a ref to the incoming changes.

However, I can [change a setting](https://dev.to/abbeyperini/gitpanic-merging-and-rebasing-2mo3#pulling) or use the `--rebase` flag to make the pull command the same as running `git fetch` and `git rebase`. If I'm checked out at `new-branch` and I run

```bash
git pull origin main --rebase
```

Now, I'm rebasing `new-branch` onto `main`. `origin main` is now the base with the current changes and `new-branch` has the incoming changes.

### Conclusion

Regardless of the way you're reconciling changes, the base is called "current changes" and "ours". The changes you're reconciling with your base are called "incoming changes" and "theirs".

```bash
git merge <incoming changes>
git rebase <current changes>
git rebase <current changes> <incoming changes>
```

However, the option you pass to a command may refer to the current changes or incoming changes depending on whether you're merging or rebasing.

```bash
git pull <incoming changes>
git pull --rebase <current changes>
```
