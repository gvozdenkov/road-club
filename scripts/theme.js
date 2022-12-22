const page = document.querySelector(".page");
themeSwitchBtns = document.querySelectorAll(".switch");

const theme = localStorage.getItem("theme");
theme ? page.classList.add(theme) : null;

const switchTheme = () => {
  if (page.classList.contains("light")) {
    page.classList.replace("light", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    page.classList.replace("dark", "light");
    localStorage.setItem("theme", "light");
  }
};

themeSwitchBtns.forEach((button) => {
  button.addEventListener("change", switchTheme);
});
