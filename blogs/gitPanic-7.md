# #gitPanic - Documentation and Profiles

Planted: 11/18/2022
Tags: git, #gitPanic

![screenshot of Abbey's GitHub profile](https://images.abbeyperini.com/gitPanic/cover.png)

Documentation in GitHub goes far beyond a repo README.

1. [Market Your Repos](#market-your-repos)
2. [Market Yourself](#market-yourself)
3. [Best Practices](#best-practices)
4. [Wikis and Discussions](#wikis-and-discussions)

## Market Your Repos

In [Git 101](/blog.html?blog=gitPanic-1) I mentioned that your GitHub profile could easily be a software development portfolio. Here's what I mean: every repo README is a chance to market your code to a potential employer. I've been asked plenty of times to explain code in my GitHub profile during an interview. Going through the process of creating a really good repo README can only help you prepare for those kinds of questions. I've even used READMEs to [describe the work I did during bootcamp](https://github.com/abbeyperini/DC_React).

A README file contains information about the other files in software. On GitHub, the README is like the homepage of a repo. It uses [GitHub-flavored markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax), so you can do a lot of formatting and add images, gifs, and videos. At a minimum, every project should have instructions on how to run the app.

Here are the sections I would add in addition to how to run the code:

### About

Explain the problem you were trying to solve and how your app solves it. This will tell a hiring manager you can take a real world problem and solve it with code.

I've also used this section to describe updates, especially when I can link to a blog about them.

![screenshot of README at github.com/abbeyperini/Portfolio2.0](https://images.abbeyperini.com/gitPanic/readme.png)

### Usage

Deploy your app. Create an easy way for a potential employer to play around in your app, like a guest login. Link to it in this section. A hiring manager is almost never going to create an account, so make it really easy for them to see it works.

Explain the main functionality of the app. For example, a social media app would probably allow users to add and delete posts and see others' posts. To a hiring manager, this says you've coded the C, R, and D in [CRUD](https://www.codecademy.com/article/what-is-crud).

### Videos and Screenshots

For the hiring managers who won't even click the guest login, this section should be a walkthrough. I typically record my screen (cmd + shift + 5 on a mac) and use an online tool to convert it to a gif. One time in bootcamp, my friend recorded a video walkthrough and uploaded it to Youtube.

I try to always include desktop and mobile views, so hiring managers immediately know it's responsive.

![screenshot of README at github.com/brodri4/Gachasphere-client](https://images.abbeyperini.com/gitPanic/walkthrough.png)

### Built With

Your tech stack with languages and links to packages. I typically include a line with the technologies I used to deploy the app too. The best apps look simple, but have a lot going on under the hood. This also allows a hiring manager to see if you used tools without combing through your code.

### Acknowledgements

Always good to shout out anyone or any package that was integral to getting the app to work.

### License

Licensing open source code is a big topic, and [GitHub's license documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository) is a good place to start. They even created [choosealicense.com](www.choosealicense.com) to help make it easier.

Without a license, the default copyright laws apply, which gives you minimal protection. With a license, you can tell other developers what they have to do to use your code.

### Summary

If your README gets too long, it's straightforward to create a summary at the top that links to the sections with markdown. If you write a heading like `## Heading Text` then the link would be `[Heading Text](#heading-text)`.

## Market Yourself

Since hiring managers are likely checking out your GitHub profile to get to your repos, it's another opportunity to show off your work. In GitHub, there are really three main parts to fill out - the [bio](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/personalizing-your-profile#adding-a-bio-to-your-profile), [pinned repos](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/pinning-items-to-your-profile), and the [profile README](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme). If you've done work in a repo you didn't create, you can still pin it on your profile.

Thanks to GitHub-flavored markdown, there's a lot you can do in your profile README. Mine has links to sites I've built, recordings of talks I've given, ways to connect, and a [Blog Post Workflow](https://github.com/marketplace/actions/blog-post-workflow) written by @gautamkrishnar using [GitHub Actions](https://github.com/features/actions).

![screenshot of github.com/abbeyperini](https://images.abbeyperini.com/gitPanic/github-profile.png)

Check out these guides, lists, and tools for more ideas:

- @mishmanners [How to create a GitHub Profile README](https://dev.to/github/how-to-create-a-github-profile-readme-jha)
- @m0nica [How To Create A GitHub Profile README](https://dev.to/m0nica/how-to-create-a-github-profile-readme-1paj)
- [awesome-github-profile-readme](https://github.com/abhisheknaiidu/awesome-github-profile-readme)
- [GitHub Profile README Generator](https://rahuldkjain.github.io/gh-profile-readme-generator/)
- [Lowlighter Metrics](https://github.com/lowlighter/metrics)

## Best Practices

In addition to a README and license, there are several documents GitHub will automatically add to the sidebar of your repo. Some, like a [contributing guidelines](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors) document, it'll actively promote to users visiting your repo.

Things like contributing guidelines, issue templates, PR templates, and a code of conduct go a long way towards making your repo friendly for new contributors. Check out GitHub's [Building Communities](https://docs.github.com/en/communities) documentation for in-depth guides on what you can add and best practices.

## Wikis and Discussions

You can document your code right in GitHub with [wikis](https://docs.github.com/en/communities/documenting-your-project-with-wikis/about-wikis). You get all of the utility of markdown, like in READMEs, with a little more structure, such as [footers and sidebars](https://docs.github.com/en/communities/documenting-your-project-with-wikis/creating-a-footer-or-sidebar-for-your-wiki). Plus, you don't have to direct users to another site or add another tool to your release process.

With [discussions](https://docs.github.com/en/discussions), you can create a forum for your repo, so contributors and users can ask you questions outside of the [issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues) format. You can provide announcements, answer frequently asked questions, and even create polls!

## Conclusion

As part of the #gitPanic series, I figured I better mention how much content you can create right within GitHub. Whether it's marketing yourself for the job search, or managing the community around your repo, GitHub has plenty of features for you!
