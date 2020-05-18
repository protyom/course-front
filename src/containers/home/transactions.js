import React from "react";
import {connect} from "react-redux";
import {mapDispatchToProps} from "../../commands/home";
import {LogoutButton} from "../../components/home/LogoutButton";
import {TransactionsList} from "../../components/home/transactionsList";


class Transactions extends React.Component{

    componentDidMount() {
        const {checkLogin} = this.props;
        checkLogin();
    }

    render() {
        return <div>
            <LogoutButton style={{float:'right'}}/>
            <TransactionsList/>
        </div>
    }
}


export default connect(null, mapDispatchToProps)(Transactions);