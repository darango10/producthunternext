import React, {Fragment, useContext} from 'react';
import Buscar from "../ui/Buscar";
import Navegacion from "./Navegacion";
import Link from "next/link";
import {css} from '@emotion/core'
import styled from "@emotion/styled";
import Boton from "../ui/Boton";
import {FirebaseContext} from '../../firebase'
import Router from "next/router";
import Swal from "sweetalert2";

const ContenedorHeader = styled.div`
   max-width: 1200px;
   width: 95%;
   margin: 0 auto;
   @media(min-width: 768px){
      display: flex;
      justify-content: space-between;
   }
`

const Logo = styled.p`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: 'Roboto Slab',serif;
  margin-right: 2rem;
`


const Header = () => {

    const {usuario, firebase} = useContext(FirebaseContext);

    //Cuando el usuario da click en cerrar sesion
    const cerrarCesion = async () => {
        try {
            await firebase.logout();
            await Router.push('/login');
            await Swal.fire('Cerra Sesión', 'Sesión cerrada con éxito', 'success')

        }catch (e) {
            console.log(e)
        }

    }


    return (
        <header
            css={css`
                   border-bottom: 2px solid var(--gris3);
                   padding: 1rem 0;
                `}
        >
            <ContenedorHeader>
                <div
                    css={css`
                          display: flex;
                          align-items: center;
                        `}
                >
                    <Link href={'/'}>
                        <Logo>P</Logo>
                    </Link>

                    <Buscar/>
                    <Navegacion/>
                </div>
                <div
                    css={css`
                          display: flex;
                          align-items: center;
                        `}
                >
                    {usuario
                        ?
                        <Fragment>
                            <p
                                css={css`
                          margin-right: 2rem;
                        `}
                            >{usuario.displayName}</p>
                            <Boton
                                bgColor={true}
                                onClick={cerrarCesion}
                            >Cerrar Sesion</Boton>
                        </Fragment>
                        :
                        <Fragment>
                            <Link href={'/login'}><Boton bgColor={true}>Login</Boton></Link>
                            <Link href={'/crear-cuenta'}><Boton>Crear Cuenta</Boton></Link>
                        </Fragment>
                    }
                </div>
            </ContenedorHeader>
        </header>
    );
};

export default Header;