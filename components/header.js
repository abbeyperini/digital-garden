class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
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
            <li><a href="https://github.com/abbeyperini/digital-garden">The Digital Garden on Github</a></li>
            <li><a href="https://abbeyperini.dev">About Abbey</a></li>
            <li><a href="https://abbey-perinis-stickers.printify.me/products">Stickers</a></li>
            <li><a href="/speaking.html">Abbey's Speaking</a></li>
            <li><a href="/conference-wall.html>Conference Wall</a></li>
          </ul>
        </nav>
        <input onchange="switchTheme(event)" type="checkbox" id="theme-toggle" aria-label="Toggle Color Theme" class="theme-switch" />
      </header>
    `;
    this.setAttribute("class", "header-component");
  }
}

customElements.define("header-component", Header);