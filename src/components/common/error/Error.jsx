import React from 'react';
import errorClasses from './error.module.css';

const Error = ({errorMessage}) => {
    return (
        <div className={errorClasses.error}>
            <p>{errorMessage}</p>
        </div>
    );
};

export default Error;