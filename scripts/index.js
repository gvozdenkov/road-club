const trackTypeButtons = document.querySelectorAll(".track-type-btn");
const sliderLeftButton = document.querySelector(".slider-button_type_prev");
const sliderRightButton = document.querySelector(".slider-button_type_next");

updatePage();
// ====================== update page functions ========================
function clearBikesCards() {
  bikeCardContainer.textContent = "";
}

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

function setTrackTypeActiveOption(trackType) {
  trackTypeOptionsContainer.value = trackType;
}

function showTrackLabel(trackType) {
  const activeTrackCard = Array.from(
    document.querySelectorAll(`[data-track='${trackType}']`)
  );

  activeTrackCard.forEach((card) => {
    const trackLabel = card.querySelector(".track-card__label");
    trackLabel.classList.add("track-card__label_visible");
  });
}

function clearTrackLabels() {
  const trackLabels = Array.from(
    document.querySelectorAll(".track-card__label")
  );
  trackLabels.forEach((label) =>
    label.classList.remove("track-card__label_visible")
  );
}
// ====================== Slider =======================================
function getSlideWidth() {
  const firstSlide = tracksContainer.querySelector(".track-card");
  const firstSlideWidth = firstSlide.offsetWidth;
  const gap = parseInt(window.getComputedStyle(tracksContainer).gap);

  return firstSlideWidth + gap;
}

function scrollSlider(scrollPos) {
  tracksContainer.scrollBy({
    left: scrollPos,
    behavior: "smooth",
  });
}

function scrollSliderTo(trackType) {
  const currIndex = tracks.findIndex((track) => track.type === trackType);
  const scrollPos = getSlideWidth() * (currIndex + 1);

  tracksContainer.scrollTo({
    left: scrollPos,
    behavior: "smooth",
  });
}

function rewindSliderTo(pos) {
  tracksContainer.scrollTo(pos, 0);
}

function getNextTrackType() {
  const currTrackType = getTrackType();
  const currIndex = tracks.findIndex((track) => track.type === currTrackType);

  currIndex === tracks.length - 1
    ? setTrackType(tracks[0].type)
    : setTrackType(tracks[currIndex + 1].type);
}

function getPrevTrackType() {
  const currTrackType = getTrackType();
  const currIndex = tracks.findIndex((track) => track.type === currTrackType);

  currIndex === 0
    ? setTrackType(tracks[tracks.length - 1].type)
    : setTrackType(tracks[currIndex - 1].type);
}

// =============================================================
function updatePage() {
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
  setGalleryObserver();
}

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

function setGalleryObserver() {
  const bikeCards = Array.from(document.querySelectorAll(".bikes-grid__item"));

  const observer = new IntersectionObserver(handleBikeCardObserved, {
    root: bikeCardContainer,
    threshold: 0.6,
  });

  bikeCards.forEach((card) => observer.observe(card));
}

function handleBikeCardObserved(entries) {
  const bikeCards = Array.from(document.querySelectorAll(".bikes-grid__item"));

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const intersectingIndex = bikeCards.indexOf(entry.target);
      activateIndicator(intersectingIndex);
    }
  });
}

function activateIndicator(index) {
  const bikeCardsDots = Array.from(
    document.querySelectorAll(".slider-dots__dot")
  );

  bikeCardsDots.forEach((dot, i) => {
    dot.classList.toggle("slider-dots__dot_active", i === index);
  });
}
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
