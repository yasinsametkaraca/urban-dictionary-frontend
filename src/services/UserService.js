import axios from "axios";

export const signUp = (body) => {
    return axios.post("/api/users",body)
}
export const login = (credentials) => {  //username ve password yolluyoruz.
    return axios.post("/api/auth",credentials)
}
export const logout = () => {
    return axios.post("/api/logout");
}
export const getAllUsers = (page=0,size=8) => {
    return axios.get(`/api/users?page=${page}&size=${size}`)
}
export const setAuthorizationHeader = ({isLoggedIn, token}) => {  //her istekde tokenimiz gidicek.
    if(isLoggedIn){
        const authorizationHeaderValue = `Bearer ${token}`
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;  //gönderdiğimiz her istekte bu token gidicek.
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
export const deleteUserByUsername = (username) => {
    return axios.delete(`/api/users/${username}`);
}
