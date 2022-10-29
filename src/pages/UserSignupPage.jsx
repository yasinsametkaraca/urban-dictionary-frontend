import React from 'react';
import {signUp} from "../services/UserService";
import YSKInput from "../components/YSKInput";


export default class UserSignupPage extends React.Component {   //class componeneti olarak oluşturduk çünkü içirisinde form olucak yani statler olmalıdır.

    state = {
        username : null,
        displayName: null,
        password : null,
        passwordRepeat: null,
        /*pendingApiCall:false,*/
        errors: {}
    }
    onChange = event => {
        const {name,value} = event.target;                  //object destructuring yaparak name e event.target.name ve value a event.target.value vermiş olduk.
        const errors ={...this.state.errors}
        errors[name] = undefined;                           //username cannot be empyt yazısını yazmaya başlayınca kaldırmak için

        if(name === 'password' || name === 'passwordRepeat' ){
            if(name==='password' && value !== this.state.passwordRepeat){
                errors.passwordRepeat = "Passwords do not match"
            }else if(name==='passwordRepeat' && value !== this.state.password){
                errors.passwordRepeat = "Passwords do not match"
            }else {
                errors.passwordRepeat = undefined
            }
        }
        this.setState({
            [name]: value,
            errors
        })
    }
    onClickSignup = async event => {
        event.preventDefault();
        const {username,displayName,password} = this.state;
        const body = {
            username,
            displayName,
            password
        }
        /*this.setState({pendingApiCall :true})*/
        await signUp(body)
            .then(response => {
                /*this.setState({pendingApiCall:false})*/
            })
            .catch(error => {
                if(error.response.data.validationErrors){
                    this.setState({errors : error.response.data.validationErrors});
                }
                /*this.setState({pendingApiCall:false})*/
            })
    }

    render() {
        return (

           <div className={"container"}>
               <form>
                   <h1 className={"text-center"}>Sign Up</h1>
                   <YSKInput name={"username"} label={"Username"} error={this.state.errors.username} onChange={this.onChange}></YSKInput>
                   <YSKInput name={"displayName"} label={"Display Name"} error={this.state.errors.displayName} onChange={this.onChange}></YSKInput>
                   <YSKInput name={"password"} label={"Password"} error={this.state.errors.password} onChange={this.onChange} type={"password"}></YSKInput>
                   <YSKInput name={"passwordRepeat"} label={"Password Repeat"} error={this.state.errors.passwordRepeat} onChange={this.onChange} type={"password"}></YSKInput>
                   <div className={"text-center"}>
                       <button disabled={this.props.pendingApiCall || this.state.errors.passwordRepeat !== undefined} className={"btn btn-primary m-3"} onClick={this.onClickSignup}>
                           {this.props.pendingApiCall ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :  "Sign Up" }
                       </button>
                   </div>
               </form>
           </div>

        )
    }

}


/*
onChangeUsername = event => {
    this.setState({
        username: event.target.value
    })
}
onChangeDisplayName = event => {
    this.setState({
        displayName: event.target.value
    })
}
onChangePassword = event => {
    this.setState({
        password: event.target.value
    })
}
onChangePasswordRepeat = event => {
    this.setState({
        passwordRepeat: event.target.value
    })
}*/


/*
<div className={"form-group m-3"}>
    <label>Username</label>
    <input className={this.state.errors.username ? "form-control is-invalid" : "form-control"} name={"username"} onChange={this.onChange}></input>
    <div className={"invalid-feedback"}>{this.state.errors.username}</div>
</div>*/
