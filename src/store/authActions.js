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
export const updateSuccess = ({displayName,image}) => {
    return {
        type: ACTIONS.UPDATE_SUCCESS,
        payload: {
            displayName,
            image
        }
    }
}
export const loginHandler = (credentials) => {                                   //asenkron olduğundan thunk i configureStoreda import ettik.
    return async (dispatch) => {
        const response = await login(credentials)
        const authState = {
            ...response.data.user,
            token: response.data.token
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


