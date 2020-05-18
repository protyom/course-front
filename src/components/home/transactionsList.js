import Container from "@material-ui/core/Container";
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';


export const TransactionsList = () =>{
    const [transactions, setTransactions] = useState([]);


    useEffect(() => {
                axios.get(
                    'http://localhost/api/v1/transaction/',
                    {
                            headers:{
                                'Content-Type': 'application/json',
                            }
                    }).then(response => {
                        console.log(response);
                        console.log(response.data);
                        setTransactions(response.data);
                    }).catch(err => {
                        console.log(err)
                });
    }, []);


    return <Container>
        <div>
            Transactions
        </div>
        <TableContainer component={Paper} style={{marginTop:10}}>
            <Table aria-label="My accounts">
                <TableHead>
                    <TableRow>
                        <TableCell>Is verified</TableCell>
                        <TableCell align="right">UUID</TableCell>
                        <TableCell align="right">Public number</TableCell>
                        <TableCell align="right">Prime p</TableCell>
                        <TableCell align="right">beta</TableCell>
                        <TableCell align="right">Challenge</TableCell>
                        <TableCell align="right">Pay code</TableCell>
                        <TableCell align="right">Proof</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                    <TableRow key={transaction.uuid}>
                        <TableCell component="th" scope="row">
                            {transaction.is_validated
                                ?<CheckIcon />
                                :<CancelIcon/>
                            }
                        </TableCell>
                        <TableCell align="right">
                            <TextField value={transaction.from_uuid}/>
                        </TableCell>
                        <TableCell align="right">
                            <TextField value={transaction.public_number}/>
                        </TableCell>
                        <TableCell align="right">
                            <TextField value={transaction.factor_1}/>
                        </TableCell>
                        <TableCell align="right">
                            <TextField value={transaction.beta}/>
                        </TableCell>
                        <TableCell align="right">
                            <TextField value={transaction.challenge}/>
                        </TableCell>
                        <TableCell align="right">
                            <TextField value={transaction.pay_code}/>
                        </TableCell>
                        <TableCell align="right">
                            <TextField value={transaction.evaluated}/>
                        </TableCell>

                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
}
