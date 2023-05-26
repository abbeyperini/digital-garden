const year = new Date().getFullYear();

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <footer>
        <p>&copy; ${year}</p>
        <ul class="list footer-list">
          <li>
            <a href="https://abbeyperini.dev">Portfolio</a>
          </li>
          <li>
            <a href="https://dev.to/abbeyperini">DEV</a>
          </li>
          <li>
            <a href="https://abbeyperini.hashnode.dev/">Hashnode</a>
          </li>
          <li>
            <a href="https://github.com/abbeyperini">Github</a><img src="images/github.png" alt="Abbey Perini Github" width="30">
          </li>
          <li class="footer-linkedin">
            <a href="https://www.linkedin.com/in/abbey-perini/">LinkedIn</a><img src="images/Linked-logo.png" alt="Abbey Perini LinkedIn" width="30">
          </li>
          <li class="twitter">
            <a href="https://twitter.com/AbbeyPerini">Twitter</a><img src="images/Twitter.png" alt="Abbey Perini Twitter" width="30">
          </li>
        </ul>
      </footer>
    `;
    this.setAttribute("class", "footer-component");
  }
}

customElements.define('footer-component', Footer);