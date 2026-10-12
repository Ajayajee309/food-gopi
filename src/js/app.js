// Foodie Hub - Modern Fast Food Restaurant Application Logic
import {
  RESTAURANT_INFO,
  COIMBATORE_LOCALITIES,
  CATEGORIES,
  MENU_ITEMS,
  SPECIAL_OFFERS,
  COUPONS,
  REVIEWS,
  GALLERY_ITEMS,
  SERVICES
} from './data.js';

// ==========================================================================
// Application State
// ==========================================================================
const state = {
  cart: JSON.parse(localStorage.getItem('foodie_cart') || '[]'),
  appliedCoupon: JSON.parse(localStorage.getItem('foodie_coupon') || 'null'),
  activeCategory: 'all',
  isVegOnly: false,
  searchQuery: '',
  sortBy: 'recommended',
  galleryFilter: 'all',
  reviews: [...REVIEWS],
  selectedOrderType: 'delivery',
  selectedPayment: 'upi'
};

// ==========================================================================
// Toast Notification Helper
// ==========================================================================
export function showToast(message, type = 'info', icon = '') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = {
    success: '✅',
    error: '❌',
    info: '🍔',
    cart: '🛒'
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'error' ? 'toast-error' : ''}`;
  toast.innerHTML = `
    <span>${icon || icons[type] || '✨'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// Cart Operations & Persistence
// ==========================================================================
function saveCart() {
  localStorage.setItem('foodie_cart', JSON.stringify(state.cart));
  if (state.appliedCoupon) {
    localStorage.setItem('foodie_coupon', JSON.stringify(state.appliedCoupon));
  } else {
    localStorage.removeItem('foodie_coupon');
  }
  renderCartUI();
  renderMenuGrid(); // To refresh quantity buttons on menu cards
}

export function addToCart(item) {
  const existing = state.cart.find(i => i.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      isVeg: item.isVeg,
      qty: 1
    });
  }
  saveCart();
  showToast(`Added "${item.name}" to cart!`, 'cart');
}

export function updateCartQty(itemId, delta) {
  const itemIndex = state.cart.findIndex(i => i.id === itemId);
  if (itemIndex > -1) {
    state.cart[itemIndex].qty += delta;
    if (state.cart[itemIndex].qty <= 0) {
      const removedName = state.cart[itemIndex].name;
      state.cart.splice(itemIndex, 1);
      showToast(`Removed "${removedName}" from cart`, 'info', '🗑️');
    }
    saveCart();
  }
}

export function removeCartItem(itemId) {
  const itemIndex = state.cart.findIndex(i => i.id === itemId);
  if (itemIndex > -1) {
    const removedName = state.cart[itemIndex].name;
    state.cart.splice(itemIndex, 1);
    saveCart();
    showToast(`Removed "${removedName}" from cart`, 'info', '🗑️');
  }
}

export function calculateTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  let discount = 0;
  let deliveryFee = state.selectedOrderType === 'takeaway' ? 0 : RESTAURANT_INFO.deliveryFee;

  // Check free delivery threshold
  if (state.selectedOrderType === 'delivery' && subtotal >= RESTAURANT_INFO.freeDeliveryThreshold) {
    deliveryFee = 0;
  }

  if (state.appliedCoupon) {
    if (subtotal >= state.appliedCoupon.minOrder) {
      if (state.appliedCoupon.type === 'shipping') {
        deliveryFee = 0;
        discount = RESTAURANT_INFO.deliveryFee;
      } else {
        discount = state.appliedCoupon.discount;
      }
    } else {
      // Coupon minOrder not met
      state.appliedCoupon = null;
      localStorage.removeItem('foodie_coupon');
    }
  }

  // 5% GST on subtotal after discount
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * RESTAURANT_INFO.taxRate);
  const grandTotal = Math.max(0, taxableAmount + deliveryFee + tax);

  return { subtotal, discount, deliveryFee, tax, grandTotal };
}

