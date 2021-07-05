import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useHistory, useParams } from "react-router-dom";
import LinearLoading from "../components/LinearLoading";
import { Friend } from "../models/Friend";
import generalStyles from "../styles/generalStyles";

const { REACT_APP_FREIND_LIST_API_URL, REACT_APP_FREIND_LIST_API_KEY } =
  process.env;

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function FriendDetail({ friend }: { friend: Friend }) {
  let { id } = useParams<{
    id: string;
  }>();
  const [curFriend, setCurFriend] = useState<Friend | null>(friend);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const classes = generalStyles();

  useEffect(() => {
    if (curFriend) {
      setLoading(false);
      return;
    }

    async function fetchFriendWithId() {
      console.log({ id });
      let res = await fetch(
        `${REACT_APP_FREIND_LIST_API_URL}/templates/Xp8zvwDP14dJ/data`,
        {
          headers: {
            Authorization: `Bearer ${REACT_APP_FREIND_LIST_API_KEY}`,
          },
        }
      );
      let resJson: Friend[] = await res.json();
      setCurFriend(resJson.filter((friend) => friend._id === id)[0]);
      setLoading(false);
    }
    fetchFriendWithId();
  }, [curFriend, id]);

  return (
    <>
      <Grid container>
        <Grid item xs={1}>
          <IconButton
            color="secondary"
            aria-label="add to shopping cart"
            onClick={() => {
              history.push("/");
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <Box className={classes.headerBox}>
            <Typography
              variant="h5"
              component="h1"
              style={{ textAlign: "center" }}
            >
              Your Friend
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {loading ? (
        <LinearLoading word={true} color={"white"} />
      ) : (
        <>
          {curFriend?.location.latitude && curFriend?.location.longitude ? (
            <>
              <MapContainer
                center={[
                  curFriend?.location.latitude,
                  curFriend?.location.longitude,
                ]}
                zoom={13}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[
                    curFriend?.location.latitude,
                    curFriend?.location.longitude,
                  ]}
                >
                  <Popup>
                    {JSON.stringify([
                      curFriend?.location.latitude,
                      curFriend?.location.longitude,
                    ])}
                  </Popup>
                </Marker>
              </MapContainer>
            </>
          ) : (
            <Alert severity="info">Not Enough Data To Plot Location</Alert>
          )}

          <Paper style={{ padding: "10px" }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Avatar
                  alt={`${curFriend?.name.first} ${curFriend?.name.last}`}
                  src={curFriend?.picture}
                  className={classes.large}
                />
              </Grid>
              <Grid item xs={12} className={classes.friendDetailItem}>
                Name: {`${curFriend?.name.first} ${curFriend?.name.last}`}
              </Grid>
              <Grid item xs={12} className={classes.friendDetailItem}>
                Email: {curFriend?.email}
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
    </>
  );
}

export default FriendDetail;
