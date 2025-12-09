import { Poster_path } from "../utils/constants";

const MovieCard = ({ poster }) => {
  if (!poster) return null;
  return (
    <div className="w-36 md:w-48 pr-2">
      <img className="rounded-lg" alt="cards" src={Poster_path + poster} />
    </div>
  );
};
export default MovieCard;
