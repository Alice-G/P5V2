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

  let availableColors = `${item.colors}`;
  console.log(availableColors); // DEL

  let colorSelector = document.querySelector('colors');
  let select = document.querySelector('select');
  console.log(select); // DEL

  for (let i = 0; i < availableColors.length; i++) {
    let option = document.createElement('option');
    option.text = availableColors[i];
    option.value = availableColors[i];
    if (option) {
      colorSelector.add(option);
    }
  }
}
