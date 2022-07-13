//Valide le formulaire
function formValidation() {
  let form = document.querySelector('#order');

  //Identifie les champs du formulaire
  let firstName = document.querySelector('#firstName');
  let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');

  let lastName = document.querySelector('#lastName');
  let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');

  let address = document.querySelector('#address');
  let addressErrorMsg = document.querySelector('#addressErrorMsg');

  let city = document.querySelector('#city');
  let cityErrorMsg = document.querySelector('#cityErrorMsg');

  let email = document.querySelector('#email');
  let emailErrorMsg = document.querySelector('#emailErrorMsg');

  //Création des expressions régulières
  let nameRegex = new RegExp('^[a-zA-Zàâäéèêëïîôöùûüç_.-]{2,30}$');
  let emailRegex = new RegExp(
    '^[_]*([a-z0-9]+(.|_*)?)+@([a-z][a-z0-9-]+(.|-*.))+[a-z]{2,6}$'
  );
  let addressRegex = new RegExp(
    '^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+$'
  );
  let cityRegex = new RegExp(
    "^([a-zA-Zàâäéèêëïîôöùûüç]+(?:. |-| |'))*[a-zA-Zàâäéèêëïîôöùûüç]*$"
  );
  // [...]
}
//Ecoute du changement pour chaque champ de formulaire
firstName.addEventListener('change', (Event) => {
  if (nameRegex.test(firstName.value) == true) {
    firstNameErrorMsg.innerHTML = ' ';
  } else {
    firstNameErrorMsg.innerHTML = 'Le prénom ne comporte que des lettres';
  }
});

// let regName = '/^[a-z]{2,12}$/'; // min 2 characters, max 12 // do I need to specify - included here? how does test work? FIXME add possibility for - or '. authorizes numbers???
// var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g; // also found this: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/

function emptyFormCheck() {
  //   // // if fields are empty
  //   if (firstName.value == '') {
  //     firstNameErrorMsg.innerHTML = `Ce champ ne peut pas rester vide.`;
  //     return false; // ASK do I need those?
  //   }
  // }
  // if (lastName.value == '') {
  //   lastNameErrorMsg.innerHTML = `Ce champ ne peut pas rester vide.`;
  //   return false;
  // }
  // if (address.value == '') {
  //   addressErrorMsg.innerHTML = `Veuillez entrer votre adresse.`;
  //   return false;
  // }
  // if (city.value == '') {
  //   cityErrorMsg.innerHTML = `Ce champ ne peut pas rester vide.`;
  //   return false;
  // }
  // if (email.value == '') {
  //   emailErrorMsg.innerHTML = `Nous avons besoin de votre adresse mail.`;
  //   return false;
  // }
}
// FIXME the alerts don't go away

//     // go to cart or stay?
//     if (
//       window.confirm(`Cliquez sur OK pour voir votre panier.
//     Pour continuer vos achats, appuyez sur 'Cancel'.`)
//     ) {
//       // window.location.href = '../html/cart.html'; // TODO TOGGLE
//       console.log('redirect'); // DEL
//     } else {
//       // do nothing and stay on page
//       // TODO make it reload?
//       console.log('no redirect'); // DEL
//       return false;
//     }
//   }

//   // console.log('count after: ', loggedProduct.count); // DEL
// } else {
//   console.log('block 9, product in basket is different');

//     // go to cart or stay?
//     if (
//       window.confirm(`Cliquez sur OK pour voir votre panier.
//     Pour continuer vos achats, appuyez sur 'Cancel'.`)
//     ) {
//       // window.location.href = '../html/cart.html'; // TODO TOGGLE
//       console.log('redirect'); // DEL
//     } else {
//       // do nothing and stay on page
//       // TODO make it reload?
//       console.log('no redirect'); // DEL
//       // return false; // IS THIS THE PROBLEM???
//       return; // try this??? TRY TEST
//     }
//     return;
//   }
//   return;
// }
// return;
// }

// // BLOCK 2
// } else {
// // there's nothing in basket
// // console.log('the basket was empty'); // DEL

// // if new pdct qty + local qty > 100 BLOCK 2
// console.log(
// 'block 2, the basket was empty, newAdd.count: ',
// newAdd.count,
// typeof newAdd.count
// ); // DEL here it's a string
// if (parseInt(newAdd.count) > 100) {
// // BLOCK 3
// console.log('block 3, newAdd.count: ', newAdd.count, typeof newAdd.count); // DEL is string
// console.log('block 3, basket was empty, quantity over 100'); // DEL TODO
// alert(`:(
// Vous ne pouvez pas commander plus de 100 produits identiques.`);
// // do I need return here? TEST
// } else {
// // BLOCK 4
// console.log('block 4, basket was empty, quantity ok'); //DEL
// // loggedProduct.count += 1; // do I need that? no, because there was no 'same in basket, right? DEL

// // log into local storage
// products.push(newAdd);
// window.localStorage.setItem('products', JSON.stringify(products));
// console.log('pushed new product'); // DEL

// // go to cart or stay?
// goOrStay () {
// if (
//   window.confirm(`Cliquez sur OK pour voir votre panier.
// Pour continuer vos achats, appuyez sur 'Cancel'.`)
// ) {
//   // window.location.href = '../html/cart.html'; // TODO TOGGLE
//   console.log('redirect'); // DEL
// } else {
//   // do nothing and stay on page
//   // TODO make it reload?
//   console.log('no redirect'); // DEL
//   return false;
// }
// }

// }

// BLOCK BLOCK BLOCK BLOCK BLOCK

function validateName() {
  if (!firstname.value) {
    error_name.innerHTML = `<p>Por favor, insira um nome!</p>`;
  } else {
    error_name.innerHTML = ``;
    return true;
  }
}

// maybe functions call one another?

function validateCity() {
  if (!city.value) {
    error_city.innerHTML = `<p>Por favor, selecione uma cidadde.</p>`;
  } else {
    error_city.innerHTML = ``;
    return true;
  }
}

function validate() {
  validateName();
  validatePassword1();
  validatePassword2();
  validateChecked();
  console.log(validateName());
  console.log(validatePassword());
  console.log(validateCity());

  if (validateName() && validatePassword() && validateCity() === true) {
    btn.style.display = 'flex';
  }
}

btn.onclick = function submit() {
  window.alert('Registro concluido com sucesso');
  window.reload();
  return true;
};
