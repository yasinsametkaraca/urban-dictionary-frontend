import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import UserSignupPage from "./pages/UserSignupPage";
import ApiProgress from "./shared/ApiProgress";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className={"row"}>
        <div className={"col"}>
            <ApiProgress path="/api/users">
                <UserSignupPage />
            </ApiProgress>
        </div>
        <div className={"col"}>
            <ApiProgress path="/api/auth">
                <LoginPage/>
            </ApiProgress>
        </div>

    </div>
  );
}

export default App;
