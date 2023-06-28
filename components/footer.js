const year = new Date().getFullYear();

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <footer>
        <ul class="list footer-list">
          <li>
            <a href="https://abbeyperini.dev">Portfolio</a>
          </li>
          <li>
            <a href="https://dev.to/abbeyperini">DEV</a><img src="https://images.abbeyperini.com/logos/devto.svg" alt="" width="30">
          </li>
          <li>
            <a href="https://abbeyperini.hashnode.dev/">Hashnode</a><img src="https://images.abbeyperini.com/logos/hashnode-icon.png" alt="" width="30">
          </li>
          <li>
            <a href="https://github.com/abbeyperini">Github</a><img src="https://images.abbeyperini.com/logos/github.png" alt="" width="30">
          </li>
          <li class="footer-linkedin">
            <a href="https://www.linkedin.com/in/abbey-perini/">LinkedIn</a><img src="https://images.abbeyperini.com/logos/Linked-logo.png" alt="" width="30">
          </li>
          <li class="twitter">
            <a href="https://twitter.com/AbbeyPerini">Twitter</a><img src="https://images.abbeyperini.com/logos/Twitter.png" alt="" width="30">
          </li>
        </ul>
        <p class="copyright">&copy; ${year}</p>
      </footer>
    `;
    this.setAttribute("class", "footer-component");
  }
}

customElements.define('footer-component', Footer);