document.addEventListener("DOMContentLoaded", function () {
  const progressContainer = document.querySelector(".progress-steps");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const progress = document.querySelector(".progress");

  prevButton.addEventListener("click", handlePrevButtonClick);
  nextButton.addEventListener("click", handleNextButtonClick);

  // initialize how many steps we have
  createSteps(4);

  let currentStep = 0;
  const steps = document.querySelectorAll(".step");
  function updateSteps() {
    steps.forEach((button, index) => {
      if (currentStep >= index) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });

    progress.style.width = `${(currentStep / (steps.length - 1)) * 100}%`;

    prevButton.disabled = currentStep === 0;
    nextButton.disabled = currentStep === steps.length - 1;
  }

  // utils for creating number of steps
  function createSteps(noOfSteps) {
    for (let i = 0; i < noOfSteps; i++) {
      const div = document.createElement("div");
      div.className = "step";
      div.textContent = `${i + 1}`;

      progressContainer.appendChild(div);
    }
  }

  function handleNextButtonClick() {
    currentStep++;
    updateSteps();
  }

  function handlePrevButtonClick() {
    currentStep--;
    updateSteps();
  }

  updateSteps();
});
