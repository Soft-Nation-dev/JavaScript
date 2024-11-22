import { cart } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { getDeliveryOption } from "../../data/dilveryoptions.js";
import { roundUp } from "../utls/money.js";

export function updatePaymentSumarry (){
    let productPriceCents = 0;
    let shippingPrice = 0;

cart.forEach((cartItem) => {
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
            <div>Items (3):</div>
            <div class="payment-summary-money">${roundUp(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${roundUp(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${roundUp(priceTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${roundUp(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${roundUp(totatCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

document.querySelector('.js-payment-summarry').innerHTML = paymentSummarryHtml;

}
