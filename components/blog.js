const blogTitles = {
  "===": "Web Development === Accessibility",
  "1-year": "12 Things I learned During My First Year as a Professional Developer",
  "100": "#100DaysOfCode",
  "accessibility": "Accessibility and React",
  "ADHD-1": "Coding and ADHD - ADHD Brains",
  "ADHD-2": "Coding and ADHD - Can't Start",
  "ADHD-3": "Coding and ADHD - Can't Keep Going",
  "ADHD-4": "Coding and ADHD - Can't Stop",
  "ADHD-5": "Coding and ADHD - Can't Remember",
  "ADHD-6": "Coding and ADHD - Where We Excel",
  "animated": "CSS Animated Button with Offset Border",
  "audit-1": "Accessibility Auditing My Portfolio Site - Part 1",
  "audit-2": "Accessibility Auditing My Portfolio Site - Part 2",
  "audit-3": "An Accessible Dark Mode Toggle in React",
  "audit-4": "Accessibility Auditing My Portfolio Site - Part 4",
  "audit-5": "Blog Page Accessibility Deep Dive",
  "audit-6": "Accessibility Auditing My Portfolio Site - Part 6",
  "avif": "What is AVIF?",
  "beginning": "We've Been Here Since the Beginning",
  "breaking": "Breaking into Tech - Tips from a Former Recruiting Admin",
  "coding": "Coding for Fun on Top of Coding Professionally",
  "color-scheme": "Dark Mode Toggle and prefers-color-scheme",
  "commit": "Git Commit Message Template in Terminal and VS Code",
  "confidence": "Practicing Confidence for the Job Search",
  "design": "From Idea to Design for Non-Designers",
  "embrace": "Embrace the Struggle While Learning to Code",
  "favicons": "What are Favicons?",
  "garden": "About My Digital Garden",
  "gitPanic-1": "#gitPanic - Git 101",
  "gitPanic-2": "#gitPanic - Merging and Rebasing",
  "gitPanic-3": "#gitPanic - Working in a Repo",
  "gitPanic-4": "#gitPanic - HEAD",
  "gitPanic-5": "#gitPanic - Interactive Rebase",
  "gitPanic-6": "#gitPanic - Stash",
  "gitPanic-7": "#gitPanic - Documentation and Profiles",
  "gitPanic-8": "#gitPanic - Removing and Restoring Work",
  "gitPanic-9": "#gitPanic - Files",
  "gitPanic-10": "#gitPanic - Tools",
  "HTML": "Semantic HTML: What, Why, and How",
  "HTTP-1": "A Beginner's Guide to HTTP - Part 1: Definitions",
  "HTTP-2": "A Beginner's Guide to HTTP - Part 2: Responses",
  "HTTP-3": "A Beginner's Guide to HTTP - Part 3: Requests",
  "HTTP-4": "A Beginner's Guide to HTTP - Part 4: APIs",
  "HTTP-5": "A Beginner's Guide to HTTP - Part 5: Authentication",
  "ico": "What is ICO?",
  "images": "Sourcing Images and Optimizing Them for the Web",
  "jpegxl": "What is JPEG XL?",
  "knitting": "Knitting as Programming",
  "legacy": "8 Things I've Learned Working in a Legacy Codebase",
  "live-regions": "Live Regions in React",
  "modules": "TL;DR CommonJS vs ESM",
  "OOP": "Object Oriented Programming in Memes",
  "panini-bot": "Panini Bot — Making a Discord Bot with Replit, UptimeRobot, Node.js, Express, and Eris",
  "reload": "How To Reload a Page Whenever a User Makes a Change with React/Redux",
  "research": "From Research to Writing Reference Material",
  "security-1": "Web Security 101 - Part 1: Secrets",
  "security-2": "Web Security 101 - Part 2: User Input",
  "serverless": "A Walkthrough of Updating My Portfolio Site with Netlify Functions and the DEV API",
  "shibas": "Adding Shiba Inu Loading and Error SVGs to My React Site",
  "support": "8 Ways to Support Women Developers",
  "tabbing-1": "Tabbing Tactfully",
  "tabbing-2": "Troubleshooting Tabbing",
  "tabbing-3": "Transforming Tired Tabbing",
  "toggle": "Toggle Dark Mode in React",
  "trio": "A Trio of Buttons for a Bubbly, Colorful Site",
  "webp": "What is WebP?",
  "writing-2": "Writing a Technical Blog",
  "writing": "How I Structure My Writing"
}

class Blog extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let blogName = this.attributes?.blog?.value
    if (!blogName) {
      const params = new URLSearchParams(document.location.search);
      blogName = params.get("blog");
    }
    const page = `../blogs/${blogName}.md`;
    const blog = `<zero-md id="zero" src=${page}></zero-md>`;
    this.innerHTML = `<h1 class="title">${blogTitles[blogName]} by Abbey Perini</h1>${blog}`;
    this.setAttribute("class", "blog-component");
    this.setAttribute("id", "blog");
    this.setAttribute("title", blogTitles[blogName]);
  }
}

customElements.define('blog-component', Blog);