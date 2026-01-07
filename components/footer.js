const year = new Date().getFullYear();

class Footer extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <footer>
        <ul class="list footer-list">
          <li>
            <a href="https://abbeyperini.dev/contact">Contact</a>
          </li>
          <li><p class="copyright"><span class"copyright-symbol">&copy;</span>2022-${year} Abbey Perini. All rights reserved.</p></li>
        </ul>
      </footer>
    `;
    this.setAttribute("class", "footer-component");
  }
}

customElements.define('footer-component', Footer);