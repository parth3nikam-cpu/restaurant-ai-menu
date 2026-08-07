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

document.querySelector("#year").textContent = new Date().getFullYear();
