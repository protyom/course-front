import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";
import Button from "@material-ui/core/Button";


export const RedirectButton = (props) => {
    const dispatch = useDispatch();
    const redirect = () => {
        dispatch(push(props.url))
    }
    return <Button variant="outlined" color="primary" onClick={redirect}>{props.value}</Button>
}
