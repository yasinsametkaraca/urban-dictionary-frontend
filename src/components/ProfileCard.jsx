import React from 'react';
import {withRouter} from "react-router-dom"
import {Authentication} from "../shared/AuthenticationContext";
const ProfileCard = (props) => {
    return (/*context e ulaşabilmek için*/
        <Authentication.Consumer>
            {value => {
                const pathUsername = props.match.params.username
                const loggedInUsername = value.state.username
                let message = "We cannot edit profile"
                if(pathUsername===loggedInUsername){
                    message = "We can edit profile"
                }
                return (
                    <div>
                        {message}
                    </div>
                );
            }}
        </Authentication.Consumer>
    )
}

export default withRouter(ProfileCard);  //routerun propertileri bize vermesi için kullandık