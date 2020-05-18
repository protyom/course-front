import Container from "@material-ui/core/Container";
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {Paper} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {TransactionCreateForm} from "./createTransactionForm";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {modExp} from "../../commands/home";
import {sha256} from "js-sha256";


export const AccountsList = () =>{
    const [accounts, setAccounts] = useState([]);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [funds, setFunds] = useState(50);
    const [recipientUuid, setRecipientUuid] = useState("");
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [myAccount, setMyAccount] = useState({});
    const handleClickOpen = (account) => {
        setOpen(true);
        setMyAccount(account);
    };
    const handleClose = () => {
        setLoading(false);
        setOpen(false);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }
    const onChangeRecipientUuid = (event) => {
        setRecipientUuid(event.target.value);
    }
    const onChangeFunds = (event, newValue) => {
        setFunds(newValue);
    };
    const createTransaction = () => {
        console.log(myAccount);
        console.log(recipientUuid);
        const random = require('random-bigint')
        const randomForCode = random(253);
        console.log('0x' + myAccount.beta);
        // eslint-disable-next-line no-undef
        let beta = BigInt('0x' + myAccount.beta);
        // eslint-disable-next-line no-undef
        let factor1 = BigInt('0x' + myAccount.factor_1)
        // eslint-disable-next-line no-undef
        let factor2 = BigInt('0x' + myAccount.factor_2)
        console.log('Beta: ', beta.toString(16));
        console.log('factor1: ', factor1.toString(16));
        console.log('factor2: ', factor2.toString(16));
        const payCode = modExp(beta, randomForCode, factor1);
        var sha256 = require('js-sha256');
        var passHash = sha256.create();
        passHash.update(password);
        console.log('Random r: ', randomForCode.toString(16));
        console.log('Pay code: ', payCode.toString(16));
        // eslint-disable-next-line no-undef
        const passwordHash = BigInt('0x'+passHash.hex())
        console.log('Alice secret key: ', passwordHash.toString(16));
        const data = {
            "pay_code": payCode.toString(16),
        }
        axios.post(
            `http://localhost/api/v1/detail_account/${myAccount.uuid}/start_pay/`,
            data,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('api_token')
                }
            }
        ).then(response => {
            console.log(response.data);
            // eslint-disable-next-line no-undef
            const evaluationParameter = BigInt('0x' + response.data.evaluation_parameter);
            console.log('Evaluation parameter: ', evaluationParameter.toString(16));
            const evaluated = (randomForCode + passwordHash * evaluationParameter) % factor2;
            console.log('Evaluated: ', evaluated.toString(16));
            const data = {
                evaluated: evaluated.toString(16),
                recipient: recipientUuid,
                funds: funds,
            };
            axios.post(
                `http://localhost/api/v1/detail_account/${myAccount.uuid}/pay/`,
                data,
                {
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('api_token')
                    }
                }
            ).then(response => {
                console.log(response);
                window.location.reload();
            }).catch(error => {
                setError(error.response.data.details);
            })
        })
    }

    useEffect(() => {
                axios.get(
                    'http://localhost/api/v1/detail_account/',
                    {
                            headers:{
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('api_token')
                            }
                    }).then(response => {
                        console.log(response);
                        console.log(response.data);
                        setAccounts(response.data);
                    }).catch(err => {
                        console.log(err)
                });
    }, []);
    const deleteAccount = (uuid) => {
        axios.delete(
            `http://localhost/api/v1/detail_account/${uuid}/`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('api_token')
                }
            }).then(response => {
            console.log(response);
            console.log(response.data);
            window.location.reload();
        }).catch(err => {
            console.log(err)
        });
    };

    return <Container>
        <div>
            My accounts list
        </div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create transaction</DialogTitle>
            <DialogContent>
                <div>
                    <Typography id="continuous-slider" gutterBottom>
                        Funds
                    </Typography>
                    <Slider
                        value={funds}
                        onChange={onChangeFunds}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="on"
                        min={10}
                        max={100}
                    />
                </div>
                <div style={{marginTop: 10}}>
                    <TextField id="password" label="Password" type="password" variant="outlined" value={password} onChange={onChangePassword}/>
                </div>
                <div style={{marginTop: 10}}>
                    <TextField id="uuid" label="Recipient UUID" variant="outlined" value={recipientUuid} onChange={onChangeRecipientUuid}/>
                </div>
                <div style={{color: 'red'}}>{error}</div>
            </DialogContent>
            <DialogActions>
                {loading &&
                    <CircularProgress />
                }

                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={createTransaction} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
        <TableContainer component={Paper} style={{marginTop:10}}>
            <Table aria-label="My accounts">
                <TableHead>
                    <TableRow>
                        <TableCell>UUID</TableCell>
                        <TableCell align="right">Balance</TableCell>
                        <TableCell align="right">User count</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accounts.map((account) => (
                    <TableRow key={account.uuid}>
                        <TableCell component="th" scope="row">
                            {account.uuid}
                        </TableCell>
                        <TableCell align="right">{account.balance}</TableCell>
                        <TableCell align="right">{account.users_count}</TableCell>
                        <TableCell align="right">
                            <IconButton color="primary" aria-label="Create transaction" onClick={() => handleClickOpen(account)}>
                                <AttachMoneyIcon />
                            </IconButton>
                            <IconButton color="secondary" aria-label="Create transaction" onClick={() => deleteAccount(account.uuid)}>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
}
