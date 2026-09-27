/* =====================================================
   G&G CHAIR
   E-COMMERCE + WHATSAPP SYSTEM
===================================================== */


/* =====================================================
   WHATSAPP NUMBER
===================================================== */

const WHATSAPP_NUMBER = "2348162090699";


/* =====================================================
   PRICE FORMATTER
   Nigerian Naira
===================================================== */

function formatPrice(price) {
    return `₦${Number(price).toLocaleString("en-NG")}`;
}


/* =====================================================
   PRODUCTS
===================================================== */

const products = [

    {
        id: 1,
        name: "Amber",
        category: "Chair",
        type: "Chair",
        price: 12000,
        image: "WhatsApp Image 2026-09-26 at 10.42.58 AM.jpeg",
        description: "Elegant dining chair with premium fabric upholstery."
    },

    {
        id: 2,
        name: "Ok",
        category: "Lounge",
        type: "Chair",
        price: 10000,
        image: "WhatsApp Image 2026-09-26 at 10.49.54 AM.jpeg",
        description: "Modern lounge chair designed for ultimate comfort."
    },

    {
        id: 3,
        name: "Twinkle",
        category: "Office",
        type: "Chair",
        price: 3500,
        image: "WhatsApp Image 2026-09-26 at 10.52.33 AM.jpeg",
        description: "Ergonomic office chair designed for productivity."
    },

    {
        id: 4,
        name: "Rida",
        category: "Chair",
        type: "Chair",
        price: 8200,
        image: "WhatsApp Image 2026-09-26 at 10.53.29 AM.jpeg",
        description: "Solid plastic chair with timeless design."
    },

    {
        id: 5,
        name: "Editor",
        category: "Chair",
        type: "Chair",
        price: 7500,
        image: "WhatsApp Image 2026-09-26 at 10.53.57 AM.jpeg",
        description: "Comfortable chair suitable for different spaces."
    },

    {
        id: 6,
        name: "Eden Office Table",
        category: "Office Table",
        type: "Table",
        price: 59999,
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85",
        description: "Spacious desk designed for a productive workspace."
    },

    {
        id: 7,
        name: "Aria Dining Chair",
        category: "Chair",
        type: "Chair",
        price: 19000,
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=800&q=85",
        description: "Soft upholstered chair with a sophisticated silhouette."
    },

    {
        id: 8,
        name: "Oakwood Dining Table",
        category: "Dining Table",
        type: "Table",
        price: 23000,
        image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=800&q=85",
        description: "Warm natural oak dining table for elegant interiors."
    }

];


/* =====================================================
   CART
===================================================== */

let cart = JSON.parse(localStorage.getItem("jerryCart")) || [];


/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts(list = products) {

    const grid = document.getElementById("productsGrid");

    if (!grid) return;

    if (!list.length) {

        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:50px;">
                <h3>No products found.</h3>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }


    grid.innerHTML = list.map(product => `

        <article class="product-card">

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <button
                    class="wishlist"
                    onclick="toggleWishlist(this)"
                >
                    ♡
                </button>

            </div>


            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="stars">
                    ★★★★★
                </div>

                <div class="price">
                    ${formatPrice(product.price)}
                </div>


                <div class="product-actions">

                    <button onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>

                    <button onclick="openProduct(${product.id})">
                        Details
                    </button>

                </div>

            </div>

        </article>

    `).join("");

}


/* =====================================================
   FILTER
===================================================== */

function filterProducts(category) {

    if (
        category === "all" ||
        category === "" ||
        category === undefined
    ) {

        renderProducts(products);

        return;
    }


    let filtered;


    if (category === "Chair" || category === "Table") {

        filtered = products.filter(
            product => product.type === category
        );

    } else {

        filtered = products.filter(
            product => product.category === category
        );

    }


    renderProducts(filtered);

}


/* =====================================================
   SEARCH
===================================================== */

function searchProducts() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    const search = input.value.toLowerCase().trim();


    const filtered = products.filter(product =>

        product.name.toLowerCase().includes(search) ||

        product.category.toLowerCase().includes(search) ||

        product.description.toLowerCase().includes(search)

    );


    renderProducts(filtered);

}


/* =====================================================
   CART
===================================================== */

function addToCart(id, quantity = 1) {

    const product = products.find(
        product => product.id === id
    );

    if (!product) return;


    const existing = cart.find(
        item => item.id === id
    );


    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({
            ...product,
            quantity: quantity
        });

    }


    saveCart();

    updateCart();

    openCart();

}


function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();

    updateCart();

}


function changeCartQuantity(id, change) {

    const item = cart.find(
        product => product.id === id
    );

    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }


    saveCart();

    updateCart();

}


