import { getCart, getCartCount, getCartItems, addToCart, updateCartQuantity, removeFromCart, getSubtotal, getShippingFee, getTotal, getProductById, clearCart } from './cart.js';
import { products } from './products.js';

const currencyFormatter = new Intl.NumberFormat('zh-TW', {
  style: 'currency',
  currency: 'TWD',
  maximumFractionDigits: 0,
});

const updateCartBadges = () => {
  const count = getCartCount();
  document.querySelectorAll('[data-cart-count]').forEach((badge) => {
    badge.textContent = String(count);
    badge.hidden = count === 0;
  });
};

const showToast = (message) => {
  const toast = document.querySelector('[data-toast]');
  if (!toast) return;

  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.hidden = true;
  }, 1800);
};

const renderProductGrid = (selectedCategory = '全部') => {
  const grid = document.querySelector('[data-product-grid]');
  if (!grid) return;

  const filteredProducts = selectedCategory === '全部'
    ? products
    : products.filter((product) => product.category === selectedCategory);

  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" role="status">
        <h3>目前沒有這個分類的商品</h3>
        <p>換個類別看看，或回到全部商品瀏覽。</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card">
          <a href="product.html?id=${product.id}" class="product-card__media" aria-label="查看 ${product.name}">
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80';" />
          </a>
          <div class="product-card__content">
            <p class="product-card__category">${product.category}</p>
            <h3>${product.name}</h3>
            <p class="product-card__price">${currencyFormatter.format(product.price)}</p>
            <a href="product.html?id=${product.id}" class="button button--secondary">查看商品</a>
          </div>
        </article>
      `,
    )
    .join('');
};

const setupFilterButtons = () => {
  const buttons = document.querySelectorAll('[data-filter]');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedCategory = button.dataset.filter;
      buttons.forEach((item) => {
        item.classList.toggle('is-active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      renderProductGrid(selectedCategory);
    });
  });
};

const initHomePage = () => {
  setupFilterButtons();
  renderProductGrid('全部');
};

const initProductPage = () => {
  const detailContainer = document.querySelector('[data-product-detail]');
  if (!detailContainer) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const product = getProductById(productId);

  if (!productId || !product) {
    detailContainer.innerHTML = `
      <div class="error-state">
        <h1>找不到這個商品</h1>
        <p>商品資訊可能已移除，或連結參數有誤。</p>
        <a class="button" href="index.html">回到商品列表</a>
      </div>
    `;
    return;
  }

  detailContainer.innerHTML = `
    <div class="product-detail__media">
      <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80';" />
    </div>
    <div class="product-detail__info">
      <p class="eyebrow">${product.category}</p>
      <h1>${product.name}</h1>
      <p class="product-detail__price">${currencyFormatter.format(product.price)}</p>
      <p class="product-detail__description">${product.description}</p>
      <div class="product-detail__purchase">
        <label class="quantity-control" for="quantity">
          <span>數量</span>
          <input id="quantity" type="number" min="1" value="1" />
        </label>
        <button class="button" id="add-to-cart-button" type="button">加入購物車</button>
      </div>
      <p class="form-message" data-toast hidden aria-live="polite"></p>
    </div>
  `;

  const quantityInput = document.querySelector('#quantity');
  const addButton = document.querySelector('#add-to-cart-button');

  addButton.addEventListener('click', () => {
    const quantity = Math.max(1, Number(quantityInput.value) || 1);
    addToCart(product.id, quantity);
    updateCartBadges();
    showToast(`${product.name} 已加入購物車`);
  });
};

const renderCartPage = () => {
  const cartItems = getCartItems();
  const cartList = document.querySelector('[data-cart-items]');
  const summary = document.querySelector('[data-cart-summary]');
  if (!cartList || !summary) return;

  if (cartItems.length === 0) {
    cartList.innerHTML = `
      <div class="empty-state empty-state--card" role="status">
        <h2>購物車是空的</h2>
        <p>挑選喜歡的居家與日常好物，加入購物車後再來結帳。</p>
        <a class="button" href="index.html">繼續購物</a>
      </div>
    `;
    summary.innerHTML = `
      <div class="summary-card summary-card--empty">
        <div class="summary-row"><span>商品小計</span><strong>${currencyFormatter.format(0)}</strong></div>
        <div class="summary-row"><span>運費</span><strong>${currencyFormatter.format(0)}</strong></div>
        <div class="summary-row summary-row--total"><span>總計</span><strong>${currencyFormatter.format(0)}</strong></div>
      </div>
    `;
    return;
  }

  const subtotal = getSubtotal();
  const shipping = getShippingFee();
  const total = getTotal();

  cartList.innerHTML = cartItems
    .map(
      (item) => `
        <article class="cart-item" data-product-id="${item.productId}">
          <div class="cart-item__media">
            <img src="${item.product.image}" alt="${item.product.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80';" />
          </div>
          <div class="cart-item__details">
            <div class="cart-item__header">
              <h3>${item.product.name}</h3>
              <button class="text-button" type="button" data-remove-item="${item.productId}">移除</button>
            </div>
            <p class="cart-item__price">${currencyFormatter.format(item.product.price)} / 件</p>
            <div class="cart-item__actions">
              <label class="quantity-control quantity-control--small" for="qty-${item.productId}">
                <span>數量</span>
                <input id="qty-${item.productId}" type="number" min="1" value="${item.quantity}" data-quantity-input="${item.productId}" />
              </label>
              <p class="cart-item__subtotal">小計 ${currencyFormatter.format(item.product.price * item.quantity)}</p>
            </div>
          </div>
        </article>
      `,
    )
    .join('');

  summary.innerHTML = `
    <div class="summary-card">
      <div class="summary-row"><span>商品小計</span><strong>${currencyFormatter.format(subtotal)}</strong></div>
      <div class="summary-row"><span>運費</span><strong>${currencyFormatter.format(shipping)}</strong></div>
      <div class="summary-row summary-row--total"><span>總計</span><strong>${currencyFormatter.format(total)}</strong></div>
      <a class="button" href="checkout.html">前往結帳</a>
    </div>
  `;

  document.querySelectorAll('[data-quantity-input]').forEach((input) => {
    input.addEventListener('change', (event) => {
      const productId = event.target.dataset.quantityInput;
      const nextQuantity = Math.max(1, Number(event.target.value) || 1);
      updateCartQuantity(productId, nextQuantity);
      renderCartPage();
      updateCartBadges();
    });
  });

  document.querySelectorAll('[data-remove-item]').forEach((button) => {
    button.addEventListener('click', () => {
      removeFromCart(button.dataset.removeItem);
      renderCartPage();
      updateCartBadges();
    });
  });
};

const initCartPage = () => {
  renderCartPage();
};

const renderCheckoutSummary = () => {
  const cartItems = getCartItems();
  const summaryList = document.querySelector('[data-order-summary]');
  const summaryAmount = document.querySelector('[data-checkout-amounts]');
  if (!summaryList || !summaryAmount) return;

  if (cartItems.length === 0) {
    summaryList.innerHTML = '<li>購物車目前沒有商品。</li>';
    summaryAmount.innerHTML = `
      <div class="summary-row"><span>商品小計</span><strong>${currencyFormatter.format(0)}</strong></div>
      <div class="summary-row"><span>運費</span><strong>${currencyFormatter.format(0)}</strong></div>
      <div class="summary-row summary-row--total"><span>總計</span><strong>${currencyFormatter.format(0)}</strong></div>
    `;
    return;
  }

  const subtotal = getSubtotal();
  const shipping = getShippingFee();
  const total = getTotal();

  summaryList.innerHTML = cartItems
    .map(
      (item) => `
        <li>
          <span>${item.product.name} × ${item.quantity}</span>
          <strong>${currencyFormatter.format(item.product.price * item.quantity)}</strong>
        </li>
      `,
    )
    .join('');

  summaryAmount.innerHTML = `
    <div class="summary-row"><span>商品小計</span><strong>${currencyFormatter.format(subtotal)}</strong></div>
    <div class="summary-row"><span>運費</span><strong>${currencyFormatter.format(shipping)}</strong></div>
    <div class="summary-row summary-row--total"><span>總計</span><strong>${currencyFormatter.format(total)}</strong></div>
  `;
};

const initCheckoutPage = () => {
  const cartItems = getCartItems();
  const checkoutForm = document.querySelector('[data-checkout-form]');
  const cartEmpty = document.querySelector('[data-cart-empty]');
  const orderSuccess = document.querySelector('[data-order-success]');
  const orderNumber = document.querySelector('[data-order-number]');

  renderCheckoutSummary();

  if (cartItems.length === 0) {
    if (checkoutForm) checkoutForm.hidden = true;
    if (cartEmpty) cartEmpty.hidden = false;
    return;
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const form = event.currentTarget;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const orderCode = `MM-${String(Date.now()).slice(-6)}`;
      clearCart();
      updateCartBadges();
      if (orderSuccess) orderSuccess.hidden = false;
      if (orderNumber) orderNumber.textContent = orderCode;
      if (checkoutForm) checkoutForm.hidden = true;
      if (cartEmpty) cartEmpty.hidden = true;
      renderCheckoutSummary();
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadges();

  const page = document.body.dataset.page;
  if (page === 'home') {
    initHomePage();
  }

  if (page === 'product') {
    initProductPage();
  }

  if (page === 'cart') {
    initCartPage();
  }

  if (page === 'checkout') {
    initCheckoutPage();
  }
});
