document.addEventListener("DOMContentLoaded", function () {
  const contentContainer = document.getElementById("contentContainer");
  const arrowDown = document.getElementById("scrollToBottomBtn");

  contentContainer.addEventListener("scroll", handleScroll);
  arrowDown.addEventListener("click", scrollToBottom);

  // Variables to track scroll direction
  let lastScrollTop = 0;
  let isScrollingDown = true;
  let isAtBottom = false;

  function handleScroll() {
    const scrollTop = contentContainer.scrollTop;

    // Determine scroll direction
    isScrollingDown = scrollTop > lastScrollTop;
    isAtBottom = isScrollAtBottom();

    if (!isScrollingDown && !isAtBottom) {
      arrowDown.classList.add("visible");
    } else {
      arrowDown.classList.remove("visible");
    }

    lastScrollTop = scrollTop;
  }

  function scrollToBottom() {
    contentContainer.scrollTo({
      top: contentContainer.scrollHeight,
      behavior: "smooth",
    });
  }

  function isScrollAtBottom() {
    const { clientHeight, scrollTop, scrollHeight } = contentContainer;

    return clientHeight + scrollTop >= scrollHeight - 10;
  }
});
