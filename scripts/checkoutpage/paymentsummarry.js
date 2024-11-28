import { cart } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { getDeliveryOption } from "../../data/dilveryoptions.js";
import { roundUp } from "../utls/money.js";

export function updatePaymentSumarry (){
    let productPriceCents = 0;
    let shippingPrice = 0;

cart.cartItem.forEach((cartItem) => {
   const product = getProduct(cartItem.productId)
   productPriceCents += product.priceCents * cartItem.quantity;

  const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
  shippingPrice += deliveryOption.priceCents;
});
const priceTax = productPriceCents + shippingPrice;
const taxCents = priceTax * 0.1;
const totatCents = priceTax + taxCents;
const paymentSummarryHtml = ` <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="pay">Items ():</div>
            <div class="payment-summary-money">$${roundUp(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${roundUp(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${roundUp(priceTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${roundUp(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${roundUp(totatCents)}</div>
          </div>

          <button class="place-order-button button-primary
          js-place-order-button">
            Place your order
          </button>`;



document.querySelector('.js-payment-summarry').innerHTML = paymentSummarryHtml;

const cartqaun = cart.updateCartQuantity();
      document.querySelector('.pay').textContent = `Items(${cartqaun})`;
      document.querySelector('.checkout').textContent = `${cartqaun} Items`;

      document.querySelector('.js-place-order-button').addEventListener('click', async ()=>{
      /*const respone =  await fetch('https://supersimplebackend.dev/orders', {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {
            cart: cart
          })
          });
         const orders = await respone.json()
         console.log(orders);*/
        window.location.href = 'orders.html';

        });
}

