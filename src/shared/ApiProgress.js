import React, {Component} from 'react';
import axios from "axios";

function getDisplayName(WrappedComponent){
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function withApiProgress(WrappedComponent,apiPath){
    return class extends Component {                                                         //pendingApiCall u burdan login ve signUp a göndereceğiz.
        static displayName = "ApiProgress("+getDisplayName(WrappedComponent)+")";            //react developer tools da anlamak artık daha kolay sarmalama yapıldığı direk anlaşılıyor.
        state = {
            pendingApiCall: false
        }
        componentDidMount() {                                                                //interceptors backend de request response esnasında yapılacak işler için vardır.
            this.requestInterceptor = axios.interceptors.request.use((request)=>{             //request i değiştirebiliriz ama burda sadece butona basınca sıkça basılmama durumu için kullanıcaz.
                console.log("request interceptors")
                if(request.url===apiPath){                                                  //path e göre davranış göstericek yoksa bütün tanımlı olan yerlerde kullanılırdı.
                    this.setState({pendingApiCall: true})
                }
                return request                                                                  //axios a request e devam et diyoruz.
            })
            this.responseInterceptor = axios.interceptors.response.use((response)=>{               //ilk parametre success cevaplar için ikinci parametre hatalar için
                if(response.config.url===apiPath){
                    this.setState({pendingApiCall: false})
                }
                return response
            },(error) => {
                if(error.config.url===apiPath){
                    this.setState({pendingApiCall: false})
                }
                throw error
            })
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor)   //component ekrandan çıkınca interceptorsları çıkarıyoruz.
            axios.interceptors.response.eject(this.responseInterceptor)
        }


        render() {
            const {pendingApiCall} = this.state                                                //this.state.pendingApiCall demek yerine direk pendingApiCall diyerek kullanıcaz.
            return <WrappedComponent pendingApiCall={pendingApiCall} {...this.props}></WrappedComponent>       //böyle diyerek child componenti render eder.

            /*return (<div>{React.cloneElement(this.props.children,{pendingApiCall: pendingApiCall})}</div>);*/
        }
    }
}

