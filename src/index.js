import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider} from "react-redux";
import {createStore} from "redux";

const loggedInState = {
    isLoggedIn:true,
    username:"user1",
    displayName:"display1",
    image:null,
    password:"Deneme.38"
}
const defaultState = {
    isLoggedIn:false,
    username:undefined,
    displayName:undefined,
    image:undefined,
    password:undefined
}

const reducer = (state,action) => {         //reducer 0 son state i ve action u alarak güncel state i üretip döner
    if(action.type==="logout-success"){
        return defaultState
    }
    return state
}

const store = createStore(reducer,loggedInState);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
