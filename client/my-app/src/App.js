import React from "react";

import NavBar from "./components/NavBar/NavBar";
import { Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <Container maxWidth="lg">
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
    </Container>
  );
}

export default App;
