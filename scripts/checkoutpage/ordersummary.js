
import { cart } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import {roundUp} from '../utls/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/dilveryoptions.js';
import { updatePaymentSumarry } from './paymentsummarry.js';
export function updatesOdersSumarry (){

let cartSummarryHtml = '';

cart.cartItem.forEach((cartItem)=>{
    const productId = cartItem.productId;

    const matchingproduct = getProduct(productId);


 const deliveryOptionId = cartItem.deliveryOptionId;
 const deliveryOption = getDeliveryOption(deliveryOptionId);

const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

cartSummarryHtml += `  <div class="cart-item-container js-${matchingproduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingproduct.name}
                </div>
                <div class="product-price">
                  $${roundUp(matchingproduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link"  
                  data-product-id="${matchingproduct.id}">
                    Delete
                  </span>
                </div>
                
              </div>
                <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               ${deliveryOptionsHtml(matchingproduct, cartItem)}
              </div>
            </div>
          </div>
`;
});

function deliveryOptionsHtml (matchingproduct, cartItem){

let html = '';

  deliveryOptions.forEach((deliveryOption,)=>{
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 ? 'FREE - ':`$${roundUp(deliveryOption.priceCents)} - `;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

  html += `  
                <div class="delivery-option js-delivery-option"
                data-product-id="${matchingproduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio"
                  ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingproduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString}Shipping
                    </div>
                  </div>
                </div>`;
  })
  return html;
};
document.querySelector('.jsc').innerHTML = cartSummarryHtml;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;
        cart.removeProduct(productId);
        updatePaymentSumarry();
const container = document.querySelector(`.js-${productId}`);
container.remove();
    });
});
 document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click', ()=>{
    const {productId, deliveryOptionId} = element.dataset;
    cart.updateDeliveryOption(productId, deliveryOptionId);
    updatesOdersSumarry();
    updatePaymentSumarry();
  })
 })
}