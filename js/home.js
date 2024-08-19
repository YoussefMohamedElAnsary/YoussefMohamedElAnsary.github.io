let userInfo = document.querySelector("#user_info")
let userNav = document.querySelector("#user_nav_links")
let userData = document.querySelector("#user")
let logout = document.querySelector("#logout")
let links = document.querySelector(".nav-links-cont")
let cartListDiv = document.querySelector(".items-list-cont");
let cartBadge = document.querySelector(".cart-badge");
let arrayOfProducts = [];
let cartIcon = document.querySelector(".cart-icon-cont")
let cartList = document.querySelector(".cart-products-list")
let fname = localStorage.getItem("fname")
let lname = localStorage.getItem("lname")
let categoryDropdown = document.querySelector(".dropdown-cont")
let searchBar = document.querySelector(".search")
let searchVal = searchBar.value
let addCartBtn = document.querySelector(".add-cart-button")

if (fname != null) {
    links.remove()
    userInfo.style.display = "flex"
    userNav.style.display = "flex"
    userData.innerHTML = "Welcome " + fname + " " + lname
}

////////////////////////////////////////////////////////////

let allProducts = document.querySelector(".item-container");

let products = [{
    id: "1",
    name: "Classic Aviators",
    price: "197.00",
    category: "Sunglasses",
    imageUrl: "/images/glasses.png",
    amountInCart: 0,
    fav: false
},
{
    id: "2",
    name: "Clubmaster Optics",
    price: "210.00",
    category: "Prescription",
    imageUrl: "/images/glasses2.png",
    amountInCart: 0,
    fav: false
},
{
    id: "3",
    name: "Round Metal Optics",
    price: "198.00",
    category: "Prescription",
    imageUrl: "/images/glasses3.png",
    amountInCart: 0,
    fav: false
},
{
    id: "4",
    name: "Wayfarer Ease Optics",
    price: "198.00",
    category: "Prescription",
    imageUrl: "/images/glasses4.png",
    amountInCart: 0,
    fav: false
},
{
    id: "5",
    name: "RB4264 Chromance",
    price: "256.00",
    category: "Sunglasses",
    imageUrl: "/images/glasses5.png",
    amountInCart: 0,
    fav: false
},
{
    id: "6",
    name: "Oval Flat Lenses",
    price: "180.00",
    category: "Sunglasses",
    imageUrl: "/images/glasses6.png",
    amountInCart: 0,
    fav: false
},
{
    id: "7",
    name: "Aviator Mirror",
    price: "230.00",
    category: "Sunglasses",
    imageUrl: "/images/glasses7.png",
    amountInCart: 0,
    fav: false
},
{
    id: "8",
    name: "Round Metal Sunglasses",
    price: "230.00",
    category: "Sunglasses",
    imageUrl: "/images/glasses8.png",
    amountInCart: 0,
    fav: false
},
{
    id: "9",
    name: "Round Double Bridge",
    price: "191.00",
    category: "Sunglasses",
    imageUrl: "/images/glasses9.png",
    amountInCart: 0,
    fav: false
}];

function createItems(p) {
    let y = allProducts.innerHTML = p.map(item => `
        <div class='item-card-main'>
            <div class="img-cont"><img class='item-card-img' src="${item.imageUrl}" alt="${item.name}"></div>
            <div class='item-card-desc'>
                <span>Product: <span>${item.name}</span></span>
                <span>Price: <span>$${item.price}</span></span>
                <span>Category: <span>${item.category}</span></span>
            </div>
            <div class="card-buttons">
                <input type="button" value="Add to Cart" data-id="${item.id}" class="add-cart-button" onClick="addCart('${item.id}')">
                <span class="favourite-cont" data-id="${item.id}" onClick="favour('${item.id}')">
                    <i class="fa-regular fa-star favourite"></i>
                </span>
            </div>
        </div>
    `).join('');
    allProducts.innerHTML = y
}

createItems(products);

function check() {
    if (localStorage.getItem("fname")) {
        window.location = "index.html";
    } else {
        window.location = "login.html";
    }
}

function clearStorage() {
    localStorage.clear()
}


function openCart() {
    if (cartListDiv != "") {
        if (cartList.style.display == "none") {
            cartList.style.display = "block"
        }
        else {
            cartList.style.display = "none"
        }
    }
}
cartIcon.addEventListener("click", openCart)

function itemIncrease(id) {
    let chosenItem = products.find((item) => item.id === id);
    if (chosenItem) {
        chosenItem.amountInCart += 1;
        document.getElementById(`amount-${chosenItem.id}`).innerHTML = `${chosenItem.amountInCart}`;
        localStorage.setItem("shopping_cart", JSON.stringify(arrayOfProducts))
    }
}

