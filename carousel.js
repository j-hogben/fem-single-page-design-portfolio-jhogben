// //////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ CAROUSEL ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel .slide');
const slideLinks = document.querySelectorAll('.carousel .slide-link');
const carouselPrev = document.querySelector('.carousel-prev-btn');
const carouselNext = document.querySelector('.carousel-next-btn');

// INITIALISE CURRENT SLIDE INDEX
let currentIndex = 0;

// CAROUSEL NEXT BUTTON NAVIGATE TO NEXT SLIDE
const scrollToNextSlide = () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    styleInvalidCarouselNavBtns(currentIndex);
    slides[currentIndex].scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
    // console.log(currentIndex);
  }
};

// CAROUSEL PREVIOUS BUTTON NAVIGATTE TO PREVIOUS SLIDE
const scrollToPreviousSlide = () => {
  if (currentIndex > 0) {
    currentIndex--;
    styleInvalidCarouselNavBtns(currentIndex);
    slides[currentIndex].scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
    // console.log(currentIndex);
  }
};

// UPDATE CURRENT INDEX WHEN SCROLLING WITH FINGER OR MOUSE WHEEL SCROLL
const updateCurrentIndex = () => {
  const scrollLeft = carousel.scrollLeft;
  const slideGap = getCarouselGap();
  const slideWidth = slides[0].offsetWidth + slideGap;
  const newIndex = Math.floor(scrollLeft / slideWidth);
  if (newIndex !== currentIndex) {
    styleInvalidCarouselNavBtns(newIndex);
    currentIndex = newIndex;
  }
  // console.log(currentIndex);
};

// FUNCTION TO GET THE --carousel-gap VALUE
const getCarouselGap = () =>
  parseFloat(getComputedStyle(carousel).getPropertyValue('--carousel-gap')) *
  16;

// FUNCTION TO ADD INVALID BUTTON STYLE DEPENDING ON CURRENT INDEX
const styleInvalidCarouselNavBtns = (index) => {
  /* IF INDEX IS 0 (FIRST SLIDE SELECTED), INVALIDATE THE
  'PREVIOUS' CAROUSEL NAVIGATION BUTTON */
  if (index === 0) {
    carouselPrev.classList.add('carousel-button-invalid');
  } else {
    carouselPrev.classList.remove('carousel-button-invalid');
  }

  /* IF INDEX IS LAST SLIDE, INVALIDATE THE 'NEXT' 
  CAROUSEL NAVIGATION BUTTON */
  if (index === slides.length - 1) {
    carouselNext.classList.add('carousel-button-invalid');
  } else {
    carouselNext.classList.remove('carousel-button-invalid');
  }
};

// INITIALISE STYLING FOR ANY INVALID BUTTONS
styleInvalidCarouselNavBtns(currentIndex);

// CAROUSEL EVENT LISTENERS
carouselPrev.addEventListener('click', scrollToPreviousSlide);
carouselNext.addEventListener('click', scrollToNextSlide);
carousel.addEventListener('scroll', updateCurrentIndex);

window.addEventListener('resize', () => {
  updateCurrentIndex();
});
