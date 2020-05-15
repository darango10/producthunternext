import React from 'react';
import {css} from '@emotion/core'

const Error404 = () => {
    return (
        <h1
            css={css`
              margin-top: 5rem;
              text-align: center;
            `}
        >404 | La página que estas buscando no existe</h1>
    );
};

export default Error404;