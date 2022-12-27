const trackTypeButtons = document.querySelectorAll(".track-type-btn");
const sliderLeftButton = document.querySelector(".slider-button_type_prev");
const sliderRightButton = document.querySelector(".slider-button_type_next");

// ====================== update page functions ========================
const clearBikesCards = () => {
  bikeCardContainer.textContent = "";
};

function unsetCurrentActiveButton() {
  trackTypeButtons.forEach((trackButton) => {
    if (trackButton.classList.contains("section-link_active")) {
      trackButton.classList.remove("section-link_active");
    }
  });
}

function setActiveTrackButton(trackType) {
  trackTypeButtons.forEach((trackButton) => {
    if (trackButton.value === trackType) {
      trackButton.classList.add("section-link_active");
    }
  });
}

const setTrackTypeActiveOption = (trackType) => {
  trackTypeOptionsContainer.value = trackType;
};
// ====================== Slider =======================================
function setSliderIndex(index) {
  localStorage.setItem("slider-index", index);
}

const getSliderIndex = () => {
  return parseInt(localStorage.getItem("slider-index"));
};

const getSlideWidth = () => {
  const firstSlide = tracksContainer.querySelector(".track-card");
  const firstSlideWidth = firstSlide.offsetWidth;
  const gap = parseInt(window.getComputedStyle(tracksContainer).gap);

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
  tracksContainer.style.setProperty("left", `${positionOfScroll}px`);
};

// =============================================================
const updatePage = () => {
  const trackType = getTrackType();
  const bikes = filterBikesByType(trackType);
  const selectedTrack = filterTrackByType(trackType);

  setLeadBike(bikes);

  setTrackInfo(selectedTrack);

  unsetCurrentActiveButton();
  setActiveTrackButton(trackType);
  setTrackTypeActiveOption(trackType);

  clearBikesCards();
  renderBikeCards(bikes);

  // const currSliderPos = -(sliderIndex + 1) * getSlideWidth();
  // scrollSlider(currSliderPos);

  // const sliderIndex = getSliderIndex();
};

// ====================== event handlers ==============================
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

  updatePage();
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

  updatePage();
};

const handleClickTrackTypeButton = (evt) => {
  clickedButton = evt.target;

  setTrackType(clickedButton.value);
  updatePage();
};

const handleChangeTrackTypeOption = (evt) => {
  const trackType = evt.target.value;

  setTrackType(trackType);
  updatePage();
};

// ======================== Listeners ================================
sliderLeftButton.addEventListener("click", handleScrollLeft);

sliderRightButton.addEventListener("click", handleScrollRight);

trackTypeButtons.forEach((trackButton) => {
  trackButton.addEventListener("click", handleClickTrackTypeButton);
});

trackTypeOptionsContainer.addEventListener(
  "change",
  handleChangeTrackTypeOption
);

window.addEventListener("resize", throttle(updatePage, 250));

// ==============================================================
updatePage();

// add label for active track card and remove from prev card
// const trackTypeLabels = document.querySelectorAll(".track-card__label");
// trackTypeLabels[sliderIndex + 1].classList.add("track-card__label_visible");
// if (
//   trackTypeLabels[sliderIndex].classList.contains("track-card__label_visible")
// ) {
//   trackTypeLabels[sliderIndex].classList.remove("track-card__label_visible");
// }

// if (
//   trackTypeLabels[sliderIndex + 2].classList.contains(
//     "track-card__label_visible"
//   )
// ) {
//   trackTypeLabels[sliderIndex + 2].classList.remove(
//     "track-card__label_visible"
//   );
// }
