import React, {useEffect, useState} from 'react';
import ProfileCard from "../components/ProfileCardComp";
import {getUserByUsername} from "../services/UserService";
import {useApiProgress} from "../shared/useApiProgress";
import {useParams} from "react-router-dom";
import Loading from "../components/Loading";
import {Grid} from "semantic-ui-react";
import EntryFeedComp from "../components/EntryFeedComp";


const UserPage = (props) => {
    const [user, setUser] = useState({});
    const [errorNotFound, setErrorNotFound] = useState(false);
    const {username} = useParams() //router username (url içindeki)

    const pendingApiCall = useApiProgress("get","/api/users/"+username, true)   //strictPath true dedik sadece birebir örtüşen requestlerde devreye girer.

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
        loadUser();
    },[props.match.params.username])                                     //url içindeki değer her değiştiğinde useEffect devreye girsin

    if(errorNotFound){                                                        //burası doğruysa aşağıdaki return çalışmaz
        return (
            <div className={"container alert alert-danger text-center"}>
                User not found!
            </div>
        )
    }

    if(pendingApiCall || user.username !== username){                          //loadUser isteğinden gelen username cevabının dönmesini bekler. Loading componenti devreye girsin isteriz yoksa iki kere listeleme isteği atılır.
        return (
            <Loading></Loading>
        )
    }

    return (
        <div className={"container"}>
            <Grid>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <ProfileCard user={user}></ProfileCard>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <EntryFeedComp></EntryFeedComp>
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default UserPage;
