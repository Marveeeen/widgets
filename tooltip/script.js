document.addEventListener("DOMContentLoaded", function () {
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip-custom";
  this.body.appendChild(tooltip);

  const elements = document.querySelectorAll("[data-tooltip]");

  elements.forEach((element) => {
    element.addEventListener("mouseenter", showTooltip);
    element.addEventListener("mouseleave", hideTooltip);
    element.addEventListener("mousemove", moveTooltip);
  });

  function showTooltip(e) {
    const tooltipText = this.dataset.tooltip;
    tooltip.textContent = tooltipText;
    tooltip.classList.add("active");
    moveTooltip.call(this, e);
  }

  function hideTooltip() {
    tooltip.classList.remove("active");
  }

  function moveTooltip(e) {
    const tooltipHeight = tooltip.offsetHeight;
    const tooltipWidth = tooltip.offsetWidth;

    tooltip.style.left = `${e.pageX - tooltipWidth / 2}px`;
    tooltip.style.top = `${e.pageY - tooltipHeight - 10}px`;
  }
});
