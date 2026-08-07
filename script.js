const categoryButtons = document.querySelectorAll(".category-tab");
const menuCards = document.querySelectorAll(".menu-card");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.category;

    categoryButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

menuCards.forEach((card) => {
      const shouldShow =
        selectedCategory === "all" || card.dataset.category === selectedCategory;
      card.hidden = !shouldShow;
    });
  });
});

const surveyFrame = document.querySelector("#survey-frame");

window.addEventListener("message", (event) => {
  if (
    event.source === surveyFrame.contentWindow &&
    event.data?.type === "savorly-survey-height"
  ) {
    const safeHeight = Math.max(680, Math.min(1200, Number(event.data.height)));
    if (Number.isFinite(safeHeight)) surveyFrame.style.height = `${safeHeight}px`;
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
