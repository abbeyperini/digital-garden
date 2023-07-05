const allSeries = {
  toggle: {
    title: "Dark Mode Toggle",
    articles: ["toggle", "audit-3", "color-scheme"]
  },
  onWriting: {
    title: "On Writing",
    articles: ["writing", "writing-2", "research"]
  },
  security: {
    title: "Web Security 101",
    articles: ["security-1", "security-2"]
  },
  gitPanic: {
    title: "#gitPanic",
    articles: ["commit", "gitPanic-1", "gitPanic-2", "gitPanic-3", "gitPanic-4", "gitPanic-5", "gitPanic-6", "gitPanic-7", "gitPanic-8", "gitPanic-9", "gitPanic-10"]
  },
  tabbing: {
    title: "Tabbing",
    articles: ["tabbing-1", "tabbing-2", "tabbing-3"]
  },
  ADHD: {
    title: "Coding and ADHD",
    articles: ["ADHD-1", "ADHD-2", "ADHD-3", "ADHD-4", "ADHD-5", "ADHD-6"]
  },
  HTTP: {
    title: "A Beginner's Guide to HTTP",
    articles: ["HTTP-1", "HTTP-2", "HTTP-3", "HTTP-4", "HTTP-5"]
  },
  career: {
    title: "Career",
    articles: ["breaking", "confidence", "1-year"]
  },
  women: {
    title: "Women in Programming",
    articles: ["beginning", "support"]
  },
  images: {
    title: "Images",
    articles: ["shibas", "images", "webp", "avif", "jpegxl", "ico", "favicons"]
  },
  audit: {title: "Accessibility Audit",
    articles: ["audit-1", "audit-2", "audit-3", "audit-4", "audit-5", "audit-6"]
  }
}

class Series extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const params = new URLSearchParams(document.location.search);
    const series = params.get("series");
    const seriesHTML = allSeries[series].articles.map((name) => {
      return `<zero-md src="../blogs/${name}.md"></zero-md>`
    });
    seriesHTML.join();
    const title = `${allSeries[series].title} Series`
    this.innerHTML = `
      <h1 class="title">${title}</h1>
      ${seriesHTML}
    `;
    this.setAttribute("class", "series-component");
    this.setAttribute("id", "series");
    this.setAttribute("title", title);
  }
}

customElements.define('series-component', Series);