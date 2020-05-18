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


export const RegisterForm = () =>{
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const classes = useStyles();
    const dispatch = useDispatch();
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const onChangePassword1 = (event) => {
        setPassword1(event.target.value);
    }
    const onChangePassword2 = (event) => {
        setPassword2(event.target.value);
    }
    const getToken = () => {
        axios.post(
            'http://localhost/api/auth/register/',
            {
                email: email,
                password1: password1,
                password2: password2
            }
        ).then(response =>{
            const user = {
                username: email,
                password: password1,
                client_id: "cdenJrDUXYiUvNhq7mJBZssvIz2buU6KJAg4QGhF",
                client_secret: "K6TMmZxtQjAfXp9eeWRS3mOkGUiXgYIoOREtEGYqEMTCjJHp4qHitTBakzD7rfeeW0TPqIwQ1qlLziFWIKUjjmuxpQ9YIa5wfrShAkBP7VnwwD4WrRyP1uyJc7CCW9sO",
                grant_type: "password"
            };
            axios.post('http://localhost/api/auth/token/', user).then(
                function (response) {
                    console.log(response);
                    console.log(dispatch);
                    console.log(response.data);
                    localStorage.setItem('api_token', response.data.access_token);
                    dispatch(push('/'))
                })
        })



    }
    return <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form noValidate autoComplete="off">
                <div>
                    <TextField id="email" label="Email" variant="outlined" value={email} onChange={onChangeEmail} style={{marginTop: 10}}/>
                </div>
                <div style={{marginTop: 10}}>
                    <TextField id="password" label="Password" type="password" variant="outlined" value={password1} onChange={onChangePassword1}/>
                </div>
                <div style={{marginTop: 10}}>
                    <TextField id="password" label="Password" type="password" variant="outlined" value={password2} onChange={onChangePassword2}/>
                </div>
                <Button variant="contained" color="primary" style={{marginTop: 10}} onClick={getToken}>Login</Button>
            </form>
        </div>
}