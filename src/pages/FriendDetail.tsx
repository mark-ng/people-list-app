import { Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";

function FriendDetail() {
  let { id } = useParams<{
    id: string;
  }>();

  return (
    <>
      <Typography variant="h5" component="h1" style={{ textAlign: "center" }}>
        Your Friend
      </Typography>
    </>
  );
}

export default FriendDetail;
