import React, {Fragment, useContext, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Layout from "../../components/layout/Layout";
import {FirebaseContext} from "../../firebase";
import Error404 from "../../components/layout/404";
import {css} from '@emotion/core'
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {es} from "date-fns/locale";
import {Campo, InputSubmit} from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";
import Swal from "sweetalert2";
import Spiner from "../../components/ui/Spiner";


const ContenedorProducto = styled.div`
  @media(min-width: 768px){
     display: grid;
     grid-template-columns: 2fr 1fr;
     column-gap: 2rem;
  }
`

const Padre = styled.div`
  height: 150px;
  /*IMPORTANTE*/
  display: flex;
  justify-content: center;
  align-items: center;
`

const Hijo = styled.div`
  margin: 0 auto;
`

const CreadorProducto = styled.p`
  padding: .5rem 2rem;
  background-color: #DA552F;
  color: #FFF;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  border-radius: 50px;
`


const Producto = () => {

    //State del componente
    const [producto, guardarProducto] = useState({})
    const [error, guardarError] = useState(false);
    const [comentario, guardarComentario] = useState({})
    const [consultarBD, guardarConsultaBD] = useState(true)


    //Routing para obtener el id actual
    const router = useRouter()
    const {query: {id}} = router

    //Context Firebase
    const {firebase, usuario} = useContext(FirebaseContext)

    useEffect(() => {
        if (id && consultarBD) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos')
                    .doc(id);
                const producto = await productoQuery.get();
                if (producto.exists) {
                    guardarProducto(producto.data())
                    guardarConsultaBD(false)

                } else {
                    guardarError(true);
                    guardarConsultaBD(false)
                }
            }
            obtenerProducto();


        }

    }, [id,producto.votos])

    if (Object.keys(producto).length === 0 && !error) {
        return (
            <Padre>
                <Hijo><Spiner/></Hijo>
            </Padre>

        );
    }


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
        guardarConsultaBD(true)

    }

    //Funciones para crear comentarios
    const comentarioChange = e => {
        guardarComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }

    //Identifica si el comentario es del creador del producto
    const esCreador = id => {
        if (creador.id === id) {
            return true;
        }
    }

    const agregarComentario = e => {
        e.preventDefault();
        e.target.reset()
        if (!usuario) {
            return router.push('/login')
        }

        //Informacion extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        //Tomar copia de comentarios y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario];

        //Actualizar BD
        firebase.db.collection('productos').doc(id)
            .update({comentarios: nuevosComentarios})

        //Actualizar State
        guardarProducto({
            ...producto,
            comentarios: nuevosComentarios
        })

        //Limpiar el campo
        guardarComentario({
            ...comentario,
            mensaje: ''
        })

        guardarConsultaBD(true)

    }

    //Funcion que revisa que el creador del producto sea el mismo que esta autenticado
    const puedeBorrar = () => {
        if (!usuario) return false

        if (creador.id === usuario.uid) {
            return true
        }
    }

    //Elimina producto de la base de datos
    const eliminarProducto=async ()=>{
        if (!usuario){
            return router.push('/login')
        }

        if (creador.id !== usuario.uid){
            return router.push('/')
        }
        try{
            await firebase.db.collection('productos').doc(id).delete();
            router.push('/')
        }catch (e) {
            console.log(e)
        }
    }

    return (

        <Layout>

            {error ? <Error404/> :
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
                                <form onSubmit={agregarComentario}>
                                    <Campo>
                                        <input
                                            type="text"
                                            required={true}
                                            name={'mensaje'}
                                            onChange={comentarioChange}
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
                            {comentarios.length === 0
                                ? 'Aún no hay comentarios'
                                :

                                <ul>
                                    {comentarios.map((comentario, i) => (
                                        <li
                                            key={`${comentario.usuarioId}-${i}`}
                                            css={css`
                                                border: 1px solid #e1e1e1;
                                                padding: 2rem;
                                                `}
                                        >
                                            <p>{comentario.mensaje}</p>
                                            <p>Escrito por:
                                                <span
                                                    css={css`
                                                font-weight: bold;
                                                `}>{comentario.usuarioNombre}</span></p>
                                            {esCreador(comentario.usuarioId) &&
                                            <CreadorProducto>Es Creador</CreadorProducto>}
                                        </li>
                                    ))}
                                </ul>
                            }
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
                    {puedeBorrar() &&
                        <Boton
                            bgColor={true}
                            onClick={eliminarProducto}
                        >Eliminar Producto</Boton>
                    }
                </div>}

        </Layout>

    );
};

export default Producto;