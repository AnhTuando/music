import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setClick } from "../features/player.slide";
import data from "../data";
export default function SongList({
  isPlaying,

  songIdContext,
}) {
  const songId = useSelector((state) => state.player.songId);
  const [isClick, setIsClick] = useState(false);
  const dispatch = useDispatch();
  const handleClick = (value) => {
    setIsClick(!isClick);
    dispatch(setClick(value));
  };
  return (
    <div className="col-3 song-list ">
      <h3 className="text-center text-light my-5">Danh sách bài hát</h3>
      {data.map((item) => (
        <div
          className={`song text-light fs-5 ms-3 py-2 ${
            (isClick && songIdContext == item.id) || songIdContext == item.id
              ? "opacity-1"
              : ""
          }`}
          key={item.id}
          onClick={() => handleClick(item.id)}
        >
          {item.title} - {item.singer}
        </div>
      ))}
      <div className="row"></div>
    </div>
  );
}
