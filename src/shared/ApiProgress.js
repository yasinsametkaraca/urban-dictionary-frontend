import { useEffect, useState} from 'react';
import axios from "axios";

export const useApiProgress = (apiPath) => {                                                                                    //Kendi hookumuzu yaptık. useApiProgress diyerek login ve signup da kullandık.
    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {                                                                                                       //useApiProgress component ekrana gelir gelmez eusEffect çağrılır. Sanki componentDidMount gibi çalışır.
        let requestInterceptor,responseInterceptor

        const updatePendingApiCall = (url,inProgress) =>{
            if(url===apiPath){                                                                                               //path e göre davranış göstericek yoksa bütün tanımlı olan yerlerde kullanılırdı.
                setPendingApiCall(inProgress)
            }
        }
        const signUpInterceptors = () => {
            requestInterceptor = axios.interceptors.request.use((request)=>{                          //request i değiştirebiliriz ama burda sadece butona basınca sıkça basılmama durumu için kullanıcaz.
                updatePendingApiCall(request.url,true)
                return request                                                                                                  //axios a request e devam et diyoruz.
            })
            responseInterceptor = axios.interceptors.response.use((response)=>{                        //ilk parametre success cevaplar için ikinci parametre hatalar için
                updatePendingApiCall(response.config.url,false)
                return response
            },(error) => {
                updatePendingApiCall(error.config.url,false)
                throw error
            })
        }
        const unSignUpInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor)   //component ekrandan çıkınca interceptorsları çıkarıyoruz.
            axios.interceptors.response.eject(responseInterceptor)
        }
        signUpInterceptors()

        return function unMount(){                                                                                              //bu yaptığımız iş yani useEffect içerisinde return etmemiz componentWillUnmount işlemine denk gelmektedir. yani component ekrandan çıktğı anda devreye girer.
            unSignUpInterceptors()
        }
    });
    return pendingApiCall
}


