const subscribeForm = document.querySelector(".subscribe-form");
const subscribeFormInput = document.querySelector(".form__input-with-btn");

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  subscribeFormInput.value = "Круто!";
  setTimeout(() => {
    subscribeFormInput.value = "";
  }, 5000);
};

subscribeForm.addEventListener("submit", handleFormSubmit);
