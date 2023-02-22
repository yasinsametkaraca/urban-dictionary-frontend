import React from 'react';
import {Dimmer, Image, Loader, Segment} from "semantic-ui-react";

const MyComponent = () => {
    return (
        <Segment>
            <Dimmer inverted active>
                <Loader inverted>Loading</Loader>
            </Dimmer>
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
    );
};

export default MyComponent;
