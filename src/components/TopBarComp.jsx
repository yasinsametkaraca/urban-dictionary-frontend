import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logoutSuccess} from "../store/authActions";
import {Authentication} from "../shared/AuthenticationContext";

const TopBarComp = (props) => {

    const context = useContext(Authentication);

    /*const {username,isLoggedIn,onLogoutSuccess} = props   // storedan veriyi çektik.*/
    const {onLogoutSuccess,state} = context
    const {username,isLoggedIn} = state
    let links = (
        <ul className={"navbar-nav ml-auto"}>
            <li>
                <Link className={"nav-link"} to="/login">Login</Link>
            </li>
            <li>
                <Link className={"nav-link"} to="/signup">Register</Link>
            </li>
        </ul>
    )
    if(isLoggedIn){
        links=(
            <ul className={"navbar-nav ml-auto"}>
                <li>
                    <Link className={"nav-link"} to={"/user/"+username}>{username}</Link>
                </li>
                <li onClick={onLogoutSuccess}>
                    <Link className={"nav-link"} to="/login">Logout</Link>
                </li>
            </ul>
        )
    }
    return (
        <div className={"shadow-sm mb-3 bg-primary"}>
            <nav className="navbar navbar-dark bg-primary navbar-expand-sm container flex justify-content-between">
                <Link className={"navbar-brand"} to="/">
                    <img width="60" src={"https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"} alt={"urban logo"}/>UrbanDictionary
                </Link>
                {links}
            </nav>
        </div>
    )
}


/*
const mapStateToProps = (store) => {
    return {
        isLoggedIn: store.isLoggedIn,
        username: store.username
    }
}
const mapDispatchToProps = dispatch => {   //direk kullanmak için.
    return {
        onLogoutSuccess : () => {
            return dispatch(logoutSuccess())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TopBarComp) ;*/
export default TopBarComp