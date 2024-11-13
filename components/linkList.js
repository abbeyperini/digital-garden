class LinkList extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById("link-list").content;
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.cloneNode(true));
    this.setAttribute("class", "link-list-component");
  }

  async connectedCallback() {
    const attributes = this.attributes;
    const shadowRoot = this.shadowRoot;
    function load() {
      const data = JSON.parse(localStorage.getItem("data"));
      const allTopics = data.topics;
      const allSeries = data.series;

      function mapItemsToLinks(all, type) {
        return Object.keys(all).map((item) => {
          return `<li><a href="/${type}.html?${type}=${item}">${all[item].title}</a><li>`;
        })
      }

      function attachListToShadowDom(listItems, shadowRoot) {
        const unorderedList = document.createElement("ul");
        unorderedList.innerHTML = `${listItems.join("")}`;
        return shadowRoot.children[1].appendChild(unorderedList);
      }

      const all = attributes.type.value === "series" ? allSeries : allTopics;
      const seriesLinks = mapItemsToLinks(all, attributes.type.value);
      attachListToShadowDom(seriesLinks, shadowRoot);
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

customElements.define('link-list-component', LinkList);