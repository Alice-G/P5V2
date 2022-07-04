'use strict';

// BUG FIXME LEG BLOCK HINT TODO DEL TEST ASK

//                      BLOCK Get info from api BLOCK

const apiCatalog = `http://localhost:3000/api/products/`;
const apiOrderUrl = `http://localhost:3000/api/products/order`;

// async function getCatalog() {
//   let response = await fetch(apiCatalog);
//   const productData = await response.json();
//   if (response) {
//     displayCart(productData);
//     let catalog = productData;
//     console.log('catalog: ', catalog, typeof catalog); // this works DEL ASK this is object no array is it normal?
//   }
// }
// //calling async function
// getCatalog();

let productsInLocal = JSON.parse(window.localStorage.getItem('products')); //BLOCK A
console.log('products downloaded from local: ', productsInLocal); // DEL

let product_exists = false;
if (window.localStorage.getItem('products')) {
  product_exists = true;
}

let productsInCart = []; //ASK what is this for??????

//Récupèration des informations et affichage dans le panier
//Quand le panier est vide
if ((product_exists = false)) {
  alert(
    `Votre panier est vide. 
'OK' pour retourner sur la page d'accueil.
'Cancel' pour rester ici.`
  );
  window.location.href = 'index.html'; // TEST
} else {
  displayCart(productsInLocal);
}

function displayCart() {
  // HINT catalog is defined here

  //                DISPLAY OF ELEMENTS
  for (let localProduct in productsInLocal) {
    // productsInCart.push(productsInLocal[localProduct].id); //ASK what is this for??????

    // create a card for each product
    let productCard = document.createElement('article');
    productCard.classList.add('cart__item');
    productCard.setAttribute(
      'data-id',
      `${productsInLocal[localProduct].id}`,
      'data-color',
      `${productsInLocal[localProduct].color}`
    );
    document.getElementById('cart__items').appendChild(productCard);

    // create innerHTML
    let cartItemImg = document.createElement('div');
    cartItemImg.classList.add('cart__item__img');

    productCard.innerHTML = `<div class="cart__item__img">
    <img src="${productsInLocal[localProduct].pdctImg}" alt="${productsInLocal[localProduct].altTxt}">
    </div>
  <div class="cart__item__content">
    <div class="cart__item__content__titlePrice">
        <h2>${productsInLocal[localProduct].pdctName} - ${productsInLocal[localProduct].color}</h2>
        <p>${productsInLocal[localProduct].pdctPrice} €</p>
    </div>
    <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productsInLocal[localProduct].count}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
        </div>
    </div>
  </div>`;
    updateCart(localProduct);
  }
}

changeQty();
deletePdct();

// Update cart total quantity //TEST
function updateCart(localProduct) {
  let itemQty = document.querySelectorAll('.itemQuantity');
  //How many products are in cart?
  let lengthQty = itemQty.length,
    totalQty = 0;
  console.log('lengthQty: ', lengthQty); // FIXME the count isn't correct here

  // because it's called in each for each loop, we don't have to add up the lines

  // Add up each different product
  for (var i = 0; i < lengthQty; ++i) {
    totalQty += itemQty[i].valueAsNumber;
    // console.log('lengthQty: ', lengthQty); // DEL
    // console.log('lengthQty: ', lengthQty); // DEL
    // console.log('itemQty: ', itemQty); // DEL
  }

  //On implémente la quantité totale à l'élément HTML
  let pdctTotalQty = document.querySelector('#totalQuantity');
  pdctTotalQty.innerHTML = totalQty;
  // console.log('totalQty: ', totalQty); // DEL this works
  let totalPrice = 0;
  // console.log('totalPrice(+type): ', totalPrice, typeof totalPrice); // DEL this works

  //Calcul du total
  for (i = 0; i < lengthQty; ++i) {
    totalPrice += itemQty[i].valueAsNumber * productsInLocal[i].pdctPrice;
    // console.log('totalPrice in calcul du total: ', totalPrice); // DEL this works
  }

  let pdctTotalPrice = document.querySelector('#totalPrice');
  pdctTotalPrice.innerHTML = totalPrice;
}

// //Mise à jour du panier quand on modifie la quantité pour chaque produit
// FIXME ASK how the hell do you modify quantity? with +/-?? can't see the option. With
function changeQty() {
  let itemQty = document.getElementsByClassName('itemQuantity'); // this is the field, not the value
  console.log('itemQty.length: ', itemQty.length);

  for (let q = 0; q < itemQty.length; q++) {
    let changeQty = itemQty[q];
    //Mise à jour au moment de changer la valeur de l'input
    changeQty.addEventListener('input', function (event) {
      itemQty.innerHTML += `<input type="number" class="itemQty" name="itemQty" min="1" max="100"
            value="${event.target.value}">`; // this is what sends updated product count to "Total"

      productsInLocal[q].count = Number(changeQty.value); // this is what sends updated product count to localStorage
      localStorage.setItem('products', JSON.stringify(productsInLocal));

      updateCart(q);
    });
  }
}

