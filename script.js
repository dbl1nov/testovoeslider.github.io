document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".slider-container");
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dots = document.querySelectorAll(".dot");

  let currentIndex = 0;
  const slideWidth = slides[0].offsetWidth + 30;
  const visibleSlides = Math.floor(sliderContainer.offsetWidth / slideWidth);
  const maxIndex = slides.length - visibleSlides;

  function updateSlider() {
    const offset = -currentIndex * slideWidth;
    slider.style.transform = `translateX(${offset}px)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    prevBtn.style.opacity = currentIndex === 0 ? 0.5 : 1;
    nextBtn.style.opacity = currentIndex >= maxIndex ? 0.5 : 1;
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex;
    }
    updateSlider();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentIndex = parseInt(dot.getAttribute("data-index"));
      updateSlider();
    });
  });

  window.addEventListener("resize", function () {
    const newVisibleSlides = Math.floor(
      sliderContainer.offsetWidth / slideWidth
    );
    const newMaxIndex = slides.length - newVisibleSlides;
    if (currentIndex > newMaxIndex) {
      currentIndex = newMaxIndex;
    }
    updateSlider();
  });
});
