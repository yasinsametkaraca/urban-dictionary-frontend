import React from 'react';
import {Image, List} from "semantic-ui-react";
import defaultProfilePicture from "../assets/Profile.png"
import {Link} from "react-router-dom";

const MyComponent = (props) => {

    const {user} = props
    let imageSource = defaultProfilePicture
    if(user.image){
        imageSource = user.image
    }

    return (
            <List.Item>
                <Image avatar src={imageSource} />
                <List.Content>
                    <List.Header><Link to={`/user/${user.username}`}>{user.username}</Link></List.Header>
                    {user.displayName}
                </List.Content>
            </List.Item>
    );
};

export default MyComponent;
