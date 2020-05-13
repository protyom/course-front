import {LoginForm} from "../../components/user/LoginForm";
import React from "react";
import {connect} from "react-redux";
import {mapDispatchToProps} from "../../commands/home";
import {AccountsList} from "../../components/home/home";
import {AccountCreateForm} from "../../components/home/accountCreate";


class Home extends React.Component{

    componentDidMount() {
        const {checkLogin} = this.props;
        checkLogin();
    }

    render() {
        return <div>
            <AccountsList/>
            <AccountCreateForm/>
        </div>
    }
}


export default connect(null, mapDispatchToProps)(Home);