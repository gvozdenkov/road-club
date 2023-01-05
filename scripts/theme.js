const page = document.querySelector(".page");
themeSwitchBtns = document.querySelectorAll(".switch");

const theme = localStorage.getItem("theme");
theme ? page.classList.add(theme) : null;

const switchTheme = () => {
  if (page.classList.contains("dark")) {
    page.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    page.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
};

themeSwitchBtns.forEach((button) => {
  button.addEventListener("change", switchTheme);
});
