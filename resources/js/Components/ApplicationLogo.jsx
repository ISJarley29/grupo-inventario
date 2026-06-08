import React from 'react';

export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/logo.png"
            alt="Logo CEFOP"
            className={`h-24 w-auto animate-bounce duration-[3000ms] ${props.className || ''}`}
        />
    );
}
