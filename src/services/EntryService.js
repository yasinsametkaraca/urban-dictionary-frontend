import axios from "axios";

export const postEntry = (entry) => {
    return axios.post("/api/entries",entry)
}

export const getEntries = (username, page = 0) => {                                         //page=0 demek ilk sayfayı çağır. Defaultu sıfırdır.
    const path = username ? `/api/users/${username}/entries?page=` : "/api/entries?page=";          //varsa undefined değilse yani UserPage içindeysek sadece o usera ait entryler gelir.
    return axios.get(path + page);
}

export const getOldEntries = (id,username) => {
    const path = username ? `/api/users/${username}/entries/${id}` : `/api/entries/${id}`;          //user page içindeysek username de yollamışız demektir. Yani o usera ait entryler getirilir.
    return axios.get(path);
}

export const getNewEntryCount = (id,username) => {                                                           //verdiğimiz id den sonraki id lerin sayısını getiricek.
    const path = username ? `/api/users/${username}/entries/${id}?count=true` : `/api/entries/${id}?count=true`;          //user page içindeysek username de yollamışız demektir. Yani o usera ait entryler getirilir.
    return axios.get(path);
}

export const getNewEntries = (id,username) => {
    const path = username ? `/api/users/${username}/entries/${id}?direction=after` : `/api/entries/${id}?direction=after`;
    return axios.get(path);                                                                                             //verilen id den sonraki id de olan entryleri döner.
}

export const postEntryAttachment = (attachment) => {
    return axios.post("/api/entry-attachments",attachment);
}

export const deleteEntry = (id) => {
    return axios.delete("/api/entries/"+id);
}