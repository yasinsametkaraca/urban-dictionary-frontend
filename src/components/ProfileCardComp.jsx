import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {MdOutlineCancel} from "react-icons/md";
import {AiOutlineSave,AiOutlineEdit } from "react-icons/ai";
import YSKInput from "./YSKInput";
import {deleteUserByUsername, updateUserByUsername} from "../services/UserService";
import {useApiProgress} from "../shared/useApiProgress";
import ProgressButton from "./ProgressButton";
import ProfileImageComp from "./ProfileImageComp";
import {logoutSuccess, updateSuccess} from "../store/authActions";
import {AiOutlineUserDelete} from "react-icons/ai";
import Modal from "./Modal";


const ProfileCard = (props) => {
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const [inEditMode, setInEditMode] = useState(false);
    const {username : loggedInUsername} = useSelector((store) => {                              //redux storedan username verisini çekip onu loggedInUsername şeklinde kullanacağımızı belirtiyoruz.
        return {username: store.username}
    })
    const [user, setUser] = useState({});
    const [editable, setEditable] = useState(false);
    const routerParams = useParams()                                                                    //routerdan propertyleri çekmek için useParams kullandık.
    const pathUrlUsername = routerParams.username                                                       //props.match.params.username.
    const [newImage, setNewImage] = useState()
    const [validationErrors, setValidationErrors] = useState({});                              //backendden dönen hata mesajlarını bu state de tutucaz.
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const pendingApiCall = useApiProgress("put","/api/users/"+user.username);
    const pendingApiCallUserDelete = useApiProgress("delete",`/api/users/${loggedInUsername}`,true);
    const history = useHistory()

    useEffect(() => {
        setUser(props.user)
    }, [props.user]);

    useEffect(() => {
        setEditable( pathUrlUsername === loggedInUsername)
    }, [pathUrlUsername,loggedInUsername]);

    useEffect(()=>{
        if(!inEditMode){
            setUpdatedDisplayName(undefined);
            setNewImage(undefined)
        }else {
            setUpdatedDisplayName(user.displayName)
        }
    },[inEditMode,user.displayName])

    useEffect(() => {
        setValidationErrors({...validationErrors,image:undefined})
    }, [newImage]);
    
    const saveProfileData = async () => {
        const body = {
            displayName: updatedDisplayName,
            image: newImage?.split(",")[1]
        };
        try {
            const response = await updateUserByUsername(user.username,body);
            setUser(response.data);
            setInEditMode(false);
            dispatch(updateSuccess(response.data))  //redux da yaptığımız image ve display güncellemesini update ettik.
        }catch (err) {
            setValidationErrors(err.response.data.validationErrors);
        }
    }


    const onChangeFile = (e) => {
        if(e.target.files.length<1){
            return; //cancel olduğunda undefined olmasın diye.
        }
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () =>{
           setNewImage(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }

    const onClickDeleteAccount = async () => {
        await deleteUserByUsername(loggedInUsername);
        setModalVisible(false);
        dispatch(logoutSuccess()); //hesabı sildikten sonra logout olundu.
        history.push("/");
    }

    return (
        <div className="card shadow">
            <div className={"text-center card-header shadow"}>
                <ProfileImageComp className={"rounded-circle"} width={"200"} height={"200"} image={user.image} newimage={newImage} alt={user.displayName} ></ProfileImageComp>
            </div>
            <div className={"text-center card-body shadow"}>
                { !inEditMode &&
                    <>
                        <h1>{user.displayName}</h1>
                        <p className="title">{user.username}</p>
                        {editable &&
                            <div>
                                <div>
                                    <button onClick={() => setInEditMode(true)} className="btn btn-success d-inline-flex px-2 py-1"><AiOutlineEdit size={21}></AiOutlineEdit>Edit</button>
                                </div>
                                <div className={"py-3"}>
                                    <button onClick={() => setModalVisible(true)} className="btn btn-danger d-inline-flex px-2 py-1"><AiOutlineUserDelete size={21}></AiOutlineUserDelete>
                                        Delete My Account
                                    </button>
                                </div>
                            </div>
                        }
                    </>
                }
                {inEditMode && (
                        <div className={""}>
                            <YSKInput
                                error={validationErrors.displayName}
                                defaultValue={user.displayName} label={"Display Name"}
                                onChange={(e) => {
                                    setUpdatedDisplayName(e.target.value);
                                    setValidationErrors({...validationErrors,displayName:undefined})
                                }}>
                            </YSKInput>
                            <YSKInput type={"file"} onChange={onChangeFile} error={validationErrors.image}/>
                            <div className={"m-2"}>
                                <ProgressButton pendingApiCall={pendingApiCall} disabled={pendingApiCall} onClick={() => saveProfileData()} className={"btn btn-primary m-1 d-inline-flex"} text={
                                    <AiOutlineSave size={21}></AiOutlineSave>
                                }
                                ></ProgressButton>
                                <ProgressButton disabled={pendingApiCall} onClick={() => setInEditMode(false)} className={"btn btn-danger d-inline-flex"} text={
                                    <MdOutlineCancel size={21}></MdOutlineCancel>
                                }></ProgressButton>
                            </div>
                        </div>
                    )}
            </div>
            <Modal
                   visible={modalVisible}
                   setVisible={setModalVisible}
                   confirmButtonText={"Delete"}
                   modalTitle="Delete Account"
                   pendingApiCall={pendingApiCallUserDelete}
                   onConfirm = {onClickDeleteAccount}
                   modalBody={
                       <div>
                           <div><strong>Are you sure you want to delete your account?</strong></div>
                       </div>}>
            </Modal>
        </div>
    );
}
export default ProfileCard

