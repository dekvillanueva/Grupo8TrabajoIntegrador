window.onload = function () {

    const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    let inputProductName = document.getElementById("productName");
    let inputPrecio = document.getElementById("precio");
    let inputImagen = document.getElementById("imagen");

    inputProductName.addEventListener('keyup', function (e) {
        let value = inputProductName.value;
        if (value.length < 2) {
            inputProductName.classList.remove("is-valid");
            inputProductName.classList.add("is-invalid");
            document.getElementById("productNameError").innerHTML = "El nombre de producto debe tener mínimo 2 caracteres";
            document.getElementById("btnGuardar").disabled = true;
        } else {
            inputProductName.classList.add("is-valid");
            inputProductName.classList.remove("is-invalid");
            document.getElementById("productNameError").innerHTML = "";
            document.getElementById("btnGuardar").disabled = false;
        }
    });

    inputPrecio.addEventListener('keyup', function (e) {

        let value = inputPrecio.value;
        if (value <= 0) {
            inputPrecio.classList.remove("is-valid");
            inputPrecio.classList.add("is-invalid");
            document.getElementById("precioError").innerHTML = "El precio no puede ser menor o igual que cero";
            document.getElementById("btnGuardar").disabled = true;
        } else {
            inputPrecio.classList.add("is-valid");
            inputPrecio.classList.remove("is-invalid");
            document.getElementById("precioError").innerHTML = "";
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

}