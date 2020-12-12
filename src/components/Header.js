import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { HeadsetTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <HeadsetTwoTone />
          <Typography variant="h6" component="h1" className={classes.title}>
            Apollo Music Player
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
