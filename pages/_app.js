import App from "next/app";
import firebase, {FirebaseContext} from "../firebase";
import React from "react";
import useAutenticacion from "../hooks/useAutenticacion";
import '../public/static/css/Spinner.css'

const MyApp = (props) => {
    const usuario = useAutenticacion();

    const {Component, pageProps} = props

    return (
        <FirebaseContext.Provider value={{
            firebase,
            usuario
        }}>
            <Component {...pageProps}/>
        </FirebaseContext.Provider>
    )
}

export default MyApp