export default function validarNuevoProducto(valores) {
    let errores = {};

    //Validar nombre
    if (!valores.nombre) {
        errores.nombre = 'El nombre es obligatorio'
    }

    //Validar empresa
    if (!valores.empresa) {
        errores.empresa = 'La empresa es obligatorio'
    }

    //Validar URL
    if (!valores.url) {
        errores.url = 'La URL del producto es obligatorio'
    }else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = 'URL no valida'
    }

    //Validar descripcion
    if (!valores.descripcion) {
        errores.descripcion = 'Agrega una descripcion de tu producto'
    }



    return errores;

}