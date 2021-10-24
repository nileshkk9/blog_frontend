import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

// import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
// import ChangePassword from "./components/ChangePassword/ChangePassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import CreateAccount from "./components/CreateAccount/CreateAccount";
const routing = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/forgot-password" component={ForgotPassword} exact />
        {/* <PrivateRouter path="/main" component={Main} /> */}
        {/* <Route path="/:token/:email" component={ChangePassword} exact /> */}
        <Route path="/create-account" component={CreateAccount} exact />
        {/* <PrivateRouter path="/entries" component={Listview} /> */}
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();