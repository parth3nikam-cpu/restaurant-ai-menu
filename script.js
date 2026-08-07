const categoryButtons = document.querySelectorAll(".category-tab");
const menuCards = document.querySelectorAll(".menu-card");
const cartKey = "savorly-cart";
const menuItems = {
  tomatoes: { name: "Heirloom tomatoes", price: 14 },
  salmon: { name: "Cedar-roasted salmon", price: 28 },
  pasta: { name: "Wild mushroom pasta", price: 23 },
  cake: { name: "Lemon olive oil cake", price: 11 }
};

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(cartKey)) || {};
  } catch {
    return {};
  }
}

function saveCart(cart) {
  try { localStorage.setItem(cartKey, JSON.stringify(cart)); } catch { /* Cart stays available for this page view. */ }
}

function updateCartCount(cart = readCart()) {
  const count = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  document.querySelector("#cart-count").textContent = count;
}

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

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const itemId = button.dataset.item;
    const cart = readCart();
    cart[itemId] = Math.min(10, (cart[itemId] || 0) + 1);
    saveCart(cart);
    updateCartCount(cart);

    const originalText = button.innerHTML;
    button.innerHTML = "Added ✓";
    button.classList.add("is-added");
    window.setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove("is-added");
    }, 1100);

    const toast = document.querySelector("#cart-toast");
    toast.textContent = `${menuItems[itemId].name} added to your cart.`;
    toast.hidden = false;
    window.clearTimeout(window.cartToastTimer);
    window.cartToastTimer = window.setTimeout(() => { toast.hidden = true; }, 2200);
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
updateCartCount();
