/**
 * Thanvi Mane | ಧನ್ಯ ಮನೆ
 * Interactive Application Logic: Product Catalogue, Cart Drawer, WhatsApp Checkout, FAQ, and Modals
 */

// Official WhatsApp Business Number
const WHATSAPP_NUMBER = "918618919402";

// Product Catalogue Data (Strictly matching prompt & catalogue reference)
const PRODUCTS = [
  {
    id: 1,
    name: "Sun-Dried Curd Chillies",
    kannada: "ಮಜ್ಜಿಗೆ ಮೆಣಸಿನಕಾಯಿ",
    weight: "100gm",
    sellingPrice: 150,
    originalPrice: 300,
    category: "Pickles",
    image: "assets/curd_chillies.jpg",
    discountTag: "50% OFF",
    desc: "Crispy salted curd-soaked sun-dried chillies (Sandige Menasu). Perfect side for curd rice."
  },
  {
    id: 2,
    name: "Herale Kayi Pickles",
    kannada: "ಹೇರಳೆ ಕಾಯಿ ಉಪ್ಪಿನಕಾಯಿ",
    weight: "250gm",
    sellingPrice: 160,
    originalPrice: 200,
    category: "Pickles",
    image: "assets/herale_kayi.jpg",
    discountTag: "20% OFF",
    desc: "Authentic Malnad citron wild lemon pickle seasoned with mustard, fenugreek, and cold-pressed oil."
  },
  {
    id: 3,
    name: "Lemon Pickles",
    kannada: "ನಿಂಬೆಕಾಯಿ ಉಪ್ಪಿನಕಾಯಿ",
    weight: "250gm",
    sellingPrice: 160,
    originalPrice: 200,
    category: "Pickles",
    image: "assets/lemon_pickle.jpg",
    discountTag: "20% OFF",
    desc: "Traditional homemade juicy lemon pickle soaked with pure red spices and aromatic tempering."
  },
  {
    id: 4,
    name: "Chakkuli",
    kannada: "ಚಕ್ಕುಲಿ",
    weight: "250gm",
    sellingPrice: 150,
    originalPrice: 200,
    category: "Snacks",
    image: "assets/chakkuli.jpg",
    discountTag: "25% OFF",
    desc: "Concentric crispy spiral savouries made with roasted lentils, cumin, and white sesame seeds."
  },
  {
    id: 5,
    name: "Kodubale",
    kannada: "ಕೋಡುಬಳೆ",
    weight: "250gm",
    sellingPrice: 150,
    originalPrice: 200,
    category: "Snacks",
    image: "assets/kodubale.jpg",
    discountTag: "25% OFF",
    desc: "Classic Karnataka ring snack with signature crunch, hints of hing, grated coconut, and red chilli."
  },
  {
    id: 6,
    name: "Hucch Ellu Pudi",
    kannada: "ಹುಚ್ಚೆಳ್ಳು ಪುಡಿ",
    weight: "250gm",
    sellingPrice: 125,
    originalPrice: 150,
    category: "Powders",
    image: "assets/hucchellu_pudi.jpg",
    discountTag: "17% OFF",
    desc: "Traditional North Karnataka niger seed dry chutney powder. Unbeatable with jowar roti and ghee."
  },
  {
    id: 7,
    name: "Masala Papad",
    kannada: "ಮಸಾಲಾ ಹಪ್ಪಳ",
    weight: "50 pcs / 250gm",
    sellingPrice: 150,
    originalPrice: 200,
    category: "Papad",
    image: "assets/masala_papad.jpg",
    discountTag: "25% OFF",
    desc: "Traditional sun-dried spiced happala loaded with freshly cracked black pepper and roasted cumin."
  },
  {
    id: 8,
    name: "Nippattu",
    kannada: "ನಿಪ್ಪಟ್ಟು",
    weight: "250gm",
    sellingPrice: 150,
    originalPrice: 200,
    category: "Snacks",
    image: "assets/nippattu.jpg",
    discountTag: "25% OFF",
    desc: "Delectable crunchy flat rice crackers studded with roasted peanuts, gram dal, and curry leaves."
  },
  {
    id: 9,
    name: "Nati Koli Sambar",
    kannada: "ನಾಟಿ ಕೋಳಿ ಸಾಂಬಾರ್",
    weight: "Authentic Gravy",
    sellingPrice: null,
    originalPrice: null,
    category: "Coming Soon",
    image: "assets/nati_koli_sambar.jpg",
    discountTag: "COMING SOON",
    isComingSoon: true,
    desc: "Slow-cooked authentic Karnataka country chicken curry simmered in hand-pounded spices."
  }
];

