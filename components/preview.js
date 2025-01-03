class Preview extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById("preview").content;
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.cloneNode(true));
    this.setAttribute("class", "preview-component");
  }

  async connectedCallback() {
    const attributes = this.attributes;
    const shadowRoot = this.shadowRoot;

    function load() {
      const data = JSON.parse(localStorage.getItem("data"));
      const allBlogs = data.blogs;
      const allTopics = data.topics;
      const allSeries = data.series;

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

      function attachListToShadowDom(listItems, shadowRoot) {
        const unorderedList = document.createElement("ul");
        unorderedList.innerHTML = `${listItems.join("")}`;
        return shadowRoot.children[1].appendChild(unorderedList);
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
        attachListToShadowDom(links, shadowRoot);
      }

      if (attributes.blog) {
        const blogName = attributes.blog.value;
        const heading = createElement("h3");
        heading.innerHTML = `<a href="/blog.html?blog=${blogName}">${allBlogs[blogName].title}</a>`;
        return shadowRoot.children[1].appendChild(heading);
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
        attachListToShadowDom(seriesLinks, shadowRoot);
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
        attachListToShadowDom(topicLinks, shadowRoot);
      }
    }

    const interval = setInterval(() => {
      if (localStorage.getItem("data")) {
        clearInterval(interval);
        load();
      } else {
        console.log('not yet, retrying');
      }
    }, 100);
  }
}

customElements.define('preview-component', Preview);