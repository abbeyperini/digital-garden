class Blog extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const data = await fetch('https://images.abbeyperini.com/data/blog-data.json').then((response) => {return response.json()});
    const allBlogs = data.blogs;
    const allTopics = data.topics;
    let blogName = this.attributes?.blog?.value
    if (!blogName) {
      const params = new URLSearchParams(document.location.search);
      blogName = params.get("blog");
    }
    const page = `../blogs/${blogName}.md`;
    const blog = `<zero-md id="zero" src=${page}></zero-md>`;
    const topicsLinks = allBlogs[blogName].topics.map((topic, index) => {
      let linkText = allTopics[topic].title
      if (index !== (allBlogs[blogName].topics.length - 1)) {
        linkText += ","
      }
      return `<li><a href="/topic.html?topic=${topic}">${linkText}</a></li>`
    });
    const topicsList = `<p>Topics:</p><ul class="topics-list">${topicsLinks.join("")}</ul>`
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
      seriesList = `<p>Series:</p><ul class="series-list">${seriesLinks.join("")}</ul>`;
    }
    const topHTML = `<h1 class="title">${allBlogs[blogName].title} by Abbey Perini</h1>
    <div class="blog-container">
      <p>Knowledge Level: ${allBlogs[blogName]["knowledge-level"]}</p>
      <p>Planted: ${new Date(allBlogs[blogName].planted).toDateString()}
      <p>Last Tended: ${new Date(allBlogs[blogName]["last-tended"]).toDateString()}
      ${topicsList}`;

    this.innerHTML = (allBlogs[blogName].series.length > 0) ? `${topHTML}${seriesList}${blog}</div>` : `${topHTML}${blog}</div>`;
    this.setAttribute("class", "blog-component");
    this.setAttribute("id", "blog");
    this.setAttribute("title", allBlogs[blogName].title);
    const pageTitle = `${allBlogs[blogName].title} by Abbey Perini`;
    document.title = pageTitle;
    document.querySelector('meta[property="og:title"]').setAttribute("content", pageTitle);
  }
}

customElements.define('blog-component', Blog);