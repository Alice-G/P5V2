'use strict';

// BUG FIXME LEG BLOCK HINT TODO DEL

//BLOCK HOME PAGE

const apiURL = 'http://localhost:3000/api/products';

async function getCatalog() {
  //storing response
  let response = await fetch(apiURL); // stars a GET request (default)
  // Storing data in form of JSON
  const catalog = await response.json();
  console.log(catalog); //DEL
  console.log(typeof catalog); //DEL
  if (response) {
    displayCatalog(catalog);
  }
}
//calling async function
getCatalog();

// function to define innerHTML
function displayCatalog(catalog) {
  // let tab = '<div class="boop" style="border: 1px dashed purple">'; //container of things
  //Loop to access all rows

  // HINT

  for (let item of catalog) {
    let newDiv = document.createElement('div');
    let newContent = `<a href="./product.html?id=${item._id}">
      <article>
        <img
          src="${item.imageUrl}"
          alt="${item.name} "
        />
        <h3 class="productName">${item.name}</h3>
        <p class="productDescription">${item.description}</p>
      </article>
    </a>`;

    // HINT
    newDiv.innerHTML = newContent;

    //setting innerHTML as  tab
    document.getElementById('items').appendChild(newDiv);
  }
}

// TODO save url search param onclick?

// BLOCK            PRODUCT PAGE

// TODO use url search param to extract id
// TODO if no id, default back to home page?
// TODO store id
// TODO take id into the fetch GET
// TODO display stuff
// TODO
