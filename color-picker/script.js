document.addEventListener("DOMContentLoaded", function () {
  const colorPicker = document.querySelector("input");
  const colorContainer = document.querySelector(".color-container");

  colorPicker.addEventListener("input", colorChange);

  function colorChange(e) {
    const colorPick = e.target.value;

    colorContainer.style.backgroundColor = colorPick;
  }
});
