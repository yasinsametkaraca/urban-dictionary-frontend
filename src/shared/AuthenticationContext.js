import React, {Component} from 'react';

export const Authentication = React.createContext();


class AuthenticationContext extends Component {
    state = {
        isLoggedIn:true,
        username:"deneme",
        displayName:undefined,
        image:undefined,
        password:undefined
    }
    onLoginSuccess = authenticationState => {
        this.setState({
           /* username: authenticationState.username,
            displayName: authenticationState.displayName,
            image: authenticationState.image,
            password: authenticationState.password,*/
            ...authenticationState,
            isLoggedIn : true
        })
    }
    onLogoutSuccess = () => {
        this.setState({
            isLoggedIn: false,
            username: undefined
        })
    }

    render() {
        return (
            <Authentication.Provider value={{
                state:{...this.state},
                onLoginSuccess: this.onLoginSuccess,
                onLogoutSuccess: this.onLogoutSuccess
            }}>{this.props.children}</Authentication.Provider>  //this.props.children = app.js de sarmalayınca sıkıntı olmasın diye yazdık.
        );
    }
}

export default AuthenticationContext;