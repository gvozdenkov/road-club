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
const tracksContainer = document.querySelector(".tracks-grid");

// ====================== utils
const setTrackType = (trackType) => {
  localStorage.setItem("track-type", trackType);
};

const getTrackType = () => {
  return localStorage.getItem("track-type");
};

const filterBikesByType = (bikeType) => {
  return bikes.filter((bike) => bike.type === bikeType);
};

const filterTrackByType = (trackType) => {
  return tracks.filter((track) => track.type === trackType)[0];
};

const renderElement = (element, container) => {
  container.append(element);
};

const throttle = (func, time) => {
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
};

// ================ generate DOM
const setLeadBike = (bikes) => {
  const randomeBikeIndex = Math.floor(Math.random() * bikes.length);
  leadBikeImage.src = bikes[randomeBikeIndex].link;
  leadBikeImage.alt = `${bikes[randomeBikeIndex].name}.`;
  leadBikeName.textContent = bikes[randomeBikeIndex].name;
};

const setTrackInfo = (track) => {
  trackTypeTitle.textContent = track.title;
  trackTypeDesc.textContent = track.desc;
};

// track cards
const generateTrackCardElement = (data) => {
  const cardElement = trackCardTemplate
    .querySelector(".tracks-grid__item")
    .cloneNode(true);

  cardElement
    .querySelector(".track-card")
    .setAttribute("data-track", data.type);

  const cardImageElement = cardElement.querySelector(".track-card__image");
  cardImageElement.src = data.link;
  cardImageElement.alt = `Тип трассы - ${data.title}.`;

  const cardLabelElement = cardElement.querySelector(".track-card__label");
  const labelLink = `${data.link.slice(1, -4)}-label.svg`;
  cardLabelElement.src = labelLink;

  return cardElement;
};

const renderTrackCards = (tracks) => {
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
};

// track buttons
const generateTrackTypeButtonElement = (data) => {
  const buttonElement = trackTypeButtonTemplate
    .querySelector(".track-button")
    .cloneNode(true);

  const button = buttonElement.querySelector(".track-type-btn");
  button.textContent = data.title;
  button.value = data.type;

  return buttonElement;
};

const generateTrackTypeOptionElement = (data) => {
  const optionElement = trackTypeOptionTemplate
    .querySelector(".form__option")
    .cloneNode(true);

  optionElement.textContent = data.title;
  optionElement.value = data.type;

  return optionElement;
};

const renderTrackTypeButtons = (tracks) => {
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
};

// bike cards
const generateBikeCardElement = (data, index) => {
  const cardElement = bikeCardTemplate
    .querySelector(".bikes-grid__item")
    .cloneNode(true);

  cardElement.setAttribute("data-index", index);
  const cardImageElement = cardElement.querySelector(".image");
  cardImageElement.src = data.link;
  cardImageElement.alt = `${data.name}.`;
  cardElement.querySelector(".card__title").textContent = data.name;

  return cardElement;
};

const renderBikeCards = (bikes) => {
  bikes.forEach((bike, index) => {
    renderElement(generateBikeCardElement(bike, index), bikeCardContainer);
  });
};

const initTrackType = () => {
  const trackType = getTrackType();
  !trackType ? setTrackType(tracks[0].type) : null;
};

// ================================ render Page
const renderPage = () => {
  initTrackType();
  const trackType = getTrackType();

  const bikes = filterBikesByType(trackType);

  setLeadBike(bikes);
  setTrackInfo(filterTrackByType(trackType));
  renderTrackCards(tracks);
  renderTrackTypeButtons(tracks);
  renderBikeCards(bikes);
};

renderPage();
