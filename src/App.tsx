import { Container } from "@material-ui/core";
import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import "./App.css";
import FriendDetail from "./pages/FriendDetail";
import FriendListPage from "./pages/FriendListPage";

const customHistory = createBrowserHistory();

function App() {
  return (
    <Container maxWidth="sm">
      <Router history={customHistory}>
        <Switch>
          <Route path="/" exact>
            <FriendListPage />
          </Route>
          <Route path="/:id" exact>
            <FriendDetail />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
