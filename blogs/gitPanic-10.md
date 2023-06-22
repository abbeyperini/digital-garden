# #gitPanic - Tools

Planted: 11/29/2022
Tags: git, #gitPanic

![screenshot of a git gui](https://images.abbeyperini.com/gitPanic/gui.webp)

A list of tools you can use with git to make your life easier.

1. [Tab Autocomplete](#tab-autocomplete)
2. [What's My Branch?](#whats-my-branch)
3. [git GUI Clients](#git-gui-clients)
4. [Associating Git with Your Text Editor](#associating-git-with-your-text-editor)
5. [VS Code](#vs-code)
6. [Other Text Editors](#other-text-editors)

## Tab Autocomplete

[Tab autocompletion](https://github.com/git/git/blob/master/contrib/completion/git-completion.bash) is a git feature you have to enable. Say you're typing `git checkout feat--`, but you forget what you named your branch. When you hit tab, autocompletion will either fill out the rest for you or suggest options that match what you've typed.

If you're on a Mac, you're probably using the Zsh terminal. Running `echo $0` in your terminal will tell you if you're using Zsh or Bash. You'll find your terminal profile file in `~/` aka the home directory aka the one with your computer profile name. If you're trying to find it in Finder, you'll have to use <kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>.</kbd> to see system files (ones that start with `.`).

If you're running Zsh, your terminal profile file is called .zshrc. Add this code to it:

```bash
autoload -Uz compinit && compinit
```

For Bash, you'll have to download the tab autocompletion file first with this HTTP request command:

```bash
curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -o ~/.git-completion.bash
```

Then you'll add this code to your terminal profile file, .bash_profile.

```bash
if [ -f ~/.git-completion.bash ]; then
  . ~/.git-completion.bash
fi
```

Finally, you'll need to update the permissions on your computer to allow tab autocomplete to run using

```bash
chmod +x ~/.git-completion.bash
```

After either of these, you'll have to manually restart your terminal or reload your terminal profile by running

```bash
source <file name>
```

If you're on Windows, the [git BASH emulator](https://gitforwindows.org/) comes with tab autocomplete preconfigured.

## What's My Branch?

Before I added a script to print out my current git branch after the directory in my terminal, my most commonly used git command was `git branch`. Terminal programs like [Hyper](https://hyper.is/) will have features like this preconfigured. If you're just using Zsh or Bash, here's a script you can add to your terminal profile file:

```bash
# Find and set branch name var if in git repository.
function git_branch_name()
{
  branch=$(git symbolic-ref HEAD 2> /dev/null | awk 'BEGIN{FS="/"} {print $NF}')
  if [[ $branch == "" ]];
  then
    :
  else
    echo ''$branch''
  fi
}

# Enable substitution in the prompt.
setopt prompt_subst

# Config for prompt. PS1 synonym.
prompt+='branch:$(git_branch_name) -- '
```

## git GUI Clients

A GUI is a graphic user interface. In other words, instead of trying to understand your repo history and use git just from the command line, you can use a program that gives you pictures and buttons.

There's nothing wrong with using one. I know plenty of experienced developers who only use a GUI. Whenever I go to rebase or compare branches, I use a GUI to help me visualize the history of the codebase. I wrote the majority of this series explaining git concepts with command line because understanding the commands behind the buttons has helped me get out of sticky situations more than once.

There are two GUIs that are considered part of git - [gitk](https://www.atlassian.com/git/tutorials/gitk) and [git gui](https://github.com/jjustra/gitgui). They're older, still fairly command line based, and will require installing them with a package manager and/or updating your terminal profile. GitHub has [GitHub desktop](https://desktop.github.com/), which will show you commits and diffs like on GitHub.

![screenshot of Sublime Merge](https://images.abbeyperini.com/gitPanic/staging@2x.png)

Personally, I find it really helps me to see the repo history visualized as a tree, so I currently use [Sublime Merge](https://www.sublimemerge.com/). I've used [GitKraken](https://www.gitkraken.com/git-client) and [Sourcetree](https://www.sourcetreeapp.com/) in the past. The git reference documentation maintains [a list of git GUI clients](https://git-scm.com/downloads/guis), including mobile apps!

## Associating Git with Your Text Editor

There are parts of using git that require a text editor. Git will often open a [vi window](https://en.wikipedia.org/wiki/Vi) in the terminal. You can configure it to open other editors in the terminal... or you can configure it to open your preferred text editor.

Your text editor will have documentation on how to set it up. [GitHub's docs](https://docs.github.com/en/get-started/getting-started-with-git/associating-text-editors-with-git) link to a few. For example, if you wanted to set up VS Code, you'd run

```bash
git config --global core.editor "code --wait"
```

Then, every time you went to write a commit message or interactive rebase, a VS Code window would open instead of a vi window in your terminal.

This is separate from VS Code's Source Control, which is closer to a GUI client.

## VS Code

VS Code's Source Control is a [Source Code Management API](https://code.visualstudio.com/api/extension-guides/scm-provider) that sends models to your version control system.

When you download VS Code, it comes with the git plugin. Because it's still git under the hood, you can always switch to using the git commands in the terminal even if you had been using VS Code's buttons.

What makes VS Code's version control integration unique is that you can download the extension for [a version control system other than git](https://www.smashingmagazine.com/2008/09/the-top-7-open-source-version-control-systems/). For example, there's a [CVS plugin](https://marketplace.visualstudio.com/items?itemName=jaimelin.cvs-plugin). Not to mention, it can handle multiple version control systems at the same time.

The [source control panel](https://code.visualstudio.com/docs/sourcecontrol/overview) itself is packed with features.

![screenshot of VS Code source control panel](https://images.abbeyperini.com/gitPanic/control.png)

Once you've opened a repo, you get an overview of your working directory. It'll tell you what changes are staged and unstaged. You can view the working tree and stage and unstage changes with buttons. One button adds and commits for you. There are indicators about changes made in the file and status bar too. You can view diffs and a timeline. The git output even shows the git commands VS Code used, if you're curious.

![screenshot of git output](https://images.abbeyperini.com/gitPanic/output.png)

This is all available without configuring any of the many settings, and we haven't even gotten to extensions.

### Extensions

Add even more features with extensions from the marketplace!

- I've written about enabling a [git commit message template](https://dev.to/abbeyperini/git-commit-message-template-in-terminal-and-vs-code-326p) in the source control panel.
- Don't want to go all the way to GitHub to see who wrote the code you're looking at? Install [Git Blame](https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame)!
- The [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension allows you to to do code reviews without opening GitHub.
- [Git Lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) offers too many features to list here.
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) allows you to visualize repo history as a tree.
- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory) is like running `git log`, but interactive.
- There's even [an extension](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces) for integrating [Codespaces](https://docs.github.com/en/codespaces).

## Other Text Editors

When it comes to git features, Atom comes in a close second to VS Code. It has [some git and GitHub features](https://flight-manual.atom.io/using-atom/sections/version-control-in-atom/) right out of the box. The [GitHub package](https://flight-manual.atom.io/using-atom/sections/github-package/) allows you to do everything from visualizing repo history to committing to Pull Requests right in your text editor window.

Sublime has some [git integration](https://www.sublimetext.com/docs/git_integration.html#sublime-merge-integration), but mainly leans on their GUI client, [Sublime Merge](https://www.sublimemerge.com/).

[TextMate](https://macromates.com/textmate/manual/version-control) has a few version control integration features.

## Conclusion

Hopefully this gives you an idea of the wealth of git tools out there!
