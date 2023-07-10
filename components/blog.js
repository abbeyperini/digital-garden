class Blog extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const allBlogs = await fetch('https://images.abbeyperini.com/data/blog-data.json').then((response) => {return response.json()});
    let blogName = this.attributes?.blog?.value
    if (!blogName) {
      const params = new URLSearchParams(document.location.search);
      blogName = params.get("blog");
    }
    const page = `../blogs/${blogName}.md`;
    const blog = `<zero-md id="zero" src=${page}></zero-md>`;
    this.innerHTML = `<h1 class="title">${allBlogs[blogName].title} by Abbey Perini</h1>${blog}`;
    this.setAttribute("class", "blog-component");
    this.setAttribute("id", "blog");
    this.setAttribute("title", allBlogs[blogName].title);
    const pageTitle = `${allBlogs[blogName].title} by Abbey Perini`;
    document.title = pageTitle;
    document.querySelector('meta[property="og:title"]').setAttribute("content", pageTitle);
  }
}

customElements.define('blog-component', Blog);