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
    console.log('products downloaded from local: ', products); // DEL
    product_exists = true;

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

//                  BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK

//                  BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK

//                  BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK

//                  BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK

//                  BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK

//                  BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK

//                  BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK

// TODO check url here?

const urlKanap = 'http://localhost:3000/api/products/order';
//Importation du localStorage
let saveInLocalStorage = JSON.parse(localStorage.getItem('product'));
//console.table(saveInLocalStorage);

//Création d'un tableau pour le panier
let productArray = [];
const itemPosition = document.querySelector('#cart__items');

//Récupèration des informations et affichage dans le panier
//Quand le panier est vide
if (saveInLocalStorage === null || saveInLocalStorage == 0) {
  alert(
    "Votre panier est vide. Allez sur la page d'accueil pour choisir vos articles !"
  );
  window.location.href = 'index.html';
} else {
  for (let product in saveInLocalStorage) {
    //Ajout de l'élément "article" avec récupération de l'id
    let productArticle = document.createElement('article');
    productArticle.classList.add('cart__item');
    productArticle.setAttribute(
      'data-id',
      '{saveInLocalStorage[product].productId}'
    );
    productArray.push(saveInLocalStorage[product].productId);

    //Ajout des éléments HTML
    productArticle.innerHTML = `<div class="cart__item__img">
            <img src="${saveInLocalStorage[product].productImg}" alt="${saveInLocalStorage[product].productImg_alt}">
            </div>
          <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
                <h2>${saveInLocalStorage[product].productName} - ${saveInLocalStorage[product].productColors}</h2>
                <p>${saveInLocalStorage[product].productPrice} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${saveInLocalStorage[product].productQuantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
          </div>`;
    itemPosition.appendChild(productArticle);

    updateCart(product);
  }
}

changeQuantity();
deleteProduct();

//Mise à jour de la quantité totale du panier
function updateCart(product) {
  var itemQuantity = document.querySelectorAll('.itemQuantity');
  //Déclare une variable qui récupère le nombre de produits différents dans le panier
  var lengthQuantity = itemQuantity.length,
    totalQuantity = 0;

  //Ajoute la valeur pour chaque produit à la quantité totale
  for (var i = 0; i < lengthQuantity; ++i) {
    totalQuantity += itemQuantity[i].valueAsNumber;
  }

  //On implémente la quantité totale à l'élément HTML
  let productTotalQuantity = document.querySelector('#totalQuantity');
  productTotalQuantity.innerHTML = totalQuantity;
  //console.log(totalQuantity);
  totalPrice = 0;

  //Calcul du total
  for (var i = 0; i < lengthQuantity; ++i) {
    totalPrice +=
      itemQuantity[i].valueAsNumber * saveInLocalStorage[i].productPrice;
  }

  let productTotalPrice = document.querySelector('#totalPrice');
  productTotalPrice.innerHTML = totalPrice;
  //console.log(totalPrice);
}

//Mise à jour du panier quand on modifie la quantité pour chaque produit
function changeQuantity() {
  let itemQuantity = document.getElementsByClassName('itemQuantity');
  //console.log(itemQuantity);

  for (let q = 0; q < itemQuantity.length; q++) {
    let changeQuantity = itemQuantity[q];
    //Mise à jour au moment de changer la valeur de l'input
    changeQuantity.addEventListener('input', (event) => {
      itemQuantity.innerHTML += `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" 
            value="${event.target.value}">`;

      saveInLocalStorage[q].productQuantity = Number(changeQuantity.value);

      localStorage.setItem('product', JSON.stringify(saveInLocalStorage));

      updateCart(q);
    });
  }
}

//Suppression d'un produit du panier grâce au bouton
function deleteProduct() {
  let btn_delete = document.querySelectorAll('.deleteItem');
  //console.log(btn_delete);

  for (let i = 0; i < btn_delete.length; i++) {
    let deleteOne = btn_delete[i];

    //Ecoute du bouton "Supprimer"
    deleteOne.addEventListener('click', (event) => {
      saveInLocalStorage.splice(i, 1);
      localStorage.setItem('product', JSON.stringify(saveInLocalStorage));
      alert('Ce produit a bien été supprimé du panier.');
      window.location.reload();
    });
  }
}
