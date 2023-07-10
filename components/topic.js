class Topic extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const data = await fetch('https://images.abbeyperini.com/data/blog-data.json').then((response) => {return response.json()});
    const allTopics = data.topics;
    const allBlogs = data.blogs;
    const params = new URLSearchParams(document.location.search);
    const topic = params.get("topic");
    const topicHTML = allTopics[topic].articles.map((blogName) => {
      const topicsLinks = allBlogs[blogName].topics.map((topic, index) => {
        let linkText = allTopics[topic].title
        if (index !== (allBlogs[blogName].topics.length - 1)) {
          linkText += ","
        }
        return `<li><a href="/topic.html?topic=${topic}">${linkText}</a></li>`
      });
      const topicsList = `<div class="topics-container"><p>Topics:</p><ul class="topics-list">${topicsLinks.join("")}</ul></div>`;
      let seriesList = null;
      if (allBlogs[blogName].series.length > 0) {
        const allSeries = data.series;
        const seriesLinks = allBlogs[blogName].series.map((series, index) => {
          let linkText = allSeries[series].title
          if (index !== (allBlogs[blogName].series.length - 1)) {
            linkText += ",";
          }
          return `<li><a href="/series.html?series=${series}">${linkText}</a></li>`;
        })
        seriesList = `<div class="series-container"><p>Series:</p><ul class="series-list">${seriesLinks.join("")}</ul></div>`;
        return `<div class="blog-container"><div class="metadata-container"><p>Knowledge Level: ${allBlogs[blogName]["knowledge-level"]}</p><p>Planted: ${new Date(allBlogs[blogName].planted).toDateString()}<p>Last Tended: ${new Date(allBlogs[blogName]["last-tended"]).toDateString()}${topicsList}${seriesList}</div><zero-md src="../blogs/${blogName}.md"></zero-md></div>`;
      }
      return `<div class="blog-container"><div class="metadata-container"><p>Knowledge Level: ${allBlogs[blogName]["knowledge-level"]}</p><p>Planted: ${new Date(allBlogs[blogName].planted).toDateString()}<p>Last Tended: ${new Date(allBlogs[blogName]["last-tended"]).toDateString()}${topicsList}</div><zero-md src="../blogs/${blogName}.md"></zero-md></div>`;
    });
    const finalHTML = topicHTML.join("");
    const title = `Abbey Perini's Articles About ${allTopics[topic].title}`
    this.innerHTML = `
      <h1 class="title">${title}</h1>
      ${finalHTML}
    `;
    this.setAttribute("class", "topic-component");
    document.title = title;
    document.querySelector('meta[property="og:title"]').setAttribute("content", title);
  }
}

customElements.define('topic-component', Topic);