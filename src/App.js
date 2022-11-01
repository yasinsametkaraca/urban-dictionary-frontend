import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import UserSignupPage from "./pages/UserSignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Route, Redirect, Switch, HashRouter} from "react-router-dom";
import UserPage from "./pages/UserPage";
import TopBarComp from "./components/TopBarComp";


class App extends React.Component{
    state = {
        isLoggedIn:false,
        username:undefined
    }
    onLoginSuccess = (username) => {
        this.setState({
            username: username,
            isLoggedIn : true
        })
    }
    onLogoutSuccess = () => {
        this.setState({
            isLoggedIn: false,
            username: undefined
        })
    }


      render() {
        const{isLoggedIn,username} = this.state

          return (
              <div>
                  <HashRouter>  {/*şimdilik her component açılışında backend isteği olmaması için hashrouter yaptık*/}
                      <TopBarComp username={username} isLoggedIn={isLoggedIn} onLogoutSuccess={this.onLogoutSuccess}></TopBarComp>
                      <Switch>
                          <Route exact path="/" component={HomePage}></Route>
                          {!isLoggedIn && (<Route path="/login" component={(reactRouterProps) => {  //login olduktan /logine gitmesini engelledik.
                              return <LoginPage {...reactRouterProps} onLoginSuccess={this.onLoginSuccess}></LoginPage>  /*reactRouter propslarını logine vermek için*/
                          }}></Route>)}
                          <Route path="/signup" component={UserSignupPage}></Route>
                          <Route path="/user/:username" component={props =>{
                              return <UserPage {...props} username={username}></UserPage>
                          }}></Route>                     {/*username dinamik olarak gelicek*/}
                          <Route path="/login" component={LoginPage}></Route>
                          <Redirect to={"/"}></Redirect>                                                  {/*olmayan url girilirse ana sayfaya atar.*/}
                      </Switch>
                  </HashRouter>
              </div>
          );
      }
    }

export default App;
