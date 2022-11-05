import React from 'react';
import {useParams} from "react-router-dom"
import {useSelector} from "react-redux";

const ProfileCard = (props) => {

    const {username : loggedInUsername} = useSelector((store) => {                              //redux storedan username verisini çekip onu loggedInUsername şeklinde kullanacağımızı belirtiyoruz.
        return {username: store.username}
    })

    const routerParams = useParams()                                                                    //routerdan propertyleri çekmek için useParams kullandık.
    const pathUrlUsername = routerParams.username                                                       //props.match.params.username.
    let message = "You cannot edit profile"
    if(pathUrlUsername === loggedInUsername){
        message = "You can edit profile"
    }
    return (
        <div>
            {loggedInUsername}, {message}
        </div>
    );
}
export default ProfileCard







/*const mapStateToProps = (store) => {
    return {
        loggedInUsername: store.username
    }
}
export default connect(mapStateToProps)(withRouter(ProfileCard));  //routerun propertileri bize vermesi için kullandık*/
