import { Poster_path } from "../utils/constants";

const VideoTitle = ({ title, overview, poster }) => {
  return (
    <div className="text-white py-36 md:py-64 px-16 absolute bg-gradient-to-r from-black w-screen aspect-video">
      {/* <h1>{title}</h1> */}
      <img className="h-40 md:h-56 " src={Poster_path + poster} />
      <p className="w-1/4 text-lg my-4 hidden md:inline-block">{overview}</p>
      <div>
        <button className="bg-white text-black mt-2 px-6 py-0 md:px-28 md:py-2 md:mt-0 rounded-lg text-lg hover:bg-opacity-60">
          ▶Play
        </button>
        <button className="bg-gray-400 px-28 py-2 rounded-lg text-lg mx-2 hidden md:inline-block">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
