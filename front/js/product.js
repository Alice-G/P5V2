'use strict';

// BUG FIXME LEG BLOCK HINT TODO DEL TEST ASK

//                      BLOCK Product Page BLOCK

// Get the id off of current page url
let idParam = window.location.search;
// console.log(idParam); // DEL
let params = new URLSearchParams(idParam);
// console.log(params); // DEL

let chosenProduct;
if (params.has('id')) {
  chosenProduct = params.get('id');
  //   console.log(chosenProduct); // DEL
}

// ASK if no id, default back to home page?
// ASK should i try to create the elements and skip the divs?

// use id to fill page.

const apiProductURL = `http://localhost:3000/api/products/${chosenProduct}`;
// console.log(apiProductURL); // DEL

async function getProduct() {
  let response = await fetch(apiProductURL);
  const productData = await response.json();
  //   console.log(typeof productData, productData); //DEL
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
  // populate the color options
  // TODO how do do colors?

  let availableColors = item.colors;
  //   console.log('availableColors: ', availableColors, typeof availableColors); // DEL

  let colorSelector = document.getElementById('colors');
  let select = document.querySelector('select');
  //   console.log(select); // DEL

  let option;
  for (let color of availableColors) {
    option = document.createElement('option');
    option.text = color;
    option.value = color;
    colorSelector.add(option);
    // console.log('option created: ', option); // DEL
  }
  // because we'll need to get a param from here
  // is this where the event handler goes???
}

// TODO make button click require a color. In this case, the value of 'select one' is empty. use that.
// Allow it to work also if and only if number of articles is between 1 and 100

const checkProduct = () => {
  // validate color choice
  var select = document.getElementById('colors');
  let colorChoice = select.options[select.selectedIndex].value;
  if (colorChoice == '') {
    alert("N'oubliez pas de selectionner une couleur !");
    // return false; // ASK what is this used for?
  } else {
    // console.log('this is the colorChoice: ', colorChoice); // DEL

    // validate quantity at least one
    let chosenQty = document.getElementById('quantity').value;
    if (chosenQty < 1) {
      alert('Il vous faut au moins un canapé à mettre dans le panier...');
    } else if (chosenQty > 100) {
      alert("Choisissez un numbre inférieur à 100, s'il vous plait.");
    } else {
      //   console.log('chosenQty now: ', chosenQty); // DEL
      addBasket(colorChoice, chosenQty);
    }
  }
};

const addBasket = (colorChoice, chosenQty) => {
  // create an object for current product chosen, to add to the cart
  let newAdd = { id: chosenProduct, color: colorChoice, count: chosenQty };

  let products = [];
  let product_exists = false;
  // if there's something in basket
  if (window.localStorage.getItem('products')) {
    // console.log("something's in the basket"); // DEL
    let products = JSON.parse(window.localStorage.getItem('products'));
    // seeing if there's a match in what's stored
    console.log(JSON.stringify(products).indexOf(JSON.stringify(newAdd)));
    //check if a product exist in cart
    console.log('products downloaded from local: ', products);

    for (let loggedProduct of products) {
      if (
        loggedProduct.id === newAdd.id &&
        loggedProduct.color === newAdd.color
      ) {
        product_exists = true;
        // loggedProduct.count is a string. Work around to make it a number:
        loggedProduct.count = parseInt(loggedProduct.count);
        loggedProduct.count += 1;

        // console.log('count after: ', loggedProduct.count); // DEL
      }
    }

    if (product_exists) {
      window.localStorage.setItem('products', JSON.stringify(products));
    } else {
      products.push(newAdd);
      window.localStorage.setItem('products', JSON.stringify(products));
      console.log('pushed new product');
    }
  } else {
    // if there's nothing in basket
    // console.log('the basket was empty'); // DEL
    products.push(newAdd);
    window.localStorage.setItem('products', JSON.stringify(products));
  }

  console.log('log of local storage at end: ', window.localStorage);
  // TODO then ask 'continue shopping/go to cart'?
  //is there html support?
};

// if validation is no go: preventDefault()?

// select button
let addToCartBtn = document.getElementById('addToCart');
// console.log(addToCartBtn); // DEL
// add event handler
addToCartBtn.addEventListener('click', checkProduct);
