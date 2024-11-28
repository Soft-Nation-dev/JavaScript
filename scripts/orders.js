import { cart } from "../data/cart.js";
import { products, getProduct } from "../data/products.js";
import { roundUp } from "./utls/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions,getDeliveryOption } from "../data/dilveryoptions.js";
function renderOrdersPage (){
let ordersSummary = '';

cart.cartItem.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingproduct = getProduct(productId);
console.log(matchingproduct);
 const deliveryOptionId = cartItem.deliveryOptionId;
 const deliveryOption = getDeliveryOption(deliveryOptionId);

const today = dayjs();
const orderDay = today.add(0, 'days');
const todayform = orderDay.format('dddd, MMMM D')
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    ordersSummary += `
    <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed On:</div>
                <div>${todayform}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${roundUp(matchingproduct.priceCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${matchingproduct.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${matchingproduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingproduct.name}
              </div>
              <div class="product-delivery-date">
                Delivery Date: ${dateString}
              </div>
              <div class="product-quantity">
                Quantity: ${cartItem.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again"
              data-product-id="${productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?productId=${matchingproduct.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        </div>

    `;
    const cartqaun = cart.updateCartQuantity();
    document.querySelector('.js-c').innerHTML = cartqaun;
});
document.querySelector('.js-orders-grid').innerHTML = ordersSummary;
document.querySelectorAll('.js-buy-again').forEach((button)=>{
   button.addEventListener('click', ()=>{
    const productId = button.dataset.productId;
    getProduct(productId);
    cart.addToCart(productId);
    cart.updateCartQuantity();
    renderOrdersPage();
    const cartqaun = cart.updateCartQuantity();
    document.querySelector('.js-c').innerHTML = cartqaun;
})})
}
renderOrdersPage();