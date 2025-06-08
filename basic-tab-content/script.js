document.addEventListener("DOMContentLoaded", function () {
  // grab all btns and content
  const tabBtns = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  // add event listener to all btns
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", handleTabClick);
  });

  // utils for removing active class to all the tab button
  function removeActiveBtns() {
    tabBtns.forEach((btns) => btns.classList.remove("active"));
  }

  // set the current active page
  function setActivePage(tabId) {
    // reset all content by removing active class
    // then add active class to the same data-tab value
    tabContents.forEach((tabContent) => {
      if (tabId === tabContent.dataset.tab) {
        tabContent.classList.add("active");
      } else {
        tabContent.classList.remove("active");
      }
    });
  }

  function handleTabClick() {
    const tabId = this.dataset.tab;

    removeActiveBtns();
    this.classList.add("active");
    setActivePage(tabId);
  }
});
