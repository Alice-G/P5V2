'use strict';

// BUG FIXME LEG BLOCK HINT TODO DEL TEST ASK

// ASK Do I create an 'empty' message of 'Vous n'avez pas de produits dans votre panier'?

//                      BLOCK Get info from api BLOCK

const apiCatalog = `http://localhost:3000/api/products/`;

async function getCatalog() {
  let response = await fetch(apiCatalog);
  const productData = await response.json();
  if (response) {
    displayCart(productData);
  }
}
//calling async function
getCatalog();

function displayCart(item) {
  //              BLOCK Get info from local storage BLOCK

  console.log('display catalog: ', item);

  let products = [];
  let product_exists = false;
  // if there's something in local
  if (window.localStorage.getItem('products')) {
    // console.log("something's in the basket"); // DEL
    let products = JSON.parse(window.localStorage.getItem('products'));
    console.log('products downloaded from local: ', products);
    product_exists = true;
    // do a     if (product_exists) {} else {'there's nothing in cart}

    //              BLOCK Get info from target DOM BLOCK

    let cartContainer = document.getElementById('cart__items');
    console.log(cartContainer); // DEL this works

    for (let cartProduct of products) {
      // console.log('cartProduct', cartProduct); // DEL this works

      // FIXME my problem is using ID of cart to import catalog info

      // create article for each cartProduct
      let displayedCartProduct = document.createElement('div');
      displayedCartProduct.classList.add('cart__item');
      displayedCartProduct.innerHTML = `<data-id="${item.id}" data-color="${item.color}>" style="border:1px dashed red;"`; // FIXME
      cartContainer.appendChild(displayedCartProduct);
      // product pic
      let newImgContainer = document.createElement('div');
      newImgContainer.innerHTML = `<img src="${item.imageUrl}" alt="${item.altTxt}" style="border:1px dashed green;"/>`; // FIXME TODO image undefined etc
      displayedCartProduct.appendChild(newImgContainer);

      // -  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
      // <div class="cart__item__img">
      //   <img src="../images/product01.jpg" alt="Photographie d'un canapé">
      // </div>
    }
  } else {
    alert('Your basket is empty'); // TODO TEST
    // product_exists stays false DEL TEST
    console.log(product_exists); // TEST DEL
  }
}

//                              HINT HTML to create HINT

/* <section id="cart__items">
<!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
   <div class="cart__item__img">
     <img src="../images/product01.jpg" alt="Photographie d'un canapé">
   </div>
   <div class="cart__item__content">
     <div class="cart__item__content__description">
       <h2>Nom du produit</h2>
       <p>Vert</p>
       <p>42,00 €</p>
     </div>
     <div class="cart__item__content__settings">
       <div class="cart__item__content__settings__quantity">
         <p>Qté : </p>
         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
       </div>
       <div class="cart__item__content__settings__delete">
         <p class="deleteItem">Supprimer</p>
       </div>
     </div>
   </div>
 </article> --> */
