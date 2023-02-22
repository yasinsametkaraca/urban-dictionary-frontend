import axios from "axios";

export const signUp = (body) => {
    return axios.post("/api/users",body)
}
export const login = (creds) => {
    return axios.post("/api/auth",{},{auth: creds})
}
export const getAllUsers = (page=0,size=8) => {
    return axios.get(`/api/users?page=${page}&size=${size}`)
}
export const setAuthorizationHeader = ({username,password,isLoggedIn}) => {                                                        //login olan kullanıcının bilgisi users tablosunda olmucak. bunu istek yollarken header kısmında ayarlıcaz.
    if(isLoggedIn){
        const authorizationHeaderValue = `Basic ${btoa(username +':'+password)}`  //base64 e çevirdik.
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    }else{
        delete axios.defaults.headers['Authorization'];
    }
}
export const getUserByUsername = (username) => {
    return axios.get(`/api/users/${username}`);
}
export const updateUserByUsername = (username,body) => {
    return axios.put(`/api/users/${username}`,body);
}

