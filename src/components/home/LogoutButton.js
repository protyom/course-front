import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";
import Button from "@material-ui/core/Button";


export const LogoutButton = () => {
    const dispatch = useDispatch();
    const removeToken = () => {
        localStorage.removeItem('api_key');
        dispatch(push('/login'))
    }
    return <Button variant="outlined" color="primary" onClick={removeToken}>Logout</Button>
}
