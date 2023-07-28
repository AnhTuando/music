import { useEffect, useRef } from "react";
import data from "./data";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setDuration,
  setCurrentTime,
  end,
 
} from "./features/player.slide";

import SongList from "./components/SongList";
import AudioControl from "./components/AudioControl";
import SongInfo from "./components/SongInfo";

function App() {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const songId = useSelector((state) => state.player.songId);
  const duration = useSelector((state) => state.player.duration);
  const currentTime = useSelector((state) => state.player.currentTime);
  const isLoop = useSelector((state) => state.player.isLoop);
 

  const handleTimeUpdate = () => {
    dispatch(setCurrentTime(audioRef.current.currentTime));
  };
  const handleLoadedMetadata = () => {
    dispatch(setDuration(audioRef.current.duration));
  };
  // handle toggle play state
  useEffect(() => {
    if (isPlaying === false) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [songId]);

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    dispatch(setCurrentTime(seekTime));
  };
  const handleSongEnd = () => {
    if (isLoop) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(end(duration));
    }
  };
  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }
  // Volume change
  const handleVolumeChange = (event) => {
    const volume = event.target.value;
    audioRef.current.volume = volume;
  };

  return (
    <div className="app ">
      <div className="container">
        <div className="row">
          <SongList isPlaying={isPlaying} songIdContext={songId} />
          <SongInfo songId={songId} />
          <AudioControl
            songId={songId}
            isPlaying={isPlaying}
            min={0}
            value={currentTime}
            max={duration}
            onChange={handleSeek}
            duration={formatTime(duration)}
            currentTime={formatTime(currentTime)}
            volumeChange={handleVolumeChange}
          />
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleSongEnd}
          >
            <source src={data[songId].src} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  );
}

export default App;
