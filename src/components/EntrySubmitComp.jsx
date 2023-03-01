import React, {useEffect, useState} from 'react';
import YSKInput from "./YSKInput";
import {useSelector} from "react-redux";
import ProfileImageComp from "./ProfileImageComp";
import {postEntry, postEntryAttachment} from "../services/EntryService";
import {signUpHandler} from "../store/authActions";
import {useApiProgress} from "../shared/useApiProgress";
import ProgressButton from "./ProgressButton";
import {Link} from "react-router-dom";
import AutoUploadFileComp from "./AutoUploadFileComp";

const EntrySubmitComp = () => {
    const {image,displayName,username} = useSelector(state => ({image: state.image, displayName: state.displayName, username: state.username}))
    const [entry,setEntry] = useState({word: "", definition: "", sentence: "",});
    const [errors, setErrors] = useState({word: undefined, definition: undefined, sentence: undefined,});
    const [focused, setFocused] = useState(false);
    const pendingApiCall = useApiProgress('post','/api/entries',true)
    const [newImage, setNewImage] = useState()
    const pendingFileUploadProgress = useApiProgress('post','/api/entry-attachments',true)
    const [attachmentId, setAttachmentId] = useState();

    useEffect(() => {
       if(!focused){
         setEntry({word:"", definition:"", sentence:"",})
         setErrors({ word: undefined, definition: undefined, sentence: undefined,})
         setNewImage();
         setAttachmentId();
       }
    }, [focused]);

    const onChangeEntry = event => {
        const {name,value} = event.target;
        setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
        setEntry((prevState) => {
            return {
                ...prevState,
                [name] : value
            }
        })
    }
    const addEntry = async () => {
        const {word, definition, sentence} = entry;
        const body = {
            word,
            definition,
            sentence,
            attachmentId
        }
        try {
            await postEntry(body);
            setFocused(false);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
    }

    const onChangeFile = (e) => {
        if(e.target.files.length<1){
            return; //cancel olduğunda undefined olmasın diye.
        }
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () =>{
            setNewImage(fileReader.result);
            uploadFile(file); //dosyayı yükler yüklemez backende istek atıyoruz. user imagedan farkı budur.
        }
        fileReader.readAsDataURL(file)
    }

    const uploadFile = async (file) => {
        const attachment = new FormData()  //multipart request body e çevirdik. Artık dosya yüklenebilir.
        attachment.append("file", file)
        const response = await postEntryAttachment(attachment);
        setAttachmentId(response.data.id) //attachmentId yi alıp backende entry i submit ederken yollucaz.
    }

    return (
        <div className={"card p-3"}>
            <div className={"d-flex"}>
                <ProfileImageComp image={image} width={"36"} height={"36"} className={"rounded-circle m-1 "}></ProfileImageComp>
                <div className={"flex-fill m-auto px-2 "}>
                    <Link style={{ textDecoration: 'none' }} to={`/user/${username}`}><h5>{displayName}</h5></Link>
                </div>
            </div>
            <YSKInput
                placeholder={"Word"}
                name={"word"}
                onChange={onChangeEntry}
                value={entry.word}
                error={errors.word}
                >
            </YSKInput>
            <textarea value={entry.definition} onChange={onChangeEntry} name={"definition"} rows={focused ? 2 : 1} onFocus={() => setFocused(true)} placeholder={"Type your definition here..."} className={`form-control mb-2 mt-2 ${errors.definition && "is-invalid"}`}></textarea>
            <div className={"invalid-feedback"}>{errors.definition}</div>
            <textarea value={entry.sentence} onChange={onChangeEntry} name={"sentence"} rows={focused ? 2 : 1} onFocus={() => setFocused(true)} placeholder={"Type an example of how it's used in a sentence"} className={`form-control mb-2 mt-2 ${errors.sentence && "is-invalid"}`}></textarea>
            <div className={"invalid-feedback"}>{errors.sentence}</div>
            {focused &&
                <>
                    {!newImage && <YSKInput type={"file"} onChange={onChangeFile}></YSKInput>}
                    {newImage && <AutoUploadFileComp file={newImage} uploading={pendingFileUploadProgress} />}
                    <div className={"d-flex justify-content-end mb-2"}>
                        <ProgressButton pendingApiCall={pendingApiCall} disabled={pendingApiCall || pendingFileUploadProgress} text={"Submit"} onClick={addEntry} className={"btn btn-primary mx-1"}></ProgressButton>
                        <button onClick={() => setFocused(false)} className={"btn btn-danger d-inline-flex"} disabled={pendingApiCall || pendingFileUploadProgress}>Cancel</button>
                    </div>
                </>
            }
        </div>
    );
};

export default EntrySubmitComp;