// Cart State
let cart = [];

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  renderProducts("all");
  setupEventListeners();
  setupFAQ();
  setupNavbarScroll();
});

// Load cart from LocalStorage
function loadCart() {
  const savedCart = localStorage.getItem("thanvi_mane_cart");
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (e) {
      cart = [];
    }
  }
  updateCartUI();
}

// Save cart to LocalStorage
function saveCart() {
  localStorage.setItem("thanvi_mane_cart", JSON.stringify(cart));
  updateCartUI();
}

// Render Products Grid
function renderProducts(filter = "all") {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const filtered = PRODUCTS.filter(p => {
    if (filter === "all") {
      // By default show all orderable products + coming soon at end
      return true;
    }
    return p.category === filter;
  });

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = `product-card ${product.isComingSoon ? "product-card-coming-soon" : ""}`;
    card.dataset.id = product.id;

    if (product.isComingSoon) {
      card.innerHTML = `
        <div class="product-img-frame">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
          <span class="coming-soon-badge-overlay">COMING SOON</span>
        </div>
        <div class="product-body">
          <span class="product-category-label">Upcoming Special</span>
          <h3 class="product-title-en">${product.name}</h3>
          <p class="product-title-kn">${product.kannada}</p>
          <div class="product-pricing">
            <span class="current-price" style="font-size: 1.05rem; color: var(--gold-dark);">Traditional Special</span>
            <span class="savings-label">Coming Soon</span>
          </div>
          <div class="product-actions">
            <button class="btn btn-stay-tuned w-100" onclick="openNotifyModal()">
              <span>🔔 Stay Tuned / Pre-Book</span>
            </button>
          </div>
        </div>
      `;
    } else {
      const discountPercent = Math.round(((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100);
      card.innerHTML = `
        <div class="product-img-frame">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
          <span class="discount-badge">${product.discountTag || discountPercent + '% OFF'}</span>
          <span class="weight-tag">${product.weight}</span>
        </div>
        <div class="product-body">
          <span class="product-category-label">${product.category}</span>
          <h3 class="product-title-en">${product.name}</h3>
          <p class="product-title-kn">${product.kannada}</p>
          <div class="product-pricing">
            <span class="current-price">₹${product.sellingPrice}</span>
            <span class="original-price">₹${product.originalPrice}</span>
            <span class="savings-label">Save ₹${product.originalPrice - product.sellingPrice}</span>
          </div>
          <div class="product-actions">
            <button class="btn-add-cart" onclick="addToCart(${product.id})">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      `;
    }

    grid.appendChild(card);
  });
}

// Add Item to Cart
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || product.isComingSoon) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      kannada: product.kannada,
      weight: product.weight,
      price: product.sellingPrice,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  showToast(`Added "${product.name}" to cart!`);

  // Animate Cart Badge
  const badge = document.getElementById("cartCountBadge");
  if (badge) {
    badge.classList.remove("pop");
    void badge.offsetWidth; // trigger reflow
    badge.classList.add("pop");
  }
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

// Update Item Quantity
function updateQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
  }
}

