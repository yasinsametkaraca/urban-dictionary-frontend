import axios from "axios";

export const postEntry = (entry) => {
    return axios.post("/api/entries",entry)
}

export const getEntries = (username, page = 0) => {  //page=0 demek ilk sayfayı çağır.
    const path = username ? `/api/users/${username}/entries?page=` : "/api/entries?page=";  //varsa undefined değilse yani UserPage içindeysek sadece o usera ait entryler gelir.
    return axios.get(path + page);
}