function saveCart() {

    localStorage.setItem(
        "G&G Cart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   UPDATE CART UI
===================================================== */

function updateCart() {

    const container =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!container) return;


    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    if (cartCount) {
        cartCount.textContent = count;
    }


    if (!cart.length) {

        container.innerHTML = `
            <div style="text-align:center;padding:60px 20px;">
                <div style="font-size:50px;">🛒</div>

                <h3>Your cart is empty</h3>

                <p style="color:#777;margin-top:10px;">
                    Add a chair or table to get started.
                </p>
            </div>
        `;


        if (cartTotal) {
            cartTotal.textContent = formatPrice(0);
        }

        return;

    }


    container.innerHTML = cart.map(item => `

        <div class="cart-item">

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div>

                <h4>${item.name}</h4>

                <p>
                    ${formatPrice(item.price)}
                </p>


                <div style="margin-top:8px;">

                    <button
                        onclick="changeCartQuantity(${item.id}, -1)"
                    >
                        −
                    </button>


                    <span style="margin:0 8px;">
                        ${item.quantity}
                    </span>


                    <button
                        onclick="changeCartQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-cart"
                onclick="removeFromCart(${item.id})"
            >
                ✕
            </button>

        </div>

    `).join("");


    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    if (cartTotal) {
        cartTotal.textContent =
            formatPrice(total);
    }

}


/* =====================================================
   CART OPEN / CLOSE
===================================================== */

function openCart() {

    document
        .getElementById("cartPanel")
        ?.classList.add("active");

    document
        .getElementById("overlay")
        ?.classList.add("active");

}


function closeCart() {

    document
        .getElementById("cartPanel")
        ?.classList.remove("active");

    document
        .getElementById("overlay")
        ?.classList.remove("active");

}


/* =====================================================
   WHATSAPP CART CHECKOUT
===================================================== */

function checkoutWhatsApp() {

    if (!cart.length) {

        alert("Your cart is empty.");

        return;

    }


    let message =
        "Hello G&G C0SMETICS AND GENERAL MERCHANDISE 👋\n\n" +
        "I would like to order:\n\n";


    cart.forEach(item => {

        message +=
            `• ${item.name}\n` +
            `  Price: ${formatPrice(item.price)}\n` +
            `  Quantity: ${item.quantity}\n\n`;

    });


    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    message +=
        `Total: ${formatPrice(total)}\n\n` +
        "Please provide me with the next steps for payment and delivery.";


    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(url, "_blank");

}


/* =====================================================
   PRODUCT MODAL
===================================================== */

let selectedProduct = null;

let modalQuantity = 1;


function openProduct(id) {

    const product =
        products.find(
            product => product.id === id
        );

    if (!product) return;


    selectedProduct = product;

    modalQuantity = 1;


    const modalImage =
        document.getElementById("modalImage");

    const modalName =
        document.getElementById("modalName");

    const modalPrice =
        document.getElementById("modalPrice");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalQuantityElement =
        document.getElementById("modalQuantity");


    if (modalImage) {

        modalImage.src = product.image;

        modalImage.alt = product.name;

    }


    if (modalName) {
        modalName.textContent =
            product.name;
    }


    if (modalPrice) {
        modalPrice.textContent =
            formatPrice(product.price);
    }


    if (modalDescription) {
        modalDescription.textContent =
            product.description;
    }


    if (modalQuantityElement) {
        modalQuantityElement.textContent =
            modalQuantity;
    }


    document
        .getElementById("productModal")
        ?.classList.add("active");

}


/* =====================================================
   CLOSE PRODUCT MODAL
===================================================== */

function closeProductModal() {

    document
        .getElementById("productModal")
        ?.classList.remove("active");

}


/* =====================================================
   MODAL QUANTITY
===================================================== */

function changeModalQuantity(change) {

    modalQuantity += change;


    if (modalQuantity < 1) {
        modalQuantity = 1;
    }


    const quantityElement =
        document.getElementById("modalQuantity");


    if (quantityElement) {

        quantityElement.textContent =
            modalQuantity;

    }

}


/* =====================================================
   ADD MODAL PRODUCT TO CART
===================================================== */

function addModalProductToCart() {

    if (!selectedProduct) return;


    addToCart(
        selectedProduct.id,
        modalQuantity
    );


    closeProductModal();

}


/* =====================================================
   BUY PRODUCT DIRECTLY ON WHATSAPP
===================================================== */

function buyModalProduct() {

    if (!selectedProduct) return;


    const total =
        selectedProduct.price *
        modalQuantity;


    const message =
`Hello JERRY FURNISHINGS 👋

I would like to order:

Product: ${selectedProduct.name}
Price: ${formatPrice(selectedProduct.price)}
Quantity: ${modalQuantity}
Total: ${formatPrice(total)}

Please provide me with the next steps for payment and delivery.`;


    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(url, "_blank");

}


/* =====================================================
   SEARCH BOX
===================================================== */

function openSearch() {

    document
        .getElementById("searchBox")
        ?.classList.add("active");


    document
        .getElementById("searchInput")
        ?.focus();

}


function closeSearch() {

    document
        .getElementById("searchBox")
        ?.classList.remove("active");

}


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

    document
        .getElementById("navMenu")
        ?.classList.toggle("active");

}


/* =====================================================
   WISHLIST
===================================================== */

function toggleWishlist(button) {

    if (button.textContent === "♡") {

        button.textContent = "♥";

    } else {

        button.textContent = "♡";

    }

}


/* =====================================================
   NEWSLETTER
===================================================== */

function subscribe(event) {

    event.preventDefault();


    alert(
        "Thank you for subscribing to JERRY FURNISHINGS!"
    );


    event.target.reset();

}


/* =====================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
===================================================== */

const productModal =
    document.getElementById("productModal");


if (productModal) {

    productModal.addEventListener(
        "click",
        function(event) {

            if (event.target === this) {

                closeProductModal();

            }

        }
    );

}


/* =====================================================
   INITIALIZE WEBSITE
===================================================== */

renderProducts();

updateCart();