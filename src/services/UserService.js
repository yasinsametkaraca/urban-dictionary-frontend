import axios from "axios";

export const signUp = (body) => {
    return axios.post("/api/users",body)
}
export const login = (creds) => {
    return axios.post("/api/auth",{},{auth: creds})
}