## Three Human Problems in a Technical Trench Coat

![Amro Mousa @amdev Tweeted "writing clickbait titles for JIRA tickets"](https://images.abbeyperini.com/trench-coat/clickbait-jira.jpeg)

In technical roles, we want to believe everything has a technical solution. However, software development involves humans, so what can seem like a technical problem is often three human problems in a technical trench coat.

### Communicating Requirements

Writing a ticket or issue for software development requires understanding the system and tooling and, more importantly, communication skills. A good ticket explains what is currently happening and what the desired end state is. It also needs to meet the developers where they are.

You may be thinking "I had to struggle to find out what to do, and it made me a better developer. They should have to struggle too." or "Being able to find the answers you need on your own is a skill." It's important to recognize the difference between having to learn about the problem versus wasting company time guessing what people want. The latter usually leads to redoing work multiple times. Definitely leave room for a developer to figure out their own approach. Don't leave them hanging. This will mean breaking down work differently for developers of different skill levels.

Also, if you're finding your team often has pull requests (PRs) with dozens of comments, investigate it. Requirements need to be hashed out before the work is completed and submitted for review. Seeing the same comments over and over again means it's time to think about where communication before the PR is missing the mark.

A simple solution, especially when team members can't seem to agree, is creating easy-to-find, documented standards. Then automate them as much as possible with linters, formatters, and automated checks. Finally, help people remember the little things with PR and issue templates.

Work tracking is important and can help productivity. However, our instinct is usually to add more charts, processes, and tracking when projects keep ballooning and deadlines are not met. More often than not, looking at work that isn't explicitly stated when a ticket is written, assigned, and estimated will help more.

### Translating your Opinions into Feedback

![Man pointing into his own hand and staring intensely at someone like they better get it done captioned "When you see someone who owes you code review "](https://images.abbeyperini.com/trench-coat/owed-code-review.jpg)

Code reviews are an opportunity to empower developers to increase code quality, but they can easily become adversarial. Learning how to give good feedback on code is part of the job. Take moral statements like "good code" and "bad code" out of your vocabulary.

Unsupported criticism doesn't improve code quality and makes people hesitant to ask for your opinion. Constructive feedback includes how to get from the current state to the desired state. Excellent constructive feedback involves explaining concepts and providing learning resources.

If you use the words "code smell," you better follow that up with an explanation of the best practice or design pattern you're wanting to see. If you're only saying you don't like it, you're probably going to keep seeing it. If you explain why you don't like it and what you like, the person receiving feedback can take that pattern or concept and apply it to future work. Utilize resources like [refactoring guru](https://refactoring.guru/) that explain patterns with code snippets.

Coding is rarely black and white. There usually are many ways to accomplish the same thing. If you engage with other developers, you may find that they have considered your approach and have a good reason for doing it a different way. You're likely to discover that open discourse with developers of all levels helps you grow your skills too.

### Accepting Feedback

Coding is a creative endeavor. It often involves struggling before the problem is solved. Feedback on our code can feel incredibly personal. Usually, it's not. In fact, it's probably more about the other person than you.

If you know you struggle to remember this, start monitoring your response, take a quick break before you respond, and create a [grounding and calming routine](https://www.choosingtherapy.com/grounding-techniques/). If feedback via text often upsets you, schedule time with your reviewer to go over your code via voice, video, or even in-person, if you can.

### Creating Collaborative Feedback Sessions

![Man in a suit pointing captioned "Your code is good" Man in a suit smiling captioned "but it can be better"](https://images.abbeyperini.com/trench-coat/code-good.jpeg)

Two things are really important in creating collaborative feedback sessions: psychological safety and getting to know your team.

Taylor Poindexter has a [great talk about Infusing Psychological Safety into Your Teams](https://www.youtube.com/watch?v=YW3zv4gkaAo&ab_channel=RenderATL) from a leader's perspective. As a team member, it's also your responsibility to promote an environment where everyone feels safe to admit they don't know and ask the stupid questions.

We all love mandatory fun, team-bonding meetings, but getting to know your team also means learning about how they like to work. If Suzanne only ever reviews PRs in the afternoon and Charles only ever reviews PRs in the morning, you know who to go to when you finish your PR in the afternoon. You may find that no one will read PR descriptions but everyone will watch two screen recordings of functionality before and after the change.

A great way to get everyone on the same page is to turn the requirements into verification steps in your PR description. Say your requirement is to add a button that opens a modal.

- [ ] Run the branch locally
- [ ] Click the button
- [ ] The modal opens

Not only will someone be able to tell immediately if your new code doesn't work, but they may also think of things to test that you didn't. After the PR is merged, these steps are ready to send to QA!

### The Importance of Compliments and Gifs

Positivity during code review is the easiest way to build rapport with your coworkers. If the only time they interact with you is hearing all your criticism about their work, that's all they're going to know about you. Take a little time to point out things that they wrote that you like. If you learned something, thank them for the new knowledge. Leave the approval message you'd want to see.

Install the [GIFs for GitHub](https://chromewebstore.google.com/detail/dkgjnpbipbdaoaadbdhpiokaemhlphep) extension and don't forget your [alt text](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt)!

![Shaun the sheep smiling and giving two thumbs up](https://images.abbeyperini.com/trench-coat/shaun.gif)

## Taking Neurodiversity and Disabilities into Account

There are many [neurotypes](https://en.wikiversity.org/wiki/Neurodiversity_Movement/Section_1:_The_Basics#:~:text=A%20neurotype%20is%20the%20name,of%20wiring%2C%20hence%20the%20name.) that struggle to deal with criticism, constructive or otherwise. Do not expect another person to read your mind or emotions. Do give constructive feedback on the type of communication you need.

Sometimes the accommodations for communication for a disability are obvious. For example, if your team member is Deaf, every time you hop in a call, you'll need an interpreter or captioner. If a team member has dyslexia, you would read a ticket to them in a meeting instead of expecting them to read it quickly. If a team member has dysgraphia, you wouldn't expect them to write a ticket while you watch. [askJAN](https://askjan.org/) is a great resource for learning about what kind of accommodations your team member may need.

Many cognitive disabilities affect the way people break down work. Lots of PR comments or large, vague tickets exacerbate this. If you know a teammate struggles in this area, regular check-ins can help. Talking through the expectations for the work before a PR is submitted is always a good idea. Comment once about an issue that appears repeatedly in a PR instead of commenting on every instance of it. Research and planning should always be a part of building a project, so make it an explicit part of your process.

These simple accommodations for cognitive disabilities help everyone. Ironically, they're often the hardest to get. I have ADHD. I know I'm going to forget, so I've been forced to become the most organized member of the team. Asking for everyone to write things down as an accommodation is typically ignored, so I write everything down myself. I'll leave comments about my decisions all over my PRs. This way, my reviewer and I will know what's going on even if a PR sits for weeks. It's a great example of something I've had to learn to do to get by, and something that neurotypical people start to adopt when they realize how much it helps them too.

![Me when looking at the code I wrote 2 weeks ago I've never met this code in my life](https://images.abbeyperini.com/trench-coat/never-met.jpeg)

When you get multiple people together, there are bound to be communication issues regardless of neurotype. If I communicate something to a coworker and there's clearly a misunderstanding, my first question is "how can I approach this differently next time?" On any team, a good rule of thumb is to hop in a call or impromptu meeting if you're trying to explain something about code goes beyond three to five chat messages.

People usually want as little conflict as possible at work. If there's a communication mismatch, it's on both parties to try and find common ground. If the communication issues are frequent or cross a line, don't hesitate to reach out to someone you trust to mediate. Sometimes the real problem is the communication is actually someone else's job and they're dropping the ball.

### Different Opinions are Crucial

Including developers of a variety of backgrounds and experience in your feedback process is paramount. It's been a long time since a senior developer was a junior developer. It's hard to remember all the basic concepts required to understand an intermediate or advanced topic.

Throughout this article, I've said in a variety of ways that you need to meet your developers where they are. Part of that is recognizing the different skills they bring to the table. No one is good at everything, but everyone is good at something. Every team member should be encouraged to speak up when they have ideas.

### Conclusion

A collaborative, psychologically safe feedback process can quickly increase code quality and productivity. A feedback process full of harsh, unsupported criticism just increases turnover.

If you've got advice for improving communication in a software development team that I didn't touch on, leave a comment!
