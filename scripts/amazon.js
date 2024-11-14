import {cart, addToCart} from '../data/cart.js'
import {products} from '../data/products.js'
import { roundUp } from './utls/money.js';

let productsHtml = '';

products.forEach((products)=>{
productsHtml +=`
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${products.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              127
            </div>
          </div>

          <div class="product-price">
            ${roundUp(products.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button"
          data-product-id="${products.id}">
            Add to Cart
          </button>
        </div> `;
})

document.querySelector('.js-product').innerHTML = productsHtml;

function updateCartQuantity (){
  
  let updateCartQuantity = 0

  cart.forEach((cartitem)=>{
  updateCartQuantity += cartitem.quantity;
  })
  document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity;
}

document.querySelectorAll('.js-add-to-cart-button').forEach((button)=>{
  button.addEventListener('click', ()=>{

    const productsId = button.dataset.productsId;
    addToCart(productsId);
    updateCartQuantity();
  })
})