function itemDecrease(id) {
    let chosenItem = products.find((item) => item.id === id);
    if (chosenItem) {
        if (chosenItem.amountInCart > 1) {
            chosenItem.amountInCart -= 1;
            document.getElementById(`amount-${chosenItem.id}`).innerHTML = `${chosenItem.amountInCart}`;
        }
        else {
            removeCartItem(chosenItem.id)
            if (arrayOfProducts.length < 1) {
                cartBadge.style.display = "none"
                cartList.style.display = "none"
            }
        }
        localStorage.setItem("shopping_cart", JSON.stringify(arrayOfProducts))
    }
}


function removeCartItem(id) {
    arrayOfProducts = arrayOfProducts.filter((item) => item.id !== id);

    let element = document.getElementById(`product-${id}`);
    if (element) {
        element.remove();
    }

    cartBadge.innerHTML = `${arrayOfProducts.length}`;
}

function changeAddCartBtn(id) {
    let chosenItem = products.find((item) => item.id === id)
    if (chosenItem) {
        let buttonToChange = document.querySelector(`.add-cart-button[data-id="${id}"]`);
        if (buttonToChange) {
            if (arrayOfProducts.find((item) => item.id === chosenItem.id)) {
                buttonToChange.value = "Remove from Cart"
                buttonToChange.style.backgroundColor = "#FF0000"
            }
            else {
                console.log("d5alt hena")
                buttonToChange.value = "Add to Cart"
                buttonToChange.style.backgroundColor = "#3498DB"
            }
        }
    }
}

function addCart(id) {
    if (fname != null) {
        cartBadge.style.display = 'inline';
        let chosenItem = products.find((item) => item.id === id);

        if (chosenItem) {
            let checkIfAvailable = arrayOfProducts.find((item) => item.id === id);

            if (!checkIfAvailable) {
                chosenItem.amountInCart = 1;
                let x = `<div class="product-list-item" id="product-${chosenItem.id}">
                            <span>${chosenItem.name}</span>
                            <div>
                                <ul class="product-list-buttons">
                                    <li class="product-list-num" id="amount-${chosenItem.id}">${chosenItem.amountInCart}</li>
                                    <li class="product-list-add" onClick="itemIncrease('${chosenItem.id}')">+</li>
                                    <li class="product-list-sub" onClick="itemDecrease('${chosenItem.id}')">-</li>
                                </ul>
                            </div>
                        </div>`;
                cartListDiv.innerHTML += x;
                arrayOfProducts.push(chosenItem);
            } else {
                arrayOfProducts = arrayOfProducts.filter((item) => item.id !== id);
                document.getElementById(`product-${chosenItem.id}`).remove();
            }

            localStorage.setItem("shopping_cart", JSON.stringify(arrayOfProducts));
            cartBadge.innerHTML = `${arrayOfProducts.length}`;

            changeAddCartBtn(id);
        }
    } else {
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    }
}



//////////////////////////////////////////////////////////////////////////

let favArr = []

function favour(id) {
    if (fname != null) {
        console.log(`Favour function called with id: ${id}`);
        const chosenItem = products.find(item => item.id === id);

        if (chosenItem) {
            chosenItem.fav = !chosenItem.fav;
            let checkIfAvailable = favArr.find((item) => item.id === id);
            if (!checkIfAvailable) {
                if (chosenItem.fav) {
                    favArr.push(chosenItem);
                }
            } else {
                favArr = favArr.filter((item) => item.id !== id);
            }
            localStorage.setItem("favArr", JSON.stringify(favArr));
            const favCont = document.querySelector(`.favourite-cont[data-id="${id}"]`);

            if (favCont) {
                favCont.innerHTML = chosenItem.fav
                    ? `<i class="fa-solid fa-star favourite" style="color: #3498db;"></i>`
                    : `<i class="fa-regular fa-star favourite" ></i>`;
            }
        } else {
            console.error("Item not found with id:", id);
        }
    } else {
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    }
}

function searchFunc() {
    let x = JSON.parse(localStorage.getItem("favArr")) || [];
    let y = JSON.parse(localStorage.getItem("shopping_cart")) || [];
    if (searchVal != null) {
        let searchArray = products.filter((item) => {
            if (categoryDropdown.value === "name") {
                return item.name.toLowerCase().includes(searchBar.value.toLowerCase())
            }
            else {
                return item.category.toLowerCase().includes(searchBar.value.toLowerCase())
            }
        })

        createItems(searchArray);
        y.map((item) => { addCart(item.id) })
        x.map((item) => { favour(item.id) })
    }
    else {
        createItems(products);
        y.map((item) => { addCart(item.id) })
        x.map((item) => { favour(item.id) })
    }
    y.map((item) => { addCart(item.id) })
    x.map((item) => { favour(item.id) })
}



let oldCart = JSON.parse(localStorage.getItem("shopping_cart")) || [];
oldCart.map((item) => { addCart(item.id) })
let oldFav = JSON.parse(localStorage.getItem("favArr")) || [];
oldFav.map((item) => { favour(item.id) })
