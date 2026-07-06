/* ==========================================
   SIMPLE RESTAURANT DATABASE (MOCK DATA)
   ========================================== */
const RESTAURANT_DATA = [
  {
    id: "r1",
    name: "Grand Saffron Delights",
    cuisines: "North Indian, Mughlai, Biryani",
    rating: "4.5",
    price: "₹600 for two",
    address: "Koramangala 5th Block, Bengaluru",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=400",
    menu: [
      { name: "Butter Chicken Special", price: 349, isVeg: false },
      { name: "Kadhai Paneer Masala", price: 299, isVeg: true },
      { name: "Hyderabadi Chicken Biryani", price: 329, isVeg: false },
      { name: "Butter Naan", price: 59, isVeg: true }
    ]
  },
  {
    id: "r2",
    name: "Pizza Express & Trattoria",
    cuisines: "Italian, Pizzas, Pasta",
    rating: "4.3",
    price: "₹800 for two",
    address: "Indiranagar 100 Feet Rd, Bengaluru",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400",
    menu: [
      { name: "Margherita Basilico Pizza", price: 399, isVeg: true },
      { name: "Spicy Pepperoni Pizza", price: 499, isVeg: false },
      { name: "Alfredo Pasta with Mushroom", price: 349, isVeg: true }
    ]
  },
  {
    id: "r3",
    name: "The Green Garden Cafe",
    cuisines: "Salads, Healthy Bowls, Juices",
    rating: "4.6",
    price: "₹400 for two",
    address: "Sector 3, HSR Layout, Bengaluru",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400",
    menu: [
      { name: "Quinoa Avocado Salad Bowl", price: 279, isVeg: true },
      { name: "Tofu Buddha Protein Bowl", price: 299, isVeg: true },
      { name: "Cold Pressed Detox Juice", price: 149, isVeg: true }
    ]
  },
  {
    id: "r4",
    name: "Wok & Roll Asian Kitchen",
    cuisines: "Chinese, Thai, Ramen",
    rating: "4.2",
    price: "₹700 for two",
    address: "ITPL Main Road, Whitefield, Bengaluru",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400",
    menu: [
      { name: "Pan Fried Veg Gyoza (6 Pcs)", price: 229, isVeg: true },
      { name: "Hakka Noodles Chicken", price: 269, isVeg: false },
      { name: "Thai Green Curry & Jasmine Rice", price: 349, isVeg: true }
    ]
  },
  {
    id: "r5",
    name: "South Indian Legacy",
    cuisines: "South Indian, Dosa, Filter Coffee",
    rating: "4.4",
    price: "₹250 for two",
    address: "Margosa Road, Malleshwaram, Bengaluru",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=400",
    menu: [
      { name: "Ghee Masala Dosa Classic", price: 109, isVeg: true },
      { name: "Ghee Podi Idli Special", price: 89, isVeg: true },
      { name: "Authentic Filter Coffee", price: 49, isVeg: true }
    ]
  },
  {
    id: "r6",
    name: "The Burger Craft",
    cuisines: "Burgers, Fast Food, Shakes",
    rating: "4.1",
    price: "₹450 for two",
    address: "1st Block Koramangala, Bengaluru",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400",
    menu: [
      { name: "Classic Cheese Grilled Burger", price: 189, isVeg: true },
      { name: "Crispy Spicy Chicken Burger", price: 229, isVeg: false },
      { name: "Belgian Chocolate Milkshake", price: 149, isVeg: true }
    ]
  }
];

/* ==========================================
   GLOBAL APP STATE
   ========================================== */
let activeRestaurant = null;
let cart = []; // Array of { name, price, quantity, isVeg }

/* ==========================================
   PAGE INITIALIZATION & ELEMENT REGISTRY
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Render listings initially
  renderRestaurants();

  // Search input events
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => {
    renderRestaurants(e.target.value.toLowerCase().trim());
  });

  // Logo home navigation
  document.getElementById("logo-btn").addEventListener("click", () => {
    searchInput.value = "";
    showView("home");
  });

  // Back button navigation
  document.getElementById("back-btn").addEventListener("click", () => {
    showView("home");
  });

  // Cart slide drawer toggle events
  const cartPanel = document.getElementById("cart-panel");
  const backdrop = document.getElementById("backdrop");

  const openCart = () => {
    cartPanel.classList.remove("hidden");
    backdrop.classList.remove("hidden");
  };

  const closeCart = () => {
    cartPanel.classList.add("hidden");
    backdrop.classList.add("hidden");
  };

  document.getElementById("cart-toggle").addEventListener("click", openCart);
  document.getElementById("close-cart").addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);

  // Place Order CTA action
  document.getElementById("order-btn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Add items from the menu first.");
      return;
    }
    alert("🎉 Order placed successfully! Your food will arrive in 30 minutes.");
    cart = [];
    updateCartUI();
    closeCart();
    showView("home");
  });
});

/* ==========================================
   RENDER LISTINGS (GRID & SEARCH FILTERS)
   ========================================== */
