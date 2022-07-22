'use strict';

const apiURL = 'http://localhost:3000/api/products';

async function getCatalog() {
  //storing response
  let response = await fetch(apiURL); // stars a GET request (default)
  // Storing data in form of JSON
  const catalog = await response.json();
  // console.log('catalog: ', catalog, 'type: ', typeof catalog);
  if (response) {
    displayCatalog(catalog);
  }
}
//calling async function
getCatalog();

// function to define innerHTML
function displayCatalog(catalog) {
  //Loop to access all rows

  for (let item of catalog) {
    let prodcutCard = document.createElement('a');
    document.querySelector('.items').appendChild(prodcutCard);
    prodcutCard.href = `./product.html?id=${item._id}`;

    prodcutCard.innerHTML = `<article>
    <img
      src="${item.imageUrl}"
      alt="${item.altTxt} "
    />
    <h3 class="productName">${item.name}</h3>
    <p class="productDescription">${item.description}</p>
  </article>`;
  }
}
