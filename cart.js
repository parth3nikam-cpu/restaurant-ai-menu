const cartKey = "savorly-cart";
const taxRate = 0.0825;
const packagingFee = 2;
const catalog = {
  tomatoes: { name: "Heirloom tomatoes", price: 14, description: "Whipped feta, basil oil, toasted seeds, sourdough", art: "art-tomatoes" },
  salmon: { name: "Cedar-roasted salmon", price: 28, description: "Spring peas, charred lemon, fingerling potatoes, dill", art: "art-salmon" },
  pasta: { name: "Wild mushroom pasta", price: 23, description: "Pappardelle, brown butter, sage, parmesan", art: "art-pasta" },
  cake: { name: "Lemon olive oil cake", price: 11, description: "Crème fraîche, macerated berries, garden mint", art: "art-cake" }
};

let cart = readCart();
let fulfillment = "";
let promoApplied = false;

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(cartKey)) || {};
    return Object.fromEntries(
      Object.entries(saved)
        .filter(([id, quantity]) => catalog[id] && Number.isFinite(quantity) && quantity > 0)
        .map(([id, quantity]) => [id, Math.min(10, Math.floor(quantity))])
    );
  } catch {
    return {};
  }
}

function saveCart() {
  try { localStorage.setItem(cartKey, JSON.stringify(cart)); } catch { /* The current view still works if storage is unavailable. */ }
}

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function cartCount() {
  return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
}

function calculateTotals() {
  const subtotal = Object.entries(cart).reduce((total, [id, quantity]) => total + catalog[id].price * quantity, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const taxable = subtotal - discount;
  const tax = taxable * taxRate;
  const packaging = fulfillment === "takeout" && subtotal > 0 ? packagingFee : 0;
  return { subtotal, discount, tax, packaging, total: taxable + tax + packaging };
}

function renderCart() {
  const entries = Object.entries(cart);
  const itemsContainer = document.querySelector("#cart-items");
  const emptyState = document.querySelector("#empty-cart");

  emptyState.hidden = entries.length > 0;
  itemsContainer.innerHTML = entries.map(([id, quantity]) => {
    const item = catalog[id];
    return `
      <article class="cart-item" data-cart-item="${id}">
        <div class="cart-item-art ${item.art}" aria-hidden="true"></div>
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="item-controls">
            <div class="quantity-control" aria-label="Quantity for ${item.name}">
              <button type="button" data-action="decrease" aria-label="Decrease ${item.name} quantity">−</button>
              <span>${quantity}</span>
              <button type="button" data-action="increase" aria-label="Increase ${item.name} quantity">+</button>
            </div>
            <button class="remove-item" type="button" data-action="remove">Remove</button>
          </div>
        </div>
        <div class="item-price"><strong>${money(item.price * quantity)}</strong><small>${money(item.price)} each</small></div>
      </article>`;
  }).join("");

  document.querySelector("#cart-count").textContent = cartCount();
  renderSummary();
}

function renderSummary() {
  const totals = calculateTotals();
  document.querySelector("#subtotal").textContent = money(totals.subtotal);
  document.querySelector("#discount").textContent = `−${money(totals.discount)}`;
  document.querySelector("#discount-line").hidden = !promoApplied || totals.subtotal === 0;
  document.querySelector("#tax").textContent = money(totals.tax);
  document.querySelector("#packaging-line").hidden = totals.packaging === 0;
  document.querySelector("#total").textContent = money(totals.total);
}

document.querySelector("#cart-items").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const itemId = button.closest("[data-cart-item]").dataset.cartItem;
  const action = button.dataset.action;

  if (action === "increase") cart[itemId] = Math.min(10, cart[itemId] + 1);
  if (action === "decrease") cart[itemId] = Math.max(1, cart[itemId] - 1);
  if (action === "remove") delete cart[itemId];
  saveCart();
  renderCart();
});

document.querySelectorAll("[data-add-item]").forEach((button) => {
  button.addEventListener("click", () => {
    const itemId = button.dataset.addItem;
    cart[itemId] = Math.min(10, (cart[itemId] || 0) + 1);
    saveCart();
    renderCart();
    button.textContent = "✓";
    window.setTimeout(() => { button.textContent = "+"; }, 900);
  });
});

const fulfillmentInputs = [...document.querySelectorAll('input[name="fulfillment"]')];
fulfillmentInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) {
      fulfillmentInputs.forEach((other) => { if (other !== input) other.checked = false; });
      fulfillment = input.value;
      document.querySelector("#fulfillment-error").textContent = "";
    } else {
      fulfillment = "";
    }
    renderSummary();
  });
});

document.querySelector("#promo-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const promoInput = document.querySelector("#promo-code");
  const promoMessage = document.querySelector("#promo-message");
  if (promoInput.value.trim().toUpperCase() === "WELCOME10") {
    promoApplied = true;
    promoMessage.textContent = "WELCOME10 applied — you saved 10%.";
    promoMessage.style.color = "#367341";
  } else {
    promoApplied = false;
    promoMessage.textContent = "That code is not available. Try WELCOME10.";
    promoMessage.style.color = "#b43b28";
  }
  renderSummary();
});

document.querySelector("#checkout-button").addEventListener("click", () => {
  const status = document.querySelector("#checkout-status");
  status.hidden = true;
  if (cartCount() === 0) {
    status.textContent = "Your cart is empty. Add a dish before continuing.";
    status.hidden = false;
    status.focus();
    return;
  }
  if (!fulfillment) {
    document.querySelector("#fulfillment-error").textContent = "Please select Takeout or Dine in before continuing.";
    document.querySelector(".fulfillment-card").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  status.textContent = `Great choice! Your ${fulfillment} order total is ${money(calculateTotals().total)}. Checkout is ready for the next build.`;
  status.hidden = false;
  status.focus();
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderCart();
