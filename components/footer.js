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
            <img src="https://images.abbeyperini.com/logos/devto.svg" alt="" width="30"><a href="https://dev.to/abbeyperini">DEV</a>
          </li>
          <li>
            <img src="https://images.abbeyperini.com/logos/hashnode-icon.png" alt="" width="30"><a href="https://abbeyperini.hashnode.dev/">Hashnode</a>
          </li>
          <li>
            <img src="https://images.abbeyperini.com/logos/github.png" alt="" width="30"><a href="https://github.com/abbeyperini">Github</a>
          </li>
          <li class="footer-linkedin">
            <img src="https://images.abbeyperini.com/logos/Linked-logo.png" alt="" width="30"><a href="https://www.linkedin.com/in/abbey-perini/">LinkedIn</a>
          </li>
          <li class="twitter">
            <img src="https://images.abbeyperini.com/logos/Twitter.png" alt="" width="30"><a href="https://twitter.com/AbbeyPerini">Twitter</a>
          </li>
          <li><p class="copyright"><span class"copyright-symbol">&copy;</span>${year}</p></li>
        </ul>
      </footer>
    `;
    this.setAttribute("class", "footer-component");
  }
}

customElements.define('footer-component', Footer);