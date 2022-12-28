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

  console.log(tracksContainer.scrollLeft);
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
};

// ====================== event handlers ==============================
const slideCount = tracks.length;

const handleScrollRight = () => {
  const slideWidth = getSlideWidth();

  if (tracksContainer.scrollLeft === 0) {
    tracksContainer.scrollTo((left = slideWidth * slideCount), 0);
  }

  scrollSlider(-slideWidth);
  updatePage();
};

const handleScrollLeft = () => {
  const slideWidth = getSlideWidth();

  if (tracksContainer.scrollLeft === slideWidth * slideCount) {
    tracksContainer.scrollTo((left = 0), 0);
  }

  scrollSlider(slideWidth);
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

window.addEventListener("resize", throttle(getSlideWidth, 250));

// ==============================================================
scrollSlider(getSlideWidth());
updatePage();
