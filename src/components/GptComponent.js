import { BG_SEARCH } from "../utils/constants";
import MovieSuggestion from "./MovieSuggestion";
import SearchComponent from "./SearchComponent";

const GptComponent = () => {
  return (
    <>
      <div className="fixed -z-10 w-full">
        <img
          alt="bg_search"
          className="object-cover h-screen w-screen"
          src={BG_SEARCH}
        />
      </div>
      <div>
        <SearchComponent />
        <MovieSuggestion />
      </div>
    </>
  );
};
export default GptComponent;
