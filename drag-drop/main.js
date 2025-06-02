document.addEventListener("DOMContentLoaded", () => {
  // Get the list items
  const listItems = document.querySelectorAll("li");

  // Add event listeners for drag and drop to all list items
  for (const item of listItems) {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragend", handleDragEnd);
    item.addEventListener("dragover", handleDragOver);
    item.addEventListener("dragleave", handleDragLeave);
    item.addEventListener("drop", handleDrop);
  }

  function handleDragStart(e) {
    this.classList.add("dragging");
    e.dataTransfer.setData("text/plain", this.textContent);
  }

  function handleDragEnd() {
    this.classList.remove("dragging");
  }

  function handleDragOver(e) {
    e.preventDefault();
    this.classList.add("hovered");
  }

  function handleDragLeave(e) {
    e.preventDefault();
    this.classList.remove("hovered");
  }

  function handleDrop(e) {
    e.preventDefault();

    const draggedTextElement = document.querySelector(".dragging");
    const targetText = this.textContent;

    if (draggedTextElement.textContent !== targetText) {
      const temp = targetText;
      this.textContent = draggedTextElement.textContent;
      draggedTextElement.textContent = temp;
    }

    this.classList.remove("hovered");
  }
});
