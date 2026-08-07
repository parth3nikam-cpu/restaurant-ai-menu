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

const quickPicks = document.querySelectorAll(".quick-pick");
const quizCta = document.querySelector("#quiz-cta");
const quickPickNote = document.querySelector("#quick-pick-note");
const assistantIcon = document.querySelector(".assistant-icon");

quickPicks.forEach((pick) => {
  pick.setAttribute("aria-pressed", "false");

  pick.addEventListener("click", () => {
    quickPicks.forEach((item) => {
      item.classList.remove("is-selected");
      item.setAttribute("aria-pressed", "false");
    });

    pick.classList.add("is-selected");
    pick.setAttribute("aria-pressed", "true");
    quizCta.href = `survey.html?${pick.dataset.param}=${pick.dataset.value}`;
    quickPickNote.textContent = `Great choice. We will start your quiz with something ${pick.dataset.label} in mind.`;

    assistantIcon.classList.remove("is-pulsing");
    requestAnimationFrame(() => assistantIcon.classList.add("is-pulsing"));
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
