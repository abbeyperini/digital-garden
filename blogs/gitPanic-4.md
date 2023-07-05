## #gitPanic - HEAD

Knowledge Level: Evergreen

Planted: 11/16/2022

Last Tended: 11/16/2022

Topics: [git](/topic.html?topic=git), [coding](/topic.html?topic=coding)

Series: [#gitPanic](/series.html?series=gitPanic)

![Squidward labeled "FBI" looking suspiciously at a Google search for "How to reattach a detached head". Next panel shows Squidward relaxing next to a Google search for "How ot reattach a detached head Git"](https://images.abbeyperini.com/gitPanic/detached.png)

Understanding HEAD and refs helps with reading git logs and using git commands.

1. [Refs](#refs)
2. [Tags](#tags)
3. [HEAD and head](#head-and-head)
4. [Detached HEAD](#detached-head)
5. [HEAD^](#head)

### Refs

HEAD is a ref. In git, a [ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) is a human readable reference to a thing.

You can have refs to git information stored in blobs, trees, and commits. A [blob](https://docs.github.com/en/rest/git/blobs) is an object representing a file. A [tree](https://docs.github.com/en/rest/git/trees) is file hierarchy, or how files relate to each other. A [commit](/blog.html?blog=gitPanic-1#commits) is how you add code changes to a repository. You can also have refs to [branches and remotes](/blog.html?blog=gitPanic-1#repositories-and-branches) (e.g. where your code and commit history are stored). Each of these has a SHA or a unique identifier created with the [SHA-1 hash algorithm](https://en.wikipedia.org/wiki/SHA-1).

When you use "main" instead of typing out a SHA in commands like `git checkout main`, you are using a ref.

There is a directory of files, `.git/refs` that holds your refs. You can create refs using

```bash
git update-ref <file path> <SHA>
```

where the file path is in `.git/refs`.

There are a lot of ref files created automatically. For instance, the main branch would have a `.git/refs/main` file with the SHA in it. So while you are running commands like `git checkout main`, git is referencing the `.git/refs/main` file to figure out what SHA you mean.

### Tags

Using git, you can create a [tag](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-tag) that is a ref to a commit or commits. They're typically used with [semantic versioning](https://semver.org/), so developers can easily tell which commits belong to each version.

There's a lightweight version that works just like other refs. The annotated tags are like a reference and a commit combined. They include information like a date, author, and message. They're all stored in `.git/refs/tags`.

### HEAD and head

HEAD is a special ref that points to what you currently have checked out. Meanwhile, the head ref points to the tip of a branch (e.g. the last commit).

When you run `git checkout main`, you're effectively running `git checkout main head`. As a result, the `.git/refs/HEAD` file is updated to contain `ref: refs/heads/main`. The `.git/refs/heads/main` file will contain the SHA of the last commit in the main branch.

### Detached HEAD

![Grey 3D modeled human head and neck on a galaxy background](https://images.abbeyperini.com/gitPanic/Meme_Man.jpeg)

You can checkout any ref or SHA. If I run `git checkout 123a4b`, the HEAD ref in `.git/refs/HEAD` will point at commit `123a4b`. If this commit is not the head of the branch, the HEAD is detached.

While detaching your HEAD sounds scary, it's just another way to look at git information. Say you pushed commit A and then commit B. Then something went horribly wrong, but now you're not sure which commit is the culprit. You can checkout commit A and see your entire repo as it was before the changes in commit B.

Where it gets really interesting is committing new changes or making new branches while your HEAD is detached. There may be situations where you want to make a new branch based off of an older commit.

You're warned when your HEAD is detached because if you make any new changes, you're making them back in the commit history. If you commit those changes in the same branch and then try to push, git is going to reject them because a fast-forward merge isn't possible.

### HEAD^

HEAD^ is shorthand for HEAD^1. HEAD^1 is shorthand for "the parent commit of HEAD". HEAD^2 is the shorthand for "the parent commit of the parent commit of HEAD".

If we ran `git checkout main`, the HEAD is currently pointing at the head or last commit on main. If we ran `git checkout HEAD^` or `git checkout HEAD^1`, we'd be checking out the 2nd to last commit in the main branch. Running `git checkout HEAD^2` would checkout the 3rd to last commit.

### Conclusion

Every time we refer to a branch by its name instead of its SHA, we're using a ref git created automatically. We can also create refs.

A HEAD is a special ref git uses for the commit we have checked out. If a HEAD isn't pointing at a head, it's a detached HEAD.
