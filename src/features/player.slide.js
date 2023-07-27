import { createSlice, current } from "@reduxjs/toolkit";
import data from "../data";
const initialState = {
  songId: 0,
  songsLength: data.length - 1,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  isLoop: false,
  isClick: false,
  isShuffle: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },

    end: (state, actions) => {
      if (state.isShuffle) {
        state.songId = Math.floor(Math.random() * data.length);
      } else if (state.currentTime == actions.payload) {
        state.songId = (state.songId + 1) % (state.songsLength + 1);
      }
    },
    next: (state) => {
      state.isPlaying = true;
      if (state.isShuffle) {
        state.songId = Math.floor(Math.random() * data.length);
      } else {
        state.songId = (state.songId + 1) % (state.songsLength + 1);
      }
    },
    prev: (state) => {
      state.isPlaying = true;
      if (!state.songId || undefined || null) {
        state.songId = state.songsLength;
      } else if (state.isShuffle) {
        state.songId = Math.floor(Math.random() * data.length);
      } else {
        state.songId = (state.songId - 1) % (state.songsLength + 1);
      }
    },
    setCurrentTime: (state, actions) => {
      state.currentTime = actions.payload;
    },
    setDuration: (state, actions) => {
      state.duration = actions.payload;
    },
    loop: (state) => {
      state.isLoop = !state.isLoop;
    },
    setClick: (state, actions) => {
      state.songId = actions.payload;
      state.isPlaying = true;
    },
    shuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
  },
});

export const {
  togglePlay,
  shuffle,
  handleVolume,
  setCurrentTime,
  loop,
  setDuration,
  end,
  next,
  setClick,
  prev,
  mute,
} = playerSlice.actions;
export default playerSlice;
