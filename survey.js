const pageParameters = new URLSearchParams(window.location.search);
const isEmbeddedSurvey = pageParameters.get("embedded") === "1";
document.documentElement.classList.toggle("embedded-survey", isEmbeddedSurvey);

const dishes = [
  { name: "Butter Chicken", cuisine: "Indian", diet: "meat", flavors: ["creamy", "savory"], spice: 2, format: "saucy", mood: "cozy", description: "Tender chicken in a velvety tomato, butter, and warming spice sauce, served with fragrant basmati rice." },
  { name: "Goan Fish Curry", cuisine: "Indian", diet: "seafood", flavors: ["spicy", "fresh"], spice: 3, format: "saucy", mood: "adventurous", description: "Flaky fish simmered with coconut, tamarind, chile, and bright coastal spices." },
  { name: "Tandoori Paneer", cuisine: "Indian", diet: "vegetarian", flavors: ["smoky", "savory"], spice: 2, format: "grilled", mood: "adventurous", description: "Charred paneer and peppers marinated in yogurt, ginger, garlic, and toasted spices." },
  { name: "Chana Masala", cuisine: "Indian", diet: "vegan", flavors: ["spicy", "savory"], spice: 3, format: "saucy", mood: "cozy", description: "Slow-simmered chickpeas with tomato, ginger, cumin, and a lively squeeze of lemon." },
  { name: "Chicken Piccata", cuisine: "Italian", diet: "meat", flavors: ["fresh", "savory"], spice: 0, format: "saucy", mood: "balanced", description: "Golden chicken with lemon, capers, parsley, and a silky pan sauce." },
  { name: "Linguine alle Vongole", cuisine: "Italian", diet: "seafood", flavors: ["fresh", "savory"], spice: 1, format: "saucy", mood: "adventurous", description: "Tender clams and linguine tossed with garlic, parsley, olive oil, and white wine." },
  { name: "Wild Mushroom Risotto", cuisine: "Italian", diet: "vegetarian", flavors: ["creamy", "savory"], spice: 0, format: "saucy", mood: "cozy", description: "Slow-stirred arborio rice with roasted mushrooms, parmesan, thyme, and brown butter." },
  { name: "Pasta Arrabbiata", cuisine: "Italian", diet: "vegan", flavors: ["spicy", "savory"], spice: 3, format: "saucy", mood: "cozy", description: "Rigatoni coated in a bold tomato sauce with garlic, chile, and fresh basil." },
  { name: "Birria Tacos", cuisine: "Mexican", diet: "meat", flavors: ["spicy", "savory"], spice: 3, format: "crispy", mood: "cozy", description: "Crisp griddled tacos filled with slow-braised beef and served with rich chile consomme." },
  { name: "Baja Fish Tacos", cuisine: "Mexican", diet: "seafood", flavors: ["fresh", "spicy"], spice: 2, format: "crispy", mood: "adventurous", description: "Crispy fish with lime slaw, pico de gallo, and smoky chile crema in corn tortillas." },
  { name: "Roasted Poblano Enchiladas", cuisine: "Mexican", diet: "vegetarian", flavors: ["smoky", "creamy"], spice: 2, format: "saucy", mood: "cozy", description: "Corn tortillas filled with roasted poblano and cheese under a bright tomatillo sauce." },
  { name: "Sweet Potato Tacos", cuisine: "Mexican", diet: "vegan", flavors: ["smoky", "fresh"], spice: 2, format: "crispy", mood: "balanced", description: "Chile-roasted sweet potato, black beans, avocado, lime, and crunchy cabbage." },
  { name: "Smash Burger", cuisine: "American", diet: "meat", flavors: ["savory", "smoky"], spice: 1, format: "grilled", mood: "cozy", description: "A crisp-edged beef patty with caramelized onions, sharp cheddar, pickles, and house sauce." },
  { name: "Blackened Salmon", cuisine: "American", diet: "seafood", flavors: ["smoky", "fresh"], spice: 2, format: "grilled", mood: "balanced", description: "Spice-crusted salmon with charred lemon, spring greens, and roasted fingerling potatoes." },
  { name: "Crispy Portobello Sandwich", cuisine: "American", diet: "vegetarian", flavors: ["savory", "smoky"], spice: 1, format: "crispy", mood: "cozy", description: "Crunchy portobello with pepper jack, shredded lettuce, pickles, and tangy sauce." },
  { name: "Harvest Grain Bowl", cuisine: "American", diet: "vegan", flavors: ["fresh", "sweet-savory"], spice: 0, format: "bowl", mood: "balanced", description: "Roasted squash, kale, quinoa, apple, pumpkin seeds, and maple mustard vinaigrette." },
  { name: "Chicken Katsu Curry", cuisine: "Japanese", diet: "meat", flavors: ["savory", "sweet-savory"], spice: 1, format: "crispy", mood: "cozy", description: "Crisp panko chicken with mellow Japanese curry, steamed rice, and bright pickles." },
  { name: "Salmon Poke Bowl", cuisine: "Japanese", diet: "seafood", flavors: ["fresh", "savory"], spice: 1, format: "bowl", mood: "balanced", description: "Sushi-grade salmon, rice, cucumber, edamame, avocado, sesame, and ponzu." },
  { name: "Miso Eggplant Donburi", cuisine: "Japanese", diet: "vegetarian", flavors: ["sweet-savory", "smoky"], spice: 1, format: "bowl", mood: "adventurous", description: "Glazed roasted eggplant over rice with scallions, sesame, and a jammy egg." },
  { name: "Sesame Tofu Soba Bowl", cuisine: "Japanese", diet: "vegan", flavors: ["fresh", "savory"], spice: 1, format: "bowl", mood: "balanced", description: "Chilled buckwheat noodles with crisp tofu, cucumber, radish, and sesame dressing." },
  { name: "Chicken Shawarma Plate", cuisine: "Mediterranean", diet: "meat", flavors: ["smoky", "savory"], spice: 2, format: "grilled", mood: "balanced", description: "Spice-roasted chicken with herby rice, cucumber salad, hummus, and warm flatbread." },
  { name: "Herb-Grilled Branzino", cuisine: "Mediterranean", diet: "seafood", flavors: ["fresh", "savory"], spice: 0, format: "grilled", mood: "balanced", description: "Whole grilled branzino with lemon, oregano, olive oil, and a crisp garden salad." },
  { name: "Spanakopita Mezze", cuisine: "Mediterranean", diet: "vegetarian", flavors: ["fresh", "creamy"], spice: 0, format: "crispy", mood: "cozy", description: "Flaky spinach and feta pastry with tzatziki, olives, tomato, and dressed greens." },
  { name: "Falafel Mezze Plate", cuisine: "Mediterranean", diet: "vegan", flavors: ["fresh", "savory"], spice: 1, format: "crispy", mood: "adventurous", description: "Herb-packed falafel with hummus, tahini, pickles, tabbouleh, and warm pita." },
  { name: "Thai Basil Chicken", cuisine: "Thai", diet: "meat", flavors: ["spicy", "savory"], spice: 4, format: "saucy", mood: "adventurous", description: "Wok-seared chicken with Thai basil, garlic, chile, green beans, and jasmine rice." },
  { name: "Green Curry Shrimp", cuisine: "Thai", diet: "seafood", flavors: ["spicy", "creamy"], spice: 3, format: "saucy", mood: "cozy", description: "Shrimp in aromatic coconut green curry with bamboo shoots, basil, and vegetables." },
  { name: "Vegetable Pad See Ew", cuisine: "Thai", diet: "vegetarian", flavors: ["sweet-savory", "smoky"], spice: 1, format: "saucy", mood: "cozy", description: "Wok-charred wide rice noodles with Chinese broccoli, egg, and a sweet-savory sauce." },
  { name: "Tofu Larb Bowl", cuisine: "Thai", diet: "vegan", flavors: ["spicy", "fresh"], spice: 4, format: "bowl", mood: "adventurous", description: "Crisp tofu with lime, mint, cilantro, toasted rice, chile, and crunchy vegetables." }
];

