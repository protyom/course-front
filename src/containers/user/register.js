
import React from "react";
import Button from "@material-ui/core/Button";
import {
    RedirectButton,
} from "../../components/user/RedirectButton";
import {RegisterForm} from "../../components/user/RegisterForm";


class Register extends React.Component{
    render() {

        return <div>
            <RedirectButton url={'/login'} value={'To login'} style={{marginLeft: 10, marginTop: 10, float:'left'}}/>
            <RegisterForm />
        </div>;
    }
}


export default Register;