import React from 'react';
import UserListComp from "../components/UserListComp";
import {Grid} from "semantic-ui-react";

const MyComponent = () => {
    return (
        <div className={"container"}>


            <Grid>
                <Grid.Row>
                    <Grid.Column width={12}>

                    </Grid.Column>
                    <Grid.Column width={4}>
                        <UserListComp></UserListComp>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default MyComponent;
