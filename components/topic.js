class Topic extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const allTopics = await fetch('https://images.abbeyperini.com/data/topic-data.json').then((response) => {return response.json()});
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
    document.title = title;
    document.querySelector('meta[property="og:title"]').setAttribute("content", title);
  }
}

customElements.define('topic-component', Topic);