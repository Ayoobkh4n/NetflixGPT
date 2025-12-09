import MovieCard from "./MovieCard";

const MovieList = ({ title, cards }) => {
  //   console.log(cards);
  return (
    <div className="px-4 md:px-10 ml-2 md:ml-0">
      <h1 className="text-lg md:text-2xl py-2 px-2 text-white">{title}</h1>
      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="flex">
          {cards?.map((movie) => (
            <MovieCard poster={movie?.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;
