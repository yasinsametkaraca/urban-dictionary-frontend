import React, {Component} from 'react';
import YSKInput from "../components/YSKInput";
import {login} from "../services/UserService"

class LoginPage extends Component {   //yine formlu yani state li bir kullanımdan dolayı class component oluşturduk.
    state = {
        username : null,
        password : null
    }
    onChange = (event) => {
        const {name,value} = event.target
        this.setState({
        [name]: value
        })
    }

    onClickLogin = (event) => {
        event.preventDefault()
        const {username,password} = this.state;
        const creds ={
            username : username,
            password : password
        }
        login(creds)
    }

    render() {
        return (
            <div className="container w-50">
                <form className={""}>
                    <h1 className={"text-center"}>Login</h1>
                    <YSKInput label={"Username"} name={"username"} onChange={this.onChange} ></YSKInput>
                    <YSKInput label={"Password"} name={"password"} type={"password"} onChange={this.onChange}></YSKInput>
                    <div className={"text-center"}>
                        <button onClick={this.onClickLogin} className={"btn btn-primary m-3"}>Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginPage;