class LinkList extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById("link-list").content;
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.cloneNode(true));
    this.setAttribute("class", "link-list-component");
  }

  async connectedCallback() {
    const data = await fetch('https://images.abbeyperini.com/data/blog-data.json').then((response) => {return response.json()});
    const allTopics = data.topics;
    const allSeries = data.series;
    const attributes = this.attributes;

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
    attachListToShadowDom(seriesLinks, this.shadowRoot);
  }
}

customElements.define('link-list-component', LinkList);