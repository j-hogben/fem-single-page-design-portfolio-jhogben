const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');

let slideGap;
let slideWidth;

function updateSlideDimensions() {
  const rootStyles = getComputedStyle(document.documentElement);
  slideGap = parseFloat(rootStyles.getPropertyValue('--image-gap'));
  slideWidth = slides[0].getBoundingClientRect().width + slideGap;

  // Rearrange slides with new width
  slides.forEach(setSlidePosition);

  // Adjust the track position for the current slide
  const currentSlide = track.querySelector('.current-slide');
  if (currentSlide) {
    track.style.transform = `translateX(-${currentSlide.style.left})`;
  }
}

// Arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
};

// Calculate amount to move
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

// When I click right, move slides to the right
nextButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  if (nextSlide) {
    moveToSlide(track, currentSlide, nextSlide);
  }
});

// When I click left, move slides to the left
prevButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  if (prevSlide) {
    moveToSlide(track, currentSlide, prevSlide);
  }
});

// Initial setup
updateSlideDimensions();

// When the window is resized, update the slide dimensions
window.addEventListener('resize', updateSlideDimensions);
