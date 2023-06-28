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

function keepTheme() {
  const toggleSwitch = document.querySelector('#theme-toggle');
  toggleSwitch.addEventListener('change', switchTheme, false);
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

document.addEventListener("DOMContentLoaded", keepTheme);
