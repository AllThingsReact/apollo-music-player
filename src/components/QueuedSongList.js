import {
  Avatar,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";

function QueuedSongList() {
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const song = {
    title: "What I've Done",
    artist: "Linkin Park",
    thumbnail:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOVP.aX9zboZiDRoGhd7r-cNNUwEsCG%26pid%3DApi&f=1",
  };

  return (
    greaterThanMd && (
      <div style={{ margin: "10px 0" }}>
        <Typography variant="button" color="textSecondary">
          QUEUE (5)
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, i) => (
          <Song
            style={{
              paddingLeft: "0px",
            }}
            key={i}
            song={song}
          />
        ))}
      </div>
    )
  );
}

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    gap: 12,
    alignItems: "center",
    marginTop: 15,
  },
  songInfoContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  avatar: {
    height: 44,
    width: 44,
  },
  text: {
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
});

function Song({ song }) {
  const classes = useStyles();
  const { title, artist, thumbnail } = song;

  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar} src={thumbnail} />
      <div className={classes.songInfoContainer}>
        <Typography className={classes.text} variant="subtitle2">
          {title}
        </Typography>
        <Typography
          className={classes.text}
          variant="body2"
          color="textSecondary"
        >
          {artist}
        </Typography>
      </div>
      <IconButton size="small">
        <Delete color="error" />
      </IconButton>
    </div>
  );
}

export default QueuedSongList;
