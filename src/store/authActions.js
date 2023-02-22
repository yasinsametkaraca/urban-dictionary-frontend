import * as ACTIONS from "./Constants"
import { login, signUp} from "../services/UserService";

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
export const loginHandler = (credentials) => {                                   //asenkron olduğundan thunk i configureStoreda import ettik.
    return async (dispatch) => {
        const response = await login(credentials)
        const authState = {
            username:response.data.username,
            password:credentials.password,
            displayName: response.data.displayName,
            image: response.data.image
        }
        dispatch(loginSuccess(authState))
        return response
    }
}
export const signUpHandler = (signUpBody) => {                              //sign up isteği ile hem login olduk hem signup olduk.
    return async (dispatch) => {
        const response = await signUp(signUpBody)
        await dispatch(loginHandler(signUpBody))
        return response
    }
}


