import React, {Fragment, useState} from 'react';
import Layout from "../components/layout/Layout";
import {Formulario, Campo, InputSubmit, Error} from '../components/ui/Formulario'
import {css} from '@emotion/core'
import useValidacion from "../hooks/useValidacion";
import validarCrearCuenta from "../validacion/validarCrearCuenta";
import firebase from "../firebase";
import Router from "next/router";
import Swal from "sweetalert2";

//StateIncial
const STATE_INICIAL = {
    nombre: '',
    email: '',
    password: ''
}

const Login = () => {

    const {valores, errores, handleSubmit, handleChange, handleBlur} = useValidacion
    (STATE_INICIAL, validarCrearCuenta, crearCuenta)

    //Funcion para crear la cuenta
    async function crearCuenta() {
        try {
            await firebase.registrar(nombre, email, password);
            await Router.push('/');
            await Swal.fire('Usuario Creado', 'El usuario ha sido creado con exito', 'success')
        } catch (e) {
            console.log(e.message)
            await Swal.fire('Usuario Creado', `${e.message}`, 'error')
        }
    }


    //Extraer valores
    const {nombre, email, password} = valores;


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