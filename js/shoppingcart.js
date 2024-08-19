let shoppingCart = JSON.parse(localStorage.getItem("shopping_cart")) || [];
let favArr = JSON.parse(localStorage.getItem("favArr")) || [];
let cartDiv = document.querySelector(".shopping-items-cont");
let favDiv = document.querySelector(".fav-items-cont");
let favCont = document.querySelector(".fav-second")

function createCartItems() {
    if (!Array.isArray(shoppingCart)) {
        console.error("shoppingCart is not an array");
        return;
    }

    let x = shoppingCart.map((item, index) => {
        return `
        <div class="shopping-item" id="product-${item.id}">
            <img class="shopping-item-img" src="${item.imageUrl}" alt="">
            <div class="shopping-item-desc">
                <span>Product: <span>${item.name}</span></span>
                <span>Category: <span>${item.category}</span></span>
                <span>Price: <span>${item.price}</span></span>
                <div class="shopping-item-buttons">
                    <div class="first-buttons">
                        <span class="amount" id="amount-${item.id}">${item.amountInCart}</span>
                        <span class="product-list-add" data-id="${item.id}">+</span>
                        <span class="product-list-sub" data-id="${item.id}">-</span>
                    </div>
                    <div class="second-buttons">
                        <input type="button" value="remove" class="remove-btn" data-index="${index}">
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');
    cartDiv.innerHTML = x;

    document.querySelectorAll(".remove-btn").forEach((removeBtn) => {
        removeBtn.addEventListener("click", (event) => {
            let index = event.target.getAttribute("data-index");
            removeItem(index);
        });
    });

    document.querySelectorAll(".product-list-add").forEach((addBtn) => {
        addBtn.addEventListener("click", (event) => {
            let id = event.target.getAttribute("data-id");
            itemIncrease(id);
        });
    });

    document.querySelectorAll(".product-list-sub").forEach((subBtn) => {
        subBtn.addEventListener("click", (event) => {
            let id = event.target.getAttribute("data-id");
            itemDecrease(id);
        });
    });
}

function removeItem(index) {
    shoppingCart.splice(index, 1);
    localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart));
    createCartItems();
    calcTotal()
}

function itemIncrease(id) {
    let chosenItem = shoppingCart.find((item) => item.id === id);
    if (chosenItem) {
        chosenItem.amountInCart += 1;
        document.getElementById(`amount-${chosenItem.id}`).innerHTML = `${chosenItem.amountInCart}`;
        localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart));
    }
    calcTotal()
}

function itemDecrease(id) {
    let chosenItem = shoppingCart.find((item) => item.id === id);
    if (chosenItem) {
        if (chosenItem.amountInCart > 1) {
            chosenItem.amountInCart -= 1;
            document.getElementById(`amount-${chosenItem.id}`).innerHTML = `${chosenItem.amountInCart}`;
        } else {
            removeCartItem(chosenItem.id);
        }
        localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart));
    }
    calcTotal()
}

function removeCartItem(id) {
    shoppingCart = shoppingCart.filter((item) => item.id !== id);
    localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart));
    let element = document.getElementById(`product-${id}`);
    if (element) {
        element.remove();
    }
    createCartItems();
    calcTotal()
}

createCartItems();

let total = document.querySelector(".total-price")
let totalPrice = 0
function calcTotal() {
    totalPrice = 0
    shoppingCart.forEach((item) => {
        totalPrice += (item.amountInCart)*(item.price)
        }
    )
    total.innerHTML = totalPrice;
}

calcTotal()

function clearStorage(){
    localStorage.clear()
}

function createFavItems(arr) {
    let y = arr.map((item) => {
        return `
         <div class="fav-item">
                <img src="${item.imageUrl}" alt="" class="fav-item-img">
                <div class="fav-desc">
                    <div class="fav-first">
                        <span class="fav-name">Product: ${item.name}</span>
                        <span class="fav-cat">Category: ${item.category}</span>
                    </div>
                    <div class="fav-second">
                        <i class="fa-solid fa-star favourite" style="color: #3498db;" onClick="removeFav('${item.id}')"></i>
                    </div>
                </div>
            </div>
        `;
    }).join("");
    favDiv.innerHTML = y;
}

createFavItems(favArr);

function removeFav(id) {
    favArr = favArr.filter((item) => item.id !== id);
    localStorage.setItem("favArr", JSON.stringify(favArr));
    createFavItems(favArr);
}