// Get the id off of current page url
let idParam = window.location.search;
let params = new URLSearchParams(idParam);

let productId = params.get('id');

// Display id as order number
let orderId = document.querySelector('#orderId');
orderId.textContent = productId;
console.log(localStorage);

// Reset LocalStorage
localStorage.removeItem('products');
localStorage.removeItem('throwToHeap');
console.log(localStorage);
