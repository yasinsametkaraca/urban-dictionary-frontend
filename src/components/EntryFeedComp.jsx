import React, {useEffect, useState} from 'react';
import {getEntries, getNewEntries, getNewEntryCount, getOldEntries} from "../services/EntryService";
import EntryItemComp from "./EntryItemComp";
import {useApiProgress} from "../shared/useApiProgress";
import Loading from "./Loading";
import {useParams} from "react-router-dom";

const EntryFeedComp = () => {                                                                            //bu component hem UserPage de o usera ait olan entryler için hem de HomePage deki tüm entrylerin load edilmesi için yapılmıştır.
    const [entryPage, setEntryPage] = useState({content: [], last: true, number: 0});           //page şeklinde yaptım backendi.
    const {username} = useParams()                                                                       //url içerisindeki usernamedir. Anasayfada undefined usersayfada username neyse odur.
    const path = username ? `/api/users/${username}/entries?page=` : "/api/entries?page=";               //username varsa undefined değilse yani UserPage içindeysek bu pathi dinlicez -> /api/users/${username}/entries?page=
    const initialEntryLoadProgress = useApiProgress("get",path)                                 //bu ilk uygulama açıldığındaki loadEntries için olan progress.
    const [newEntryCount, setNewEntryCount] = useState(0);

    let firstEntryId = 0;
    let lastEntryId = 0;
    if(entryPage.content.length>0){
        firstEntryId = entryPage.content[0].id;
        const lastEntryIndex = entryPage.content.length - 1;                                                //son sıradaki entrinin id si aldık. Aldığımız id nin altındaki 10 entry i getiricek. 52 nolu id son yüklenen entry ise 42 ye kadar olan entrileri yükler.
        lastEntryId = entryPage.content[lastEntryIndex].id;
    }

    const oldEntryPath = username ? `/api/users/${username}/entries/${lastEntryId}` : `/api/entries/${lastEntryId}`;
    const loadOldEntriesProgress = useApiProgress("get",oldEntryPath,true)

    const newEntryPath = username ? `/api/users/${username}/entries/${firstEntryId}?direction=after` : `/api/entries/${firstEntryId}?direction=after`;
    const loadNewEntriesProgress = useApiProgress("get",newEntryPath,true)

    useEffect(() => {
        const getEntryCount = async () => {
            const response = await getNewEntryCount(firstEntryId,username);                                      //burdan mesela count = 5 diye cevap döner.
            setNewEntryCount(response.data.count)
        }
            let interval = setInterval(getEntryCount,5000)                                          //her saniyede bir istek atıyoruz new entry var mı diye.
        return () => {
            clearInterval(interval)
        }

    }, [firstEntryId,username]);

    useEffect(() => {
        const loadEntries = async (page) => {
            if(initialEntryLoadProgress){return;}                                                         //bunu yapmamızın sebebi üst üste istek atmayı engelemek.
            try {
                const response = await getEntries(username,page)
                setEntryPage({
                    ...response.data,
                    content: [...entryPage.content,...response.data.content]
                });                                                                                        //eski contentlerin üstüne eklemesi için böyle yaptım.
            } catch (err) {}
        }
        loadEntries();
    }, [username]);

    const loadOldEntries = async () => {
        const response = await getOldEntries(lastEntryId,username);
        setEntryPage({
            ...response.data,
            content: [...entryPage.content,...response.data.content]
        });
    }

    const loadNewEntries = async () => {
        const response = await getNewEntries(firstEntryId,username);
        setEntryPage({
            ...entryPage,
            content: [...response.data, ...entryPage.content]  //önce newEntry ler gelicek.
        });
        setNewEntryCount(0);
    }

    const onDeleteEntrySuccess = (id) => {  //delete başarılır dönerse
        setEntryPage({
            ...entryPage,
            content: entryPage.content.filter(entry => entry.id !== id)
        })
    }

    if(entryPage.content.length === 0){
        return (<div className={"text-center m-1 alert alert-secondary"}>{initialEntryLoadProgress ? <Loading/> : "There are no entries." }</div>)
    }

    return (
        <div>
            {
                newEntryCount > 0 &&
                    <div style={{cursor: loadNewEntriesProgress ? "not-allowed" : "pointer"}}
                         onClick={loadNewEntriesProgress ? () => {} : () => loadNewEntries()}
                         className={"text-center m-3 alert alert-primary"}>{loadNewEntriesProgress ? <Loading/> : "There are new entries." }
                    </div>
            }
            {
                entryPage.content.map((entry => (
                    <EntryItemComp
                        onDeleteEntrySuccess={onDeleteEntrySuccess}
                        key={entry.id}
                        entry={entry}
                    ></EntryItemComp>
                )))
            }
            {!entryPage.last &&
                <div
                    style={{cursor: loadOldEntriesProgress ? "not-allowed" : "pointer"}}
                    onClick={() => loadOldEntries()}
                    className={"text-center m-2 alert alert-primary"}
                >
                    {loadOldEntriesProgress ? <Loading/> : "Load Old Entry." }
                </div>}
            {/*eğer son sayfada değilsek burası çalışır. Last bize backendden döner page sayesinde*/}
        </div>
    );
};

export default EntryFeedComp;
