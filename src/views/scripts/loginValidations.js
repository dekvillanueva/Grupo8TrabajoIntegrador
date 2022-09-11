const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");

function checkEmailInput() {
  var value = document.getElementById("email").value;

  if (value.length < 5) {
    inputEmail.classList.remove("is-valid");
    inputEmail.classList.add("is-invalid");
  } else {
    inputEmail.classList.add("is-valid");
    inputEmail.classList.remove("is-invalid");
  }
}

function checkPaswordInput() {
    var value = document.getElementById("password").value;
  
    if (value.length < 7) {
      inputPassword.classList.remove("is-valid");
      inputPassword.classList.add("is-invalid");
    } else {
      inputPassword.classList.add("is-valid");
      inputPassword.classList.remove("is-invalid");
    }
}