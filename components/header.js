class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1>Welcome to the garden!</h1>
        <nav>
          <ul>
            <li><a href="about.html">What is a digital garden?</a></li>
            <li>
              <a href="https://github.com/abbeyperini/digital-garden">Github repository</a>
            </li>
            <li>
              <a href="https://abbeyperini.dev">About Abbey</a>
            </li>
          </ul>
          <ul>
            <li>
              Sort
            </li>
            <li>
              Filter
            </li>
        </nav>
      </header>
    `
  }
}

customElements.define(`header-component`, Header);