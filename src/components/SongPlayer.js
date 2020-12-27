import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@material-ui/icons";
import React from "react";
import QueuedSongList from "./QueuedSongList";
import { songContext } from "../App";
import { useQuery } from "@apollo/react-hooks";
import { GET_QUEUED_SONGS } from "../graphql/queries";
import ReactPlayer from "react-player";

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
  const { state, dispatch } = React.useContext(songContext);
  const [played, setPlayed] = React.useState(0);
  const [positionInQueue, setPositionInQueue] = React.useState(0);
  const { data } = useQuery(GET_QUEUED_SONGS);
  const classes = useStyles();

  React.useEffect(() => {
    const songIndex = data.queue.findIndex((song) => song.id === state.song.id);
    setPositionInQueue(songIndex);
  }, [data.queue, state.song.id]);

  React.useEffect(() => {
    const nextSong = data.queue[positionInQueue + 1];
    if (played === 1 && nextSong) {
      setPlayed(0);
      dispatch({ type: "CHANGE_SONG", payload: { song: nextSong } });
    }
  }, [data.queue, played, dispatch, positionInQueue]);

  const handleTogglePlay = () => {
    state.isPlaying
      ? dispatch({ type: "PAUSE_SONG" })
      : dispatch({ type: "PLAY_SONG" });
  };

  const handlePlayPrevious = () => {
    const previousSong = data.queue[positionInQueue - 1];
    if (previousSong) {
      dispatch({ type: "CHANGE_SONG", payload: { song: previousSong } });
    }
  };

  const handlePlayNext = () => {
    const nextSong = data.queue[positionInQueue + 1];
    if (nextSong) {
      dispatch({ type: "CHANGE_SONG", payload: { song: nextSong } });
    }
  };

  return (
    <div>
      <Card className={classes.container} variant="outlined">
        <div className={classes.details}>
          <CardContent>
            <Typography variant="h5" component="h3">
              {state.song.title}
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {state.song.artist}
            </Typography>
          </CardContent>
          <div className={classes.playOptions}>
            <IconButton onClick={handlePlayPrevious}>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleTogglePlay}>
              {state.isPlaying ? (
                <Pause className={classes.playIcon} />
              ) : (
                <PlayArrow className={classes.playIcon} />
              )}
            </IconButton>
            <IconButton onClick={handlePlayNext}>
              <SkipNext />
            </IconButton>
          </div>
        </div>
        <ReactPlayer url={state.song.url} playing={state.isPlaying} hidden />
        <CardMedia className={classes.thumbnail} image={state.song.thumbnail} />
      </Card>
      <QueuedSongList queue={data.queue} />
    </div>
  );
}

export default SongPlayer;
