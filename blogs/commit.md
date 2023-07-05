## Git Commit Message Template in Terminal and VS Code

Knowledge Level: Evergreen

Planted: 05/17/2022

Last Tended: 11/04/2022

Topics: [git](/topic.html?topic=git), [coding](/topic.html?topic=coding)

Series: [#gitPanic](/series.html?series=gitPanic)

![tweet by amy nguyen me playing video games: save every five minutes me writing code: git commit -am "some changes" (+647, -1049)](https://images.abbeyperini.com/gitPanic/some-changes.webp)

Recently I've been trying to write [better commit messages](https://cbea.ms/git-commit/). With my ADHD, my motto is always be writing it down, so I was delighted when my coworker told me about git commit message templates.

To start, I distilled down what I was looking to put in every message:

- a [conventional commit type](https://www.conventionalcommits.org/en/v1.0.0/)
- a descriptive title
- a body describing what and why
- an issue number

I also liked [Lisa's template's wrap lines](https://gist.github.com/lisawolderiksen/a7b99d94c92c6671181611be1641c733), in which she put an octothorpe in the last valid column before git would terminate the line.

Based on that, I created a `.gitmessage` file in my home directory:

```Bash
<type>: <title>
## No more than 50 chars. ##### 50 chars is here: #
 
<body> 
## Wrap at 72 chars. ################################### which is here: #
 
Issue #
```

Then I ran

```sh
git config --global commit.template ~/.gitmessage
```

If you wanted to do that all in one line in the terminal, you would run:

```sh
printf "<type>: <title>\n## No more than 50 chars. ##### 50 chars is here: #\n\n<body>\n## Wrap at 72 chars. ################################### which is here: #\n\nIssue #" > ~/.gitmessage && git config --global commit.template ~/.gitmessage
```

If you want to, you can remove the `--global` flag from the command and create a different git commit message template for each repository you have. If the path to the `.gitmessage` file is not absolute, it will be treated relative to the repository root.

All of this works great ...if I was usually running `git commit` in the terminal. I'm used to using [VS Code's Source Control panel](https://code.visualstudio.com/docs/editor/versioncontrol) when I commit, and the commented out prompts in the message template don't show there. I totally could [alias something in my `.zshrc`](https://toolspond.com/zshrc/) like:

```sh
alias commit="git add . && git commit && git push && git pull"
```

...but I've grown fond of the little commit check mark. Instead, I found two commit message extension options.

The [Commit Message Editor](https://marketplace.visualstudio.com/items?itemName=adam-bender.commit-message-editor&ssr=false#overview) has a UI within VS Code and clear instructions. After you click the pencil icon in the source control panel, you can choose between a traditional git message template style or a form.

[VS Code Git Commit Editor](https://marketplace.visualstudio.com/items?itemName=rioukkevin.vscode-git-commit) has an external UI to help you configure settings, a lot of options, and would appeal to someone looking for more automation. To get a similar template up and running, I had to add the following code to my [`settings.json`](https://code.visualstudio.com/docs/getstarted/settings#_settingsjson).

```JavaScript
{
  ...
  "vscodeGitCommit.template": [
    "{type}: {title}\n\n{body}\n\nIssue #{issue}"
  ]
}
```

Then, if you click the chat icon in the source control panel, you will be prompted to enter values for anything in curly braces in that string.

Pretty neat! I ended up going with the Commit Message Editor because I want the commented out prompts, and now I'm covered in the terminal and in my text editor.
