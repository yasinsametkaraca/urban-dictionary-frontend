import React, {useState} from 'react';
import ProfileImageComp from "./ProfileImageComp";
import {Link} from "react-router-dom";
import {format} from "timeago.js";
import {AiOutlineDelete, AiOutlineDownload} from "react-icons/ai";
import {useSelector} from "react-redux";
import {deleteEntry} from "../services/EntryService";
import {Confirm} from "semantic-ui-react";
import Modal from "./Modal";
import {useApiProgress} from "../shared/useApiProgress";


const EntryItemComp = ({entry,onDeleteEntrySuccess}) => {
    const {user,word,definition,sentence,timestamp,fileAttachment,id} = entry;
    const {username,displayName,image} = user;
    const formattedTime = format(timestamp);
    const loggedInUser = useSelector(state => state.username)
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const pendingApiCall = useApiProgress("delete",`/api/entries/${id}`,true)
    const onClickDeleteEntry = async () => {
        await deleteEntry(id);
        onDeleteEntrySuccess(id);
    }

    return (
        <>
            <div className={"card p-3 shadow mb-2"}>
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
                {username === loggedInUser &&
                    <div className={"d-flex justify-content-end"}> {/*login olan kullanıcı ve entrye sahip olan kullanıcı aynıysa button gösterilir.*/}
                        <AiOutlineDelete onClick={() => setOpenDeleteConfirm(true)} style={{cursor: "pointer", color: "gray"}} className={"text-gray"} size={18}></AiOutlineDelete>

                    </div>
                }
            </div>
            <Modal visible={openDeleteConfirm}
                   setVisible={setOpenDeleteConfirm}
                   modalTitle="Delete Entry"
                   pendingApiCall={pendingApiCall}
                   onConfirm = {onClickDeleteEntry}
                   modalBody={
                        <div>
                            <div><strong>Are you sure you want to delete?</strong></div>
                            <span>{word}</span>
                        </div>}>
            </Modal>
        </>
    );
};

export default EntryItemComp;