function renderCartUI() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const cartBadge = document.getElementById('cartCountBadge');
  const fabBadge = document.getElementById('fabCountBadge');
  const fabBtn = document.getElementById('floatingCartFab');

  if (cartBadge) cartBadge.textContent = totalCount;
  if (fabBadge) fabBadge.textContent = totalCount;
  if (fabBtn) {
    fabBtn.style.display = totalCount > 0 ? 'flex' : 'none';
  }

  const itemsContainer = document.getElementById('cartItemsList');
  if (!itemsContainer) return;

  if (state.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-view">
        <div class="cart-empty-icon">🛒</div>
        <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 6px;">Your Cart is Hungry!</h4>
        <p style="font-size: 0.88rem; margin-bottom: 20px;">Explore our delicious Coimbatore menu and add your favorite dishes.</p>
        <a href="#menu" class="btn btn-primary" id="emptyCartExploreBtn">
          Browse Menu
        </a>
      </div>
    `;
    const exploreBtn = document.getElementById('emptyCartExploreBtn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => closeCartDrawer());
    }
  } else {
    itemsContainer.innerHTML = state.cart.map(item => `
      <div class="cart-item-row" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" onerror="this.src='/images/hero-burger.jpg'">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price-unit">₹${item.price} each</div>
          <div class="cart-item-qty-actions">
            <button class="cart-qty-btn btn-cart-dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
            <span style="font-weight: 800; font-size: 0.9rem; min-width: 20px; text-align: center;">${item.qty}</span>
            <button class="cart-qty-btn btn-cart-inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
            <button class="cart-item-del-btn btn-cart-del" data-id="${item.id}">Remove</button>
          </div>
        </div>
        <div class="cart-item-total">₹${item.price * item.qty}</div>
      </div>
    `).join('');

    // Attach row events
    itemsContainer.querySelectorAll('.btn-cart-inc').forEach(btn => {
      btn.addEventListener('click', () => updateCartQty(btn.dataset.id, 1));
    });
    itemsContainer.querySelectorAll('.btn-cart-dec').forEach(btn => {
      btn.addEventListener('click', () => updateCartQty(btn.dataset.id, -1));
    });
    itemsContainer.querySelectorAll('.btn-cart-del').forEach(btn => {
      btn.addEventListener('click', () => removeCartItem(btn.dataset.id));
    });
  }

  // Update Bill Breakdown
  const { subtotal, discount, deliveryFee, tax, grandTotal } = calculateTotals();
  
  const subtotalEl = document.getElementById('billSubtotal');
  const discountRowEl = document.getElementById('billDiscountRow');
  const discountEl = document.getElementById('billDiscount');
  const deliveryEl = document.getElementById('billDelivery');
  const taxEl = document.getElementById('billTax');
  const totalEl = document.getElementById('billGrandTotal');
  const payBtnAmountEl = document.getElementById('btnPayAmount');
  const modalPayAmountEl = document.getElementById('modalPayAmount');

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (discountRowEl) {
    if (discount > 0) {
      discountRowEl.style.display = 'flex';
      discountEl.textContent = `-₹${discount}`;
    } else {
      discountRowEl.style.display = 'none';
    }
  }
  if (deliveryEl) {
    deliveryEl.textContent = deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`;
  }
  if (taxEl) taxEl.textContent = `₹${tax}`;
  if (totalEl) totalEl.textContent = `₹${grandTotal}`;
  if (payBtnAmountEl) payBtnAmountEl.textContent = grandTotal;
  if (modalPayAmountEl) modalPayAmountEl.textContent = grandTotal;

  // Coupon Status Message
  const couponStatus = document.getElementById('couponStatusMessage');
  if (couponStatus) {
    if (state.appliedCoupon) {
      couponStatus.style.display = 'block';
      couponStatus.style.color = '#059669';
      couponStatus.textContent = `✓ Coupon "${state.appliedCoupon.code}" applied! (${state.appliedCoupon.description})`;
    } else {
      couponStatus.style.display = 'none';
    }
  }
}

// Drawer Controls
function openCartDrawer() {
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (backdrop) backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================================================
// Category Tabs & Menu Filtering
// ==========================================================================
function renderCategoryTabs() {
  const container = document.getElementById('categoryTabs');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button class="category-tab-btn ${cat.id === state.activeCategory ? 'active' : ''}" data-cat="${cat.id}">
      <span>${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join('');

  container.querySelectorAll('.category-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeCategory = btn.dataset.cat;
      renderCategoryTabs();
      renderMenuGrid();
    });
  });
}

