let cart = [];

// navigation
function showShop() {
    document.getElementById("cart-view").classList.add("hidden");
    document.getElementById("checkout-view").classList.add("hidden");
    document.getElementById("confirmation-view").classList.add("hidden");
    document.getElementById("shop-view").classList.remove("hidden");
}

function showCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    document.getElementById("shop-view").classList.add("hidden");
    document.getElementById("checkout-view").classList.add("hidden");
    document.getElementById("confirmation-view").classList.add("hidden");
    document.getElementById("cart-view").classList.remove("hidden");

    updateCart("cart-items-list", "cart-subtotal", "cart-discount", "cart-tax", "cart-total");
}

function showCheckout() {
    document.getElementById("cart-view").classList.add("hidden");
    document.getElementById("confirmation-view").classList.add("hidden");
    document.getElementById("shop-view").classList.add("hidden");
    document.getElementById("checkout-view").classList.remove("hidden");
}

// addtocart

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });

    document.getElementById("cart-count").innerText = cart.length;

    alert(itemName + " added to cart!");
}

// calculation
function updateCart(listId, subId, discId, taxId, totId) {
    let subtotal = 0;
    let listHTML = "";

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        subtotal += item.price;
        listHTML += "<li>" + item.name + " - $" + item.price.toFixed(2) + "</li>";
    }

    let discount = 0;
    if (cart.length >= 3) {
        discount = subtotal * 0.15;
    }
    let taxable = subtotal - discount;
    let tax = taxable * 0.10;
    let total = taxable + tax;

    document.getElementById(listId).innerHTML = listHTML;
    document.getElementById(subId).innerText = subtotal.toFixed(2);
    document.getElementById(discId).innerText = discount.toFixed(2);
    document.getElementById(taxId).innerText = tax.toFixed(2);
    document.getElementById(totId).innerText = total.toFixed(2);
}

// validation and checkout

function checkout() {
    let name = document.getElementById("fullName").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;
    let zip = document.getElementById("zip").value;

    document.getElementById("error-name").innerText = "";
    document.getElementById("error-address").innerText = "";
    document.getElementById("error-phone").innerText = "";
    document.getElementById("error-zip").innerText = "";

    let isValid = true;

    if (name === "") {
        document.getElementById("error-name").innerText = "Name is required";
        isValid = false;
    }
    if (address === "") {
        document.getElementById("error-address").innerText = "Address is required";
        isValid = false;
    }
    if (phone === "" || isNaN(phone)) {
        document.getElementById("error-phone").innerText = "Phone must be numbers only";
        isValid = false;
    }
    if (zip.length > 6 || zip === "") {
        document.getElementById("error-zip").innerText = "Zip code must be maximum 6 characters";
        isValid = false;
    }

    if (isValid) {
        document.getElementById("confirm-name").innerText = name;
        
        updateCart("receipt-list", "receipt-subtotal", "receipt-discount", "receipt-tax", "receipt-total");

        document.getElementById("checkout-view").classList.add("hidden");
        document.getElementById("confirmation-view").classList.remove("hidden");
    }
}