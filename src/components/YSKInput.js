import React from 'react';

const YskInput = (props) => {
    const {label,error,name,onChange,type,defaultValue,placeholder,value} = props
    let className = "form-control";
    // className = error ? "form-control is-invalid" : "form-control"
    if(type === "file"){
        className +="-file";
    }
    if(error !== undefined){
        className += " is-invalid";
    }
    //defaultValue update gibi kısımlarda lazım olacaktır.
    return (
        <div className={"form-group mt-3"}>
            {label && <label>{label}</label>}
            <input className={className} name={name} value={value} onChange={onChange} type={type} defaultValue={defaultValue} placeholder={placeholder}></input>
            <div className={"invalid-feedback"}>{error}</div>
        </div>
    );
}

export default YskInput;