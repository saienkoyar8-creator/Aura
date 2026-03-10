// Global State
let currentLang = localStorage.getItem('aura_lang') || 'ru';
let translations = {};
let products = [];
let cart = JSON.parse(localStorage.getItem('aura_cart')) || [];

// DOM Elements
const cartTrigger = document.getElementById('cart-trigger');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const notificationArea = document.getElementById('notification-area');
const orderModal = document.getElementById('order-modal');
const closeModalBtn = document.getElementById('close-modal');

// Language Switcher Events
document.querySelectorAll('.lang-btn').forEach(btn => {
    if(btn.dataset.lang === currentLang) btn.classList.add('active');
    else btn.classList.remove('active');

    btn.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        if(lang !== currentLang) {
            currentLang = lang;
            localStorage.setItem('aura_lang', currentLang);
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            document.documentElement.lang = currentLang;
            loadTranslations(currentLang);
        }
    });
});

const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";

function resolvePath(path, obj) {
    if (!path || !obj) return null;
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null;
    }, obj);
}

function applyTranslations() {
    // Apply static texts
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translatedText = resolvePath(key, translations);
        if(translatedText) {
            const attr = el.getAttribute('data-i18n-attr');
            if(attr) {
                el.setAttribute(attr, translatedText);
            } else {
                el.innerHTML = translatedText;
            }
        }
    });
}

function renderPageContent() {
    const page = document.body.getAttribute('data-page');

    const createProductCard = (product) => `
        <a href="product.html?id=${product.id}" class="product-card">
            <img src="${product.img}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info-box">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <p class="product-desc">${product.desc}</p>
                <button class="add-to-cart" data-id="${product.id}" onclick="event.preventDefault(); addToCart(${product.id});">${translations.product ? translations.product.add_to_cart : 'В корзину'}</button>
            </div>
        </a>
    `;

    if (page === 'home') {
        const featuredGrid = document.getElementById('featured-grid');
        if (featuredGrid) {
            featuredGrid.innerHTML = products.slice(0, 3).map(createProductCard).join('');
        }
    } else if (page === 'catalog') {
        const catalogGrid = document.getElementById('catalog-grid');
        if (catalogGrid) {
            catalogGrid.innerHTML = products.map(createProductCard).join('');
        }
    } else if (page === 'product') {
        const container = document.getElementById('single-product-container');
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id')) || 1;
        const product = products.find(p => p.id === productId) || products[0];

        if (container && product) {
            document.title = `${product.name} | AURA`;
            
            let featuresHtml = product.features.map(f => `<li>${f}</li>`).join('');
            
            container.innerHTML = `
                <div class="detail-image-wrapper">
                    <img src="${product.img}" alt="${product.name}" class="detail-image">
                </div>
                <div class="detail-info">
                    <h1 class="detail-title">${product.name}</h1>
                    <div class="detail-price">${formatPrice(product.price)}</div>
                    <p class="detail-desc">${product.fullDesc}</p>
                    <ul class="detail-features">
                        ${featuresHtml}
                    </ul>
                    <button class="btn-primary btn-detail-add" onclick="addToCart(${product.id})">${translations.product ? translations.product.add_to_cart_detail : 'Добавить в корзину'}</button>
                </div>
            `;
        }
    }
}

// Cart Functionality
function saveCart() {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
}

function addToCart(id) {
    const existing = cart.find(item => item.id === id);
    if(existing) {
        existing.quantity++;
    } else {
        cart.push({id: id, quantity: 1});
    }
    updateCartUI();
    saveCart();
    // Use fresh product name for toast
    const product = products.find(p => p.id === id);
    const addedText = translations.cart ? translations.cart.added : 'добавлен в корзину';
    showToast(`${product ? product.name : ''} ${addedText}`);
    openCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    saveCart();
}

function updateCartUI() {
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    let total = 0; let count = 0;
    
    // Only safe to do if products are loaded
    if(products.length === 0) return;

    if(cart.length === 0) {
        const emptyText = translations.cart ? translations.cart.empty : 'Ваша корзина пуста';
        cartItemsContainer.innerHTML = `<p style="color:var(--text-secondary); text-align:center; margin-top: 20px;">${emptyText}</p>`;
    } else {
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if(!product) return; // skip if not found

            total += product.price * item.quantity;
            count += item.quantity;
            const uiItem = document.createElement('div');
            uiItem.className = 'cart-item';
            
            const qtyStr = translations.cart ? translations.cart.qty : 'Кол-во: ';
            const rmStr = translations.cart ? translations.cart.remove : 'Удалить';

            uiItem.innerHTML = `
                <a href="product.html?id=${product.id}"><img src="${product.img}" alt="${product.name}" class="cart-img"></a>
                <div class="cart-item-info">
                    <a href="product.html?id=${product.id}" class="cart-item-title">${product.name}</a>
                    <div class="cart-item-price">${formatPrice(product.price)}</div>
                    <div class="cart-controls">
                        <span class="cart-qty">${qtyStr}${item.quantity}</span>
                        <button class="btn-remove" onclick="removeFromCart(${product.id})">${rmStr}</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(uiItem);
        });
    }

    if(cartCount) cartCount.innerText = count;
    if(cartTotal) cartTotal.innerText = formatPrice(total);
}

// Interaction logic
function openCart() {
    if(cartSidebar) cartSidebar.classList.add('open');
    if(cartOverlay) cartOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    if(cartSidebar) cartSidebar.classList.remove('open');
    if(cartOverlay) cartOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

if(cartTrigger) cartTrigger.addEventListener('click', openCart);
if(closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if(cartOverlay) cartOverlay.addEventListener('click', closeCart);

// Toasts
function showToast(message) {
    if(!notificationArea) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<strong>AURA:</strong> ${message}`;
    notificationArea.appendChild(toast);
    setTimeout(() => { if(toast.parentElement) toast.remove(); }, 3800);
}

// Order Modal
if(checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if(cart.length === 0) {
            const errMsg = translations.cart ? translations.cart.empty_order : 'Невозможно оформить пустой заказ.';
            showToast(errMsg);
            return;
        }
        closeCart();
        cart = [];
        saveCart();
        updateCartUI();
        
        if(orderModal) {
            orderModal.classList.add('visible');
            document.body.style.overflow = 'hidden';
            
            const checkmark = document.querySelector('.success-animation');
            if(checkmark) {
                const clone = checkmark.cloneNode(true);
                checkmark.parentNode.replaceChild(clone, checkmark);
            }
        }
    });
}

if(closeModalBtn && orderModal) {
    closeModalBtn.addEventListener('click', () => {
        orderModal.classList.remove('visible');
        document.body.style.overflow = '';
    });
}

// For newsletter
const newsletterForm = document.getElementById('newsletter-form');
if(newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = translations.newsletter ? translations.newsletter.success : 'Вы успешно подписались на новости AURA.';
        showToast(msg);
        newsletterForm.reset();
    });
}

// Data Fetching
async function loadTranslations(lang) {
    try {
        const response = await fetch(`${lang}.json`);
        if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        translations = data;
        products = data.products || [];
        
        applyTranslations();
        renderPageContent();
        updateCartUI(); // Cart uses product texts
    } catch(e) {
        console.error("Failed to load language JSON:", e);
        showToast("Error loading translations. You might be running page locally without a web server (file://).");
    }
}

// Init run
document.documentElement.lang = currentLang;
loadTranslations(currentLang);
