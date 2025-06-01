document.addEventListener("DOMContentLoaded", () => {
  // grab the search input element
  const searchInputElement = document.getElementById("searchInput");

  // implement the input event listener
  searchInputElement.addEventListener("input", handleInput);

  function handleInput() {
    // grab the search input value and convert it to lowercase
    const searchInput = this.value.toLowerCase();

    // grab all list items
    const listItems = document.querySelectorAll("li");

    // loop through each list item and check if it contains the search input
    listItems.forEach((item) => {
      const itemText = item.textContent.toLowerCase();
      const matchIndex = itemText.indexOf(searchInput);

      // if the item contains the search input, highlight it
      // otherwise, reset the item text to its original state
      if (matchIndex !== -1 && searchInput.length > 0) {
        const matchText = item.textContent.substring(
          matchIndex,
          matchIndex + searchInput.length
        );
        const highlightedText = `<span class="text-blue-500">${matchText}</span>`;

        item.innerHTML = item.textContent.replace(matchText, highlightedText);
      } else {
        item.innerHTML = item.textContent; // reset to original text
      }
    });
  }
});
