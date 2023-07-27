import data from "../data";

export default function CD({ songId, isPlaying }) {
  return (
    <>
      <div className="cd-wrap ">
        {data.map(
          (item) =>
            item.id === songId && (
              <div
                key={item.id}
                className="cd d-flex justify-content-center align-items-center"
              >
                <img
                  src={item.img}
                  className={`${
                    isPlaying ? "cd-img-rotate" : "cd-img-default"
                  }`}
                  alt=""
                />
                <div className=" mx-3 info">
                  <div>{item.title}</div>
                  <div>{item.singer}</div>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}
