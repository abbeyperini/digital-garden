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
            <li><a href="https://github.com/abbeyperini/digital-garden">The Digital Garden on Github</a></li>
            <li><a href="https://abbeyperini.dev">About Abbey</a></li>
            <li><a href="https://abbeyperini.shop/">Shop</a></li>
            <li><a href="/conference-wall.html>Conference Wall</a></li>
          </ul>
        </nav>
        <label title="color mode toggle">
          <input onchange="switchTheme(event)" type="checkbox" id="theme-toggle" aria-label="Toggle Color Theme" class="theme-switch" />
          <svg
            width="75"
            height="75"
            viewBox="0 0 52.916665 52.916667"
            version="1.1"
            id="daisy"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:svg="http://www.w3.org/2000/svg"><defs
              id="defs1" /><g
              id="layer1"><path
                style="stroke:#000000;stroke-width:0.64;stroke-linecap:round;stroke-linejoin:round"
                d="m 17.520559,22.004365 c -0.04562,-0.434436 -0.735168,-9.623477 -0.780971,-10.062866 -0.285924,-2.7429142 -0.435383,-5.4994279 1.299691,-7.2345032 2.240891,-2.2408926 5.53542,-2.9466476 8.69236,-2.942821 5.45083,0.00661 10.719059,2.2953565 9.897603,9.8930922 -0.06128,0.566789 -0.58328,8.632635 -0.714792,9.259771"
                id="path2" /><path
                style="stroke:#000000;stroke-width:0.64;stroke-linecap:round;stroke-linejoin:round"
                d="m 30.353279,19.773543 c 1.99167,-3.017177 3.36046,-4.643578 5.55338,-6.036276 8.37961,-5.3217902 13.0456,-0.189145 14.67125,5.69248 1.01054,3.656177 1.11618,7.494217 -0.90854,9.518947 -1.60517,1.60517 -9.811079,4.311772 -11.948779,4.769852"
                id="path3" /><path
                style="stroke:#000000;stroke-width:0.64;stroke-linecap:round;stroke-linejoin:round"
                d="m 34.506239,27.982884 c 1.82779,0.73163 3.90659,1.7357 5.64996,2.70424 16.46902,7.70076 -2.346203,21.354306 -7.82302,18.88149 -1.581363,-0.713995 -3.526077,-2.606574 -4.94982,-4.481747 -0.774718,-1.020361 -4.489694,-3.422763 -4.813425,-4.240124"
                id="path4" /><path
                style="stroke:#000000;stroke-width:0.64;stroke-linecap:round;stroke-linejoin:round"
                d="m 28.131929,34.840094 c -0.23025,4.28513 -0.70761,7.1817 -1.90446,9.5013 -3.656305,7.08619 -9.066186,6.4441 -14.097839,2.61089 -5.3027547,-4.03973 -7.8869667,-10.45522 -0.65782,-15.20276 2.302049,-1.51181 5.000839,-2.66904 7.533273,-3.57348"
                id="path5" /><path
                style="stroke:#000000;stroke-width:0.64;stroke-linecap:round;stroke-linejoin:round"
                d="M 20.465607,31.089025 C 14.521158,31.885122 10.405703,31.821277 10.039569,31.751281 1.3927006,30.098216 0.8688967,25.014234 3.1331753,18.215472 c 1.8254468,-5.481118 6.184786,-8.176475 12.3950127,-5.588879 3.263699,1.359874 4.904153,4.341365 7.581561,7.484983"
                id="path6" /><circle
                style="fill:#eada85;fill-opacity:1;stroke:#000000;stroke-width:0.64;stroke-linecap:round;stroke-linejoin:round"
                id="path7"
                cx="26.707382"
                cy="26.751486"
                r="7.7022905" /></g></svg>
        </label>
        </header>
    `;
    this.setAttribute("class", "header-component");
  }
}

customElements.define("header-component", Header);