## Cognitive Load and Your Development Environment

![Michael Jackson and all the zombies on the Thriller music video set](https://images.abbeyperini.com/cognitive-load/thriller.png)

Watch the talk in the live recording of [MagnoliaJS Day 2](https://www.youtube.com/live/mr6rWFgh_1E?si=1pPw-NKN03LL1UVg).

There's lots of information out there about reducing cognitive load for users, but what about developers? Let's talk about Cognitive Load Theory, how some disabilities affect it, and designing a developer environment around it.

### What Is Cognitive Load?

Cognitive Load is the amount of available memory and cognition (thinking) resources you have.

Cognitive Load is also used to describe the amount of memory and cognition resources a task requires.

Cognitive Overload is triggered by a task or tasks requiring more Cognitive Load than you can sustain.

![zombie reaching towards you saying "more brains"](https://images.abbeyperini.com/cognitive-load/more-brains.png)

Memory and cognition are made up of many complex processes working together. You can only think about and remember so many things at one time. Many things affect how easy it is to get information through all the processes and stored in your memory. It may be how long you have to focus, the way information is presented to you, the amount of information, or the complexity of the information.

Things that reduce focus and energy reduce your available Cognitive Load. Lacking physical resources, like food, sleep, and shelter, makes it harder to think. There are fewer available resources to power your brain and you're probably focused on finding those things. Physical discomfort distracts you. If your office is too cold, you're going to use up some of your thinking power trying to find a way to warm up.

We know [emotions affect our available Cognitive Load](https://psycnet.apa.org/record/2019-13627-001). Generally, we can assume negative emotions reduce available Cognitive Load, but the relationship is complex. [Chronic stress](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8967732/) definitely negatively affects available Cognitive Load. If you've had a bad day or a lot of really stressful days, you've probably noticed it's harder to think and focus.

### Cognitive Load and Disabilities

Mental illness and disabilities can reduce available Cognitive Load. Some disabilities increase the Cognitive Load common tasks take. If we're aware of this, we can reframe information in a way that helps prevent Cognitive Overload.

[Anxiety](https://pubmed.ncbi.nlm.nih.gov/16637749/) and [Post-Traumatic Stress Disorder (PTSD)](https://www.frontiersin.org/articles/10.3389/fnint.2012.00089/full#:~:text=The%20hallmark%20symptoms%20of%20PTSD,emotionality%20has%20on%20cognitive%20functioning.) both keep the mind and body in a heightened state of stress that affects focus, information processing, and memory.

[Chronic pain](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8492915/#:~:text=Clinical%20studies%20have%20shown%20that,et%20al.%2C%202017) will take up some of your resources focusing on the pain and reduce your available memory overall.

[A sensory processing disorder or learning disorder](https://www.tandfonline.com/doi/full/10.1080/2331186X.2021.1929038) adds Cognitive Load to taking in information and processing it.

Cognitive disabilities stemming from physical injury to the brain or dysfunction of brain structure like Traumatic Brain Injury (TBI), Dementia, Alzheimer's, and Amnesia can have devastating effects on every part of the information storing process. The effects of a TBI depend on what part of the brain has been injured. It may be the language processing center is injured and the individual has to relearn language. If the part of the brain controlling executive function is injured, a TBI becomes an executive function disorder.

Executive function, our ability to plan, control our impulses, and direct our attention, also affects nearly every part of cognition and memory. Attention Deficit Hyperactivity Disorder (ADHD) is an executive function disorder. Those with ADHD often say they don't have a deficit of attention, they just can't direct their attention like those without ADHD. The brain is unable to filter out distractions and tries to pay attention to everything, [resulting in frequent Cognitive Overload](https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=7a04d97ccc3d5339f243178d808460c28a4692a9). Attention isn't sustained on information long enough to get it through the processes to store it in memory. Rather than an importance-based nervous system, those with ADHD have an [interest-based nervous system](https://medcircle.com/articles/adhd-interest-based-nervous-system/). Introducing something they're naturally interested in, some challenge or competition, novelty, or urgency allows them to sustain attention and increase their available Cognitive Load. However, sustained attention can become hyperfocus. They struggle to direct their attention away from something that interests them. When sustained for long enough, this backfires and reduces Cognitive Load through fatigue, hunger, etc.

Those with Autism Spectrum Disorder (ASD) also struggle with frequent Cognitive Overload, and executive dysfunction is one of many theories as to why. We do know sensory information is not filtered out. As they take information in, it is difficult to discern what is the most important stimulus. There is also research suggesting that [the amount of verbal information they can think about at one time](https://jneurodevdisorders.biomedcentral.com/articles/10.1186/s11689-018-9236-y) is lower to start. However, much like ADHD, if [information is communicated in a style that works for someone with Autism](https://thespectrum.org.au/autism-strategy/autism-strategy-communication/) and sensory input is kept to a minimum, Cognitive Load can be reduced to a manageable level.

### Applied Cognitive Load Theory

![woman holding a brain in a bowl and chopsticks](https://images.abbeyperini.com/cognitive-load/brain-snack.png)

[Human Factors and Ergonomics](https://www.hfes.org/About-HFES/What-is-Human-Factors-and-Ergonomics) investigates the way a human doing a task is affected by everything around them. [Cognitive Ergonomics](https://ergo-plus.com/cognitive-ergonomics/) investigates the way the design of an interface matches the cognitive capabilities of users. Both seek to reduce errors, increase work quality, improve decision-making, and increase productivity. Both Human Factors and Cognitive Ergonomics would apply Cognitive Load Theory to something like the layout of a nuclear power plant control panel.

Instructional Design studies the way the design of learning materials affects the consumption of information by learners. This isn't limited to school. Instructional Designers also design training for employees. A large part of Instructional Design is studying how people absorb information, including Cognitive Load.

Studies from all three of these disciplines routinely inform User Experience (UX) and User Interface (UI) design. This is how a web developer may know how to reduce the cognitive load of a form for their users.

- [Cognitive Ergonomics Or designing for the human mind in digital and physical products by Julien Bergignat](https://bootcamp.uxdesign.cc/cognitive-ergonomics-ab0d7e76c99c)
- [CUErgo Ergonomic Guidelines for User-Interface Design](https://ergo.human.cornell.edu/AHTutorials/interface.html)
- [Human Factor Principles in UX Design by Nick Babich](https://uxmag.com/articles/human-factor-principles-in-ux-design)
- [The Synergy Of Instructional Design And UX Design In Creating Effective Learning Materials by Joseph Evanick](https://elearningindustry.com/the-synergy-of-instructional-design-and-ux-design-in-creating-effective-learning-materials)

### Instructional Design and Your Codebase

Instructional Designers have defined three ways to describe how difficult information is to process.

- Intrinsic Cognitive Load is how difficult the concept is to understand.
- Extraneous Cognitive Load is how difficult the presentation of the information is to understand.
- Germane Cognitive Load is how much Cognitive Load is required to process the information and store it in memory.

We can use Instructional Design as a template for assessing the Cognitive Load required to learn a new codebase.

Code Climate, a tool that measures many things about your code base, includes a metric for the Intrinsic Cognitive Load of the codebase called [Cognitive Complexity](https://docs.codeclimate.com/docs/cognitive-complexity). It uses concepts defined by G. Ann Campbell in the white paper *{Cognitive Complexity} a new way of measuring understandability*. Points are assigned to lines of code that increase Cognitive Load through abstraction, nesting, etc. Often, this is referred to as readability.

The Extraneous Cognitive Load is how information about your codebase is presented. Do you have helpful documentation? This includes where your documentation is located - is it easily findable? Is it one long chunk of text or broken up by headings or even pages? Is it reference documentation or a guide?

The Germane Cognitive Load of your codebase is how difficult it is to understand the whole system. You can decrease the Cognitive Load required to understand it by diagramming out mental models and providing multiple ways to consume information about your codebase, including videos with captions.

### Cognitive Load Theory and Your Development Environment

![zombie standing in a grave and yawning](https://images.abbeyperini.com/cognitive-load/hocus-pocus-zombie.gif)

#### Beyond Your Computer

Your development environment extends beyond your computer. It is easier to code when your physical needs are met - food, water, sleep, and breaks. You have to take breaks. Just like a car, your brain can't run without fuel to burn.

#### Reduce Distractions

Reduce the amount of information you're taking in while trying to focus. This isn't limited to sounds - hiding windows you aren't actively using and turning off notifications can only help you. If your development server takes time to load, that increases the amount of Cognitive Load spent sustaining your attention on waiting for it to boot up. Without other things to look at, the Cognitive Load required to sustain attention decreases.

#### Reduce Context Switching

Reduce context switching as much as possible. It [takes you longer to switch than you think](https://www.spikenow.com/blog/productivity/why-context-switching-is-bad-and-how-to-fix-it/), stresses you out, and prevents you from going deep on one topic. If you can, split up tasks so you can concentrate on one area for a period of time, take a break, and then context switch. Try [task batching, day theming, or time blocking](https://todoist.com/productivity-methods/time-blocking). As part of that, set times you'll respond to notifications and emails, so you don't have to always be paying attention to them.

#### Don’t Try to Remember Everything

Any tasks you need to remember to do in the future should be stored somewhere other than your brain. If you have requirements for opening PRs - how does every team member know what the requirements are beforehand? Are they written down and easy to find, like in a PR template? Are you running automated tasks for requirements like passing tests?

Are you remembering all the style rules for your code yourself? Add linters and formatters instead! You can configure your linters to make sure you never forget to remove a `console.log` or add a line at the end of a file again.

There are plenty of apps and organizational systems that will help you remember future tasks and reduce distractions. For example, [Focus](https://heyfocus.com/) blocks distractions and schedules your breaks and [Freedom](https://freedom.to/) will block distractions on all of your devices at once.

#### Learn Your IDE and Keyboard Shortcuts

There's a lot your integrated development environment (IDE) can do to help you out. Even if you haven't changed a single setting in your IDE, you've probably noticed that [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense) suggestions help you remember exact variable names and more. Using VS Code as an example, there's a huge [list of keyboard shortcuts](https://code.visualstudio.com/docs/getstarted/keybindings). Common tasks, like moving code blocks up and down in a file, are already bound and you can also bind your own. Reading the [user interface docs](https://code.visualstudio.com/docs/getstarted/userinterface)  will tell you how to hide anything that just distracts you. Combining both of those ideas - the keyboard shortcut `Ctrl+K Z` will open zen mode, hiding everything but the current file. The command palette will tell you all the commands you can use, so you don't have to remember them.

You can create [workspaces](https://code.visualstudio.com/docs/getstarted/settings) to share settings with your coworkers. You can [turn on settings sync](https://code.visualstudio.com/docs/editor/settings-sync) so you don't have to edit VS Code settings for every project.

VS Code also has options like [reusable code snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets), [Code Actions and Quick Fixes](https://code.visualstudio.com/docs/editor/refactoring), [integrated automated tasks](https://code.visualstudio.com/docs/editor/tasks), [a source control GUI](https://code.visualstudio.com/docs/sourcecontrol/overview), and [debugging](https://code.visualstudio.com/docs/editor/debugging). I haven't even touched on added functionality from [extensions](https://code.visualstudio.com/docs/editor/extension-marketplace)!

It's a lot, but the VS Code docs have thought about Extraneous Cognitive Load and created [written guides](https://code.visualstudio.com/docs), [video guides](https://code.visualstudio.com/docs/getstarted/introvideos), reference docs and more!

### Conclusion

> “When cognitive load isn’t considered, teams are spread thin trying to cover an excessive amount of responsibilities and domains. Such a team lacks bandwidth to pursue mastery of their trade and struggles with the costs of switching contexts.” - Matthew Skelton

I hope this introduction to Cognitive Load Theory and examples of how it can be applied help you spot ways to prevent your own Cognitive Overload. In software development, we are expected to constantly learn. Part of that is setting up your brain for success while it's trying to absorb information.
