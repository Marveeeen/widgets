// get always 3 items
// add styles to these 3 (prev, current, next)

// start at one so that it could have a previous and next item
let currentIndex = 1;

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".carousel-item");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");

  nextButton.addEventListener("click", handleNextButtonClick);
  prevButton.addEventListener("click", handlePrevButtonClick);

  function updateCarousel() {
    console.log(images);
    // current selected item
    images[currentIndex].classList.add("current");
    // previous item
    images[(currentIndex - 1 + images.length) % images.length].classList.add(
      "prev"
    );
    // next item
    images[(currentIndex + 1) % images.length].classList.add("next");
  }

  function resetSelectedImages() {
    // current selected item
    images[currentIndex].classList.remove("current");

    // previous item
    images[(currentIndex - 1 + images.length) % images.length].classList.remove(
      "prev"
    );

    // next item
    images[(currentIndex + 1) % images.length].classList.remove("next");
  }

  function handleNextButtonClick() {
    resetSelectedImages();
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }

  function handlePrevButtonClick() {
    resetSelectedImages();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  }

  updateCarousel();
});
