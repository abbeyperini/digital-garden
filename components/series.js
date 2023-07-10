class Series extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const allSeries = await fetch('https://images.abbeyperini.com/data/series-data.json').then((response) => {return response.json()});
    const params = new URLSearchParams(document.location.search);
    const series = params.get("series");
    const seriesHTML = allSeries[series].articles.map((name) => {
      return `<zero-md src="../blogs/${name}.md"></zero-md>`
    });
    seriesHTML.join();
    const title = `${allSeries[series].title} Series`
    this.innerHTML = `
      <h1 class="title">${title}</h1>
      ${seriesHTML}
    `;
    this.setAttribute("class", "series-component");
    const pageTitle = `${title} by Abbey Perini`;
    document.title = pageTitle;
    document.querySelector('meta[property="og:title"]').setAttribute("content", pageTitle);
  }
}

customElements.define('series-component', Series);