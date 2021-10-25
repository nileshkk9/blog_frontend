import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

// import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
// import ChangePassword from "./components/ChangePassword/ChangePassword";

import CreateAccount from "./components/CreateAccount/CreateAccount";
import PrivateRouter from './utils/PrivateRouter';
import AdminRouter from './utils/AdminRouter';
import Main from './components/Main/Main';
import Dashboard from './components/Dashboard/Dashboard';
import Writeblog from './components/Writeblog/Writeblog';
const routing = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/login" component={Login} exact />
        <PrivateRouter path="/write-blog" component={Writeblog} exact />
        <AdminRouter path="/main" component={Main} />
        <Route path="/create-account" component={CreateAccount} exact />
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
