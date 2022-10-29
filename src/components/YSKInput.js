import React from 'react';

const YskInput = (props) => {
    const {label,error,name,onChange,type} = props

    return (
        <div className={"form-group m-3"}>
            <label>{label}</label>
            <input className={error ? "form-control is-invalid" : "form-control"} name={name} onChange={onChange} type={type}></input>
            <div className={"invalid-feedback"}>{error}</div>
        </div>
    );
}

export default YskInput;