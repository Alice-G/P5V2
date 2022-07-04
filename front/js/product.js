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

  let availableColors = item.colors;
  let colorSelector = document.getElementById('colors');
  // let select = document.querySelector('select'); // DEL never used

  let option;
  for (let color of availableColors) {
    option = document.createElement('option');
    option.text = color;
    option.value = color;
    colorSelector.add(option);
  }

  // sending loaded product info to local storage for use in addBasket

  let pdctName = item.name;
  let pdctPrice = item.price;
  let pdctImg = item.imageUrl;
  let altTxt = item.altTxt;
  console.log('pdct Name in display: ', pdctName);

  let throwToHeap = [pdctName, pdctPrice, pdctImg, altTxt];

  window.localStorage.setItem('throwToHeap', JSON.stringify(throwToHeap));
}

const checkProduct = () => {
  // validate color choice
  var select = document.getElementById('colors');
  let colorChoice = select.options[select.selectedIndex].value;
  if (colorChoice == '') {
    alert("N'oubliez pas de selectionner une couleur !");
  } else {
    // console.log('this is the colorChoice: ', colorChoice); // DEL

    // validate quantity at least one
    let chosenQty = document.getElementById('quantity').value;
    if (chosenQty < 1) {
      alert('Il vous faut au moins un canapé à mettre dans le panier...');
      // } else if (chosenQty > 100) {
      //   alert("Choisissez un numbre inférieur à 100, s'il vous plait.");
    } else {
      //   console.log('chosenQty now: ', chosenQty); // DEL

      addBasket(colorChoice, chosenQty);
    }
  }
};

