import React, {Fragment} from 'react';
import Header from "./Header";
import {css, Global} from "@emotion/core";
import Head from "next/head";



const Layout = (props) => {
    return (
        <Fragment>
            <Global
                styles={css`
                    :root{
                      --gris: #3d3d3d;
                      --gris2: #6F6F6F;
                      --gris3: #e1e1e1;
                      --naranja: #Da552f;
                    }
                    
                    html{
                      font-size: 62.5%;
                      box-sizing: border-box;
                    }
                    
                    *,*:before,*:after{
                      box-sizing: inherit;
                    }
                    
                    body{
                      font-family: 'PT-Sans',sans-serif;
                      font-size: 1.6rem;
                      line-height: 1.5;                    
                    }
                    
                    h1,h2,h3{
                      margin: 0 0 2rem 0;
                      line-height: 1.5;
                    }
                    
                    h1,h2{
                        font-family: 'Roboto Slab', serif;
                        font-weight: 700;
                    }
                    
                    h3{
                        font-family: 'PT-Sans',sans-serif;
                    }
                    
                    ul{
                      list-style: none;
                      margin: 0;
                      padding: 0;
                    }
                    
                    a{
                      text-decoration: none;
                    }
                    
                    img{
                    max-width: 100%;
                    }            
                `}
            />

            <Head>
                {/*<html lang='es'/>*/}
                <title>Product Hunt Firebase y Next.js</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
                      integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossOrigin="anonymous"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap"
                    rel="stylesheet"/>
                <link rel="stylesheet" href="/static/css/app.css"/>
            </Head>
            <Header/>
            <main>
                {props.children}
            </main>
        </Fragment>
    );
};

export default Layout;