function getFilteredMenuItems() {
  return MENU_ITEMS.filter(item => {
    // Category match
    const matchCat = state.activeCategory === 'all' || item.category === state.activeCategory;
    // Veg match
    const matchVeg = !state.isVegOnly || item.isVeg === true;
    // Search match
    const q = state.searchQuery.toLowerCase().trim();
    const matchSearch = !q ||
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);

    return matchCat && matchVeg && matchSearch;
  }).sort((a, b) => {
    if (state.sortBy === 'price-asc') return a.price - b.price;
    if (state.sortBy === 'price-desc') return b.price - a.price;
    if (state.sortBy === 'rating-desc') return b.rating - a.rating;
    // Default recommended: bestsellers first then high rating
    if (a.isBestseller && !b.isBestseller) return -1;
    if (!a.isBestseller && b.isBestseller) return 1;
    return b.rating - a.rating;
  });
}

function renderMenuGrid() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;

  const items = getFilteredMenuItems();

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-menu-state">
        <div class="empty-state-icon">🔍</div>
        <h3 style="font-size: 1.3rem; margin-bottom: 8px;">No Food Items Found</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px;">
          Try searching for another dish or reset your vegetarian and category filters.
        </p>
        <button class="btn btn-primary" id="resetMenuFilterBtn">Reset Filters</button>
      </div>
    `;

    const resetBtn = document.getElementById('resetMenuFilterBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.activeCategory = 'all';
        state.isVegOnly = false;
        state.searchQuery = '';
        state.sortBy = 'recommended';
        const searchInput = document.getElementById('menuSearchInput');
        if (searchInput) searchInput.value = '';
        const vegToggle = document.getElementById('vegOnlyToggleBtn');
        if (vegToggle) vegToggle.classList.remove('active-veg');
        renderCategoryTabs();
        renderMenuGrid();
      });
    }
    return;
  }

  grid.innerHTML = items.map(item => {
    const cartItem = state.cart.find(i => i.id === item.id);
    const cartQty = cartItem ? cartItem.qty : 0;

    return `
      <article class="menu-card" data-id="${item.id}">
        <div class="menu-card-img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='/images/hero-burger.jpg'">
          ${item.isBestseller ? '<span class="menu-card-ribbon">⭐ Bestseller</span>' : ''}
          <div class="menu-card-rating">
            <span class="star">★</span>
            <span>${item.rating}</span>
            <span style="color: #9CA3AF; font-size: 0.68rem;">(${item.reviewsCount})</span>
          </div>
        </div>

        <div class="menu-card-content">
          <div class="menu-card-header">
            <h3 class="menu-card-title">${item.name}</h3>
            <span class="diet-indicator ${item.isVeg ? 'veg' : 'non-veg'}" title="${item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
          </div>

          <p class="menu-card-desc">${item.description}</p>

          <div class="menu-card-meta">
            <span>🔥 ${item.calories}</span>
            <span>⏱️ ${item.prepTime}</span>
            ${item.spiceLevel !== 'None' ? `<span>🌶️ ${item.spiceLevel}</span>` : ''}
          </div>

          <div class="menu-card-footer">
            <div class="menu-card-price">
              <span>₹</span>${item.price}
            </div>

            ${cartQty > 0 ? `
              <div class="card-qty-control">
                <button class="qty-btn-card btn-item-dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                <span class="qty-num-card">${cartQty}</span>
                <button class="qty-btn-card btn-item-inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
              </div>
            ` : `
              <button class="add-to-cart-btn btn-add-item" data-id="${item.id}">
                <span>+</span> Add
              </button>
            `}
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach card events
  grid.querySelectorAll('.btn-add-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = MENU_ITEMS.find(i => i.id === btn.dataset.id);
      if (item) addToCart(item);
    });
  });

  grid.querySelectorAll('.btn-item-inc').forEach(btn => {
    btn.addEventListener('click', () => updateCartQty(btn.dataset.id, 1));
  });

  grid.querySelectorAll('.btn-item-dec').forEach(btn => {
    btn.addEventListener('click', () => updateCartQty(btn.dataset.id, -1));
  });
}

