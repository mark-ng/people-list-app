import { createStyles, makeStyles, Theme } from "@material-ui/core";

const generalStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    headerBox: {
      height: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    friendDetailItem: {
      padding: "5px",
    },
  })
);

export default generalStyles;