const addBasket = (colorChoice, chosenQty) => {
  let thrownToLocal = JSON.parse(localStorage.getItem('throwToHeap'));
  console.log('thrownToLocal: ', thrownToLocal); // DEL

  // create an object for current product chosen, to add to the cart
  let newAdd = {
    id: chosenProduct,
    color: colorChoice,
    count: chosenQty,
    pdctName: thrownToLocal[0],
    pdctPrice: thrownToLocal[1],
    pdctImg: thrownToLocal[2],
    altTxt: thrownToLocal[3],
  };
  console.log('newAdd: ', newAdd); //DEL

  let products = [];
  let product_exists = false;
  // if there's something in basket BLOCK 1
  if (window.localStorage.getItem('products')) {
    console.log("block 1, something's in the basket"); // DEL

    // is new add the same than pdct already logged
    let products = JSON.parse(window.localStorage.getItem('products'));
    // console.log(JSON.stringify(products).indexOf(JSON.stringify(newAdd))); // comment out

    console.log('products downloaded from local: ', products); // DEL

    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME
    // FIXME FIXME FIXME This is the block who branches out wrong when there's a NEW new product added and WHY??????

    // BLOCK 5
    for (let loggedProduct of products) {
      if (
        loggedProduct.id === newAdd.id &&
        loggedProduct.color === newAdd.color
      ) {
        console.log('block 5, checking if things in basket are same');
        console.log(
          'block 5, loggedProduct: ',
          loggedProduct,
          'loggedProduct.id: ',
          loggedProduct.id,
          'newAdd: ',
          newAdd,
          'newAdd.id: ',
          newAdd.id
        );
        // the new log is the same as a product in the basket
        product_exists = true;
        // loggedProduct.count newAdd.count are strings. Work around to make them a number:
        loggedProduct.count = parseInt(loggedProduct.count);
        newAdd.count = parseInt(newAdd.count);

        // if new pdct qty + local qty > 100 BLOCK 6
        if (loggedProduct.count + parseInt(newAdd.count) > 100) {
          // BLOCK 7

          console.log(
            'block 7, something in the basket, same in basket, total count over 100'
          ); // DEL
          alert(`:(
Vous ne pouvez pas commander plus de 100 produits identiques.`);
          // do I need to return false or return here?
        } else {
          // BLOCK 8
          // new pdct qty + local qty <= 100
          console.log(
            'block 8, something in the basket, same in basket, total count ok'
          ); //DEL
          loggedProduct.count = loggedProduct.count + newAdd.count;

          console.log(
            'loggedProduct.count count after block 8',
            loggedProduct.count,
            'type: ',
            typeof loggedProduct.count
          );

          // push of new pdt quantity TODO
          // products.push(newAdd); // not it, right???
          window.localStorage.setItem('products', JSON.stringify(products)); // is this it??? TEST
          console.log('pushed new qty mybe?'); // DEL

          // go to cart or stay?
          if (
            window.confirm(`Cliquez sur OK pour voir votre panier.
          Pour continuer vos achats, appuyez sur 'Cancel'.`)
          ) {
            // window.location.href = '../html/cart.html'; // TODO TOGGLE
            console.log('redirect'); // DEL
          } else {
            // do nothing and stay on page
            // TODO make it reload?
            console.log('no redirect'); // DEL
            return false;
          }
        }

        // console.log('count after: ', loggedProduct.count); // DEL
      } else {
        console.log('block 9, product in basket is different');
        // TODO is qty of new add over 100? BLOCK 9 TEST
        if (newAdd.count > 100) {
          // TODO if yes alert and stop function BLOCK 10
          console.log(
            'block 10, the quantity is over 100, type of newAdd.count: ',
            newAdd.count,
            typeof newAdd.count
          );
          alert(`:(
Vous ne pouvez pas commander plus de 100 produits identiques.`);
          // do i need return here? I don't think so cause it's an 'end'? TODO TEST
        } else {
          // if no log + go/stay BLOCK 11
          console.log('block 11, quantity is ok');
          console.log(
            'type of newAdd.count: ',
            newAdd.count,
            typeof newAdd.count
          );

          // push of new pdt
          products.push(newAdd);
          window.localStorage.setItem('products', JSON.stringify(products)); // is this it??? TEST
          console.log('block 11, pushed new product maybe?'); // DEL
          // FIXME here it adds but logs on different lines in local

          // go to cart or stay?
          if (
            window.confirm(`Cliquez sur OK pour voir votre panier.
          Pour continuer vos achats, appuyez sur 'Cancel'.`)
          ) {
            // window.location.href = '../html/cart.html'; // TODO TOGGLE
            console.log('redirect'); // DEL
          } else {
            // do nothing and stay on page
            // TODO make it reload?
            console.log('no redirect'); // DEL
            // return false; // IS THIS THE PROBLEM???
            return; // try this??? TRY TEST
          }
          return;
        }
        return;
      }
      return;
    }

    // BLOCK 2
  } else {
    // there's nothing in basket
    // console.log('the basket was empty'); // DEL

    // if new pdct qty + local qty > 100 BLOCK 2
    console.log(
      'block 2, the basket was empty, newAdd.count: ',
      newAdd.count,
      typeof newAdd.count
    ); // DEL here it's a string
    if (parseInt(newAdd.count) > 100) {
      // BLOCK 3
      console.log('block 3, newAdd.count: ', newAdd.count, typeof newAdd.count); // DEL is string
      console.log('block 3, basket was empty, quantity over 100'); // DEL TODO
      alert(`:(
Vous ne pouvez pas commander plus de 100 produits identiques.`);
      // do I need return here? TEST
    } else {
      // BLOCK 4
      console.log('block 4, basket was empty, quantity ok'); //DEL
      // loggedProduct.count += 1; // do I need that? no, because there was no 'same in basket, right? DEL

      // log into local storage
      products.push(newAdd);
      window.localStorage.setItem('products', JSON.stringify(products));
      console.log('pushed new product'); // DEL

      // go to cart or stay?
      if (
        window.confirm(`Cliquez sur OK pour voir votre panier.
      Pour continuer vos achats, appuyez sur 'Cancel'.`)
      ) {
        // window.location.href = '../html/cart.html'; // TODO TOGGLE
        console.log('redirect'); // DEL
      } else {
        // do nothing and stay on page
        // TODO make it reload?
        console.log('no redirect'); // DEL
        return false;
      }
    }
  }

  console.log('log of local storage at end: ', window.localStorage); //DEL
};

// select button
let addToCartBtn = document.getElementById('addToCart');
addToCartBtn.addEventListener('click', checkProduct);
