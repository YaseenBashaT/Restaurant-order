import { menuArray } from "./data.js";

const menuEl = document.getElementById("menu");
const orderContainer = document.getElementById("order-container");
const orders = document.getElementById("orders");

const cartArr = [];

// Display menu html ==============================
menuEl.innerHTML = displayMenuHtml(menuArray);

// Event Listeners ==============================
// clicking on the item and adding it to order
document.addEventListener("click", function (e) {
  if (e.target.dataset.id) {
    const id = e.target.dataset.id;
    const updateIndex = cartArr.findIndex((item) => item.id == id);

    if (updateIndex > -1) {
      //already in cart
      cartArr[updateIndex].quantity += 1;
    } else {
      cartArr.push({ ...menuArray[id], quantity: 1 });
    }

    orders.innerHTML = displayCartHtml(cartArr);
    orderContainer.classList.remove("hidden");
    orders.classList.remove("hidden");
  }
});
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("minus")) {
    const id = e.target.dataset.id;
    const updateIndex = cartArr.findIndex((item) => item.id == id);

    if (updateIndex > -1) {
      if (cartArr[updateIndex].quantity > 1) {
        cartArr[updateIndex].quantity -= 1;
      } else {
        cartArr.splice(updateIndex, 1); // Remove item from cart if quantity is 1
      }

      orders.innerHTML = displayCartHtml(cartArr);
    }
  }
});
// Event Listener for Clicking the "Remove" button in menu items
// Event Listener for Clicking the "-" button to decrease item quantity
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("minus")) {
    const id = e.target.dataset.id;
    const updateIndex = cartArr.findIndex((item) => item.id == id);

    if (updateIndex > -1) {
      if (cartArr[updateIndex].quantity > 1) {
        // Reduce the quantity by 1
        cartArr[updateIndex].quantity -= 1;
      } else {
        // Remove the item from the cart if quantity is 1
        cartArr.splice(updateIndex, 1);
      }

      orders.innerHTML = displayCartHtml(cartArr);
    }
  }
});


// *Menu Html ==============================
function displayMenuHtml(menu) {
  let menuHtml = "";

  menu.forEach(function (item) {
    menuHtml += `
      <div class="menu-item" id=${item.id}>
        <div class="menu-item-details">
          <span class="menu-item-emoji">${item.emoji}</span>
          <div class = 'details'>
            <h2 class="menu-item-name" data-name=${item.name}>${item.name}</h2>
            <p class="menu-item-ingredients">${item.ingredients.join(", ")}</p>
            <p class="menu-item-price" data-price=${item.price}>$${item.price}</p>
          </div>  
        </div>
        <div class='addm'>
        <button class="add-btn" data-id=${item.id}>+</button>
        <button class="add-btn minus" data-id=${item.id}>-</button> <!-- Added "Remove" button -->
        </div>
        </div>`;
  });
  return menuHtml;
}

// *Cart html ==============================
function displayCartHtml(cart) {
  let cartHtml = "";

  let totalPrice = 0;

  cart.forEach(function (item) {
    const itemTotal = item.price * item.quantity;
    cartHtml += `   
    <div class="all-items" id=${item.id}>
        <p class="order-name">${item.name}  (${item.quantity})</p>
        <p class="order-price">$${itemTotal}</p>
     </div>
    
         `;

    totalPrice += itemTotal;
  });

  document.getElementById("order-price").innerHTML = `$${totalPrice}`;
  return cartHtml;
}
displayCartHtml(cartArr);