const form = document.querySelector("#taste-survey");
const steps = [...document.querySelectorAll(".survey-step")];
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");
const submitButton = document.querySelector("#submit-button");
const resultView = document.querySelector("#result-view");
const spiceInput = document.querySelector("#spice-level");
const spiceOutput = document.querySelector("#spice-output");
const spiceNames = ["No heat", "Mild", "Medium", "Hot", "Extra hot"];
let currentStep = 0;
let rankedMatches = [];
let resultIndex = 0;

function reportEmbeddedHeight() {
  if (!isEmbeddedSurvey || window.parent === window) return;
  requestAnimationFrame(() => {
    window.parent.postMessage(
      { type: "savorly-survey-height", height: document.documentElement.scrollHeight },
      "*"
    );
  });
}

function showStep(index) {
  currentStep = index;
  steps.forEach((step, stepIndex) => {
    const active = stepIndex === index;
    step.hidden = !active;
    step.classList.toggle("active", active);
  });

  const percent = Math.round(((index + 1) / steps.length) * 100);
  document.querySelector("#step-count").textContent = `Step ${index + 1} of ${steps.length}`;
  document.querySelector("#progress-percent").textContent = `${percent}% complete`;
  document.querySelector("#progress-bar").style.width = `${percent}%`;
  previousButton.hidden = index === 0;
  nextButton.hidden = index === steps.length - 1;
  submitButton.hidden = index !== steps.length - 1;
  steps[index].querySelector("legend").focus?.();
  reportEmbeddedHeight();
}

function validateCurrentStep() {
  const step = steps[currentStep];
  const error = step.querySelector(".step-error");
  error.textContent = "";

  if (currentStep === 2) {
    const selectedFlavors = step.querySelectorAll('input[name="flavor"]:checked');
    if (selectedFlavors.length === 0) {
      error.textContent = "Please choose at least one flavor you enjoy.";
      return false;
    }
    return true;
  }

  const requiredInput = step.querySelector("input[required]");
  const selected = step.querySelector(`input[name="${requiredInput.name}"]:checked`);
  if (!selected) {
    error.textContent = "Please choose one option to continue.";
    return false;
  }
  return true;
}

