window.onload = function () {

    let inputPassword = document.getElementById("password");
    let inputEmail = document.getElementById("email");
    
    inputPassword.addEventListener('keyup', function(e){
      
      let value = inputPassword.value;
      if (value.length < 7) {
        inputPassword.classList.remove("is-valid");
        inputPassword.classList.add("is-invalid");
        document.getElementById("errorPassword").innerHTML = "La clave debe tener mínimo 8 caracteres";
        document.getElementById("btnIniciar").disabled = true;
      } else {
        inputPassword.classList.add("is-valid");
        inputPassword.classList.remove("is-invalid");
        document.getElementById("errorPassword").innerHTML = "";
        document.getElementById("btnIniciar").disabled = false;
      }
    })

    inputEmail.addEventListener('keyup', function(e){

      let btnIniciar = document.getElementById("btnIniciar");
      let emailError = document.getElementById("emailError");

      let value = inputEmail.value;  
      if (!isEmail(value)) {
        inputEmail.classList.remove("is-valid");
        inputEmail.classList.add("is-invalid");
        document.getElementById("emailError").innerHTML = "Por favor escriba un email válido";
        document.getElementById("btnIniciar").disabled = true;
      } else {
        inputEmail.classList.add("is-valid");
        inputEmail.classList.remove("is-invalid");
        document.getElementById("emailError").innerHTML = "";
        document.getElementById("btnIniciar").disabled = false;
      }   
    })

  function isEmail(email) {
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
      .test(email);
  }

}