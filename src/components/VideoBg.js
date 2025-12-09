import { useSelector } from "react-redux";
import useTrailer from "../utils/useTrailer";

const VideoBg = ({ movieId }) => {
  useTrailer(movieId);
  const trailer = useSelector((store) => store.movie.trailer);
  return (
    <div className="w-screen bg-black md:p-0 md:-mb-0 pt-20 -mb-4">
      {trailer && (
        <iframe
          className="w-screen aspect-video"
          src={
            "https://www.youtube.com/embed/" +
            trailer.key +
            "?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0&loop=1&iv_load_policy=3&playlist=" +
            trailer.key
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      )}
    </div>
  );
};

export default VideoBg;
