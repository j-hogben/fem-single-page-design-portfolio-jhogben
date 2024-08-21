const currentIndexDisplay = document.querySelector('#currentSlideIndexDisplay');
const carousel = document.querySelector('.carousel');
const slides = Array.from(document.querySelectorAll('.carousel__slide'));
const slideCount = slides.length - 1;
const carouselPrev = document.querySelector('.carousel__button--prev');
const carouselNext = document.querySelector('.carousel__button--next');

let currentIndex = 0;
let slideGap;
let slideWidth;

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

const scrollToPrevSlide = () => {
  if (currentIndex > 0) {
    currentIndex--;
    carousel.scrollLeft -= slideWidth;
    setTimeout(() => styleInvalidCarouselNavBtns(currentIndex), 100);
  }
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

const scrollToNextSlide = () => {
  // const slideCount = slides.length - 1;
  if (currentIndex < slideCount) {
    currentIndex++;
    carousel.scrollLeft += slideWidth;
    setTimeout(() => styleInvalidCarouselNavBtns(currentIndex), 100);
  }
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

// UPDATE CURRENT INDEX WHEN SCROLLING WITH FINGER OR MOUSE WHEEL SCROLL
const updateCurrentIndex = () => {
  const scrollLeft = carousel.scrollLeft;
  // const newIndex = Math.round(scrollLeft / slideWidth);
  const newIndex = scrollLeft / slideWidth;
  if (newIndex !== currentIndex) {
    currentIndex = newIndex;
    setTimeout(() => styleInvalidCarouselNavBtns(currentIndex), 100);
  }
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

// FUNCTION TO GET THE --carousel-gap VALUE
const updateSlideDimensions = () => {
  slideGap = parseFloat(
    getComputedStyle(carousel).getPropertyValue('--carousel-gap')
  );
  slideWidth = slides[0].offsetWidth + slideGap;
};
// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

// FUNCTION TO ADD INVALID BUTTON STYLE DEPENDING ON CURRENT INDEX
const styleInvalidCarouselNavBtns = (index) => {
  /* IF INDEX IS 0 (FIRST SLIDE SELECTED), INVALIDATE THE
    'PREVIOUS' CAROUSEL NAVIGATION BUTTON */
  if (index === 0) {
    carouselPrev.classList.add('carousel__button-invalid');
  } else {
    carouselPrev.classList.remove('carousel__button-invalid');
  }
  /* IF INDEX IS LAST SLIDE, INVALIDATE THE 'NEXT' 
    CAROUSEL NAVIGATION BUTTON */
  if (index === slideCount) {
    carouselNext.classList.add('carousel__button-invalid');
  } else {
    carouselNext.classList.remove('carousel__button-invalid');
  }
};

// DO THESE STRAIGHT AWAY
updateSlideDimensions();
styleInvalidCarouselNavBtns(currentIndex);

// DO THESE WHEN EVENT HAPPENS ON ELEMENT
carousel.addEventListener('scroll', updateCurrentIndex);
carouselNext.addEventListener('click', scrollToNextSlide);
carouselPrev.addEventListener('click', scrollToPrevSlide);

// WHEN BROWSER WINDOW IS RESIZED, RECALCULATE SLIDE DIMENSIONS
window.addEventListener('resize', updateSlideDimensions);
