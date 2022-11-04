import {applyMiddleware, createStore,compose} from "redux";
import authReducer from "./authReducer"
import SecureLS from "secure-ls";
import thunk from "redux-thunk";

const secureLs = new SecureLS()                                                                                                           //local storage e aktaracağımız state bilgilerini şifreleyerek aktarmak için

const configureStore = () => {

    /*const authData = localStorage.getItem("auth-data")*/
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
            stateInLocalStorage = authData
    }
    const reduxComposeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer,stateInLocalStorage,reduxComposeEnhancers(applyMiddleware(thunk)));                                //birinci parametre reducer,ikinci parametre başlangıç state i, üçüncü parametre asenktron actionlar için thunk.

    store.subscribe(()=>{                           //storeda her değişim olduğunda burası çağrılır.
        /*localStorage.setItem("auth-data",JSON.stringify(store.getState()))*/
        secureLs.set("auth-data",store.getState())
    })
    
    return store;
}
export default configureStore