class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <footer>
        <p>&copy; 2022</p>
        <ul>
          <li>
            <a href="https://abbeyperini.dev">Portfolio</a>
          </li>
          <li>
            <a href="https://github.com/abbeyperini">Github<img src="images/github.svg" alt="Abbey Perini Github" width="30"></a>
          </li>
          <li>
            <a href="https://dev.to/abbeyperini">DEV</a>
          </li>
          <li>
            <a href="https://abbeyperini.hashnode.dev/">Hashnode</a>
          </li>
          <li class="footer-linkedin">
            <a href="https://www.linkedin.com/in/abbey-perini/">LinkedIn<img src="images/Linked-logo.png" alt="Abbey Perini LinkedIn" width="30"></a>
          </li>
          <li class="twitter">
            <a href="https://twitter.com/AbbeyPerini">Twitter<img src="images/Twitter.png" alt="Abbey Perini Twitter" width="30"></a>
          </li>
        </ul>
      </footer>
    `;
  }
}

customElements.define('footer-component', Footer);