// Update Cart UI Components
function updateCartUI() {
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Update Badges
  const countBadge = document.getElementById("cartCountBadge");
  const headerCount = document.getElementById("cartHeaderCount");
  if (countBadge) countBadge.textContent = totalCount;
  if (headerCount) headerCount.textContent = `${totalCount} ${totalCount === 1 ? 'Item' : 'Items'}`;

  // Update Prices
  const subtotalEl = document.getElementById("cartSubtotal");
  const totalEl = document.getElementById("cartTotal");
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (totalEl) totalEl.textContent = `₹${subtotal}`;

  // Render Items List inside Drawer
  const container = document.getElementById("cartItemsList");
  const footer = document.getElementById("cartFooter");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-state">
        <div class="empty-cart-icon">🧺</div>
        <h4>Your Cart is Empty</h4>
        <p>Looks like you haven't added any traditional homemade savouries yet.</p>
        <button class="btn btn-primary btn-sm" onclick="closeCart(); document.getElementById('shop').scrollIntoView({behavior: 'smooth'});">
          Explore Products
        </button>
      </div>
    `;
    if (footer) footer.style.display = "none";
  } else {
    if (footer) footer.style.display = "block";
    container.innerHTML = cart.map(item => `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-kn">${item.kannada}</span>
          <span class="cart-item-weight">${item.weight}</span>
          <div class="cart-item-bottom">
            <span class="cart-item-price">₹${item.price * item.quantity}</span>
            <div class="cart-qty-selector">
              <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
              <span class="qty-display">${item.quantity}</span>
              <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove item">
              &times;
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }
}

// Open & Close Cart Drawer
function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

// Open & Close Checkout Modal
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Please add at least one item to proceed!");
    return;
  }

  closeCart();

  const modal = document.getElementById("checkoutModal");
  const modalItemCount = document.getElementById("modalItemCount");
  const modalItemsPreview = document.getElementById("modalItemsPreview");
  const modalTotalAmount = document.getElementById("modalTotalAmount");

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  modalItemCount.textContent = totalCount;
  modalTotalAmount.textContent = `₹${subtotal}`;

  modalItemsPreview.innerHTML = cart.map(item => `
    <div class="modal-item-line">
      <span>${item.name} (${item.weight}) × ${item.quantity}</span>
      <strong>₹${item.price * item.quantity}</strong>
    </div>
  `).join("");

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  document.getElementById("checkoutModal").classList.remove("open");
  document.body.style.overflow = "";
}

