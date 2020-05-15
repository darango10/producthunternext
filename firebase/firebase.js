import app from 'firebase/app'
import firebaseConfig from "./config";
import 'firebase/auth'

class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig)
            //firebase.analytics();
        }

        this.auth = app.auth();
    }

    //Registrar Usuario
    async registrar(nombre, email, password) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);
        return await nuevoUsuario.user.updateProfile({
            displayName: nombre
        })
    }

    //Autenticar Usuario
    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email,password);
    }

    //Cierra Sesion
    async logout(){
        return  this.auth.signOut();
    }

}

const firebase = new Firebase();

export default firebase;