function renderRestaurants(filterText = "") {
  const grid = document.getElementById("restaurant-grid");
  grid.innerHTML = "";

  const filtered = RESTAURANT_DATA.filter(r => 
    r.name.toLowerCase().includes(filterText) ||
    r.cuisines.toLowerCase().includes(filterText)
  );

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 40px;">
        <i class="fa-solid fa-utensils" style="font-size: 32px; color: #CCC; margin-bottom: 12px;"></i>
        <h3>No restaurants match your search</h3>
      </div>
    `;
    return;
  }

  filtered.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";
    card.addEventListener("click", () => openRestaurantDetail(r.id));
    card.innerHTML = `
      <img src="${r.image}" alt="${r.name}">
      <div class="card-info">
        <div class="card-title-row">
          <h4>${r.name}</h4>
          <span class="rating-badge">${r.rating} <i class="fa-solid fa-star"></i></span>
        </div>
        <div class="card-meta-row">
          <span>${r.cuisines}</span>
          <span>${r.price}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ==========================================
   RESTAURANT PROFILE MENU VIEW
   ========================================== */
function openRestaurantDetail(id) {
  const restaurant = RESTAURANT_DATA.find(r => r.id === id);
  if (!restaurant) return;

  activeRestaurant = restaurant;
  
  // Update detail view text content fields
  document.getElementById("rest-name").innerText = restaurant.name;
  document.getElementById("rest-cuisines").innerText = restaurant.cuisines;
  document.getElementById("rest-address").innerText = restaurant.address;
  document.getElementById("rest-rating").innerHTML = `${restaurant.rating} <i class="fa-solid fa-star"></i>`;

  // Render menu item listings
  const menuList = document.getElementById("menu-list");
  menuList.innerHTML = "";

  restaurant.menu.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "menu-item";
    row.innerHTML = `
      <div class="menu-item-left">
        <span class="item-badge ${item.isVeg ? "" : "non-veg"}"></span>
        <h4 class="menu-item-name">${item.name}</h4>
        <p class="menu-item-price">₹${item.price}</p>
      </div>
      <button class="add-to-cart-btn" onclick="addToCart(${index})">ADD</button>
    `;
    menuList.appendChild(row);
  });

  showView("details");
}

/* ==========================================
   VIEW CONTROLLER (ROUTER TOGGLES)
   ========================================== */
function showView(view) {
  const homeView = document.getElementById("home-view");
  const detailsView = document.getElementById("details-view");
  
  if (view === "home") {
    homeView.classList.remove("hidden");
    detailsView.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (view === "details") {
    homeView.classList.add("hidden");
    detailsView.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/* ==========================================
   CART OPERATIONS
   ========================================== */
window.addToCart = (itemIndex) => {
  if (!activeRestaurant) return;
  const item = activeRestaurant.menu[itemIndex];

  // Check if item is already inside cart list
  const existing = cart.find(ci => ci.name === item.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      name: item.name,
      price: item.price,
      quantity: 1,
      isVeg: item.isVeg
    });
  }

  updateCartUI();
};

function changeQty(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
}

// Attach to window so onclick inline selectors work
window.changeCartQty = (index, change) => changeQty(index, change);

function updateCartUI() {
  const badge = document.getElementById("cart-badge-count");
  const itemsContainer = document.getElementById("cart-items");
  const totalAmount = document.getElementById("cart-total-amount");

  let totalItemsCount = 0;
  let totalCost = 0;

  itemsContainer.innerHTML = "";

  cart.forEach((ci, index) => {
    totalItemsCount += ci.quantity;
    totalCost += (ci.price * ci.quantity);

    const row = document.createElement("div");
    row.className = "cart-item-row";
    row.innerHTML = `
      <div class="cart-item-info">
        <span class="cart-item-name">${ci.name}</span>
        <div class="cart-item-qty-row">
          <button class="qty-change-btn" onclick="changeCartQty(${index}, -1)">-</button>
          <span>${ci.quantity}</span>
          <button class="qty-change-btn" onclick="changeCartQty(${index}, 1)">+</button>
        </div>
      </div>
      <strong>₹${ci.price * ci.quantity}</strong>
    `;
    itemsContainer.appendChild(row);
  });

  badge.innerText = totalItemsCount;
  totalAmount.innerText = `₹${totalCost}`;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `<p class="empty-state" style="text-align: center; color: var(--text-muted); padding: 20px 0;">Cart is empty</p>`;
  }
}
