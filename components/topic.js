const allTopics = {
  accessibility: {
    title: "Accessibility",
    articles: ["accessibility", "audit-1", "audit-2", "audit-3", "audit-4", "audit-5", "audit-6", "HTML", "===", "tabbing-1", "tabbing-2", "tabbing-3", "color-scheme", "design", "live-regions"]
  },
  ADHD: {
    title: "ADHD",
    articles: ["ADHD-1", "ADHD-2", "ADHD-3", "ADHD-4", "ADHD-5", "ADHD-6"]
  },
  audit: {
    title: "Accessibility Auditing Her Own Site",
    articles: ["audit-1", "audit-2", "audit-3", "audit-4", "audit-5", "audit-6"]
  },
  neurodiversity: {
    title: "Neurodiversity",
    articles: ["ADHD-1", "ADHD-2", "ADHD-3", "ADHD-4", "ADHD-5", "ADHD-6"]
  },
  career: {
    title: "Career",
    articles: ["breaking", "confidence", "1-year", "coding"]
  },
  coding: {
    title: "Coding",
    articles: ["embrace", "100", "OOP", "knitting", "legacy", "coding", "serverless", "1-year", "commit", "ADHD-1", "ADHD-2", "ADHD-3", "ADHD-4", "ADHD-5", "ADHD-6", "gitPanic-1", "gitPanic-2", "gitPanic-3", "gitPanic-4", "gitPanic-5", "gitPanic-6", "gitPanic-7", "gitPanic-8", "gitPanic-9", "gitPanic-10", "writing-2"]
  },
  CSS: {
    title: "CSS",
    articles: ["animated", "trio", "toggle", "serverless", "shibas", "audit-2", "audit-3", "audit-4", "audit-5", "audit-6", "tabbing-3", "color-scheme", "design"]
  },
  darkModeToggle: {
    title: "Dark Mode Toggle",
    articles: ["toggle", "audit-3", "color-scheme"]
  },
  design: {
    title: "Design",
    articles: ["design", "favicons"]
  },
  digitalGarden: {
    title: "Her Digital Garden",
    articles: ["garden"]
  },
  git: {
    title: "git",
    articles: ["commit", "gitPanic-1", "gitPanic-2", "gitPanic-3", "gitPanic-4", "gitPanic-5", "gitPanic-6", "gitPanic-7", "gitPanic-8", "gitPanic-9", "gitPanic-10"]
  },
  github: {
    title: "GitHub",
    articles: ["gitPanic-1", "gitPanic-2", "gitPanic-3", "gitPanic-5", "gitPanic-10"]
  },
  HTML: {
    title: "HTML",
    articles: ["animated", "HTML", "tabbing-1", "tabbing-2", "live-regions"]
  },
  images: {
    title: "Images",
    articles: ["shibas", "images", "webp", "avif", "jpegxl", "ico", "favicons"]
  },
  react: {
    title: "React",
    articles: ["accessibility", "reload", "toggle", "serverless", "shibas", "live-regions"]
  },
  security: {
    title: "Security",
    articles: ["security-1", "security-2"]
  },
  serverless: {
    title: "Serverless",
    articles: ["serverless"]
  },
  webDevelopment: {
    title: "Web Development",
    articles: ["accessibility", "animated", "reload", "OOP", "toggle", "panini-bot", "serverless", "images", "shibas", "audit-1", "audit-2", "audit-3", "audit-4", "audit-5", "audit-6", "HTTP-1", "HTTP-2", "HTTP-3", "HTTP-4", "HTTP-5", "HTML", "webp", "tabbing-1", "tabbing-2", "tabbing-3", "AVIF", "favicons", "security-1", "security-2", "garden", "modules", "color-scheme"]
  },
  womenInProgramming: {
    title: "Women in Programming",
    articles: ["beginning", "support"]
  },
  writing: {
    title: "Writing",
    articles: ["writing", "writing-2", "research"]
  }
}

class Topic extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const params = new URLSearchParams(document.location.search);
    const topic = params.get("topic");
    const topicHTML = allTopics[topic].articles.map((name) => {
      return `<zero-md src="../blogs/${name}.md"></zero-md>`
    });
    topicHTML.join();
    const title = `Abbey Perini's Articles About ${allTopics[topic].title}`
    this.innerHTML = `
      <h1 class="title">${title}</h1>
      ${topicHTML}
    `;
    this.setAttribute("class", "topic-component");
    this.setAttribute("id", "topic");
    this.setAttribute("title", title);
  }
}

customElements.define('topic-component', Topic);