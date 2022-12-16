const burgerBtn = document.querySelector(".burger");
const navEl = document.querySelector(".nav");

burgerBtn.addEventListener("click", () => {
  const visibility = navEl.getAttribute("data-visible");
  if (visibility === "false") {
    navEl.setAttribute("data-visible", true);
    burgerBtn.setAttribute("aria-expanded", true);
  } else {
    navEl.setAttribute("data-visible", false);
    burgerBtn.setAttribute("aria-expanded", false);
  }
});
