import { cart } from "../data/cart.js";
import { products,getProduct } from "../data/products.js";
import { getDeliveryOption } from "../data/dilveryoptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


let trackingSummary = '';

cart.cartItem.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingproduct = getProduct(productId);
 const deliveryOptionId = cartItem.deliveryOptionId;
 const deliveryOption = getDeliveryOption(deliveryOptionId);

const today = dayjs();
const orderDay = today.add(0, 'days');
const todayform = orderDay.format('dddd, MMMM D')
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');



    trackingSummary =`
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dateString}
        </div>

        <div class="product-info">
          ${matchingproduct.name}
        </div>

        <div class="product-info">
          Quantity: ${cartItem.quantity}
        </div>

        <img class="product-image" src="${matchingproduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    `;
    const cartqaun = cart.updateCartQuantity();
    document.querySelector('.cart-js').innerHTML = cartqaun;

    const params = new URLSearchParams(window.location.search);
        
    // Example: ?name=John&age=30
    const name = params.get("productId");
    const contentDiv = document.querySelector('.js-order-tracking')
    
    if (name === matchingproduct.id){
     contentDiv.innerHTML = trackingSummary;
    }
    

})
const cartqaun = cart.updateCartQuantity();
document.querySelector('.cart-js').innerHTML = cartqaun;
