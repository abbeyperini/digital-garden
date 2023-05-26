class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1>Welcome to the garden!</h1>
        <nav>
          <ul class="list">
            <li><a href="about.html">What is a digital garden?</a></li>
            <li><a href="https://github.com/abbeyperini/digital-garden">Github repository</a></li>
            <li><a href="https://abbeyperini.dev">About Abbey</a></li>
          </ul>
          <label class="theme-switch" for="theme-toggle">
          <input type="checkbox" id="theme-toggle" class="theme-switch" />
          </label>
        </nav>
      </header>
    `;
    this.setAttribute("class", "header-component");
  }
}

customElements.define("header-component", Header);