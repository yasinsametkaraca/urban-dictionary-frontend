import React, {useContext} from 'react';
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {Authentication} from "../shared/AuthenticationContext";

const ProfileCard = (props) => {

    const context = useContext(Authentication);

    const pathUsername = props.match.params.username
    let message = "We cannot edit profile"
    if(pathUsername === context.state.username){
        message = "We can edit profile"
    }
    return (
        <div>
            {message}
        </div>
    );
}
/*
const mapStateToProps = (store) => {
    return {
        loggedInUsername: store.username
    }
}

export default connect(mapStateToProps)(withRouter(ProfileCard));  //routerun propertileri bize vermesi için kullandık*/
export default withRouter(ProfileCard)