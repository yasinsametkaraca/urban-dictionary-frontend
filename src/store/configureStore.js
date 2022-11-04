import {createStore} from "redux";
import authReducer from "./authReducer"
import SecureLS from "secure-ls";

const secureLs = new SecureLS()  //local storage e aktaracağımız state bilgilerini şifreleyerek aktarmak için

const configureStore = () => {

    /*const authData = localStorage.getItem("auth-data")*/
    const authData = secureLs.get("auth-data")

    let stateInLocalStorage = {   //login olunmamışsa burası çalışır. Undefined tanımlandığı için javascript localStorage e bu bilgileri koymaz.
        isLoggedIn:false,
        username:undefined,
        displayName:undefined,
        image:undefined,
        password:undefined
    }
    if(authData){
            /*stateInLocalStorage = JSON.parse(authData)*/   //sayfayı yenilesek dahi eğer kullanıcı giriş yapmışsa state girili haliyle kalır.
            stateInLocalStorage = authData
    }

    const store = createStore(authReducer,stateInLocalStorage,window.REDUX_DEVTOOLS_EXTENSION_ );

    store.subscribe(()=>{                           //storeda her değişim olduğunda burası çağrılır.
        /*localStorage.setItem("auth-data",JSON.stringify(store.getState()))*/
        secureLs.set("auth-data",store.getState())
    })
    
    return store;
}

export default configureStore