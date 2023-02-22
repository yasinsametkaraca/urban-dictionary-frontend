import React from 'react';

const YskInput = (props) => {
    const {label,error,name,onChange,type,defaultValue} = props
    //defaultValue update gibi kısımlarda lazım olacaktır.
    return (
        <div className={"form-group m-3"}>
            <label>{label}</label>
            <input className={error ? "form-control is-invalid" : "form-control"} name={name} onChange={onChange} type={type} defaultValue={defaultValue}></input>
            <div className={"invalid-feedback"}>{error}</div>
        </div>
    );
}

export default YskInput;