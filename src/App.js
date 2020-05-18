import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import Login from "./containers/user/login";
import Home from "./containers/home/home";
import Register from "./containers/user/register";
import Transactions from "./containers/home/transactions";

function App() {
  return (
      <div>
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/register">
                <Register />
            </Route>
            <Route exact path="/transactions">
                <Transactions />
            </Route>
        </Switch>
      </div>
  );
}

export default App;
