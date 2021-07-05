import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LinearLoading from "../components/LinearLoading";
import { Friend } from "../models/Friend";

const { REACT_APP_FREIND_LIST_API_URL, REACT_APP_FREIND_LIST_API_KEY } =
  process.env;

function FriendListPage() {
  const [allFriends, setAllFriends] = useState<Friend[]>([]);
  const history = useHistory();
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

  return loading ? (
    <LinearLoading word={true} color={"white"} />
  ) : (
    <>
      <Typography variant="h5" component="h1" style={{ textAlign: "center" }}>
        All Friends
      </Typography>
      {allFriends.map((friendData) => {
        let fullName = `${friendData.name.last} ${friendData.name.first}`;
        return (
          <ListItem
            key={friendData._id}
            button
            onClick={() => {
              history.push(`/${friendData._id}`);
            }}
          >
            <ListItemAvatar>
              <Avatar alt={fullName} src={friendData.picture} />
            </ListItemAvatar>
            <ListItemText primary={fullName} />
          </ListItem>
        );
      })}
    </>
  );
}

export default FriendListPage;
