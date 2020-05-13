import {useDispatch, useSelector} from 'react-redux';
import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {push} from "connected-react-router";
import Slider from "@material-ui/core/Slider";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TableCell from "@material-ui/core/TableCell";


const useStyles = makeStyles((theme) => ({
  paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export const TransactionCreateForm = () =>{
    const [password, setPassword] = useState("");
    const [funds, setFunds] = useState(50);
    const [recipientUuid, setRecipientUuid] = useState("");
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
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
        console.log(recipientUuid)
    }
    return <Container style={{marginTop:10}}>
        <IconButton color="primary" aria-label="Create transaction" onClick={handleClickOpen}>
            <AttachMoneyIcon />
        </IconButton>
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
    </Container>
}