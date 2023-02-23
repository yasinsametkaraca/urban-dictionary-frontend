import React from 'react';
import defaultPicture from '../assets/Profile.png';

const ProfileImageComp = props => {
    const { image,newimage } = props;

    let imageSource = defaultPicture;
    if (image) {
        imageSource = "images/"+ image;
    }
    return (
        <img
            alt={`Profile`}
            src={newimage || imageSource}
            {...props}
            onError={event => {  //eğer hata olursa defaultPicture gösterilir.
                event.target.src = defaultPicture;
            }}
        />
    );
};

export default ProfileImageComp;