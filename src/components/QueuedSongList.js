import {
  Avatar,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

function QueuedSongList({ queue }) {
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    greaterThanMd && (
      <div style={{ margin: "10px 0" }}>
        <Typography variant="button" color="textSecondary">
          QUEUE ({queue.length})
        </Typography>
        {queue.map((song, i) => (
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
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });
  const classes = useStyles();
  const { title, artist, thumbnail } = song;

  const handleAddOrRemoveFromQueue = () => {
    addOrRemoveFromQueue({
      variables: {
        input: { ...song, __typename: "Song" },
      },
    });
  };

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
      <IconButton size="small" onClick={handleAddOrRemoveFromQueue}>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}

export default QueuedSongList;
