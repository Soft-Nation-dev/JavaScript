 class Cart {

cartItem;
localStorageKey;

constructor (){
  this.localStorageKey = 'cart';
  this.loadFromStorage();
}
loadFromStorage (){
this.cartItem =  JSON.parse(localStorage.getItem(this,this.localStorageKey));

if (!this.cartItem){
  this.cartItem = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 2,
     deliveryOptionId: '2'
  }];
}
}

aveToStorage (){
localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItem));
}

addToCart (productId){
  let matchingId;

  this.cartItem.forEach((cartItem)=>{
    if (productId === cartItem.productId){
    matchingId = cartItem;
    }
  })

  if (matchingId){
    matchingId.quantity += 1;
  } else {
    this.cartItem.push({
      productId: productId,
      quantity:1,
      deliveryOptionid: '1'
    })
  }
  saveToStorage();
  }

 removeProduct(productId){
    const newArray = [];
   this.cartItem.forEach((cartItem)=>{
    if (cartItem.productId !== productId){
      newArray.push(cartItem);
    }
   });
   this.cartItem = newArray;
   saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    this.cartItem.forEach((cartItem)=>{
        if ( productId === cartItem.productId) {
            matchingItem = cartItem;
             }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}

export const cart = new Cart();
console.log(cart);