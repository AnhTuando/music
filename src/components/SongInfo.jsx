import data from "../data";
export default function SongInfo({ songId }) {
  return (
    <>
      <div className="col-9 song-info text-light">
        {data.map(
          (item) =>
            item.id === songId && (
              <div
                key={item.id}
                className="wrap-items  gap-2 h-100 d-flex flex-column justify-content-center align-items-center"
              >
                <div className="wrap-img img-info d-flex justify-content-center align-items-center">
                  <img src={item.img} className="img-fluid rounded-3 " alt="" />
                </div>
                <div className="singer">{item.singer}</div>
                <div className="title fs-4">{item.title}</div>
              </div>
            )
        )}
      </div>
    </>
  );
}
