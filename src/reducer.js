const songReducer = (state, action) => {
  switch (action.type) {
    case "PLAY_SONG":
      return { ...state, isPlaying: true };
    case "PAUSE_SONG":
      return { ...state, isPlaying: false };
    case "CHANGE_SONG":
      return { ...state, song: action.payload.song, isPlaying: true };
    default:
      return state;
  }
};

export default songReducer;
