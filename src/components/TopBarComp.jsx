import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutSuccess} from "../store/authActions";
import ProfileImageComp from "./ProfileImageComp";
import {CgProfile} from "react-icons/cg";
import {RiLogoutCircleLine} from "react-icons/ri";


const TopBarComp = (props) => {

    const reduxState = useSelector((store) => {                                                  //Redux storedan state verisini çektik. Bunun için useSelector kullanılır.
        return {
            isLoggedIn: store.isLoggedIn,
            username: store.username,
            displayName: store.displayName,
            image:store.image
        }
    })
    const {username,isLoggedIn,displayName,image} = reduxState
    const [menu, setMenu] = useState(false);
    const menuArea = useRef(null);
    const dispatch = useDispatch();                                                                        //reduxtan actionu çektik. bunun için useDispatch kullandık.
    const onLogoutSuccess = () => {dispatch(logoutSuccess())}

    useEffect(() => {
        document.addEventListener("click",menuClickTracker);
        return () => {
            document.removeEventListener("click",menuClickTracker);
        }
    }, [isLoggedIn]);

    const menuClickTracker = (e) => {
        if(!menuArea.current?.contains(e.target)){    //eger menu içerisinde bir yere tıklamıyorsak menuyu kapat.
            setMenu(false);
        }
    }

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
                <li className={"nav-item dropdown"}>
                    <div className={"d-flex cursor-pointer"} style={{cursor:"pointer"}} onClick={() => setMenu(!menu)} ref={menuArea}>
                        <ProfileImageComp className={"rounded-circle m-auto"} image={image} width="30" height="30"></ProfileImageComp>  {/*m-auto =  heryere ortak mesafedolur*/}
                        <span className={"dropdown-toggle btn nav-link"}>{displayName}</span>
                    </div>
                    <div className={`dropdown-menu ${menu && "show"} shadow-lg p-1`}>
                        <span className={"nav-link d-flex"} style={{cursor:"pointer"}}>
                            <Link className="dropdown-item p-0"  to={"/user/"+username}><CgProfile className={"text-primary"} size={22}/> My Profile</Link>
                        </span>
                        <span className={"nav-link d-flex"} style={{cursor:"pointer"}} onClick={onLogoutSuccess}>
                            <Link className="dropdown-item p-0" to="/login"><RiLogoutCircleLine className={"text-danger"} size={22}/> Logout</Link>
                        </span>
                    </div>
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
export default TopBarComp;
