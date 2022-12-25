const bikeCardTemplate = document.querySelector("#bike-card-template").content;
const trackCardTemplate = document.querySelector(
  "#track-card-template"
).content;
const trackTypeButtonTemplate = document.querySelector(
  "#track-type-button-template"
).content;
const trackTypeOptionTemplate = document.querySelector(
  "#track-type-option-template"
).content;
const trackTypeButtonsContainer = document.querySelector(".track-type-buttons");
const trackTypeOptionsContainer = document.querySelector(".track-type-options");
const bikeCardContainer = document.querySelector(".bikes-grid");
const leadBikeImage = document.querySelector(".lead__card-image");
const leadBikeName = document.querySelector(".lead__bike-name");
const trackTypeTitle = document.querySelector(".tracks__section-title");
const trackTypeDesc = document.querySelector(".tracks__plain-text");

const tracksGrid = document.querySelector(".tracks-grid");
const sliderLeftButton = document.querySelector(".slider-button_type_prev");
const sliderRightButton = document.querySelector(".slider-button_type_next");

initTrackType();
setSliderIndex(0);
renderTrackTypeButtons(tracks);
setActiveTrackButton();
const trackTypeButtons = document.querySelectorAll(".track-type-btn");

// ====================== render page functions ========================
function setTrackType(trackType) {
  localStorage.setItem("track-type", trackType);
}

function getTrackType() {
  return localStorage.getItem("track-type");
}

function initTrackType() {
  const trackType = getTrackType();
  !trackType ? setTrackType(tracks[0].type) : null;
}

const filterBikesByType = (bikeType) => {
  return bikes.filter((bike) => bike.type === bikeType);
};

const filterTrackByType = (trackType) => {
  return tracks.filter((track) => track.type === trackType);
};

const generateBikeCardElement = (data) => {
  const cardElement = bikeCardTemplate
    .querySelector(".bike-card")
    .cloneNode(true);

  const cardImageElement = cardElement.querySelector(".image");
  cardImageElement.src = data.link;
  cardImageElement.alt = `${data.name}.`;
  cardElement.querySelector(".card__title").textContent = data.name;

  return cardElement;
};

function renderCard(cardElement, cardsContainer) {
  cardsContainer.append(cardElement);
}

const renderBikesCards = (bikes) => {
  bikes.forEach((bike) => {
    renderCard(generateBikeCardElement(bike), bikeCardContainer);
  });
};

const clearBikesCards = () => {
  bikeCardContainer.textContent = "";
};

const setLeadBikeImage = (bikes) => {
  const randomeBikeIndex = Math.floor(Math.random() * bikes.length);
  leadBikeImage.src = bikes[randomeBikeIndex].link;
  leadBikeImage.alt = `${bikes[randomeBikeIndex].name}.`;
  leadBikeName.textContent = bikes[randomeBikeIndex].name;
};

const setTrackInfo = (track) => {
  trackTypeTitle.textContent = track.title;
  trackTypeDesc.textContent = track.desc;
};

function unsetCurrentActiveButton() {
  const trackTypeButtons = document.querySelectorAll(".track-type-btn");
  trackTypeButtons.forEach((trackButton) => {
    if (trackButton.classList.contains("section-link_active")) {
      trackButton.classList.remove("section-link_active");
    }
  });
}

function setActiveTrackButton() {
  unsetCurrentActiveButton();
  const trackTypeButtons = document.querySelectorAll(".track-type-btn");

  trackTypeButtons.forEach((trackButton) => {
    if (trackButton.value === getTrackType()) {
      trackButton.classList.add("section-link_active");
    }
  });
}

// ====================== Bike types buttons ==========================
function generateTrackTypeButtonElement(data) {
  const buttonElement = trackTypeButtonTemplate
    .querySelector(".track-button")
    .cloneNode(true);

  const button = buttonElement.querySelector(".track-type-btn");
  button.textContent = data.title;
  button.value = data.type;

  return buttonElement;
}

function generateTrackTypeOptionElement(data) {
  const optionElement = trackTypeOptionTemplate
    .querySelector(".form__option")
    .cloneNode(true);

  optionElement.textContent = data.title;
  optionElement.value = data.type;

  return optionElement;
}

function renderTrackTypeButtons(tracks) {
  tracks.forEach((track) => {
    renderCard(
      generateTrackTypeButtonElement(track),
      trackTypeButtonsContainer
    );

    renderCard(
      generateTrackTypeOptionElement(track),
      trackTypeOptionsContainer
    );
  });
}

// ====================== Slider =======================================
function setSliderIndex(index) {
  localStorage.setItem("slider-index", index);
}

const getSliderIndex = () => {
  return parseInt(localStorage.getItem("slider-index"));
};

const getSlideWidth = () => {
  const firstSlide = tracksGrid.querySelector(".track-card");
  const firstSlideWidth = firstSlide.offsetWidth;
  const gap = parseInt(window.getComputedStyle(tracksGrid).gap);

  return firstSlideWidth + gap;
};

