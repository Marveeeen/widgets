document.addEventListener("DOMContentLoaded", () => {
  const increaseButton = document.getElementById("increaseFont");
  const decreaseButton = document.getElementById("decreaseFont");
  const paragraph = document.querySelector("p");

  increaseButton.addEventListener("click", increaseFontSize);
  decreaseButton.addEventListener("click", decreaseFontSize);

  function getCurrentFontSize() {
    const paragraphFontSize = parseFloat(
      window.getComputedStyle(paragraph).fontSize
    );

    return paragraphFontSize;
  }

  function increaseFontSize() {
    const currentFontSize = getCurrentFontSize();
    paragraph.style.fontSize = `${currentFontSize + 2}px`;
  }

  function decreaseFontSize() {
    const currentFontSize = getCurrentFontSize();
    paragraph.style.fontSize = `${Math.max(currentFontSize - 2, 16)}px`; // Prevent to lower than 16px
  }
});
