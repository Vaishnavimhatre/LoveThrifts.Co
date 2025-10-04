// LoveThrifts.Co — Starter JS
const products = [
  {
    id: "LT-101",
    title: "Denim Overshirt",
    price: 799,
    condition: "Great",
    size: "M",
    img: "images/Denim Overshirt.jpg"
  },
  {
    id: "LT-102",
    title: "Black Slip Dress",
    price: 699,
    condition: "Excellent",
    size: "S",
    img: "images/Black Slip Dress.jpg"
  },
  {
    id: "LT-103",
    title: "Varsity Jacket",
    price: 1299,
    condition: "Good",
    size: "L",
    img: "images/Varsity Jacket.jpg"
  },
  {
    id: "LT-104",
    title: "Wide-Leg Trousers",
    price: 649,
    condition: "Excellent",
    size: "M",
    img: "images/Wide-Leg Trousers.jpg"
  },
  {
    id: "LT-105",
    title: "Cropped Cardigan",
    price: 549,
    condition: "Great",
    size: "S",
    img: "images/Cropped Cardigan.jpg"
  },
   {
    id: "LT-106",
    title: "Pleated Skirt",
    price: 449,
    condition: "Great",
    size: "S",
    img: "images/Pleated Skirt.jpg"
  }
];

function renderProducts(list){
  const wrap = document.getElementById("products");
  wrap.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="img"><img src="${p.img}" alt="${p.title}" loading="lazy"></div>
      <div class="body">
        <h3 class="title">${p.title}</h3>
        <div class="meta">
          <span class="price">₹${p.price}</span>
          <span class="badge">${p.condition}</span>
        </div>
        <div class="meta" style="margin-top:.3rem">
          <span>Size: ${p.size}</span>
          <a class="btn outline" href="https://wa.me/1234567890?text=Hi!%20Is%20${encodeURIComponent(p.title)}%20(${p.id})%20available%3F" target="_blank" rel="noopener">Buy</a>
        </div>
      </div>
    `;
    wrap.appendChild(card);
  });
}

function sortProducts(mode, list){
  const copy = [...list];
  if(mode === "low") copy.sort((a,b)=>a.price-b.price);
  if(mode === "high") copy.sort((a,b)=>b.price-a.price);
  return copy;
}

function filterProducts(query, list){
  if(!query) return list;
  const q = query.toLowerCase();
  return list.filter(p => [p.title, p.condition, p.size, p.id].join(" ").toLowerCase().includes(q));
}

document.addEventListener("DOMContentLoaded", () => {
  // Year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  toggle?.addEventListener("click", () => {
    const open = nav.style.display === "block";
    nav.style.display = open ? "none" : "block";
    toggle.setAttribute("aria-expanded", String(!open));
  });

  // Render + controls
  const search = document.getElementById("search");
  const sort = document.getElementById("sort");

  function refresh(){
    const filtered = filterProducts(search.value, products);
    const sorted = sortProducts(sort.value, filtered);
    renderProducts(sorted);
  }

  search.addEventListener("input", refresh);
  sort.addEventListener("change", refresh);
  refresh();
});






// Assume products array is already defined above in your script

// Cart state
let cart = [];

// Utility: find product by id
function findProduct(id) {
  return products.find(p => p.id === id);
}

// Add to cart
function addToCart(productId) {
  const prod = findProduct(productId);
  if (!prod) return;
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  updateCartCount();
  renderCartItems();
}

// Remove from cart (or reduce qty)
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartCount();
  renderCartItems();
}

// Update cart count in nav
function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  countEl.textContent = totalItems;
}

// Render cart items in panel
function renderCartItems() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";
  const subtotalEl = document.getElementById("cart-subtotal");
  let subtotal = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach(item => {
      const prod = findProduct(item.id);
      const card = document.createElement("article");
      card.className = "card";
      const itemTotal = prod.price * item.quantity;
      subtotal += itemTotal;

      card.innerHTML = `
        <div class="img"><img src="${prod.img}" alt="${prod.title}" loading="lazy"></div>
        <div class="body">
          <h3 class="title">${prod.title}</h3>
          <div class="meta">
            <span>₹${prod.price}</span>
            <span>Qty: ${item.quantity}</span>
          </div>
          <div class="meta" style="margin-top:.5rem; justify-content:space-between;">
            <span>Total: ₹${itemTotal}</span>
            <button class="btn outline remove-btn" data-id="${prod.id}">Remove</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  subtotalEl.textContent = subtotal;

  // attach remove button events
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const pid = e.currentTarget.getAttribute("data-id");
      removeFromCart(pid);
    });
  });
}

// Handle checkout: build message, redirect to WhatsApp or Instagram
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  // Build message
  let msg = "Hi, I want to order:\n";
  cart.forEach(item => {
    const prod = findProduct(item.id);
    msg += `• ${prod.title} (ID: ${prod.id}) × ${item.quantity} = ₹${prod.price * item.quantity}\n`;
  });
  const subtotal = cart.reduce((s, item) => {
    const prod = findProduct(item.id);
    return s + prod.price * item.quantity;
  }, 0);
  msg += `Subtotal: ₹${subtotal}\n`;
  msg += "Thank you!";

  // Encode message for URL
  const encoded = encodeURIComponent(msg);

  // Option 1: WhatsApp
  const waNumber = "919777387499"; // +91 prefix, no + or spaces
  const waLink = `https://wa.me/${waNumber}?text=${encoded}`;

  // Option 2: Instagram DM (not reliably linkable)
  // You can fallback to Instagram page URL if needed
  // const instaUrl = "https://www.instagram.com/lovethrifts_co/";

  // Redirect to WhatsApp
  window.open(waLink, "_blank");
}

// Toggle cart panel visibility (scroll or show/hide)
function toggleCartPanel() {
  const panel = document.getElementById("my-orders");
  const isHidden = panel.style.display === "none" || panel.style.display === "";
  panel.style.display = isHidden ? "block" : "none";
  if (isHidden) {
    panel.scrollIntoView({ behavior: "smooth" });
  }
}

// === Integrate into your DOMContentLoaded logic ===
document.addEventListener("DOMContentLoaded", () => {
  // existing code: year, nav toggle, initial render etc.
  document.getElementById("year").textContent = new Date().getFullYear();

  // Nav mobile toggle (your existing code)
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  toggle?.addEventListener("click", () => {
    const open = nav.style.display === "block";
    nav.style.display = open ? "none" : "block";
    toggle.setAttribute("aria-expanded", String(!open));
  });

  // Setup search + sort + initial product render (your existing)
  const search = document.getElementById("search");
  const sort = document.getElementById("sort");

  function refresh() {
    const filtered = filterProducts(search.value, products);
    const sorted = sortProducts(sort.value, filtered);
    renderProducts(sorted);
  }
  search.addEventListener("input", refresh);
  sort.addEventListener("change", refresh);
  refresh();

  // New Cart / Orders controls
  document.getElementById("cart-toggle").addEventListener("click", (e) => {
    e.preventDefault();
    toggleCartPanel();
  });

  document.getElementById("checkout-btn").addEventListener("click", (e) => {
    e.preventDefault();
    checkout();
  });

  // Initially render cart (empty)
  updateCartCount();
  renderCartItems();
});
