export default function validarCrearCuenta(valores) {
    let errores = {};

    //Validar nombre usuario
    if (!valores.nombre) {
        errores.nombre = 'El nombre es obligatorio'
    }

    //Validar email
    if (!valores.email) {
        errores.email = 'El email es obligatorio'
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){
        errores.email = 'Ingresa un email valido'
    }

    //Validar password
    if (!valores.password) {
        errores.password = 'El password es obligatorio'
    }else if (valores.password.length<6){
        errores.password = 'El password debe ser minimo de 6 caracteres'
    }

    return errores;

}



// // validar URL
//
// !/^(ftp|http|https):\/\/[^ "]+$/