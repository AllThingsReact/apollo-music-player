import React from "react";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongPlayer from "./components/SongPlayer";
import SongList from "./components/SongList";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";
import songReducer from "./reducer";

export const songContext = React.createContext({
  song: {
    id: "1e26c2a2-7f4c-4175-842e-9956ca298289",
    title: "Remember The Name",
    artist: "Fort Minor",
    thumbnail: "http://img.youtube.com/vi/VDvr08sCPOc/0.jpg",
    url: "https://www.youtube.com/watch?v=VDvr08sCPOc",
    duration: 229,
  },
  isPlaying: false,
});

function App() {
  const initialSongState = React.useContext(songContext);
  const [state, dispatch] = React.useReducer(songReducer, initialSongState);

  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const greaterThanSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <songContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid
          style={{
            paddingTop: greaterThanSm ? 80 : 10,
          }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThanMd
              ? {
                  position: "fixed",
                  width: "100%",
                  right: 0,
                  top: 70,
                }
              : {
                  position: "fixed",
                  width: "100%",
                  left: 0,
                  bottom: 0,
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </songContext.Provider>
  );
}

export default App;