const setSliderCurrentPos = (pos) => {
  localStorage.setItem("slider-pos", pos);
};

const getSliderCurrentPos = () => {
  return parseInt(localStorage.getItem("slider-pos"));
};

function initSliderCurrentPos() {
  const sliderPos = getSliderCurrentPos();
  !sliderPos ? setSliderCurrentPos(-getSlideWidth()) : null;
}

const scrollSlider = (positionOfScroll) => {
  tracksGrid.style.setProperty("left", `${positionOfScroll}px`);
};

const generateTrackCardElement = (data) => {
  const cardElement = trackCardTemplate
    .querySelector(".track-card")
    .cloneNode(true);

  cardElement.setAttribute("data-track", data.type);

  const cardImageElement = cardElement.querySelector(".track-card__image");
  cardImageElement.src = data.link;
  cardImageElement.alt = `${data.title}.`;

  const cardLabelElement = cardElement.querySelector(".track-card__label");
  const labelLink = `${data.link.slice(1, -4)}-label.svg`;
  cardLabelElement.src = labelLink;

  return cardElement;
};

const renderTrackCards = (tracks) => {
  // render last card at start for loop
  renderCard(generateTrackCardElement(tracks[tracks.length - 1]), tracksGrid);

  // render all cards
  tracks.forEach((track) => {
    renderCard(generateTrackCardElement(track), tracksGrid);
  });

  // render 1st card at the end for loop
  renderCard(generateTrackCardElement(tracks[0]), tracksGrid);
};

const handleScrollRight = () => {
  let newPos = getSliderCurrentPos();
  const prevSliderIndex = getSliderIndex();

  // if last slide -> change pos to first slide
  newPos - getSlideWidth() === -(tracks.length + 1) * getSlideWidth()
    ? (newPos = -getSlideWidth())
    : (newPos = getSliderCurrentPos() - getSlideWidth());

  setSliderCurrentPos(newPos);

  // calc index of current slide. Chenge to 0 if last slide
  let sliderIndex =
    prevSliderIndex + 1 >= tracks.length ? 0 : prevSliderIndex + 1;
  setSliderIndex(sliderIndex);

  const trackType = tracks[sliderIndex].type;
  setTrackType(trackType);

  trackTypeOptionsContainer.value = trackType;

  setActiveTrackButton();

  setPageContent();
};

const handleScrollLeft = () => {
  let newPos = getSliderCurrentPos();
  const prevSliderIndex = getSliderIndex();

  // if 1st slide -> change pos to last slide
  newPos + getSlideWidth() === 0
    ? (newPos = -tracks.length * getSlideWidth())
    : (newPos = getSliderCurrentPos() + getSlideWidth());

  setSliderCurrentPos(newPos);

  let sliderIndex =
    prevSliderIndex - 1 < 0 ? tracks.length - 1 : prevSliderIndex - 1;
  setSliderIndex(sliderIndex);

  const trackType = tracks[sliderIndex].type;
  setTrackType(trackType);

  trackTypeOptionsContainer.value = trackType;

  setActiveTrackButton();

  setPageContent();
};

// ======================== page Setup =====================================
const setPageContent = () => {
  const bikes = filterBikesByType(getTrackType());
  const selectedTrack = filterTrackByType(getTrackType())[0];

  setLeadBikeImage(bikes);

  setTrackInfo(selectedTrack);

  const currSliderPos = -(getSliderIndex() + 1) * getSlideWidth();
  scrollSlider(currSliderPos);

  clearBikesCards();
  renderBikesCards(bikes);
};

const handleClickTrackTypeButton = (evt) => {
  clickedButton = evt.target;

  setTrackType(clickedButton.value);
  setActiveTrackButton();

  const sliderIndex = tracks.findIndex(
    (track) => track.type === clickedButton.value
  );
  setSliderIndex(sliderIndex);
  setSliderCurrentPos(-(sliderIndex + 1) * getSlideWidth());

  setPageContent();
};

// ======================== page initialize ================================
sliderLeftButton.addEventListener("click", handleScrollLeft);

sliderRightButton.addEventListener("click", handleScrollRight);

trackTypeButtons.forEach((trackButton) => {
  trackButton.addEventListener("click", handleClickTrackTypeButton);
});

const handleChangeTrackTypeOption = (evt) => {
  const trackType = evt.target.value;
  setTrackType(trackType);
  const sliderIndex = tracks.findIndex((track) => track.type === trackType);
  setSliderIndex(sliderIndex);

  setPageContent();
};

trackTypeOptionsContainer.addEventListener(
  "change",
  handleChangeTrackTypeOption
);

const handleWindowResize = () => {
  clearTimeout(timeout);
  timeout = setTimeout(setPageContent, 250);
};

let timeout = false;
window.addEventListener("resize", handleWindowResize);

const trackTypes = [];
tracks.forEach((track) => trackTypes.push(track.type));

trackTypeOptionsContainer.value = getTrackType();

renderTrackCards(tracks);
setPageContent();
initSliderCurrentPos();
scrollSlider(getSliderCurrentPos());