// ==========================================================================
// Services Section
// ==========================================================================
function renderServices() {
  const container = document.getElementById('servicesGrid');
  if (!container) return;

  container.innerHTML = SERVICES.map(srv => `
    <div class="service-card">
      <div class="service-icon-wrap">${srv.icon}</div>
      <h3 class="service-title">${srv.title}</h3>
      <div class="service-badge">${srv.badge}</div>
      <p class="service-desc">${srv.description}</p>
      <ul class="service-features-list">
        ${srv.features.map(f => `<li class="service-feature-item">${f}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// ==========================================================================
// Special Offers, Combos & Coupons
// ==========================================================================
function renderSpecialOffers() {
  const combosContainer = document.getElementById('combosGrid');
  if (combosContainer) {
    combosContainer.innerHTML = SPECIAL_OFFERS.map(combo => `
      <div class="combo-card">
        <div class="combo-img-wrap">
          <img src="${combo.image}" alt="${combo.title}" loading="lazy" onerror="this.src='/images/hero-burger.jpg'">
          <span class="combo-badge">${combo.badge}</span>
          <span class="combo-highlight">${combo.highlight}</span>
        </div>
        <div class="combo-content">
          <h3 class="combo-title">${combo.title}</h3>
          <div class="combo-subtitle">${combo.subtitle}</div>
          <ul class="combo-items-list">
            ${combo.items.map(it => `<li class="combo-item">${it}</li>`).join('')}
          </ul>
          <div class="combo-footer">
            <div class="combo-price-wrap">
              <span class="combo-orig-price">₹${combo.originalPrice}</span>
              <span class="combo-offer-price"><span>₹</span>${combo.offerPrice}</span>
            </div>
            <button class="btn btn-primary btn-claim-combo" data-combo-id="${combo.id}">
              <span>⚡</span> Claim Combo
            </button>
          </div>
        </div>
      </div>
    `).join('');

    combosContainer.querySelectorAll('.btn-claim-combo').forEach(btn => {
      btn.addEventListener('click', () => {
        const combo = SPECIAL_OFFERS.find(c => c.id === btn.dataset.comboId);
        if (combo) {
          addToCart({
            id: combo.id,
            name: combo.title,
            price: combo.offerPrice,
            image: combo.image,
            isVeg: false
          });
          openCartDrawer();
        }
      });
    });
  }

  // Render Coupons
  const couponsContainer = document.getElementById('couponsGrid');
  if (couponsContainer) {
    couponsContainer.innerHTML = COUPONS.map(coupon => `
      <div class="coupon-card">
        <div>
          <div class="coupon-code">🎟️ ${coupon.code}</div>
          <div class="coupon-desc">${coupon.description}</div>
        </div>
        <button class="coupon-copy-btn" data-code="${coupon.code}">
          Apply Code
        </button>
      </div>
    `).join('');

    couponsContainer.querySelectorAll('.coupon-copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.dataset.code;
        applyCouponCode(code);
      });
    });
  }
}

function applyCouponCode(code) {
  const coupon = COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase().trim());
  const totals = calculateTotals();

  if (!coupon) {
    showToast(`Invalid coupon code "${code}"`, 'error');
    return false;
  }

  if (totals.subtotal < coupon.minOrder) {
    showToast(`Coupon "${coupon.code}" requires minimum order of ₹${coupon.minOrder}. Add more dishes!`, 'error');
    return false;
  }

  state.appliedCoupon = coupon;
  saveCart();
  showToast(`Coupon "${coupon.code}" applied successfully! Saved ₹${coupon.discount}`, 'success');
  openCartDrawer();
  return true;
}

// Flash Deal Countdown Timer (Mock live timer)
function initCountdownTimer() {
  let totalSeconds = 6 * 3600 + 42 * 60 + 19; // 6h 42m 19s

  const hEl = document.getElementById('hoursNum');
  const mEl = document.getElementById('minsNum');
  const sEl = document.getElementById('secsNum');

  setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds -= 1;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
      if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
    }
  }, 1000);
}

// ==========================================================================
// Customer Reviews
// ==========================================================================
function renderReviews() {
  const container = document.getElementById('reviewsGrid');
  if (!container) return;

  container.innerHTML = state.reviews.map(rev => `
    <article class="review-card">
      <div class="review-card-header">
        <img src="${rev.avatar}" alt="${rev.name}" class="reviewer-avatar" onerror="this.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'">
        <div class="reviewer-info">
          <div class="reviewer-name">${rev.name}</div>
          <div class="reviewer-loc">📍 ${rev.location}</div>
        </div>
      </div>
      <div class="review-stars">
        ${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}
      </div>
      <p class="review-text">"${rev.text}"</p>
      <div class="review-footer">
        <span class="verified-badge">✓ ${rev.tag}</span>
        <span>${rev.date}</span>
      </div>
    </article>
  `).join('');
}

