class Header extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <header>
        <a href="http://www.abbeyperini.com/" class="home-link">
          <p class="offscreen">home</p>
          <img src="https://images.abbeyperini.com/logos/garden-logo.png" class="logo" alt=""/>
          <img src="https://images.abbeyperini.com/logos/garden-logo-grey.png" class="logo-grey" alt=""/>
        </a>
        <nav>
          <ul class="header-list">
            <li><a href="/about.html">About This Digital Garden</a></li>
            <li><a href="https://github.com/abbeyperini/digital-garden">Github Repo</a></li>
            <li><a href="https://abbeyperini.dev">About Abbey</a></li>
            <li><a href="https://abbeyperini.shop/">Shop</a></li>
            <li><a href="/publications.html">Publications</a></li>
            <li><a href="/rss.xml">RSS</a></li>
          </ul>
        </nav>
        <toggle-component></toggle-component>
        </header>
    `;
    this.setAttribute("class", "header-component");
  }
}

customElements.define("header-component", Header);