const body = document.body;
themeSwitchBtn = document.querySelector(".switch");

const theme = localStorage.getItem("theme");
theme ? body.classList.add(theme) : null;

themeSwitchBtn.addEventListener("change", () => {
  if (body.classList.contains("light")) {
    body.classList.replace("light", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.replace("dark", "light");
    localStorage.setItem("theme", "light");
  }
});
