import { Container } from "@material-ui/core";
import { createBrowserHistory } from "history";
import React, { useEffect, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import "./App.css";
import LinearLoading from "./components/LinearLoading";
import { Friend } from "./models/Friend";
import FriendDetail from "./pages/FriendDetail";
import FriendListPage from "./pages/FriendListPage";

const customHistory = createBrowserHistory();

const { REACT_APP_FREIND_LIST_API_URL, REACT_APP_FREIND_LIST_API_KEY } =
  process.env;

function App() {
  const [allFriends, setAllFriends] = useState<Friend[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllFriends() {
      let res = await fetch(
        `${REACT_APP_FREIND_LIST_API_URL}/templates/Xp8zvwDP14dJ/data`,
        {
          headers: {
            Authorization: `Bearer ${REACT_APP_FREIND_LIST_API_KEY}`,
          },
        }
      );
      let resJson = await res.json();
      setAllFriends(resJson);
      setLoading(false);
    }
    fetchAllFriends();
  }, []);

  return (
    <Container maxWidth="sm">
      <Router history={customHistory}>
        <Switch>
          <Route path="/" exact>
            {loading ? (
              <LinearLoading word={true} color={"white"} />
            ) : (
              <FriendListPage friendList={allFriends} />
            )}
          </Route>
          <Route
            path="/:id"
            exact
            render={({ match }) => (
              <FriendDetail
                friend={
                  allFriends.find(
                    (friend) => friend._id === match.params.id
                  ) as Friend
                }
              />
            )}
          />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
