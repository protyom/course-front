import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import Login from "./containers/user/login";
import Home from "./containers/home/home";

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

        </Switch>
      </div>
  );
}

export default App;
