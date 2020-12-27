import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Pause, PlayArrow, Save } from "@material-ui/icons";
import React, { useContext } from "react";
import { GET_SONGS } from "../graphql/subscriptions";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import { songContext } from "../App";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

function SongList() {
  const { data, loading, error } = useSubscription(GET_SONGS);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CircularProgress></CircularProgress>
      </div>
    );
  }

  if (error) {
    return <div>Error fetching songs</div>;
  }

  return (
    <div>
      {data.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  thumbnail: {
    objectFit: "cover",
    height: 140,
    width: 140,
  },
}));

function Song({ song }) {
  const { state, dispatch } = useContext(songContext);
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });
  const classes = useStyles();
  const { title, artist, thumbnail, id } = song;

  const handleSongPlayPause = () => {
    if (id === state.song.id) {
      state.isPlaying
        ? dispatch({ type: "PAUSE_SONG" })
        : dispatch({ type: "PLAY_SONG" });
    } else {
      dispatch({ type: "CHANGE_SONG", payload: { song } });
    }
  };

  const handleAddOrRemoveFromQueue = () => {
    addOrRemoveFromQueue({
      variables: {
        input: { ...song, __typename: "Song" },
      },
    });
  };

  return (
    <Card className={classes.root}>
      <div className={classes.container}>
        <CardMedia className={classes.thumbnail} image={thumbnail} />
        <div className={classes.content}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body1" component="p" color="textSecondary">
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton
              size="small"
              color="primary"
              onClick={handleSongPlayPause}
            >
              {state.isPlaying && id === state.song.id ? (
                <Pause />
              ) : (
                <PlayArrow />
              )}
            </IconButton>
            <IconButton
              size="small"
              color="secondary"
              onClick={handleAddOrRemoveFromQueue}
            >
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

export default SongList;
