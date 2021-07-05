import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Friend } from "../models/Friend";
import generalStyles from "../styles/generalStyles";

function FriendListPage({ friendList }: { friendList: Friend[] }) {
  const history = useHistory();
  const classes = generalStyles();

  return (
    <>
      <Box className={classes.headerBox}>
        <Typography variant="h5" component="h1" style={{ textAlign: "center" }}>
          All Friends
        </Typography>
      </Box>

      <Box style={{ backgroundColor: "#efefef", padding: "2px" }}>
        {friendList.map((friendData) => {
          let fullName = `${friendData.name.last} ${friendData.name.first}`;
          return (
            <Paper>
              <ListItem
                key={friendData._id}
                button
                onClick={() => {
                  history.push(`/${friendData._id}`);
                }}
                style={{ margin: "5px" }}
              >
                <ListItemAvatar>
                  <Avatar alt={fullName} src={friendData.picture} />
                </ListItemAvatar>
                <ListItemText primary={fullName} />
              </ListItem>
            </Paper>
          );
        })}
      </Box>
    </>
  );
}

export default FriendListPage;
