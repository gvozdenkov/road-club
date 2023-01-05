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
const bikeSliderDotTemplate = document.querySelector(
  "#slider-dots-template"
).content;

const trackTypeButtonsContainer = document.querySelector(".track-type-buttons");
const trackTypeOptionsContainer = document.querySelector(".track-type-options");
const bikeCardContainer = document.querySelector(".bikes-grid");
const bikeSliderDotsContainer = document.querySelector(".bikes__slider-dots");
const leadBikeImage = document.querySelector(".lead__card-image");
const leadBikeName = document.querySelector(".lead__bike-name");
const trackTypeTitle = document.querySelector(".tracks__section-title");
const trackTypeDesc = document.querySelector(".tracks__plain-text");
const tracksContainer = document.querySelector(".tracks-grid");

// ====================== utils
function setTrackType(trackType) {
  localStorage.setItem("track-type", trackType);
}

function getTrackType() {
  return localStorage.getItem("track-type");
}

function filterBikesByType(bikeType) {
  return bikes.filter((bike) => bike.type === bikeType);
}

function filterTrackByType(trackType) {
  return tracks.filter((track) => track.type === trackType)[0];
}

function renderElement(element, container) {
  container.append(element);
}

function throttle(func, time) {
  return function (args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (
      previousCall === undefined || // function is being called for the first time
      this.lastCall - previousCall > time
    ) {
      // throttle time has elapsed
      func(args);
    }
  };
}

// ================ generate DOM
function setLeadBike(bikes) {
  const randomeBikeIndex = Math.floor(Math.random() * bikes.length);
  leadBikeImage.src = bikes[randomeBikeIndex].link;
  leadBikeImage.alt = `${bikes[randomeBikeIndex].name}.`;
  leadBikeName.textContent = bikes[randomeBikeIndex].name;
}

function setTrackInfo(track) {
  trackTypeTitle.textContent = track.title;
  trackTypeDesc.textContent = track.desc;
}

// track cards
function generateTrackCardElement(data) {
  const cardElement = trackCardTemplate
    .querySelector(".tracks-grid__item")
    .cloneNode(true);

  cardElement.setAttribute("data-track", data.type);

  const cardImageElement = cardElement.querySelector(".track-card__image");
  cardImageElement.src = data.link;
  cardImageElement.alt = `Тип трассы - ${data.title}.`;

  const cardLabelElement = cardElement.querySelector(".track-card__label");
  const labelLink = `${data.link.slice(1, -4)}-label.svg`;
  cardLabelElement.src = labelLink;

  return cardElement;
}

function renderTrackCards(tracks) {
  // render last card at start for loop
  renderElement(
    generateTrackCardElement(tracks[tracks.length - 1]),
    tracksContainer
  );

  // render all cards
  tracks.forEach((track) => {
    renderElement(generateTrackCardElement(track), tracksContainer);
  });

  // render 1st card at the end for loop
  renderElement(generateTrackCardElement(tracks[0]), tracksContainer);
}

// track buttons
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
    renderElement(
      generateTrackTypeButtonElement(track),
      trackTypeButtonsContainer
    );

    renderElement(
      generateTrackTypeOptionElement(track),
      trackTypeOptionsContainer
    );
  });
}

// bike cards
function generateBikeCardElement(data) {
  const cardElement = bikeCardTemplate
    .querySelector(".bikes-grid__item")
    .cloneNode(true);

  const cardImageElement = cardElement.querySelector(".image");
  cardImageElement.src = data.link;
  cardImageElement.alt = `${data.name}.`;
  cardElement.querySelector(".card__title").textContent = data.name;

  return cardElement;
}

function renderBikeCards(bikes) {
  bikes.forEach((bike) => {
    renderElement(generateBikeCardElement(bike), bikeCardContainer);
  });
}

// bike card slider dots
function generateBikeCardDotElement() {
  const dotElement = bikeSliderDotTemplate
    .querySelector(".slider-dots__dot")
    .cloneNode(true);

  return dotElement;
}

function renderBikeSliderDots(bikes) {
  bikes.forEach(() => {
    renderElement(generateBikeCardDotElement(), bikeSliderDotsContainer);
  });
}

function initTrackType() {
  const trackType = getTrackType();
  !trackType ? setTrackType(tracks[0].type) : null;
}

// ================================ render Page
function renderPage() {
  initTrackType();
  const trackType = getTrackType();

  const bikes = filterBikesByType(trackType);

  setLeadBike(bikes);
  setTrackInfo(filterTrackByType(trackType));
  renderTrackCards(tracks);
  renderTrackTypeButtons(tracks);
  renderBikeCards(bikes);
  renderBikeSliderDots(bikes);
}

renderPage();