// Submit WhatsApp Order Form
function submitWhatsAppOrder(e) {
  e.preventDefault();

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const city = document.getElementById("custCity").value.trim();
  const state = document.getElementById("custState").value.trim();
  const pincode = document.getElementById("custPincode").value.trim();
  const notes = document.getElementById("custNotes").value.trim();

  if (!name || !phone || !address || !city || !pincode) {
    alert("Please fill in all required delivery fields.");
    return;
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Format Items List
  let itemsText = "";
  cart.forEach((item, index) => {
    itemsText += `${index + 1}. *${item.name}* (${item.kannada})\n   Weight: ${item.weight} | Qty: ${item.quantity} | Price: ₹${item.price * item.quantity}\n`;
  });

  // Construct Clean, Elegant WhatsApp Message
  const waMessage = `*Namaskara Thanvi Mane!* 🌿 (ಧನ್ಯ ಮನೆ)
I would like to place a homemade food order:

🛒 *ORDER ITEMS:*
${itemsText}
💰 *TOTAL AMOUNT:* ₹${subtotal}
🚚 *DELIVERY:* Pan India Safe Courier 🇮🇳

📍 *CUSTOMER DELIVERY DETAILS:*
- *Customer Name:* ${name}
- *Contact Number:* ${phone}
- *Door Address:* ${address}
- *City / Town:* ${city}
- *State:* ${state}
- *Pincode:* ${pincode}
${notes ? `- *Special Instructions:* ${notes}\n` : ''}
Please confirm my order and share the UPI / payment details. Thank you!`;

  const encodedUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  // Open WhatsApp in new tab
  window.open(encodedUrl, "_blank");

  // Reset form and close
  closeCheckoutModal();
  showToast("Opening WhatsApp with your pre-filled order!");
}

// Quick Contact Form Handler
function handleQuickContact(e) {
  e.preventDefault();
  const name = document.getElementById("contactName").value.trim();
  const phone = document.getElementById("contactPhone").value.trim();
  const city = document.getElementById("contactCity").value.trim();
  const msg = document.getElementById("contactMsg").value.trim();

  const waText = `*Namaskara Thanvi Mane!* 🌿
I have an inquiry regarding your traditional homemade foods:

- *Name:* ${name}
- *Phone:* ${phone}
- *Location:* ${city}
- *Inquiry / Requirement:* ${msg || 'Interested in ordering traditional homemade items.'}

Kindly assist me. Thank you!`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;
  window.open(url, "_blank");
}

// Notify Modal for Nati Koli Sambar
function openNotifyModal() {
  document.getElementById("notifyModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeNotifyModal() {
  document.getElementById("notifyModal").classList.remove("open");
  document.body.style.overflow = "";
}

// Category Filtering helper
function filterCategory(cat) {
  const pills = document.querySelectorAll(".filter-pill");
  pills.forEach(pill => {
    if (pill.dataset.filter === cat) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });
  renderProducts(cat);
  const shopEl = document.getElementById("shop");
  if (shopEl) {
    shopEl.scrollIntoView({ behavior: "smooth" });
  }
}

// Event Listeners Setup
function setupEventListeners() {
  // Open Cart
  const openCartBtn = document.getElementById("openCartBtn");
  if (openCartBtn) openCartBtn.addEventListener("click", openCart);

  // Close Cart
  const closeCartBtn = document.getElementById("closeCartBtn");
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);

  const cartOverlay = document.getElementById("cartOverlay");
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

  const continueShoppingBtn = document.getElementById("continueShoppingBtn");
  if (continueShoppingBtn) continueShoppingBtn.addEventListener("click", closeCart);

  // Checkout modal
  const proceedBtn = document.getElementById("proceedToOrderBtn");
  if (proceedBtn) proceedBtn.addEventListener("click", openCheckoutModal);

  const closeCheckoutBtn = document.getElementById("closeCheckoutModalBtn");
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener("click", closeCheckoutModal);

  const checkoutModal = document.getElementById("checkoutModal");
  if (checkoutModal) {
    checkoutModal.addEventListener("click", (e) => {
      if (e.target === checkoutModal) closeCheckoutModal();
    });
  }

  // Hero order now button
  const heroOrderNowBtn = document.getElementById("heroOrderNowBtn");
  if (heroOrderNowBtn) {
    heroOrderNowBtn.addEventListener("click", () => {
      const shopSection = document.getElementById("shop");
      if (shopSection) shopSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Nati Koli Sambar Notify Button
  const notifyBtn = document.getElementById("notifyNatiKoliBtn");
  if (notifyBtn) notifyBtn.addEventListener("click", openNotifyModal);

  const closeNotifyBtn = document.getElementById("closeNotifyModalBtn");
  if (closeNotifyBtn) closeNotifyBtn.addEventListener("click", closeNotifyModal);

  const notifyModal = document.getElementById("notifyModal");
  if (notifyModal) {
    notifyModal.addEventListener("click", (e) => {
      if (e.target === notifyModal) closeNotifyModal();
    });
  }

  // Filter Pills Click
  const filterPills = document.querySelectorAll(".filter-pill");
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const category = pill.dataset.filter;
      renderProducts(category);
    });
  });

  // Mobile Drawer Toggle
  const mobileToggle = document.getElementById("mobileMenuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const closeDrawerBtn = document.getElementById("closeDrawerBtn");

  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      mobileDrawer.classList.add("open");
      drawerOverlay.classList.add("active");
    });
  }

  const closeMobileNav = () => {
    mobileDrawer.classList.remove("open");
    drawerOverlay.classList.remove("active");
  };

  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeMobileNav);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeMobileNav);

  const mobileLinks = document.querySelectorAll(".mobile-link");
  mobileLinks.forEach(link => link.addEventListener("click", closeMobileNav));
}

// Setup FAQ Accordion
function setupFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach(other => {
        other.classList.remove("active");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      // Toggle current
      if (!isActive) {
        item.classList.add("active");
        questionBtn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// Sticky Navbar Scroll Effect
function setupNavbarScroll() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Toast Notification
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span>✨</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-20px)";
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}
