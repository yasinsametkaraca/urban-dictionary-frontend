import React, {Component} from 'react';
import YSKInput from "../components/YSKInput";
import {login} from "../services/UserService"
import axios from "axios";

class LoginPage extends Component {   //yine formlu yani state li bir kullanımdan dolayı class component oluşturduk.
    state = {
        username : null,
        password : null,
        error: null,
    }

    onChange =  (event) => {
        const {name,value} = event.target
        this.setState({
            [name]: value,
            error: null  //formda bişey girilince hata mesajını kaldır.
        })
    }

    onClickLogin = async (event) => {
        event.preventDefault()
        const {username,password} = this.state;
        const creds ={
            username : username,
            password : password
        };
        try {
            await login(creds)
        }catch (apiErr) {
            this.setState({
                error : apiErr.response.data.message
            })
        }
    }

    render() {

        const loginButtonEnabled = this.state.username && this.state.password;
        //const {username,password,error} = this.state  //böyle yaparak aşağıda direk username diyerek kullanabiliriz. ama ben daha iyi anlaşılması için böyle bırakıcam

        return (
            <div className="container w-50">
                <form className={""}>
                    <h1 className={"text-center"}>Login</h1>
                    <YSKInput label={"Username"} name={"username"} onChange={this.onChange} ></YSKInput>
                    <YSKInput label={"Password"} name={"password"} type={"password"} onChange={this.onChange}></YSKInput>
                    {this.state.error && <div className="alert alert-danger" role="alert">Username or password is incorrect</div>} {/*error varsa göster*/}
                    <div className={" text-center"}>
                        <button disabled={!loginButtonEnabled || this.props.pendingApiCall} onClick={this.onClickLogin} className={"btn btn-primary m-3"}> {this.props.pendingApiCall ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :  "Login" }</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginPage;


//normalde burda tanımlamıştık ama hem loginde hem signup da kullandığımız için ortak bi yerden çekicez. ApiProgress componenti oluşturduk.
/*componentDidMount() {  //interceptors backend de request response esnasında yapılacak işler için vardır.
    axios.interceptors.request.use((request)=>{  //request i değiştirebiliriz ama burda sadece butona basınca sıkça basılmama durumu için kullanıcaz.
        this.setState({pendingApiCall: true})
        return request  //axios a request e devam et diyoruz.
    })
    axios.interceptors.response.use((response)=>{  //ilk parametre success cevaplar için ikinci parametre hatalar için
        this.setState({pendingApiCall: false})
        return response
    },(error) => {
        this.setState({pendingApiCall: false})
        throw error
    })
}*/