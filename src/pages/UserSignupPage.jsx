import React, {useState} from 'react';
import YSKInput from "../components/YSKInput";
import {useApiProgress} from "../shared/useApiProgress";
import {signUpHandler} from "../store/authActions";
import {useDispatch} from "react-redux";

const UserSignupPage = (props) => {
    const [form,setForm] = useState({
        username:null,
        displayName:null,
        password:null,
        passwordRepeat:null
    })
    const [errors, setErrors] = useState({                                                         //errors değerinin başlangıç değerini boş bir object yaptık
        username:undefined,
        displayName:undefined,
        password:undefined,
    });
    const dispatch = useDispatch()

    const onChange = event => {                                                                             //her input değişikliğinde bu fonksiyon çalışıcak
        const {name,value} = event.target;                                                                  //object destructuring yaparak name e event.target.name ve value a event.target.value vermiş olduk.}
        const differentErrorsReference =  {...errors}                                                       //farklı referans değerini alınca state güncellenir. yani yeni bir object olmalıdır. bu yüzden errors un kopyasını aldık.(yani referansını değiştirdik.)
        differentErrorsReference[name] = undefined;                                                         //Hata sonrası yazdığımızda errorun kaybolması için error değişkenindeki değerini temizledik.
        setErrors(differentErrorsReference)
        setForm((previousForm) => {                                                                //SetForm fonksiyon şeklinde olursa parametrede önceki form bilgisini alır yeni formu return etmemizi ister. Yeni bir kopya oluşturmak yerine bu yolla da yapılabilir.
           return {
               ...previousForm,                                                                              //önceki formun kopyasını alırız.
               [name] : value                                                                                //o an da değişmekte olan fielde yeni value yi veririz.
           }
        })
    }
    const onClickSignup = async event => {
        event.preventDefault();
        const {history} = props
        const {push} = history

        const {username, displayName, password} = form
        const body = {
            username,
            displayName,
            password
        }
        try {
            await dispatch(signUpHandler(body));                                                                //burdan authActiona ordan authActions da loginSuccess çalışır. ordan authReducera gider sonra redux state güncellenir.
            push("/")
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)
            }
        }
    }

    /*const usernameError= errors.username*/
    const {username:usernameError,displayName:displayNameError,password:passwordError} = errors                  //username i usernameError değişkeniyle kullanacağımızı belirtiyoruz.
    const pendingApiCallSignUp = useApiProgress("post","/api/users")
    const pendingApiCallLogin = useApiProgress("post","/api/auth")
    const pendingApiCall = pendingApiCallLogin || pendingApiCallSignUp

    let passwordRepeatError;                                                                                     //render öncesi passwordErroru yakaladık. tekrar terkar render edilmesini istemedik.
        if(form.password!==form.passwordRepeat){
            passwordRepeatError = "Passwords do not match"
        }
    return (
       <div className={"container"}>
           <form>
               <h1 className={"text-center"}>Sign Up</h1>
               <YSKInput name={"username"} label={"Username"} error={usernameError} onChange={onChange}></YSKInput>
               <YSKInput name={"displayName"} label={"Display Name"} error={displayNameError} onChange={onChange}></YSKInput>
               <YSKInput name={"password"} label={"Password"} error={passwordError} onChange={onChange} type={"password"}></YSKInput>
               <YSKInput name={"passwordRepeat"} label={"Password Repeat"} error={passwordRepeatError} onChange={onChange} type={"password"}></YSKInput>
               <div className={"text-center"}>
                   <button disabled={pendingApiCall || passwordRepeatError !== undefined} className={"btn btn-primary m-3"} onClick={onClickSignup}>
                       {pendingApiCall ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :  "Sign Up" }
                   </button>
               </div>
           </form>
       </div>
    )
}

export default UserSignupPage















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

/*if(name === 'password' || name === 'passwordRepeat' ){
            if(name==='password' && value !== form.passwordRepeat){
                differentErrorsReference.passwordRepeat = "Passwords do not match"
            }else if(name==='passwordRepeat' && value !== form.password){
                differentErrorsReference.passwordRepeat = "Passwords do not match"
            }else {
                differentErrorsReference.passwordRepeat = undefined
            }
        }*/
