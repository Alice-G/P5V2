'use strict';

// BUG FIXME LEG BLOCK HINT TODO DEL

//                            BLOCK HOME PAGE BLOCK

const apiURL = 'http://localhost:3000/api/products';

async function getCatalog() {
  //storing response
  let response = await fetch(apiURL); // stars a GET request (default)
  // Storing data in form of JSON
  const catalog = await response.json();
  // console.log(catalog); //DEL
  // console.log(typeof catalog); //DEL
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
    let newDiv = document.createElement('div');
    let newContent = `<a href="./product.html?id=${item._id}">
      <article>
        <img
          src="${item.imageUrl}"
          alt="${item.altTxt} "
        />
        <h3 class="productName">${item.name}</h3>
        <p class="productDescription">${item.description}</p>
      </article>
    </a>`;

    newDiv.innerHTML = newContent;

    //setting innerHTML as  tab
    document.getElementById('items').appendChild(newDiv);
  }
}
