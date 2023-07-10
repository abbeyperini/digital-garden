class Preview extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const data = await fetch('https://images.abbeyperini.com/data/blog-data.json').then((response) => {return response.json()});
    const allBlogs = data.blogs;
    const allTopics = data.topics;
    const allSeries = data.series;
    const attributes = this.attributes;

    if (attributes.blog) {
      const blogName = attributes.blog.value;
      this.innerHTML = `<h3><a href="/blog.html?blog=${blogName}">${allBlogs[blogName].title}</a></h3>`
    }

    if (attributes.series) {
      const series = attributes.series.value;
      const seriesTitles = allSeries[series].articles.map((blogName) => {
        return `<h3><a href="/blog.html?blog=${blogName}">${allBlogs[blogName].title}</a></h3>`
      })
      this.innerHTML = seriesTitles.join("");
    }

    if (attributes.topic) {
      const topic = attributes.topic.value;
      const topicTitles = allTopics[topic].articles.map((blogName) => {
        return `<h3><a href="/blog.html?blog=${blogName}">${allBlogs[blogName].title}</a></h3>`
      })
      this.innerHTML = topicTitles.join("");
    }

    this.setAttribute("class", "preview-component");
  }
}

customElements.define('preview-component', Preview);