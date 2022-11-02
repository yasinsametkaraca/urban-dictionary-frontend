import {createStore} from "redux";
import authReducer from "./authReducer"

const loggedInState = {
    isLoggedIn:true,
    username:"user1",
    displayName:"display1",
    image:null,
    password:"Deneme.38"
};

const configureStore = () => {
    return createStore(authReducer,loggedInState);
}

export default configureStore