class Full extends HTMLElement {
  constructor() {
    super();
    this.setAttribute("class", "full-component");
  }

  async connectedCallback() {
    const attributes = this.attributes;
    
    function formatMetadata(blogName) {
      const topicsLinks = allBlogs[blogName].topics.map((topic, index) => {
        let linkText = allTopics[topic].title
        if (index !== (allBlogs[blogName].topics.length - 1)) {
          linkText += ","
        }
        return `<li><a href="/topic.html?topic=${topic}">${linkText}</a></li>`
      });
      const topicsList = `<div class="topics-container"><p>Topics:</p><ul class="topics-list">${topicsLinks.join("")}</ul></div>`
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
      }
      return seriesList ? `<div class="metadata-container"><p>Knowledge Level: ${allBlogs[blogName]["knowledge-level"]}</p><p>Planted: ${new Date(allBlogs[blogName].planted).toDateString()}<p>Last Tended: ${new Date(allBlogs[blogName]["last-tended"]).toDateString()}${topicsList}${seriesList}</div>` : `<div class="metadata-container"><p>Knowledge Level: ${allBlogs[blogName]["knowledge-level"]}</p><p>Planted: ${new Date(allBlogs[blogName].planted).toDateString()}<p>Last Tended: ${new Date(allBlogs[blogName]["last-tended"]).toDateString()}${topicsList}</div>`
    }

    function formatZero(blogName) {
      const page = `../blogs/${blogName}.md`;
      return `<zero-md id="zero" src=${page}></zero-md>`;
    }

    function getName(type) {
      let name = params.get(type);
      if (!name) {
        name = attributes[type].value;
      }
      return name;
    }

    function formatSingleBlog() {
      const blogName = getName("blog")
      const blog = formatZero(blogName);
      const metaData = formatMetadata(blogName);
      const pageTitle = `${allBlogs[blogName].title} by Abbey Perini`;
      const content = `<h1 class="title">${pageTitle}</h1><div class="blog-container">${metaData}${blog}</div>`;
      return { content, pageTitle };
    }

    function formatSeries() {
      const series = getName("series");
      const seriesHTML = allSeries[series].articles.map((blogName) => {
        const blog = formatZero(blogName);
        const metaData = formatMetadata(blogName);
        return `<div class="blog-container">${metaData}${blog}</div>`;
      })
      const finalHTML = seriesHTML.join("");
      const pageTitle = `${allSeries[series].title} Series by Abbey Perini`;
      const content = `<h1 class="title">${pageTitle}</h1>${finalHTML}`;
      return { content, pageTitle };
    }

    function formatTopic() {
      const topic = getName("topic")
      const topicHTML = allTopics[topic].articles.map((blogName) => {
        const blog = formatZero(blogName);
        const metaData = formatMetadata(blogName);
        return `<div class="blog-container">${metaData}${blog}</div>`;
      })
      const finalHTML = topicHTML.join("");
      const pageTitle = `Abbey Perini's Articles About ${allTopics[topic].title}`
      const content = `<h1 class="title">${pageTitle}</h1>${finalHTML}`;
      return { content, pageTitle };
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

    function formatSort() {
      const sortType = getName("sort");
      let blogNames;
      const keys = Object.keys(allBlogs);
      // sorted by most recent
      if (sortType === "planted") {
        blogNames = keys.sort(comparePlantedDates)
      }
      const sortedHTML = blogNames.map((blogName) => {
        const blog = formatZero(blogName);
        const metaData = formatMetadata(blogName);
        return `<div class="blog-container">${metaData}${blog}</div>`;
      })
      const finalHTML = sortedHTML.join("");
      const pageTitle = `All of Abbey Perini's Articles Sorted by Most Recently Planted`;
      const content = `<h1 class="title">${pageTitle}</h1>${finalHTML}`;
      return { content, pageTitle };
    }

    function setPageTitles(pageTitle) {
      document.title = pageTitle;
      document.querySelector('meta[property="og:title"]').setAttribute("content", pageTitle);
    }

    let data;
    let allBlogs;
    let allSeries;
    let allTopics;
    let params = new URLSearchParams(document.location.search);

    const interval = setInterval(() => {
      if (localStorage.getItem("data")) {
        data = JSON.parse(localStorage.getItem("data"));
        clearInterval(interval);
          allBlogs = data.blogs;
          allSeries = data.series;
          allTopics = data.topics;
        if (!!(attributes.blog || params.get("blog"))) {
          const { content, pageTitle } = formatSingleBlog();
          this.innerHTML = content;
          setPageTitles(pageTitle);
          return;
        }
  
        if (!!(attributes.series || params.get("series"))) {
          const { content, pageTitle } = formatSeries();
          this.innerHTML = content;
          setPageTitles(pageTitle);
          return;
        }
  
        if (!!(attributes.topic || params.get("topic"))) {
          const { content, pageTitle } = formatTopic();
          this.innerHTML = content;
          setPageTitles(pageTitle);
          return;
        }
  
        if (!!(attributes.sort || params.get("sort"))) {
          const { content, pageTitle } = formatSort();
          this.innerHTML = content;
          setPageTitles(pageTitle);
          return;
        }
      } else {
        console.log('not yet, retrying');
      }
    }, 100);
  }
}

customElements.define('full-component', Full);