import React from 'react';
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username
    let message = "We cannot edit profile"
    if(pathUsername===props.loggedInUsername){
        message = "We can edit profile"
    }
    return (
        <div>
            {message}
        </div>
    );
}
const mapStateToProps = (store) => {
    return {
        loggedInUsername: store.username
    }
}

export default connect(mapStateToProps)(withRouter(ProfileCard));  //routerun propertileri bize vermesi için kullandık