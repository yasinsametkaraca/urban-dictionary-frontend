import * as ACTIONS from "./Constants"

export const logoutSuccess = () => {
    return {  //burda yaptığımız action reducer a düşmelidir.
        type: ACTIONS.LOGOUT_SUCCESS,
    }
}
export const loginSuccess = (authState) => {
    return {  //burda yaptığımız action reducer a düşmelidir.
        type: ACTIONS.LOGIN_SUCCESS,
        payload:authState
    }
}
