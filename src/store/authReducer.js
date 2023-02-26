import * as ACTIONS from "./Constants"

const defaultState = {
    isLoggedIn:false,
    username:undefined,
    displayName:undefined,
    image:undefined,
    password:undefined
}
const authReducer = (state={...defaultState},action) => {         //reducer 0 son state i ve action u alarak güncel state i üretip döner
    if(action.type===ACTIONS.LOGOUT_SUCCESS){
        return defaultState
    }else if(action.type===ACTIONS.LOGIN_SUCCESS){
        return {
            ...action.payload,
            isLoggedIn: true
        }
    }else if(action.type===ACTIONS.UPDATE_SUCCESS){
        return {
            ...state,
            displayName: action.payload.displayName,
            image: action.payload.image
        }
    }
    return state
}
export default authReducer;