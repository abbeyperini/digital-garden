class Blog extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let page = this.attributes?.page?.value
    if (!page) {
      const params = new URLSearchParams(document.location.search);
      const blogName = params.get("blog");
      page = `../blogs/${blogName}.md`;
    }
    this.innerHTML = `
      <zero-md src=${page}>
        <template>
          <link rel="stylesheet" href="../styles/markdown.css" />
        </template>
      </zero-md>
    `;
    this.setAttribute("class", "blog-component");
  }
}

customElements.define('blog-component', Blog);