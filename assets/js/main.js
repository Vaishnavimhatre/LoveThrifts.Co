// LoveThrifts.Co — Starter JS
const products = [
  {
    id: "LT-101",
    title: "Denim Overshirt",
    price: 799,
    condition: "Great",
    size: "M",
    img: "https://placehold.co/600x800?text=Denim+Overshirt"
  },
  {
    id: "LT-102",
    title: "Black Slip Dress",
    price: 699,
    condition: "Excellent",
    size: "S",
    img: "https://placehold.co/600x800?text=Slip+Dress"
  },
  {
    id: "LT-103",
    title: "Varsity Jacket",
    price: 1299,
    condition: "Good",
    size: "L",
    img: "https://placehold.co/600x800?text=Varsity+Jacket"
  },
  {
    id: "LT-104",
    title: "Wide-Leg Trousers",
    price: 649,
    condition: "Excellent",
    size: "M",
    img: "https://placehold.co/600x800?text=Trousers"
  },
  {
    id: "LT-105",
    title: "Cropped Cardigan",
    price: 549,
    condition: "Great",
    size: "S",
    img: "https://placehold.co/600x800?text=Cardigan"
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
