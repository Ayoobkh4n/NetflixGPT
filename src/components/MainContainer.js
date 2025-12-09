import { useSelector } from "react-redux";
import VideoBg from "./VideoBg";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movie?.nowPlaying);
  if (!movies) return;

  const randomIndex = Math.floor(Math.random() * movies.length);
  const mainMovie = movies[randomIndex];

  const { title, overview, poster_path, id } = mainMovie;
  //   console.log(mainMovie);

  return (
    <div className="bg-black">
      <VideoTitle title={title} overview={overview} poster={poster_path} />
      <VideoBg movieId={id} />
    </div>
  );
};

export default MainContainer;
