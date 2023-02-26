import React, {useEffect, useState} from 'react';
import YSKInput from "./YSKInput";
import {useSelector} from "react-redux";
import ProfileImageComp from "./ProfileImageComp";
import {postEntry} from "../services/EntryService";
import {signUpHandler} from "../store/authActions";
import {useApiProgress} from "../shared/useApiProgress";
import ProgressButton from "./ProgressButton";

const EntrySubmitComp = () => {
    const {image,displayName} = useSelector(state => ({image: state.image, displayName: state.displayName}))
    const [entry,setEntry] = useState({word: "", definition: "", sentence: "",});
    const [errors, setErrors] = useState({word: undefined, definition: undefined, sentence: undefined,});
    const [focused, setFocused] = useState(false);
    const pendingApiCall = useApiProgress('post','/api/entries')

    useEffect(() => {
       if(!focused){
         setEntry({word:"", definition:"", sentence:"",})
         setErrors({ word: undefined, definition: undefined, sentence: undefined,})
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
            sentence
        }
        try {
            await postEntry(body);
            setFocused(false)
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)
            }
        }
    }
    return (
        <div className={"card p-3"}>
            <div className={"d-flex"}>
                <ProfileImageComp image={image} width={"26"} height={"26"} className={"rounded-circle"}></ProfileImageComp>
                <p className={"p-0 mx-2"}>{displayName}</p>
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
            {focused && <div className={"d-flex justify-content-end mb-2"}>
                <ProgressButton pendingApiCall={pendingApiCall} disabled={pendingApiCall} text={"Submit"} onClick={addEntry} className={"btn btn-primary mx-1"}></ProgressButton>
                <button onClick={() => setFocused(false)} className={"btn btn-danger d-inline-flex"} disabled={pendingApiCall}>Cancel</button>
            </div>}

        </div>
    );
};

export default EntrySubmitComp;
