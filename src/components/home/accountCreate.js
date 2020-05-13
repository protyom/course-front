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


export const AccountCreateForm = () =>{
    const [password, setPassword] = useState("");
    const [balance, setBalance] = useState(50);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }
    const onChangeBalance = (event, newValue) => {
        setBalance(newValue);
    };
    const createAccount = () => {
        try {
            setLoading(true);
            const account = {
                balance: balance,
                password: password,
            };
            axios.post('http://localhost/api/v1/detail_account/', account, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('api_token')
                }}).then(
                function (response) {
                    setLoading(false);
                    console.log(response);
                    console.log(dispatch);
                    console.log(response.data);
                    window.location.reload();
                    handleClose();
                }
            )

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    return <Container style={{marginTop:10}}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Create account
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create new account
                </DialogContentText>
                <div>
                    <Typography id="continuous-slider" gutterBottom>
                        Account balance
                    </Typography>
                    <Slider
                        value={balance}
                        onChange={onChangeBalance}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="on"
                        min={10}
                        max={100}
                    />
                </div>
                <div style={{marginTop: 10}}>
                    <TextField id="password" label="Password" type="password" variant="outlined" value={password} onChange={onChangePassword}/>
                </div>
            </DialogContent>
            <DialogActions>
                {loading &&
                    <CircularProgress />
                }

                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={createAccount} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    </Container>
}