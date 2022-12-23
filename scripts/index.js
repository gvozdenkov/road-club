const bikeCardTemplate = document.querySelector("#bike-card-template").content;
const bikeCardContainer = document.querySelector(".bikes-grid");
const leadBikeImage = document.querySelector(".lead__card-image");
const leadBikeName = document.querySelector(".lead__bike-name");
const trackTypeButtons = document.querySelectorAll(".track-type-btn");
const trackTypeTitle = document.querySelector(".tracks__section-title");
const trackTypeDesc = document.querySelector(".tracks__plain-text");

const setTrackType = (trackType) => {
  localStorage.setItem("track-type", trackType);
};

const getTrackType = () => {
  return localStorage.getItem("track-type");
};

const initTrackType = () => {
  const trackType = getTrackType();
  !trackType ? setTrackType("highway") : null;
};

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

const renderCard = (cardElement, cardsContainer) => {
  cardsContainer.append(cardElement);
};

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

const unsetCurrentActiveButton = () => {
  trackTypeButtons.forEach((trackButton) => {
    trackButton.classList.contains("section-link_active")
      ? trackButton.classList.remove("section-link_active")
      : null;
  });
};

const setActiveTrackButton = () => {
  unsetCurrentActiveButton();

  trackTypeButtons.forEach((trackButton) => {
    trackButton.value === getTrackType()
      ? trackButton.classList.add("section-link_active")
      : null;
  });
};

const setPageContent = () => {
  const bikes = filterBikesByType(getTrackType());
  const track = filterTrackByType(getTrackType())[0];

  clearBikesCards();
  renderBikesCards(bikes);

  setLeadBikeImage(bikes);
  setTrackInfo(track);
};

const handleClickTrackTypeButton = (evt) => {
  clickedButton = evt.target;

  setTrackType(clickedButton.value);
  setActiveTrackButton();
  setPageContent();
};

trackTypeButtons.forEach((trackButton) => {
  trackButton.addEventListener("click", handleClickTrackTypeButton);
});

// ======================== page initialize ================================
initTrackType();
setActiveTrackButton();
setPageContent();
