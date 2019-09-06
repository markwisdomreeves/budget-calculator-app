import React from 'react'

// WE ARE CLABING THE PROPS HERE FROM THE APP COMPONENT
const Alert = ({type, text}) => {
    return (
        <div className={`alert alert-${type}`}>{text}</div>
    );
};

export default Alert
