import Button from "./Button";
import { next, togglePlay, prev } from "../features/player.slide";
import { useSelector, useDispatch } from "react-redux";
import { loop, shuffle, mute } from "../features/player.slide";
import { useEffect, useRef } from "react";
import CD from "./CD";
import Volume from "./Volume";
export default function AudioControl({
  isPlaying,
  currentTime,
  duration,
  songId,
  value,
  onChange,
  max,
  min,
  volumeChange,
}) {
  const dispatch = useDispatch();
  const isLoop = useSelector((state) => state.player.isLoop);
  const isShuffle = useSelector((state) => state.player.isShuffle);
  const isMute = useSelector((state) => state.player.isMute);
  const volume = useSelector((state) => state.player.volume);

  return (
    <div className="audio-control position-absolute bottom-0 d-flex z-2 py-4 text-light overflow-hidden">
      <div className="col-2">
        <CD songId={songId} isPlaying={isPlaying} />
      </div>
      <div className="col-8 handle-action d-flex justify-content-center align-items-center ">
        <div className="row w-100 d-flex justify-content-around">
          <Button className="fit-content" onClick={() => dispatch(prev())}>
            <i className="bi bi-chevron-bar-left"></i>
          </Button>
          <Button className="fit-content" onClick={() => dispatch(shuffle())}>
            <i
              className={`bi bi-shuffle ${isShuffle ? "shuffle-color" : ""}`}
            ></i>
          </Button>
          {isPlaying ? (
            <Button
              className="fit-content"
              onClick={() => dispatch(togglePlay())}
            >
              <i className="bi bi-pause-fill"></i>
            </Button>
          ) : (
            <Button
              className="fit-content"
              onClick={() => dispatch(togglePlay())}
            >
              <i className="bi bi-play-fill"></i>
            </Button>
          )}
          <div className="input-range d-flex gap-2 w-70">
            <div className="current-time d-flex align-items-center">
              <span className=" fit-content">
                {currentTime ? currentTime : "0:00"}
              </span>
            </div>
            <input
              className="w-100 duration"
              type="range"
              value={value}
              onChange={onChange}
              max={max}
              min={min}
            />
            <div className="duration d-flex align-items-center">
              <span className=" fit-content">
                {duration ? duration : "0:00"}
              </span>
            </div>
          </div>
          <Button className="fit-content" onClick={() => dispatch(loop())}>
            <i
              className={`bi bi-arrow-counterclockwise ${
                isLoop ? "loop-color" : ""
              } `}
            ></i>
          </Button>
          <Button className="fit-content" onClick={() => dispatch(next())}>
            <i className={`bi bi-chevron-bar-right `}></i>
          </Button>
        </div>
      </div>
      <div className="col-2 d-flex align-items-center justify-content-center">
        <Volume
          min={0}
          max={1}
          //   value={volume}
          step={0.1}
          onChange={volumeChange}
        />
      </div>
    </div>
  );
}
<i class="bi bi-arrow-counterclockwise"></i>;
