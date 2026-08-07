const categoryButtons = document.querySelectorAll(".category-tab");
const menuCards = document.querySelectorAll(".menu-card");
const assistantButton = document.querySelector("#assistant-button");
const assistantStatus = document.querySelector("#assistant-status");

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

assistantButton.addEventListener("click", () => {
  assistantStatus.hidden = false;
  assistantStatus.focus();
  assistantButton.textContent = "Coming soon";
  assistantButton.disabled = true;
});

document.querySelector("#year").textContent = new Date().getFullYear();
