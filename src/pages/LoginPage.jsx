import React, {useEffect, useState} from 'react';
import YSKInput from "../components/YSKInput";
import {useApiProgress} from "../shared/ApiProgress";
import { useDispatch} from "react-redux"
import {loginHandler} from "../store/authActions";

const LoginPage = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const dispatch = useDispatch()                                                           //redux kullanabilmek için.

    useEffect(() => {                                                                  /* UseEffect bir etki olduğunda tetiklenir. ilk parametre çağrılıcak fonksiyon, ikinci parametre hangi attribute değişikliğinde bu fonksiyon çağrılsın (bu fonksiyonun tetiklenmesini sağlayan dependencyler ne olsun).*/
        setError(undefined)
    },[username,password])                                                              //username ve password değişirse erroru undefined yap.

    const onClickLogin = async (event) => {
        event.preventDefault()
        const credentials ={
            username : username,
            password : password,
        };
        setError(undefined)
        const {history} = props
        const {push} = history                                                                       //object destructuring yaparak push = props.history.push yapmış olduk.
        try {
            await dispatch(loginHandler(credentials))                                                     //hem api call yapıp hem de redux actionu yaptık.(Asenkron hareket olduğu içi thunk kullandık)
            push("/")                                                                               //Router dan props olarak alıyoruz app.js de router sarmaladığı için. eğer login success olursa homepage sayfasına push la.
        }catch (apiErr) {
            setError(apiErr.response.data.message)
        }
    }
    const pendingApiCall = useApiProgress("/api/auth")                                                       //kendi hookumuzu tanımlamış olduk.
    const loginButtonEnabled = username && password;

    return (
        <div className="container w-50">

            <form className={""}>
                <h1 className={"text-center"}>Login</h1>
                <YSKInput label={"Username"} onChange={ (event) => setUsername(event.target.value) } ></YSKInput>                      {/*input içerisindeki değeri username e ata.*/}
                <YSKInput label={"Password"} type={"password"} onChange={ (event) => setPassword(event.target.value) } ></YSKInput>
                {error && <div className="alert alert-danger" role="alert">Username or password is incorrect</div>} {/*error varsa göster*/}
                <div className={" text-center"}>
                    <button disabled={!loginButtonEnabled || pendingApiCall} onClick={onClickLogin} className={"btn btn-primary m-3"}> {pendingApiCall ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :  "Login" }</button>
                </div>
            </form>
        </div>
    );
}
export default LoginPage











/*const LoginPageWithApiProgress = withApiProgress(LoginPage,"/api/auth")   //apiProgress componenti login componenti içine ekledik.
export default (LoginPageWithApiProgress);*/

//normalde burda tanımlamıştık ama hem loginde hem signup da kullandığımız için ortak bi yerden çekicez. ApiProgress componenti oluşturduk.
/*componentDidMount() {  //interceptors backend de request response esnasında yapılacak işler için vardır.
    axios.interceptors.request.use((request)=>{  //request i değiştirebiliriz ama burda sadece butona basınca sıkça basılmama durumu için kullanıcaz.
        this.setState({pendingApiCall: true})
        return request  //axios a request e devam et diyoruz.
    })
    axios.interceptors.response.use((response)=>{  //ilk parametre success cevaplar için ikinci parametre hatalar için
        this.setState({pendingApiCall: false})
        return response
    },(error) => {
        this.setState({pendingApiCall: false})
        throw error
    })
}*/