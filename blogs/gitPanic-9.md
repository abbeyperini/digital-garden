## #gitPanic - Files

![black man gesturing at his eyes captioned look at me this is my repo now](https://images.abbeyperini.com/gitPanic/repo.jpg)

I only learned about these commands because I was complaining about git not reliably tracking changes to files I made in the [GUI](https://www.gartner.com/en/information-technology/glossary/gui-graphical-user-interface#:~:text=A%20graphics%2Dbased%20operating%20system,Apple%20Macintosh%20in%20the%201980s.) (Finder, VS Code). Turns out git will always track file name changes, moving files, and deleting files ...if you tell it about them.

This blog assumes you have a basic understanding of git and command line or have read [git 101](/blog.html?blog=gitPanic-1) and [HEAD](/blog.html?blog=gitPanic-4).

1. [git commit](#git-commit)
2. [git add](#git-add)
3. [git rm](#git-rm)
4. [git mv](#git-mv)
5. [Configure Case Sensitivity](#configure-case-sensitivity)
6. [git ls-files](#git-ls-files)
7. [git ls-tree](#git-ls-tree)

### git commit

If you don't want to use git's commands to delete or modify files, just tell it to stage those changes when you commit using `git commit -a` or `git commit --all`. You'll still have to add new files that git hasn't tracked before.

![Black man tapping the side of his head to indicate a smart idea captioned "Don't need a version control system if you have ctrl + v"](https://images.abbeyperini.com/gitPanic/paste.jpeg)

### git add

Using `git add .` will add new files and deleted files, but won't stage file name changes. You can stage all changes to all tracked files before committing using `git add -u` or `git add --update`. You can stage all changes required to match your current working directory, including new files, with `git add -A`. Once again, A stands for all. You can also pass a file path after this option to only include all changes for that file.

### git rm

Running

```bash
git rm -rf
```

works like [`sudo rm -rf`](https://itsfoss.com/sudo-rm-rf/), but git tracks the changes.

### git mv

Using `git mv` tells git to track the changes while you update the file path. You can use it to

rename a file

```bash
git mv <oldName> <newName>
```

and move a file

```bash
git mv <fileName> <newDirectory>
```

### Configure Case Sensitivity

By default, git is [case-insensitive](https://en.wikipedia.org/wiki/Case_sensitivity) when it comes to file and directory names. With the default settings, these commands won't work:

```bash
git mv settings.js Settings.js
git mv components/settings.js Components/Settings.js
```

It can't tell the difference between the old name and the new name.

It will, however, rename the file if you're changing case and another part of the file name. For instance,

```bash
git mv top-bar.js TopBar.js
```

will work. To change the git settings to be case-sensitive, run

```bash
git config core.ignorecase false
```

and then you can use `git mv` to change file and directory name case all you like.

### git ls-files

Like `ls`, `git ls-files` will list all the files in your directory. The difference is `git ls-files` takes into account the remote repository, local repository, index, and working directory. For example, running

```bash
git ls-files --modified
```

will show you all the staged files that are different from the last commit. This is just the beginning. There are [many more options](https://git-scm.com/docs/git-ls-files) that will show you all kinds of information about your repo.

### git ls-tree

Similar to `git ls-files`, `git ls-tree` will list all of the data types in your repository. There are, again, [many options](https://git-scm.com/docs/git-ls-tree) for formatting.

You have to pass a working directory to ls-tree like

```bash
git ls-tree <ref>
```

In this case, the ref has to be to a tree-ish object (aka directory) like HEAD or a branch name. You can also specify a file path in a tree-ish object like

```bash
git ls-tree main:README
```

### Conclusion

These commands really show just how much information git is storing about your repo and the changes you make!
