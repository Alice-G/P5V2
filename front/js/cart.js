'use strict';

const apiURL = 'http://localhost:3000/api/products';

// import from localStorage
let productsInLocal = JSON.parse(window.localStorage.getItem('products'));
// console.log('products downloaded from local: ', productsInLocal);

let product_exists = false;
if (window.localStorage.getItem('products')) {
  product_exists = true;
}

// import prices from API to complete
async function getCompleteCart() {
  // storing response
  let response = await fetch(apiURL);
  // Storing data in form of JSON
  const catalog = await response.json();

  // for
  for (let localProduct of productsInLocal) {
    for (let catalogItem of catalog) {
      if (catalogItem._id === localProduct.id) {
        localProduct.price = catalogItem.price;
      }
    }
  }
  return productsInLocal;
}

async function displayPage() {
  const cart = await getCompleteCart();
  displayCart(cart);
  changeQty();
  deletePdct();
}

//Récupèration des informations et affichage dans le panier
//Quand le panier est vide
if (!product_exists) {
  confirm(
    `Votre panier est vide. 
'OK' pour retourner sur la page d'accueil.
'Cancel' pour rester ici.`
  );
  window.location.href = 'index.html';
} else {
  displayPage();
}

//                DISPLAY OF ELEMENTS
function displayCart() {
  for (let localProduct in productsInLocal) {
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
        <p>${productsInLocal[localProduct].price} €</p>
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

// Update cart total quantity
function updateCart(localProduct) {
  let itemQty = document.querySelectorAll('.itemQuantity');
  //How many different products (id/color combo) are in cart?
  let lengthQty = itemQty.length,
    totalQty = 0;
  // because it's called in each for each loop, we don't have to add up the lines

  // Add up each different product
  for (var i = 0; i < lengthQty; ++i) {
    totalQty += itemQty[i].valueAsNumber;
  }

  // Total Qty display
  let pdctTotalQty = document.querySelector('#totalQuantity');
  pdctTotalQty.innerHTML = totalQty;
  let totalPrice = 0;

  // Total Price display
  for (i = 0; i < lengthQty; ++i) {
    totalPrice += itemQty[i].valueAsNumber * productsInLocal[i].price;
  }

  let pdctTotalPrice = document.querySelector('#totalPrice');
  pdctTotalPrice.innerHTML = totalPrice;
}

// live check & update pdct qty
function changeQty() {
  let itemQty = document.getElementsByClassName('itemQuantity'); // this is the field, not the value

  // for each line (each of the different products)
  for (let q = 0; q < itemQty.length; q++) {
    let changeQty = itemQty[q];

    // regex to only allow integers
    let regInt = new RegExp('[^0-9]');

    // listen to change of input value
    changeQty.addEventListener('change', function (event) {
      console.log('changeQty.value: ', changeQty.value);
      // new qty > 100?
      if (changeQty.value > 100) {
        console.log('not allowed');
        alert(`:(
Vous ne pouvez pas commander plus de 100 produits identiques.`);
        // force return to previous valid value
        changeQty.value = productsInLocal[q].count;

        // new qty < 1
      } else if (changeQty.value < 1) {
        // console.log('not allowed');
        alert(`:(
Vous ne pouvez pas commander moins de 1 produit identiques.`);
        // force return to previous valid value
        changeQty.value = productsInLocal[q].count;

        // new qty = integer ?
      } else if (regInt.test(changeQty.value) == true) {
        // console.log('not an integer');

        alert(`:(
Vous ne pouvez commander que des canapés entiers. ;)`);
        // force return to previous valid value
        changeQty.value = productsInLocal[q].count;

        // if number is accepted
      } else {
        // console.log('allowed');
        let newProposedQty = changeQty.value;

        itemQty.innerHTML += `<input type="number" class="itemQty" name="itemQty" min="1" max="100"
              value="${event.target.value}">`; // this is what sends updated product count to "Total"

        productsInLocal[q].count = Number(newProposedQty); // this is what sends updated product count to localStorage
        localStorage.setItem('products', JSON.stringify(productsInLocal));
        updateCart(q);
      }
    });
  }
}

// use of delete btn
function deletePdct() {
  let deleteBtn = document.querySelectorAll('.deleteItem');

  for (let i = 0; i < deleteBtn.length; i++) {
    let deleteOne = deleteBtn[i];

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

// regExs
let regName = new RegExp("^(?:[A-zÀ-ÿ ]|[-|'](?=[A-z]))*[-']?$");
// allows letters, "-", "'" but not double uses, and " "

let regAddress = /^(?!.*([ ,'-])\1)([a-zÀ-ÿ0-9 ,'-]){10,}$/i;
// allows numbers, letters, "-", "'", "," but not double uses, and " "
let regCity = regName;
let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// imposes use of @ somewhere and a domain

// validation functions
function validateFirstName() {
  if (!firstName.value || regName.test(firstName.value) == false) {
    // console.log('first name invalid');
    firstNameErrorMsg.innerHTML = `Veuillez entrer votre Prénom correctement.`;
    firstName.focus();
    return false;
  } else {
    firstNameErrorMsg.innerHTML = ``;
    // console.log('first name is valid');
    return true;
  }
}

function validateLastName() {
  if (!lastName.value || regName.test(lastName.value) == false) {
    // console.log('last name invalid');
    lastNameErrorMsg.innerHTML = `Veuillez entrer un nom valide.`;
    lastName.focus();
    return false;
  } else {
    lastNameErrorMsg.innerHTML = ``;
    // console.log('last name is valid');
    return true;
  }
}

function validateAddress() {
  if (!address.value || regAddress.test(address.value) == false) {
    // console.log('address invalid');
    addressErrorMsg.innerHTML = `Ceci n'est pas une adresse valide.`;
    address.focus();
    return false;
  } else {
    // console.log('address valide');
    addressErrorMsg.innerHTML = ``;
    return true;
  }
}

function validateCity() {
  if (!city.value || regCity.test(city.value) == false) {
    // console.log('city invalid');
    cityErrorMsg.innerHTML = `Ceci n'est pas une addresse valide.`;
    city.focus();
    return false; // ???
  } else {
    cityErrorMsg.innerHTML = ``;
    // console.log('city is valid');
    return true;
  }
}

function validateEmail() {
  if (!email.value || regEmail.test(email.value) == false) {
    // console.log('email invalid');
    emailErrorMsg.innerHTML = `Ceci n'est pas un email valide.`;
    email.focus();
    return false;
  } else {
    emailErrorMsg.innerHTML = ``;
    // console.log('email is valid');
    return true;
  }
}

// because form fields have 'required', there is no need to check if they are empty on submit

function validateForm() {
  // console.log('val first name: ', validateFirstName());
  // console.log('val last name', validateLastName());
  // console.log('val address', validateAddress());
  // console.log('val city', validateCity());
  // console.log('val email', validateEmail());
  // (this is used to test whether the bollean testing works, but caution: it doesn't matter much here, but this notation means they are also called while the log is done)

  // no need to call funtions before because they'll be called in the check
  if (
    validateFirstName() &&
    validateLastName() &&
    validateAddress() &&
    validateCity() &&
    validateEmail() === true
  ) {
    // console.log('form validated,  placing order');
    placeOrder();
  }
}

orderBtn.addEventListener('click', function (e) {
  // prevent the form from submitting
  e.preventDefault();
  validateForm();
});

function placeOrder() {
  if (!productsInLocal) {
    alert('Il vous faut des produits à commander.');
    // will not be used unless the empty cart check is removed
  } else {
    let orderedPdcts = [];
    for (let i = 0; i < productsInLocal.length; i++) {
      orderedPdcts.push(productsInLocal[i].id);
    }

    const orderInfo = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: orderedPdcts,
    };

    // Requête POST sur l'API
    const options = {
      method: 'POST',
      body: JSON.stringify(orderInfo),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch('http://localhost:3000/api/products/order', options)
      .then((results) => results.json())
      .then((data) => {
        // add order ID to confirmation page url
        document.location.href = 'confirmation.html?id=' + data.orderId;
      })
      .catch(function (error) {
        console.log('Erreur fetch' + error);
      });
  }
}
