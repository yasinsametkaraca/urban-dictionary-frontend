import React from 'react';
import ProfileImageComp from "./ProfileImageComp";
import {Link} from "react-router-dom";
import {format} from "timeago.js";

const EntryItemComp = ({entry}) => {
    const {user,word,definition,sentence,timestamp} = entry;
    const {username,displayName,image} = user;

    const formattedTime = format(timestamp);
    return (
        <div className={"card p-3 shadow"}>
            <div className={"d-flex "}>
                <ProfileImageComp image={image} width={"36"} height={"36"} className={"m-1 rounded-circle"}></ProfileImageComp>
                <div className={"px-2 flex-fill m-auto d-flex justify-content-between"}>
                    <Link style={{ textDecoration: 'none'}} className={"text-dark"} to={`/user/${username}`}><span>{displayName}</span></Link>
                    <h5 className={"text-primary text-bold"}>{word}</h5>
                    <span>{formattedTime}</span>
                </div>
            </div>
            <div className={"pt-4"}>{definition}</div><hr/>
            <div>{sentence}</div>
        </div>
    );
};

export default EntryItemComp;
