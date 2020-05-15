import React, {Fragment, useState} from 'react';
import Layout from "../components/layout/Layout";
import {Formulario, Campo, InputSubmit, Error} from '../components/ui/Formulario'
import {css} from '@emotion/core'
import useValidacion from "../hooks/useValidacion";
import firebase from "../firebase";
import Router from "next/router";
import Swal from "sweetalert2";
import validarIniciarSesion from "../validacion/validarIniciarSesion";

//StateIncial
const STATE_INICIAL = {
    email: '',
    password: ''
}

const Login = () => {

    const {valores, errores, handleSubmit, handleChange, handleBlur} = useValidacion
    (STATE_INICIAL, validarIniciarSesion, iniciarSesion)

    //Funcion para crear la cuenta
    async function iniciarSesion() {
        try {
            await firebase.login(email, password);
            await Router.push('/');
            await Swal.fire('Inicio de Sesion', 'Inicio de Sesion exitoso', 'success')
        } catch (e) {
            console.log(e.message)
            await Swal.fire('Inicio de Sesion', `${e.message}`, 'error')
        }
    }


    //Extraer valores
    const {email, password} = valores;


    return (
        <div>
            <Layout>
                <Fragment>
                    <h1
                        css={css`
                          text-align: center;
                          margin-top: 5rem;
                        `}
                    >Iniciar Sesion</h1>
                    <Formulario onSubmit={handleSubmit} noValidate>

                        <Campo>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id={'email'}
                                placeholder={'Tu Email'}
                                name={'email'}
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>
                        {errores.email && <Error>{errores.email}</Error>}
                        <Campo>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id={'password'}
                                placeholder={'Tu Password'}
                                name={'password'}
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>
                        {errores.password && <Error>{errores.password}</Error>}
                        <InputSubmit type="submit" value={'Iniciar sesion'}/>
                    </Formulario>
                </Fragment>
            </Layout>
        </div>
    );
};

export default Login;