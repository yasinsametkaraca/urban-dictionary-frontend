import axios from "axios";

export const postEntry = (entry) => {
    return axios.post("/api/entries",entry)
}

export const getEntries = (page= 0) => {  //page=0 demek ilk sayfayı çağır.
    return axios.get("/api/entries?page=" + page);
}