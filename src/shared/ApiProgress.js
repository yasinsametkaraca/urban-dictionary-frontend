import React, {Component} from 'react';
import axios from "axios";

class ApiProgress extends Component {  //pendingApiCall u burdan login ve signUp a göndereceğiz. index.js de sarmaladık. bu yapıyla loginpage e parametre verebiliriz. (this.props.children diyerek)

    state = {
        pendingApiCall: false
    }
    componentDidMount() {                                                                //interceptors backend de request response esnasında yapılacak işler için vardır.
        axios.interceptors.request.use((request)=>{             //request i değiştirebiliriz ama burda sadece butona basınca sıkça basılmama durumu için kullanıcaz.
            if(request.url===this.props.path){   //path e göre davranış göstericek yoksa bütün tanımlı olan yerlerde kullanılırdı.
                this.setState({pendingApiCall: true})
            }
            return request  //axios a request e devam et diyoruz.
        })
        axios.interceptors.response.use((response)=>{               //ilk parametre success cevaplar için ikinci parametre hatalar için
            if(response.config.url===this.props.path){
                this.setState({pendingApiCall: false})
            }
            return response
        },(error) => {
            if(error.config.url===this.props.path){
                this.setState({pendingApiCall: false})
            }
            throw error
        })
    }

    render() {
        const {pendingApiCall} = this.state  //this.state.pendingApiCall demek yerine direk pendingApiCall diyerek kullanıcaz.
        return (
            <div>{React.cloneElement(this.props.children,{
                pendingApiCall: pendingApiCall
            })}</div>
        );
    }
}

export default ApiProgress;