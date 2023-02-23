import {applyMiddleware, createStore,compose} from "redux";
import authReducer from "./authReducer"
import SecureLS from "secure-ls";
import thunk from "redux-thunk";
import {setAuthorizationHeader} from "../services/UserService";

const secureLs = new SecureLS()                                                                                                           //local storage e aktaracağımız state bilgilerini şifreleyerek aktarmak için

const getStateFromStorage = () => {
    const authData = secureLs.get("auth-data")
    let stateInLocalStorage = {                                                                                                    //login olunmamışsa burası çalışır. Undefined tanımlandığı için javascript localStorage e bu bilgileri koymaz.
        isLoggedIn:false,
        username:undefined,
        displayName:undefined,
        image:undefined,
        password:undefined
    }
    if(authData){
        /*stateInLocalStorage = JSON.parse(authData)*/                                                                           //sayfayı yenilesek dahi eğer kullanıcı giriş yapmışsa state girili haliyle kalır.
        return authData;
    }
    return stateInLocalStorage
}

const configureStore = () => {

    const initialState = getStateFromStorage();
    setAuthorizationHeader(initialState);                                                                                       // set authorization header yapıyoruz. login olan kullanıcıyı Authorization header içerisinde yolluyoruz.
    const reduxComposeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer,initialState,reduxComposeEnhancers(applyMiddleware(thunk)));                           //birinci parametre reducer,ikinci parametre başlangıç state i, üçüncü parametre asenktron actionlar için thunk.

    store.subscribe(()=>{                           //storeda her değişim olduğunda burası çağrılır.
        secureLs.set("auth-data",store.getState())
        setAuthorizationHeader(store.getState())                                                                                //storadaki her değişikliği authorization headera yansıttık.
    })
    
    return store;
}
export default configureStore