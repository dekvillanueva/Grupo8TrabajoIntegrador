window.onload = function () {

    const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    let inputUserName = document.getElementById("userName");
    let inputPassword = document.getElementById("userPassword");
    let inputRepeatPassword = document.getElementById("userRepitPassword");
    let inputEmail = document.getElementById("email");
    let inputImagen = document.getElementById("imagen");

    inputUserName.addEventListener('keyup', function (e) {
        let value = inputUserName.value;
        if (value.length < 2) {
            inputUserName.classList.remove("is-valid");
            inputUserName.classList.add("is-invalid");
            document.getElementById("userNameError").innerHTML = "El nombre de usuario debe tener mínimo 2 caracteres";
            document.getElementById("btnGuardar").disabled = true;
        } else {
            inputUserName.classList.add("is-valid");
            inputUserName.classList.remove("is-invalid");
            document.getElementById("userNameError").innerHTML = "";
            document.getElementById("btnGuardar").disabled = false;
        }
    });

    inputRepeatPassword.addEventListener('keyup', function (e) {

        let value = inputRepeatPassword.value;
        let aux = inputPassword.value;

        if (value.length < 8) {
            inputRepeatPassword.classList.remove("is-valid");
            inputRepeatPassword.classList.add("is-invalid");
            document.getElementById("passwordRepeatError").innerHTML = "La clave debe tener mínimo 8 caracteres";
            document.getElementById("btnGuardar").disabled = true;
        } else {
            inputRepeatPassword.classList.add("is-valid");
            inputRepeatPassword.classList.remove("is-invalid");
            document.getElementById("passwordRepeatError").innerHTML = "";
            document.getElementById("btnGuardar").disabled = false;
        }

        if (value.length >= 8) {
            if (aux === value) {
                inputRepeatPassword.classList.add("is-valid");
                inputRepeatPassword.classList.remove("is-invalid");
                document.getElementById("passwordRepeatError").innerHTML = "";
                document.getElementById("btnGuardar").disabled = false;
            } else {
                inputRepeatPassword.classList.remove("is-valid");
                inputRepeatPassword.classList.add("is-invalid");
                document.getElementById("passwordRepeatError").innerHTML = "Las claves no coinciden";
                document.getElementById("btnGuardar").disabled = true;
            }
        }
    })

    inputPassword.addEventListener('keyup', function (e) {

        let value = inputPassword.value;
        if (value.length < 8) {
            inputPassword.classList.remove("is-valid");
            inputPassword.classList.add("is-invalid");
            document.getElementById("passwordError").innerHTML = "La clave debe tener mínimo 8 caracteres";
            document.getElementById("btnGuardar").disabled = true;
        } else {
            inputPassword.classList.add("is-valid");
            inputPassword.classList.remove("is-invalid");
            document.getElementById("passwordError").innerHTML = "";
            document.getElementById("btnGuardar").disabled = false;
        }
    })

    inputEmail.addEventListener('keyup', function (e) {

        let value = inputEmail.value;
        if (!isEmail(value)) {
            inputEmail.classList.remove("is-valid");
            inputEmail.classList.add("is-invalid");
            document.getElementById("emailError").innerHTML = "Por favor escriba un email válido";
            document.getElementById("btnGuardar").disabled = true;
        } else {
            inputEmail.classList.add("is-valid");
            inputEmail.classList.remove("is-invalid");
            document.getElementById("emailError").innerHTML = "";
            document.getElementById("btnGuardar").disabled = false;
        }
    })

    inputImagen.addEventListener('change', function () {
        if (this.files[0] && this.files[0].type) {
            let imageType = this.files[0].type;
            if (allowedExtension.indexOf(imageType) > -1) {
                inputImagen.classList.add("is-valid");
                inputImagen.classList.remove("is-invalid");
                document.getElementById("fileError").innerHTML = "";
                document.getElementById("btnGuardar").disabled = false;
            } else {
                inputImagen.classList.add("is-invalid");
                inputImagen.classList.remove("is-valid");
                document.getElementById("fileError").innerHTML = "Sólo imágenes tipo JPEG, JPG, PNG o GIF";
                document.getElementById("btnGuardar").disabled = true;
            }
        }
    });

    function isEmail(email) {
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
            .test(email);
    }
}