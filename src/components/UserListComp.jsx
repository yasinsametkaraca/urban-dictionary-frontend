import React, {useEffect, useState} from 'react';
import {getAllUsers} from "../services/UserService";
import {Card, List,Button} from "semantic-ui-react";
import UserListItemComp from "./UserListItemComp";
import {useApiProgress} from "../shared/useApiProgress";
import Loading from "./Loading";

const UserListComp = (props) => {      //bu component userları listeleyecektir.

    const [page, setPage] = useState({
        content:[],                                     //veriler contenti içindedir.
        number:0,                                       //hangi sayfa
        size:8                                         //sayfada kaç veri olacak
    });
    const pendingApiCall = useApiProgress("get","/api/users?page")
    const [loadFailure, setLoadFailure] = useState(false);         //yüklenmezse liste

    useEffect(()=>{
        loadUsers()
    },[])                                                                           //buraya boş bir array vermek sadece componentDidMount (yani component yüklendiğinde çalışır) gibi çalışmasını sağlar. Eğer koymazsak componentDidUpdate (en ufak her değişiklikte çalışır) gibi çalışır.


    const onClickNext = () => {
        const nextPage = page.number+1
        loadUsers(nextPage)
    }
    const onClickPrevious = () => {
        const previousPage = page.number-1
        loadUsers(previousPage)
    }
    const loadUsers = async (page) => {
        setLoadFailure(false);
        try {
            const response =await getAllUsers(page)
            setPage(response.data)
        }catch (err) {
            setLoadFailure(true)
        }
    }
    const {content:users,last,first} = page      //last ve first ilk sayfadamıyız son sayfadamıyız diye kontrol için. (true/false döner)

    if (pendingApiCall) {
         return <div>
             <Loading />;
         </div>
    }
    return (

        <Card className={"w-100"}>
            {loadFailure && <div className={"text-center"}>Server Error</div>}
            <Card.Content header='Users' />
            <Card.Content>
            <List animated verticalAlign='middle' >
                {users.map((user) => (
                    <UserListItemComp key={user.username} user={user}></UserListItemComp>
                ))}
            </List>
            </Card.Content>
            <Button.Group>
                {first===false && <Button onClick={onClickPrevious} labelPosition='left' icon='left chevron' content='Previous'/>}
                {last===false && <Button onClick={onClickNext} labelPosition='right' icon='right chevron' content='Next'/>}
            </Button.Group>
        </Card>
    );
}
export default UserListComp;

