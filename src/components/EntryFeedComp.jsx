import React, {useEffect, useState} from 'react';
import {getEntries} from "../services/EntryService";
import EntryItemComp from "./EntryItemComp";
import {useApiProgress} from "../shared/useApiProgress";
import Loading from "./Loading";

const EntryFeedComp = () => {
    const [entryPage, setEntryPage] = useState({content: [], last: true, number: 0});  //page şeklinde yaptım backendi.
    const pendingApiCall = useApiProgress("get","/api/entries")

    useEffect(() => {
        loadEntries();
    }, []);
    const loadEntries = async (page) => {
        if(pendingApiCall){return;}                                                         //bunu yapmamızın sebebi üst üste istek atmayı engelemek.
        try {
            const response = await getEntries(page)
            setEntryPage({
                ...response.data,
                content: [...entryPage.content,...response.data.content]
            });                                                                             //eski contentlerin üstüne eklemesi için böyle yaptım.
        } catch (err) {}
    }

    if(entryPage.content.length === 0){
        return (<div className={"text-center m-1 alert alert-secondary"}>{pendingApiCall ? <Loading/> : "There are no entries." }</div>)
    }
    return (
        <div>
            {
                entryPage.content.map((entry => (
                    <EntryItemComp
                        key={entry.id}
                        entry={entry}
                    ></EntryItemComp>
                )))
            }
            {!entryPage.last &&
                <div
                    style={{cursor: pendingApiCall ? "not-allowed" : "pointer"}}
                    onClick={() => loadEntries(entryPage.number + 1)}
                    className={"text-center m-2 alert alert-primary"}
                >
                    {pendingApiCall ? <Loading/> : "Load Old Entry." }
                </div>}                                                                         {/*eğer son sayfada değilsek burası çalışır. Last bize backendden döner page sayesinde*/}
        </div>
    );
};

export default EntryFeedComp;