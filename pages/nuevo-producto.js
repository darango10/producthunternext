import React, {Fragment, useContext, useState} from 'react';
import Layout from "../components/layout/Layout";
import {Formulario, Campo, InputSubmit, Error} from '../components/ui/Formulario'
import {css} from '@emotion/core'
import useValidacion from "../hooks/useValidacion";
import {FirebaseContext} from "../firebase";
import Router, {useRouter} from "next/router";
import Swal from "sweetalert2";
import validarNuevoProducto from "../validacion/validarNuevoProducto";
import FileUploader from "react-firebase-file-uploader";

//StateIncial
const STATE_INICIAL = {
    nombre: '',
    empresa: '',
    imagen: '',
    url: '',
    descripcion: ''
}

const NuevoProducto = () => {

    //State de las imagenes
    const [nombreImagen, guardarNombre] = useState('');
    const [subiendo, guardarSubiendo] = useState(false);
    const [progreso, guardarProgreso] = useState(0);
    const [urlImagen, guardarUrlImagen] = useState('');

    const handleUploadStart = () => {
        console.log('comenzando')
        guardarProgreso(0)
        guardarSubiendo(true);
    };

    const handleProgress = progreso => {
        Swal.fire('Subiendo Imagen', `${progreso}%`, 'warning')
        guardarProgreso(progreso)
    };

    const handleUploadError = error => {
        console.log('error')
        guardarSubiendo(error)
        console.error(error);
    };

    const handleUploadSuccess = nombre => {
        Swal.fire('Imagen Subida', `Imagen Ssubida con exito`, 'success')
        guardarProgreso(100);
        guardarSubiendo(false);
        guardarNombre(nombre);
        firebase
            .storage
            .ref("productos")
            .child(nombre)
            .getDownloadURL()
            .then(url => {
                console.log(url)
                guardarUrlImagen(url)
            });
    };

    const {valores, errores, handleSubmit, handleChange, handleBlur} = useValidacion
    (STATE_INICIAL, validarNuevoProducto, crearProducto)

    //Context con las operaciones CRUD de firebase
    const {usuario, firebase} = useContext(FirebaseContext)

    //Extraer valores
    const {nombre, empresa, imagen, url, descripcion} = valores;

    //Hook de routing para redireccionar
    const router = useRouter();

    //Funcion para crear la cuenta
    async function crearProducto() {
        //Si el usuario no esta autenticado llevarlo al login
        if (!usuario) {
            return router.push('/login');
        }

        //Crear el objeto de nuevo producto
        const producto = {
            nombre,
            empresa,
            url,
            urlImagen,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now()
        }

        //Insertarlo en la base de datos
        await firebase.db.collection('productos').add(producto);
        await Swal.fire('Nuevo Producto', `${producto.nombre} agregado con exito`, 'success')
        return router.push('/');


    }


    return (
        <div>
            <Layout>
                <Fragment>
                    <h1
                        css={css`
                          text-align: center;
                          margin-top: 5rem;
                        `}
                    >Nuevo Producto</h1>
                    <Formulario onSubmit={handleSubmit} noValidate>
                        <fieldset>
                            <legend>Información General</legend>
                            <Campo>
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id={'nombre'}
                                    placeholder={'Tu Nombre'}
                                    name={'nombre'}
                                    value={nombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.nombre && <Error>{errores.nombre}</Error>}
                            <Campo>
                                <label htmlFor="empresa">Empresa</label>
                                <input
                                    type="text"
                                    id={'empresa'}
                                    placeholder={'Empresa o Compañia'}
                                    name={'empresa'}
                                    value={empresa}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.empresa && <Error>{errores.empresa}</Error>}
                            <Campo>
                                <label htmlFor="imagen">Imagen</label>
                                <FileUploader
                                    accept={'image/*'}
                                    id={'imagen'}
                                    name={'imagen'}
                                    randomizeFilename
                                    storageRef={firebase.storage.ref("productos")}
                                    onUploadStart={handleUploadStart}
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess}
                                    onProgress={handleProgress}
                                />
                            </Campo>
                            <Campo>
                                <label htmlFor="url">URL</label>
                                <input
                                    type="url"
                                    id={'url'}
                                    name={'url'}
                                    value={url}
                                    placeholder={'URL de tu producto'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.url && <Error>{errores.url}</Error>}
                        </fieldset>

                        <fieldset>
                            <legend>Sobre tu Producto</legend>

                            <Campo>
                                <label htmlFor="descripcion">Descripcion</label>
                                <textarea

                                    id={'descripcion'}
                                    name={'descripcion'}
                                    value={descripcion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.descripcion && <Error>{errores.descripcion}</Error>}
                        </fieldset>


                        <InputSubmit type="submit" value={'Crear Producto'}/>

                    </Formulario>
                </Fragment>
            </Layout>
        </div>
    );
};

export default NuevoProducto;