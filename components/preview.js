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

    function mapBlogsToLinks(array) {
      return array.map((blogName, index) => {
        if (index < 4) {
          return `<li><h3><a href="/blog.html?blog=${blogName}">${allBlogs[blogName].title}</a></h3><li>`;
        }
      })
    }

    function comparePlantedDates(a, b, type) {
      const aDate = new Date(allBlogs[a].planted).getTime();
      const bDate = new Date(allBlogs[b].planted).getTime();
      if (bDate > aDate) {
        return 1;
      }
      if (bDate < aDate) {
        return -1;
      }
      return 0;
    }

    if (attributes.sort) {
      const sortType = attributes.sort.value;
      let blogNames;
      let links;
      // sorted by most recent
      if (sortType === "planted") {
        const keys = Object.keys(allBlogs);
        blogNames = keys.sort(comparePlantedDates)
        links = mapBlogsToLinks(blogNames);
      }
      links.push(`<a href="/sort.html?sort=${sortType}">Read all</a>`);
      return this.innerHTML = `<ul>${links.join("")}</ul>`;
    }

    if (attributes.blog) {
      const blogName = attributes.blog.value;
      return this.innerHTML = `<h3><a href="/blog.html?blog=${blogName}">${allBlogs[blogName].title}</a></h3>`;
    }

    if (attributes.series) {
      const series = attributes.series.value;
      const seriesLinks = mapBlogsToLinks(allSeries[series].articles);
      if (allSeries[series].articles.length > 3) {
        seriesLinks.push(`<a href="/series.html?series=${series}">Read more</a>`);
      }
      if (allSeries[series].articles.length <= 3) {
        seriesLinks.push(`<a href="/series.html?series=${series}">Read all</a>`);
      }
      return this.innerHTML = `<ul>${seriesLinks.join("")}</ul>`;
    }

    if (attributes.topic) {
      const topic = attributes.topic.value;
      const topicLinks = mapBlogsToLinks(allTopics[topic].articles);
      if (allTopics[topic].articles.length > 3) {
        topicLinks.push(`<a href="/topic.html?topic=${topic}">Read more</a>`);
      }
      if (allTopics[topic].articles.length <= 3) {
        topicLinks.push(`<a href="/topic.html?topic=${topic}">Read all</a>`);
      }
      return this.innerHTML = `<ul>${topicLinks.join("")}</ul>`;
    }

    this.setAttribute("class", "preview-component");
  }
}

customElements.define('preview-component', Preview);