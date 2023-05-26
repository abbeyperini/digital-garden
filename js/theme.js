function switchTheme(e) {
  if (e.target.checked) {
    setTheme('dark');
    return;
  }

  setTheme('light');   
};

function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.setAttribute('data-theme', themeName);
};

function setCheckBox(toggleSwitch, theme) {
  toggleSwitch.checked = theme === 'dark' ? true : false;
}

function keepTheme(toggleSwitch) {
  const theme = localStorage.getItem('theme');
  if (theme) {
    setTheme(theme);
    setCheckBox(toggleSwitch, theme);
    return;
  };

  const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)');
  if (prefersLightTheme.matches) {
    setTheme('light');
    return;
  };

  setTheme('dark');
};

window.onload = (event) => {
  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
  toggleSwitch.addEventListener('change', switchTheme, false);
  keepTheme(toggleSwitch);
};


