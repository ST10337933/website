let listCart = [];

function checkCart() {
    var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}

checkCart();
addCartToHTML();

function addCartToHTML() {
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;

    // if has product in Cart
    if (listCart) {
        listCart.forEach(product => {
            if (product) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML =
                    `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">${product.price}</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }

        });

        // Apply a 10% discount if the total quantity is 2
        if (totalQuantity === 2) {
            let discount = 0.05; // 10% discount
            totalPrice = totalPrice - (totalPrice * discount);
        }
        if (totalQuantity === 3) {
            let discount = 0.1;
            totalPrice = totalPrice - (totalPrice * discount);
        }
        if (totalQuantity >= 4) {
            // If totalQuantity is greater than 4, execute the following block of code
            let discount = 0.15;  // Set the discount rate to 15%
            totalPrice = totalPrice - (totalPrice * discount);  // Apply the discount to totalPrice
        }
        
    }
    
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = 'R' + totalPrice.toFixed(2); // Display total price with two decimal places
}
