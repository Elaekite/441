let cart = [];
let totalPrice = 0;
let isLoggedIn = false;

function showPage(pageId) {
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    document.getElementById(pageId).style.display = 'block';
}

function createUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === '' || password === '') {
        alert("Please enter both username and password.");
        return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    alert("User created successfully!");
    showPage('loginPage');
}

function login() {
    var loginUsername = document.getElementById("loginUsername").value.trim();
    var loginPassword = document.getElementById("loginPassword").value.trim();

    if (loginUsername === '' || loginPassword === '') {
        alert("Please enter both username and password.");
        return;
    }

    var storedUsername = localStorage.getItem('username');
    var storedPassword = localStorage.getItem('password');

    if (loginUsername === storedUsername && loginPassword === storedPassword) {
        alert("Login successful!");
        isLoggedIn = true;
        document.getElementById('shoppingLink').style.display = 'inline';
        showPage('shoppingPage');
    } else {
        alert("Invalid username or password. Please try again.");
        clearLoginFields();
    }
}

function clearLoginFields() {
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
}

function addToCart(productName, productPrice, quantity) {
    if (!isLoggedIn) {
        alert("Please log in to access shopping cart.");
        return;
    }

    quantity = parseInt(quantity);
    if (isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity');
        return;
    }
    for (let i = 0; i < quantity; i++) {
        cart.push({ name: productName, price: productPrice });
        totalPrice += productPrice;
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(div);
    });
    document.getElementById('total-price').textContent = totalPrice;
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    alert('Checkout successful! Total amount: $' + totalPrice);
    cart = [];
    totalPrice = 0;
    updateCart();
}