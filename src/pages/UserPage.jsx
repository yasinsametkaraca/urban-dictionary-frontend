import React, {useEffect, useState} from 'react';
import ProfileCard from "../components/ProfileCardComp";
import {getUserByUsername} from "../services/UserService";
import {useApiProgress} from "../shared/useApiProgress";
import {useParams} from "react-router-dom";
import Loading from "../components/Loading";

const UserPage = (props) => {
    const [user, setUser] = useState({});
    const [errorNotFound, setErrorNotFound] = useState(false);
    const {username} = useParams() //router username (url içindeki)

    const pendingApiCall = useApiProgress("get","/api/users/"+username)

    useEffect(() => {
        const loadUser = () => {
            getUserByUsername(props.match.params.username)
                .then((response)=>{
                    setUser(response.data)
                    setErrorNotFound(false)
                }).catch((err) => {
                    setErrorNotFound(true)
            })
        }
        loadUser()
    },[props.match.params.username])                                     //url içindeki değer her değiştiğinde useEffect devreye girsin

    if(pendingApiCall){
        return (
            <Loading></Loading>
        )
    }

    if(errorNotFound){                                                        //burası doğruysa aşağıdaki return çalışmaz
        return (
            <div className={"container alert alert-danger text-center"}>
                User Not found!!!
            </div>
        )
    }
    return (
        <div className={"container"}>
            <ProfileCard user={user}></ProfileCard>
        </div>
    );
};

export default UserPage;
