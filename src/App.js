import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import UserSignupPage from "./pages/UserSignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Route, Redirect, Switch, HashRouter} from "react-router-dom";
import UserPage from "./pages/UserPage";
import TopBarComp from "./components/TopBarComp";
import userPage from "./pages/UserPage";

class App extends React.Component{

      render() {
        const isLoggedIn= false

          return (
              <div>
                  <HashRouter>  {/*şimdilik her component açılışında backend isteği olmaması için hashrouter yaptık*/}
                      <TopBarComp></TopBarComp>
                      <Switch>
                          <Route exact path="/" component={HomePage}></Route>
                          {!isLoggedIn && (<Route path="/login" component={LoginPage}></Route>)}
                          <Route path="/signup" component={UserSignupPage}></Route>
                          <Route path="/user/:username" component={userPage}></Route>                     {/*username dinamik olarak gelicek*/}
                          <Route path="/login" component={LoginPage}></Route>
                          <Redirect to={"/"}></Redirect>                                                  {/*olmayan url girilirse ana sayfaya atar.*/}
                      </Switch>
                  </HashRouter>
              </div>
          );
      }
    }

export default App;
