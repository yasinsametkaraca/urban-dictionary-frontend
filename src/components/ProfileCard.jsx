import React from 'react';
import {withRouter} from "react-router-dom"

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username
    const loggedInUsername = props.username
    let message = "We cannot edit profile"
    if(pathUsername===loggedInUsername){
        message = "We can edit profile"
    }
    return (
        <div>
            {message}
        </div>
    );
}

export default withRouter(ProfileCard);  //routerun propertileri bize vermesi için kullandık