// ==========================================================================
// Food Gallery & Lightbox
// ==========================================================================
function renderGallery() {
  const container = document.getElementById('galleryGrid');
  if (!container) return;

  const items = GALLERY_ITEMS.filter(item => {
    return state.galleryFilter === 'all' || item.category === state.galleryFilter;
  });

  container.innerHTML = items.map(item => `
    <div class="gallery-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='/images/hero-burger.jpg'">
      <div class="gallery-overlay">
        <h4 class="gallery-item-title">${item.title}</h4>
        <p class="gallery-item-desc">${item.description}</p>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.gallery-item').forEach(itemEl => {
    itemEl.addEventListener('click', () => {
      const item = GALLERY_ITEMS.find(g => g.id === itemEl.dataset.id);
      if (item) openLightbox(item);
    });
  });
}

function openLightbox(item) {
  const lightbox = document.getElementById('galleryLightbox');
  const img = document.getElementById('lightboxImg');
  const title = document.getElementById('lightboxTitle');
  const desc = document.getElementById('lightboxDesc');

  if (lightbox && img && title && desc) {
    img.src = item.image;
    img.alt = item.title;
    title.textContent = item.title;
    desc.textContent = item.description;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ==========================================================================
// Coimbatore Localities Dropdown Population
// ==========================================================================
function populateLocalities() {
  const orderLocality = document.getElementById('orderLocality');
  const revLoc = document.getElementById('revLoc');

  const optionsHtml = COIMBATORE_LOCALITIES.map(loc => `
    <option value="${loc}">${loc}</option>
  `).join('');

  if (orderLocality) {
    orderLocality.innerHTML = '<option value="">Select your Coimbatore area...</option>' + optionsHtml;
  }
  if (revLoc) {
    revLoc.innerHTML = '<option value="">Select your Coimbatore area...</option>' + optionsHtml;
  }
}

// ==========================================================================
// Live Order Tracking Simulation
// ==========================================================================
function simulateLiveOrderTracking(orderDetails) {
  const trackingModal = document.getElementById('trackingModal');
  const codeBadge = document.getElementById('trackingOrderCode');
  const addrEl = document.getElementById('trackCustomerAddress');
  const itemsEl = document.getElementById('trackCustomerItems');
  const totalEl = document.getElementById('trackCustomerTotal');

  const orderNum = Math.floor(1000 + Math.random() * 9000);
  const orderCode = `#FH-CBE-${orderNum}`;

  if (codeBadge) codeBadge.textContent = orderCode;
  if (addrEl) addrEl.textContent = `${orderDetails.address}, ${orderDetails.locality}`;
  if (itemsEl) {
    itemsEl.textContent = orderDetails.items.map(i => `${i.name} (x${i.qty})`).join(', ');
  }
  if (totalEl) totalEl.textContent = `₹${orderDetails.total} (${orderDetails.paymentMethod.toUpperCase()})`;

  // Reset steps
  const steps = [
    document.getElementById('step1'),
    document.getElementById('step2'),
    document.getElementById('step3'),
    document.getElementById('step4')
  ];

  steps.forEach(s => {
    if (s) {
      s.classList.remove('active', 'done');
    }
  });

  if (steps[0]) steps[0].classList.add('done');
  if (steps[1]) steps[1].classList.add('active');

  if (trackingModal) {
    trackingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Progress simulation
  setTimeout(() => {
    if (steps[1]) {
      steps[1].classList.remove('active');
      steps[1].classList.add('done');
    }
    if (steps[2]) steps[2].classList.add('active');
    showToast('Your order is picked up by delivery rider!', 'info', '🛵');
  }, 4000);

  setTimeout(() => {
    if (steps[2]) {
      steps[2].classList.remove('active');
      steps[2].classList.add('done');
    }
    if (steps[3]) steps[3].classList.add('done');
    showToast('Order arrived! Enjoy your hot meal from Foodie Hub!', 'success', '🎉');
  }, 9000);
}

// ==========================================================================
// Setup Event Listeners
// ==========================================================================
function setupEventListeners() {
  // Mobile Navigation Hamburger
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Sticky Header Scroll Effect & Active Link Highlight
  window.addEventListener('scroll', () => {
    const header = document.getElementById('mainHeader');
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // Cart Drawer open/close
  const openCartBtn = document.getElementById('openCartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartDrawerBackdrop = document.getElementById('cartDrawerBackdrop');
  const fabBtn = document.getElementById('floatingCartFab');

  if (openCartBtn) openCartBtn.addEventListener('click', openCartDrawer);
  if (fabBtn) fabBtn.addEventListener('click', openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);

  if (cartDrawerBackdrop) {
    cartDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === cartDrawerBackdrop) closeCartDrawer();
    });
  }

  // Hero "Order Now" button
  const heroOrderBtn = document.getElementById('heroOrderNowBtn');
  if (heroOrderBtn) {
    heroOrderBtn.addEventListener('click', () => {
      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Search Input in Menu
  const searchInput = document.getElementById('menuSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderMenuGrid();
    });
  }

  // Pure Veg Toggle
  const vegToggle = document.getElementById('vegOnlyToggleBtn');
  if (vegToggle) {
    vegToggle.addEventListener('click', () => {
      state.isVegOnly = !state.isVegOnly;
      vegToggle.classList.toggle('active-veg', state.isVegOnly);
      vegToggle.setAttribute('aria-pressed', state.isVegOnly ? 'true' : 'false');
      renderMenuGrid();
    });
  }

  // Sort Select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderMenuGrid();
    });
  }

  // Apply Coupon Button in Cart
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  const couponInput = document.getElementById('couponInput');
  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener('click', () => {
      const val = couponInput.value.trim();
      if (!val) {
        showToast('Please type a coupon code', 'error');
        return;
      }
      applyCouponCode(val);
    });
  }

  // Proceed to Checkout Button
  const proceedBtn = document.getElementById('proceedCheckoutBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');

  if (proceedBtn && checkoutModal) {
    proceedBtn.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast('Your cart is empty! Add food items first.', 'error');
        return;
      }
      closeCartDrawer();
      checkoutModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeCheckoutBtn && checkoutModal) {
    closeCheckoutBtn.addEventListener('click', () => {
      checkoutModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Order Type Switch in Checkout
  const typeDelivery = document.getElementById('typeDelivery');
  const typeTakeaway = document.getElementById('typeTakeaway');
  if (typeDelivery && typeTakeaway) {
    typeDelivery.addEventListener('click', () => {
      typeDelivery.classList.add('selected');
      typeTakeaway.classList.remove('selected');
      state.selectedOrderType = 'delivery';
      renderCartUI();
    });
    typeTakeaway.addEventListener('click', () => {
      typeTakeaway.classList.add('selected');
      typeDelivery.classList.remove('selected');
      state.selectedOrderType = 'takeaway';
      renderCartUI();
    });
  }

  // Payment Method Selection
  document.querySelectorAll('.pay-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.pay-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.selectedPayment = card.dataset.pay;
    });
  });

  // Checkout Form Submission
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('orderName');
      const phoneInput = document.getElementById('orderPhone');
      const localityInput = document.getElementById('orderLocality');
      const addressInput = document.getElementById('orderAddress');

      let isValid = true;

      // Validate name
      if (!nameInput.value.trim()) {
        document.getElementById('groupOrderName').classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('groupOrderName').classList.remove('has-error');
      }

      // Validate Indian 10-digit phone
      const phoneRegex = /^[6-9]\d{9}$/;
      const cleanedPhone = phoneInput.value.replace(/\D/g, '');
      if (!phoneRegex.test(cleanedPhone)) {
        document.getElementById('groupOrderPhone').classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('groupOrderPhone').classList.remove('has-error');
      }

      // Validate Locality
      if (!localityInput.value) {
        document.getElementById('groupOrderLocality').classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('groupOrderLocality').classList.remove('has-error');
      }

      // Validate Address
      if (!addressInput.value.trim()) {
        document.getElementById('groupOrderAddress').classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('groupOrderAddress').classList.remove('has-error');
      }

      if (!isValid) return;

      const totals = calculateTotals();
      const orderDetails = {
        name: nameInput.value.trim(),
        phone: cleanedPhone,
        locality: localityInput.value,
        address: addressInput.value.trim(),
        items: [...state.cart],
        total: totals.grandTotal,
        paymentMethod: state.selectedPayment,
        orderType: state.selectedOrderType
      };

      // Close checkout modal
      if (checkoutModal) checkoutModal.classList.remove('active');

      // Clear Cart
      state.cart = [];
      state.appliedCoupon = null;
      saveCart();

      // Launch simulated live order tracking
      simulateLiveOrderTracking(orderDetails);
    });
  }

  // Close Tracking Modal
  const closeTrackingBtn = document.getElementById('closeTrackingBtn');
  const trackingModal = document.getElementById('trackingModal');
  if (closeTrackingBtn && trackingModal) {
    closeTrackingBtn.addEventListener('click', () => {
      trackingModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Gallery Filter Tabs
  document.querySelectorAll('.gallery-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gallery-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.galleryFilter = btn.dataset.galleryCat;
      renderGallery();
    });
  });

  // Lightbox Close
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const galleryLightbox = document.getElementById('galleryLightbox');
  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
  if (galleryLightbox) {
    galleryLightbox.addEventListener('click', (e) => {
      if (e.target === galleryLightbox) closeLightbox();
    });
  }

  // Write Demo Review Modal
  const openReviewModalBtn = document.getElementById('openReviewModalBtn');
  const reviewModal = document.getElementById('reviewModal');
  const closeReviewBtn = document.getElementById('closeReviewBtn');
  const reviewForm = document.getElementById('reviewForm');

  if (openReviewModalBtn && reviewModal) {
    openReviewModalBtn.addEventListener('click', () => {
      reviewModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeReviewBtn && reviewModal) {
    closeReviewBtn.addEventListener('click', () => {
      reviewModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Star selector in review modal
  let selectedStars = 5;
  document.querySelectorAll('.star-rating-select-item').forEach(star => {
    star.addEventListener('click', () => {
      selectedStars = parseInt(star.dataset.value);
      document.getElementById('revStars').value = selectedStars;
      document.querySelectorAll('.star-rating-select-item').forEach(s => {
        const val = parseInt(s.dataset.value);
        s.style.color = val <= selectedStars ? 'var(--gold)' : '#D1D5DB';
      });
    });
  });

  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const revName = document.getElementById('revName').value.trim();
      const revLoc = document.getElementById('revLoc').value;
      const revText = document.getElementById('revText').value.trim();

      let isValid = true;
      if (!revName) {
        document.getElementById('groupRevName').classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('groupRevName').classList.remove('has-error');
      }

      if (!revLoc) {
        document.getElementById('groupRevLoc').classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('groupRevLoc').classList.remove('has-error');
      }

      if (revText.length < 10) {
        document.getElementById('groupRevText').classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('groupRevText').classList.remove('has-error');
      }

      if (!isValid) return;

      const newReview = {
        id: `rev-${Date.now()}`,
        name: revName,
        location: `${revLoc}, Coimbatore`,
        rating: selectedStars,
        date: 'Just now',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        text: revText,
        tag: 'Verified Demo Customer'
      };

      state.reviews.unshift(newReview);
      renderReviews();

      reviewModal.classList.remove('active');
      document.body.style.overflow = '';
      reviewForm.reset();
      showToast('Thank you! Your demo review has been posted.', 'success', '⭐');
    });
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      let isValid = true;

      if (!name) {
        document.getElementById('groupName').classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('groupName').classList.remove('has-error');
      }

      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        document.getElementById('groupPhone').classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('groupPhone').classList.remove('has-error');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        document.getElementById('groupEmail').classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('groupEmail').classList.remove('has-error');
      }

      if (message.length < 10) {
        document.getElementById('groupMessage').classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('groupMessage').classList.remove('has-error');
      }

      if (isValid) {
        contactForm.reset();
        showToast('Message sent! Our Coimbatore team will contact you shortly.', 'success', '📨');
      }
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value.trim();
      if (email) {
        newsletterForm.reset();
        showToast('Subscribed! Check your inbox for Foodie Hub offers.', 'success', '🎉');
      }
    });
  }
}

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  populateLocalities();
  renderCategoryTabs();
  renderMenuGrid();
  renderServices();
  renderSpecialOffers();
  renderReviews();
  renderGallery();
  renderCartUI();
  initCountdownTimer();
  setupEventListeners();
});
