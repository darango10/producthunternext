import React, {Fragment, useContext, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Layout from "../../components/layout/Layout";
import DetallesProducto from "../../components/layout/DetallesProducto";
import {FirebaseContext} from "../../firebase";
import Error404 from "../../components/layout/404";
import {css} from '@emotion/core'
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {es} from "date-fns/locale";
import {Campo, InputSubmit} from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";
import Swal from "sweetalert2";

const ContenedorProducto = styled.div`
  @media(min-width: 768px){
     display: grid;
     grid-template-columns: 2fr 1fr;
     column-gap: 2rem;
  }
`


const Producto = () => {

    //State del componente
    const [producto, guardarProducto] = useState({})
    const [error, guardarError] = useState(false);

    //Routing para obtener el id actual
    const router = useRouter()
    const {query: {id}} = router

    //Context Firebase
    const {firebase, usuario} = useContext(FirebaseContext)

    useEffect(() => {
        if (id) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos')
                    .doc(id);
                const producto = await productoQuery.get();
                if (producto.exists) {
                    guardarProducto(producto.data())
                } else {
                    guardarError(true);
                }
            }
            obtenerProducto();
        }
    }, [id, producto])

    if (Object.keys(producto).length === 0) return 'Cargando...'

    const {comentarios, creado, descripcion, creador, nombre, url, urlImagen, votos, empresa, haVotado} = producto


    //Cuando el usuario vota
    const votarProducto = () => {
        if (!usuario) {
            return router.push('/login')
        }

        //Verificar si el usuario actual ha votado
        if (haVotado.includes(usuario.uid)) {
            Swal.fire('Voto Invalido', 'Ya has votado por este producto', 'warning')
            return;
        }

        //Guardar el id del usuario que ha votado
        const hanVotado = [...haVotado, usuario.uid]

        //Obtener y sumar un nuevo voto
        const nuevoTotal = votos + 1

        //Actualizar BD
        firebase.db.collection('productos').doc(id)
            .update({
                votos: nuevoTotal,
                haVotado: hanVotado
            });

        //Actualizar State
        guardarProducto({
            ...producto,
            votos: nuevoTotal
        })
    }


    return (

        <Layout>
            <Fragment>
                {error && <Error404/>}
                <div className="contenedor">
                    <h1 css={css`
                              text-align: center;
                              margin-top: 5rem;
                            `}

                    >{nombre}</h1>
                    <ContenedorProducto>
                        <div>
                            <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale: es})}</p>
                            <p>Por: {creador.nombre} de: {empresa}</p>
                            <img src={urlImagen} alt=""/>
                            <p>{descripcion}</p>
                            {usuario &&
                            <Fragment>
                                <h2>Agrega tu comentario</h2>
                                <form>
                                    <Campo>
                                        <input
                                            type="text"
                                            name={'mensaje'}
                                        />
                                    </Campo>
                                    <InputSubmit
                                        type={'submit'}
                                        value={'Agregar Comentario'}
                                    />
                                </form>
                            </Fragment>
                            }
                            <h2 css={css`
                                margin: 2rem 0;
                                `}>Comentarios</h2>
                            {comentarios.map(comentario => (
                                <li>
                                    <p>{comentario.nombre}</p>
                                    <p>Escrito por: {comentario.usuarioNombre}</p>
                                </li>
                            ))}
                        </div>
                        <aside>
                            <Boton
                                target={'_blank'}
                                bgColor={true}
                                href={url}
                            >Visitar URL</Boton>

                            <div css={css`
                                   margin-top: 5rem;
                              `}>
                                <p css={css`
                                   text-align: center;
                              `}>{votos} Votos</p>
                                {usuario &&
                                <Boton
                                    onClick={votarProducto}
                                >Votar</Boton>
                                }
                            </div>
                        </aside>
                    </ContenedorProducto>
                </div>
            </Fragment>
        </Layout>

    );
};

export default Producto;