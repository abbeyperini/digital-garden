const allSeries = {
  toggle: ["toggle", "audit-3", "color-scheme"],
  onWriting: ["writing", "writing-2", "research"],
  security: ["security-1", "security-2"],
  gitPanic: ["commit", "gitPanic-1", "gitPanic-2", "gitPanic-3", "gitPanic-4", "gitPanic-5", "gitPanic-6", "gitPanic-7", "gitPanic-8", "gitPanic-9", "gitPanic-10"],
  tabbing: ["tabbing-1", "tabbing-2", "tabbing-3"],
  ADHD: ["ADHD-1", "ADHD-2", "ADHD-3", "ADHD-4", "ADHD-5", "ADHD-6"],
  HTTP: ["HTTP-1", "HTTP-2", "HTTP-3", "HTTP-4", "HTTP-5"],
  career: ["breaking", "confidence", "1-year"],
  women: ["beginning", "support"],
  images: ["shibas", "images", "webp", "avif", "jpegxl", "ico", "favicons"],
  audit: ["audit-1", "audit-2", "audit-3", "audit-4", "audit-5", "audit-6"]
}

class Series extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const params = new URLSearchParams(document.location.search);
    const series = params.get("series");
    const seriesHTML = allSeries[series].map((name) => {
      return `
      <zero-md src="../blogs/${name}.md">
        <template>
          <link rel="stylesheet" href="../styles/markdown.css" />
        </template>
      </zero-md>
    `
    });
    seriesHTML.join();
    this.innerHTML = seriesHTML;
    this.setAttribute("class", "series-component");
  }
}

customElements.define('series-component', Series);