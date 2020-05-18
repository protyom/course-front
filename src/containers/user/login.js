import {LoginForm} from "../../components/user/LoginForm";
import React from "react";
import {RedirectButton} from "../../components/user/RedirectButton";


class Login extends React.Component{
    render() {
        return <div>
            <RedirectButton url={'/register'} value={'Sign up'} style={{marginLeft: 10, marginTop: 10, float:'left'}}/>
            <LoginForm />
        </div>;
    }
}


export default Login;