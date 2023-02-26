import React from 'react';
import UserListComp from "../components/UserListComp";
import {Grid} from "semantic-ui-react";
import EntrySubmitComp from "../components/EntrySubmitComp";
import {useSelector} from "react-redux";
import EntryFeedComp from "../components/EntryFeedComp";
const HomePage = () => {
    const {isLoggedIn} = useSelector(state => ({isLoggedIn: state.isLoggedIn}))

    return (
        <div className={"container"}>
            <Grid>
                <Grid.Column mobile={16} tablet={8} computer={10}>
                    {isLoggedIn === true && <div className={"mb-3"}><EntrySubmitComp></EntrySubmitComp></div>}
                    <EntryFeedComp></EntryFeedComp>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={6}>
                    <UserListComp></UserListComp>
                </Grid.Column>
            </Grid>
        </div>
    );
};
export default HomePage;
