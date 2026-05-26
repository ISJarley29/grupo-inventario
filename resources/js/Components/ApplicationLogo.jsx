import React from 'react';
import logoCefop from '../../imagenes/logo.png';

export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src={logoCefop}
            alt="Logo CEFOP"
            className={`h-24 w-auto animate-bounce [animation-duration:3s] ${props.className || ''}`}
        />
    );
}
