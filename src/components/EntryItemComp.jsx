import React from 'react';
import ProfileImageComp from "./ProfileImageComp";
import {Link} from "react-router-dom";
import {format} from "timeago.js";
import {AiOutlineDownload} from "react-icons/ai";

const EntryItemComp = ({entry}) => {
    const {user,word,definition,sentence,timestamp,fileAttachment} = entry;
    const {username,displayName,image} = user;
    console.log(fileAttachment?.fileType)
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
            <div className={"pt-4"}>{definition}</div><hr className={"d-flex mx-lg-5"}/>
            <div>{sentence}</div><hr className={"d-flex mx-lg-5"}/>
            {fileAttachment && (
                <div className={"justify-content-center align-items-center d-flex p-1"}>
                    {
                        fileAttachment.fileType?.startsWith("image") && <img src={"images/attachments/"+fileAttachment.name} alt={word} width={300} height={300} className={"img-thumbnail"} />
                    }
                    {
                        fileAttachment.fileType?.startsWith("application/pdf") &&
                        <a href={"http://localhost:8080/images/attachments/"+fileAttachment.name} download>
                            <AiOutlineDownload></AiOutlineDownload>
                        </a>
                    }
                </div>
            )}
        </div>
    );
};

export default EntryItemComp;
