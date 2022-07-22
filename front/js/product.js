'use strict';

// BUG FIXME LEG BLOCK HINT TODO DEL TEST ASK

//                         DISPLAY PRODUCT INFO ON PAGE

// Get the id off of current page url
let idParam = window.location.search;
let params = new URLSearchParams(idParam);

let chosenProduct;
if (params.has('id')) {
  chosenProduct = params.get('id');
} else {
  window.location.href = '../html/index.html';
}

// use id to fill page.
const apiProductURL = `http://localhost:3000/api/products/${chosenProduct}`;

async function getProduct() {
  let response = await fetch(apiProductURL);
  const productData = await response.json();
  if (response) {
    displayProduct(productData);
  }
}
//calling async function
getProduct();

function displayProduct(item) {
  //   product pic
  let newImgContainer = document.createElement('div');
  newImgContainer.innerHTML = `<img src="${item.imageUrl}" alt="${item.altTxt}"/>`;
  document.querySelector('.item__img').appendChild(newImgContainer);
  //product name
  document.getElementById('title').innerHTML = `${item.name}`;
  // product price
  document.getElementById('price').innerHTML = `${item.price}`;
  // product description
  document.getElementById('description').innerHTML = `${item.description}`;

  let availableColors = item.colors;
  let colorSelector = document.getElementById('colors');

  let option;
  for (let color of availableColors) {
    option = document.createElement('option');
    option.text = color;
    option.value = color;
    colorSelector.add(option);
  }

  //                MAKE BUTTON FUNCTIONAL W/ CHECKS & LOCAL STORAGE

  // sending loaded product info to local storage for use in addBasket
  let pdctName = item.name;
  let pdctPrice = item.price;
  let pdctImg = item.imageUrl;
  let altTxt = item.altTxt;
  let throwToHeap = [pdctName, pdctPrice, pdctImg, altTxt];
  window.localStorage.setItem('throwToHeap', JSON.stringify(throwToHeap));
}

// function to call at the very end to give user choice to move on to cart page or stay on page
const goOrStay = () => {
  if (
    window.confirm(`Cliquez sur OK pour voir votre panier.
  Pour continuer vos achats, appuyez sur 'Cancel'.`)
  ) {
    window.location.href = '../html/cart.html';
    // console.log('redirect');
  } else {
    // do nothing and stay on page
    // console.log('no redirect');
    return false;
  }
};

// validation of product choice
function checkProduct() {
  var select = document.getElementById('colors');
  let colorChoice = select.options[select.selectedIndex].value;
  let chosenQty = document.getElementById('quantity').value;
  // validate color choice
  if (colorChoice == '') {
    alert("N'oubliez pas de selectionner une couleur !");
  } else if (chosenQty < 1) {
    // validate quantity = at least one
    alert('Il vous faut au moins un canapé à mettre dans le panier...');
  } else if (chosenQty > 100) {
    // validate quantity = no more than 100
    alert(`:(
Vous ne pouvez pas commander plus de 100 produits identiques.`);
  } else {
    // verification came out ok ->
    addBasket(colorChoice, chosenQty);
  }
}

// array for products that are added to cart
let products = [];

// last checks and add to cart
const addBasket = (colorChoice, chosenQty) => {
  // get product JSON info that was fetched and saved in LocalStorage
  let recupFromHeap = JSON.parse(localStorage.getItem('throwToHeap'));

  // create an object for current product chosen, to add to the cart
  let newAdd = {
    id: chosenProduct,
    color: colorChoice,
    count: chosenQty,
    pdctName: recupFromHeap[0],
    pdctPrice: recupFromHeap[1],
    pdctImg: recupFromHeap[2],
    altTxt: recupFromHeap[3],
  };
  // boolean variables to simplify code
  let productsInCart = false;
  let productExists = false;

  // START OF POSSIBILITIES TREE
  // is there something in the cart?
  if (window.localStorage.getItem('products')) {
    productsInCart = true;
  }

  if (!productsInCart) {
    // cart is empty
    // console.log('nothing in cart array');

    // push new product to cart array
    products.push(newAdd);
    window.localStorage.setItem('products', JSON.stringify(products));

    // call go or stay
    goOrStay();
  } else {
    // cart isn't empty
    // console.log('there are products in cart array');

    // import of cart array
    products = JSON.parse(window.localStorage.getItem('products'));

    // is newAdd similar to a product already in the cart?
    let existingPdct;
    for (let loggedProduct of products) {
      if (
        loggedProduct.id === newAdd.id &&
        loggedProduct.color === newAdd.color
      ) {
        productExists = true;
        // i use this to make loggedProduct exist outside loop
        existingPdct = loggedProduct;
      }
    }

    if (!productExists) {
      // new clicked product isn't the same as the one(s) already in the cart
      // console.log("the product isn't the same as previous one");

      // push of new product
      products.push(newAdd);
      window.localStorage.setItem('products', JSON.stringify(products)); //
      // console.log('pushed new product');

      goOrStay();
    } else {
      // new clicked product is the same as one already in the cart
      console.log('the product exists in the cart');

      // change count of existingPdct in array and then push it back up to the local storage

      // add up qty of new click and same already in cart
      // parsed so that they are not strings
      let newQty = parseInt(existingPdct.count) + parseInt(newAdd.count);
      existingPdct.count = newQty;

      // check if the total is above 100
      if (newAdd.count > 100) {
        alert(`:(
      Vous ne pouvez pas commander plus de 100 produits identiques.`);
      } else {
        // console.log('added up quantity is acceptable');
        // update quantity of existing product, keep other products
        window.localStorage.setItem('products', JSON.stringify(products));
        console.log('pushed new qty');

        goOrStay();
      }
    }
  }
  // console.log('log of local storage at end: ', window.localStorage);
};

// select button
let addToCartBtn = document.getElementById('addToCart');
addToCartBtn.addEventListener('click', checkProduct);
