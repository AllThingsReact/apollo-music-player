import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Slider,
  Typography,
} from "@material-ui/core";
import { PlayArrow, SkipNext, SkipPrevious } from "@material-ui/icons";
import React from "react";
import QueuedSongList from "./QueuedSongList";

const useStyles = makeStyles((theme) => ({
  playOptions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  thumbnail: {
    objectFit: "cover",
    height: 184,
    width: 184,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 0px",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  slider: {
    left: "15px",
  },
}));

function SongPlayer() {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.container} variant="outlined">
        <div className={classes.details}>
          <CardContent>
            <Typography variant="h5" component="h3">
              Title
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              Artist
            </Typography>
          </CardContent>
          <div className={classes.playOptions}>
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton>
              <PlayArrow className={classes.playIcon} />
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              00:00:00
            </Typography>
          </div>
          <Slider
            className={classes.slider}
            type="range"
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <CardMedia
          className={classes.thumbnail}
          image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOVP.aX9zboZiDRoGhd7r-cNNUwEsCG%26pid%3DApi&f=1"
        />
      </Card>
      <QueuedSongList />
    </div>
  );
}

export default SongPlayer;
