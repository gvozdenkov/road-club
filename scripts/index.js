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

const showTrackLabel = (trackType) => {
  const activeTrackCard = Array.from(
    document.querySelectorAll(`[data-track='${trackType}']`)
  );

  activeTrackCard.forEach((card) => {
    const trackLabel = card.querySelector(".track-card__label");
    trackLabel.classList.add("track-card__label_visible");
  });
};

const clearTrackLabels = () => {
  const trackLabels = Array.from(
    document.querySelectorAll(".track-card__label")
  );
  trackLabels.forEach((label) =>
    label.classList.remove("track-card__label_visible")
  );
};
// ====================== Slider =======================================
const getSlideWidth = () => {
  const firstSlide = tracksContainer.querySelector(".track-card");
  const firstSlideWidth = firstSlide.offsetWidth;
  const gap = parseInt(window.getComputedStyle(tracksContainer).gap);

  return firstSlideWidth + gap;
};

const scrollSlider = (scrollPos) => {
  tracksContainer.scrollBy({
    left: scrollPos,
    behavior: "smooth",
  });
};

const scrollSliderTo = (trackType) => {
  const currIndex = tracks.findIndex((track) => track.type === trackType);
  const scrollPos = getSlideWidth() * (currIndex + 1);

  tracksContainer.scrollTo({
    left: scrollPos,
    behavior: "smooth",
  });
};

const rewindSliderTo = (pos) => {
  tracksContainer.scrollTo(pos, 0);
};

const getNextTrackType = () => {
  const currTrackType = getTrackType();
  const currIndex = tracks.findIndex((track) => track.type === currTrackType);

  currIndex === tracks.length - 1
    ? setTrackType(tracks[0].type)
    : setTrackType(tracks[currIndex + 1].type);
};

const getPrevTrackType = () => {
  const currTrackType = getTrackType();
  const currIndex = tracks.findIndex((track) => track.type === currTrackType);

  currIndex === 0
    ? setTrackType(tracks[tracks.length - 1].type)
    : setTrackType(tracks[currIndex - 1].type);
};

// =============================================================
const updatePage = () => {
  const trackType = getTrackType();
  const bikes = filterBikesByType(trackType);
  const selectedTrack = filterTrackByType(trackType);

  setLeadBike(bikes);

  setTrackInfo(selectedTrack);

  clearTrackLabels();
  showTrackLabel(trackType);

  unsetCurrentActiveButton();
  setActiveTrackButton(trackType);
  setTrackTypeActiveOption(trackType);

  clearBikesCards();
  renderBikeCards(bikes);
};

// ====================== event handlers ==============================
const slideCount = tracks.length;

const handleScrollRight = () => {
  const slideWidth = getSlideWidth();

  tracksContainer.scrollLeft === 0
    ? rewindSliderTo(slideWidth * slideCount)
    : null;

  scrollSlider(-slideWidth);
  getPrevTrackType();
  updatePage();
};

const handleScrollLeft = () => {
  const slideWidth = getSlideWidth();

  tracksContainer.scrollLeft === slideWidth * slideCount
    ? rewindSliderTo(0)
    : null;

  scrollSlider(slideWidth);
  getNextTrackType();
  updatePage();
};

const handleChangeTrackType = (evt) => {
  const trackType = evt.target.value;

  setTrackType(trackType);
  scrollSliderTo(trackType);
  updatePage();
};

// ======================== Listeners ================================
sliderLeftButton.addEventListener("click", handleScrollLeft);

sliderRightButton.addEventListener("click", handleScrollRight);

trackTypeButtons.forEach((trackButton) => {
  trackButton.addEventListener("click", handleChangeTrackType);
});

trackTypeOptionsContainer.addEventListener("change", handleChangeTrackType);

window.addEventListener("resize", throttle(getSlideWidth, 250));

// ==============================================================
scrollSliderTo(getTrackType());
updatePage();
