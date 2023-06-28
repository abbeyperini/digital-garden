class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header>
        <a href="http://www.abbeyperini.com/"><h1>Welcome to the garden!</h1></a>
        <nav>
          <ul class="header-list">
            <li><a href="/about.html">What is a digital garden?</a></li>
            <li><a href="https://github.com/abbeyperini/digital-garden">Github repository</a></li>
            <li><a href="https://abbeyperini.dev">About Abbey</a></li>
          </ul>
        </nav>
        <input onchange="switchTheme(event)" type="checkbox" id="theme-toggle" aria-label="Toggle Color Theme" class="theme-switch" />
      </header>
    `;
    this.setAttribute("class", "header-component");
  }
}

customElements.define("header-component", Header);