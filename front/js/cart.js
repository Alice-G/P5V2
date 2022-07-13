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
// console.log('products downloaded from local: ', productsInLocal); // DEL

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
  // console.log('lengthQty: ', lengthQty); // FIXME the count isn't correct here

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
  // console.log('itemQty.length: ', itemQty.length); // DEL

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

  for (let i = 0; i < deleteBtn.length; i++) {
    let deleteOne = deleteBtn[i];

    // console.log('productsInLocal pre delete: ', productsInLocal); // DEL

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

//                         FORM VALIDATION
// form fields selection
let form = document.querySelector('.cart__order__form');

let firstName = document.getElementById('firstName');
let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');

let lastName = document.getElementById('lastName');
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');

let address = document.getElementById('address');
let addressErrorMsg = document.getElementById('addressErrorMsg');

let city = document.getElementById('city');
let cityErrorMsg = document.getElementById('cityErrorMsg');

let email = document.getElementById('email');
let emailErrorMsg = document.getElementById('emailErrorMsg');

let orderBtn = document.getElementById('order');
console.log('orderBtn: ', orderBtn);

// regExs
let regName = new RegExp("^(?:[A-zÀ-ÿ ]|[-|'](?=[A-z]))*[-']?$"); // allows letters, "-", "'" but not double uses, and " "
let regAddress = new RegExp(
  "/^(?:[A-zÀ-ÿ0-9 ,]{10,}|[-|'](?=[A-z]))*[-',]?$/gm"
); // allows numbers, letters, "-", "'" but not double uses, and " "
//FIXME it doesn't work with commas
let regCity = regName;
let regEmail = new RegExp(
  '/^([a-zd.-]+)@([a-zd-]+).([a-z]{2,8})(.[a-z]{2,8})?$/'
); // imposes use of @ somewhere and a domain

// validation functions
function validateFirstName() {
  // do i need to set a 'is false' at the start or do i need to return false in this? TEST
  if (!firstName.value || regName.test(firstName.value) == false) {
    console.log('first name invalid'); // DEL
    firstNameErrorMsg.innerHTML = `Veuillez entrer votre Prénom correctement.`;
    firstName.focus();
    return false;
  } else {
    firstNameErrorMsg.innerHTML = ``;
    return true;
  }
}

function validateLastName() {
  if (!lastName.value || regName.test(lastName.value) == false) {
    console.log('last name invalid');
    lastNameErrorMsg.innerHTML = `Veuillez entrer un nom valide.`;
    lastName.focus();
  } else {
    lastNameErrorMsg.innerHTML = ``;
    return true;
  }
}

function validateAddress() {
  if (!address.value || regAddress.test(address.value) == false) {
    console.log('address invalid');
    addressErrorMsg.innerHTML = `Ceci n'est pas une addresse valide.`;
    address.focus();
  } else {
    addressErrorMsg.innerHTML = ``;
    return true;
  }
}

function validateCity() {
  if (!city.value || regCity.test(city.value) == false) {
    console.log('first name invalid');
    cityErrorMsg.innerHTML = `Ceci n'est pas une addresse valide.`;
    city.focus();
    // return false; // ???
  } else {
    cityErrorMsg.innerHTML = ``;
    return true;
  }
}

function validateEmail() {
  if (!email.value || regEmail.test(email.value) == false) {
    console.log('first name invalid');
    emailErrorMsg.innerHTML = `Ceci n'est pas un email valide.`;
    email.focus();
    // return false;
  } else {
    emailErrorMsg.innerHTML = ``;
    return true;
  }
}

// because form fields have 'required', there is no need to check if they are empty on submit

function validateForm() {
  validateFirstName();
  validateLastName();
  validateAddress();
  validateCity();
  validateEmail();
  console.log('val first name', validateFirstName());
  console.log('val last name', validateLastName());
  console.log('val address', validateAddress());
  console.log('val city', validateCity());
  console.log('val email', validateEmail());

  if (
    validateFirstName() &&
    validateLastName() &&
    validateAddress() &&
    validateCity() &&
    validateEmail() === true
  ) {
    console.log('good to go!');
    // this is where shit happens
    // log everything in POST
    // clear local
    // reload?
    // change window.location?
    // alert?
  } else {
    console.log('nope'); // DEL this whole else after
  }
}

orderBtn.addEventListener('click', function (e) {
  // prevent the form from submitting
  // e.preventDefault();
  validateForm(); // HINT do i need the () here?
});

// form.addEventListener('submit', function (e) {
//   // prevent the form from submitting
//   e.preventDefault();
//   validateForm; // HINT do i need the () here?
// });

//Invalide le bouton d'envoi et enable le quant tous les champs seront correctement renseignés. "Change" y a peut être mieux du coup comme event à écouter.

// at first try of validation, no reaction at all.

// errors
let orderStatus; // FIXME I don't know how to do this

// orderBtn.preventDefault();

console.log('orderStatus: ', orderStatus);