// use of "Supprimer" btn
function deletePdct() {
  let deleteBtn = document.querySelectorAll('.deleteItem');
  console.log('deleteBtn: ', deleteBtn);

  for (let i = 0; i < deleteBtn.length; i++) {
    let deleteOne = deleteBtn[i];

    console.log('productsInLocal pre delete: ', productsInLocal);

    // "Supprimer" btn listener
    deleteOne.addEventListener('click', () => {
      productsInLocal.splice(i, 1);
      console.log('productsInLocal after delete: ', productsInLocal);
      localStorage.setItem('products', JSON.stringify(productsInLocal));
      alert('Ce produit a bien été supprimé du panier.');
      window.location.reload();
    });
  }
}

// BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK
// BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK
// BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK
// BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK
// BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK
// BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK
// BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK
// BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK
// BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK
// BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK
// BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK
// BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK
// BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK
// BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK
// BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK BLOCK

//    FORM VALIDATION

// regex for email and name
let regEmail = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
// var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g; // also found this: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
// var regName = /\d+$/g;
// let regName = /^[A-Za-z]+$/;
// let regName = /\d+\w/;
let regName = /^[a-z\d]{2,12}$/; // min 2 characters, max 12 // do I need to specify - included here? how does test work? FIXME

let orderBtn = document.getElementById('order');
orderBtn.addEventListener('click', function () {
  // if fields are empty
  if (
    document.getElementById('firstName').value == '' ||
    regName.test(document.getElementById('firstName').value)
  ) {
    document.getElementById(
      'firstNameErrorMsg'
    ).innerHTML = `Veuillez entrer votre nom correctement.`;
    return false;
  }
  // if (document.getElementById('lastName').value == '') {
  //   console.log('last name empty');
  //   document.getElementById(
  //     'lastNameErrorMsg'
  //   ).innerHTML = `Ce champ ne peut pas rester vide.`;
  //   return false;
  // }
  // if (document.getElementById('address').value == '') {
  //   console.log('last name empty');
  //   document.getElementById(
  //     'addressErrorMsg'
  //   ).innerHTML = `Vous devez renseigner votre adresse.`;
  //   return false;
  // }
  // if (document.getElementById('city').value == '') {
  //   console.log('oops');
  //   document.getElementById(
  //     'cityErrorMsg'
  //   ).innerHTML = `Vous devez renseigner votre adresse.`;
  //   return false;
  // }
  // if (document.getElementById('email').value == '') {
  //   console.log('no email');
  //   document.getElementById(
  //     'emailErrorMsg'
  //   ).innerHTML = `Nous avons besoin de votre adresse mail.`;
  //   return false;
  // }
});

// Form validation code will come here.
// function validateForm() {
//   if (document.formblock.firstName.value == '') {
//     alert('Please provide your name!');
// document.myForm.Name.focus();
// return false;
// }
// if (document.myForm.EMail.value == '') {
//   alert('Please provide your Email!');
//   document.myForm.EMail.focus();
//   return false;
// }
// if (
//   document.myForm.Zip.value == '' ||
//   isNaN(document.myForm.Zip.value) ||
//   document.myForm.Zip.value.length != 5
// ) {
//   alert('Please provide a zip in the format #####.');
//   document.myForm.Zip.focus();
//   return false;
// }
// if (document.myForm.Country.value == '-1') {
//   alert('Please provide your country!');
//   return false;
// }
// return true;
// }

// BLOCK BLOCK BLOCK BLOCK
/* <div class="cart__order">
<form method="get" class="cart__order__form">
  <div class="cart__order__form__question">
    <label for="firstName">Prénom: </label>
    <input type="text" name="firstName" id="firstName" required>
    <p id="firstNameErrorMsg"><!-- ci est un message d'erreur --></p>
  </div>
  <div class="cart__order__form__question">
    <label for="lastName">Nom: </label>
    <input type="text" name="lastName" id="lastName" required>
    <p id="lastNameErrorMsg"></p>
  </div>
  <div class="cart__order__form__question">
    <label for="address">Adresse: </label>
    <input type="text" name="address" id="address" required>
    <p id="addressErrorMsg"></p>
  </div>
  <div class="cart__order__form__question">
    <label for="city">Ville: </label>
    <input type="text" name="city" id="city" required>
    <p id="cityErrorMsg"></p>
  </div>
  <div class="cart__order__form__question">
    <label for="email">Email: </label>
    <input type="email" name="email" id="email" required>
    <p id="emailErrorMsg"></p>
  </div>
  <div class="cart__order__form__submit">
    <input type="submit" value="Commander !" id="order">
  </div>
</form>
</div> */
