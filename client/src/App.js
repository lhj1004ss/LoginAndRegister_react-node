import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
// HOC higer order component
import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)}></Route>
        <Route exact path="/login" component={Auth(LoginPage, false)}></Route>
        <Route
          exact
          path="/register"
          component={Auth(RegisterPage, false)}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
