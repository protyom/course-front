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


export const LoginForm = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();
    const dispatch = useDispatch();
    const onChangeUsername = (event) => {
        setUsername(event.target.value);
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }
    const getToken = () => {
        try {
            const user = {
                username: username,
                password: password,
                client_id: "cdenJrDUXYiUvNhq7mJBZssvIz2buU6KJAg4QGhF",
                client_secret: "K6TMmZxtQjAfXp9eeWRS3mOkGUiXgYIoOREtEGYqEMTCjJHp4qHitTBakzD7rfeeW0TPqIwQ1qlLziFWIKUjjmuxpQ9YIa5wfrShAkBP7VnwwD4WrRyP1uyJc7CCW9sO",
                grant_type: "password"
            };
            const {data} = axios.post('http://localhost/api/auth/token/', user).then(
                function (response) {
                    console.log(response);
                    console.log(dispatch);
                    console.log(response.data);
                    localStorage.setItem('api_token', response.data.access_token);
                    dispatch(push('/'))
                }
            )

        } catch (error) {
            console.log(error);
        }
    }
    return <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form noValidate autoComplete="off">
                <div>
                    <TextField id="username" label="Email" variant="outlined" value={username} onChange={onChangeUsername} style={{marginTop: 10}}/>
                </div>
                <div style={{marginTop: 10}}>
                    <TextField id="password" label="Password" type="password" variant="outlined" value={password} onChange={onChangePassword}/>
                </div>
                <Button variant="contained" color="primary" style={{marginTop: 10}} onClick={getToken}>Login</Button>
            </form>
        </div>
}