function getAnswers() {
  const data = new FormData(form);
  return {
    cuisine: data.get("cuisine"),
    diet: data.get("diet"),
    flavors: data.getAll("flavor"),
    spice: Number(data.get("spice")),
    format: data.get("format"),
    mood: data.get("mood")
  };
}

function rankDishes(answers) {
  return dishes
    .filter((dish) => dish.diet === answers.diet)
    .map((dish) => {
      let score = 0;
      if (answers.cuisine === "Surprise") score += 6;
      else if (dish.cuisine === answers.cuisine) score += 40;
      const flavorMatches = dish.flavors.filter((flavor) => answers.flavors.includes(flavor)).length;
      score += flavorMatches * 7;
      score += Math.max(0, 5 - Math.abs(dish.spice - answers.spice) * 2);
      if (dish.format === answers.format) score += 7;
      if (dish.mood === answers.mood) score += 6;
      return { ...dish, score, flavorMatches };
    })
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}

function displayResult(match, answers, index) {
  const preferredFlavors = match.flavors.filter((flavor) => answers.flavors.includes(flavor));
  const flavorText = preferredFlavors.length
    ? `It shares your love of ${preferredFlavors.join(" and ")} flavors`
    : `Its ${match.flavors.join(" and ")} profile gives you a delicious new direction`;
  const cuisineText = answers.cuisine === "Surprise"
    ? `${match.cuisine} cuisine brings the element of surprise you asked for`
    : `It stays true to your ${answers.cuisine} craving`;
  const score = Math.max(84, Math.min(98, 86 + match.flavorMatches * 3 + (match.format === answers.format ? 3 : 0) - index * 2));

  document.querySelector("#result-name").textContent = match.name;
  document.querySelector("#result-cuisine").textContent = `${match.cuisine} | ${capitalize(match.diet)}`;
  document.querySelector("#match-score").textContent = `${score}%`;
  document.querySelector("#result-description").textContent = match.description;
  document.querySelector("#result-reason").textContent = `${cuisineText}. ${flavorText}, and the ${match.format} style fits your ${answers.mood} mood.`;
  document.querySelector("#result-tags").innerHTML = [match.cuisine, match.diet, ...match.flavors, spiceNames[match.spice]]
    .map((tag) => `<span>${tag}</span>`)
    .join("");
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

nextButton.addEventListener("click", () => {
  if (validateCurrentStep()) showStep(currentStep + 1);
});

previousButton.addEventListener("click", () => showStep(currentStep - 1));

spiceInput.addEventListener("input", () => {
  spiceOutput.textContent = spiceNames[Number(spiceInput.value)];
});

document.querySelectorAll('input[name="flavor"]').forEach((input) => {
  input.addEventListener("change", () => {
    const selected = [...document.querySelectorAll('input[name="flavor"]:checked')];
    const atLimit = selected.length >= 3;
    document.querySelectorAll('input[name="flavor"]').forEach((option) => {
      option.disabled = atLimit && !option.checked;
      option.closest("label").classList.toggle("is-disabled", option.disabled);
    });
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateCurrentStep()) return;
  const answers = getAnswers();
  rankedMatches = rankDishes(answers);
  resultIndex = 0;
  form.hidden = true;
  document.querySelector(".survey-topline").hidden = true;
  document.querySelector(".progress-track").hidden = true;
  resultView.hidden = false;
  displayResult(rankedMatches[resultIndex], answers, resultIndex);
  resultView.focus();
  reportEmbeddedHeight();
});

document.querySelector("#another-button").addEventListener("click", () => {
  resultIndex = (resultIndex + 1) % Math.min(4, rankedMatches.length);
  displayResult(rankedMatches[resultIndex], getAnswers(), resultIndex);
});

document.querySelector("#restart-button").addEventListener("click", () => {
  form.reset();
  spiceOutput.textContent = spiceNames[2];
  document.querySelectorAll('.pill-choice').forEach((label) => label.classList.remove("is-disabled"));
  document.querySelectorAll('input[name="flavor"]').forEach((input) => { input.disabled = false; });
  resultView.hidden = true;
  form.hidden = false;
  document.querySelector(".survey-topline").hidden = false;
  document.querySelector(".progress-track").hidden = false;
  showStep(0);
});

document.querySelector("#year").textContent = new Date().getFullYear();

const starterFlavor = pageParameters.get("flavor");
const starterMood = pageParameters.get("mood");
const flavorInput = [...document.querySelectorAll('input[name="flavor"]')]
  .find((input) => input.value === starterFlavor);
const moodInput = [...document.querySelectorAll('input[name="mood"]')]
  .find((input) => input.value === starterMood);
if (flavorInput) flavorInput.checked = true;
if (moodInput) moodInput.checked = true;

showStep(0);
window.addEventListener("load", reportEmbeddedHeight);
