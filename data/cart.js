export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart){
  cart = [{
    productid: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },{
    productid: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }];
}

function saveToStorage (){
localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart (productsId){
    let matchingId;

    cart.forEach((cartItem)=>{
      if (productsId === cartItem.productid){
      matchingId = cartItem;
      }
    })
  
    if (matchingId){
      matchingId.quantity += 1;
    } else {
      cart.push({
        productsId: productsId,
        quantity:1
      })
    }
    saveToStorage();
  }

 export function removeProduct(productId){
    const newArray = [];
   cart.forEach((cartItem)=>{
    if (cartItem.productid !== productId){
      newArray.push(cartItem);
    }
   })
   cart = newArray;
   saveToStorage();
  }