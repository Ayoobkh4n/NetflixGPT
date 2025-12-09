import { useSelector } from "react-redux";
import useNowPlaying from "../utils/useNowPlaying";
import usePopular from "../utils/usePopular";
import useTopRated from "../utils/useTopRated";
import useUpcoming from "../utils/useUpcoming";
import GptComponent from "./GptComponent";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryCOntainer";

const Browse = () => {
  useNowPlaying();
  usePopular();
  useTopRated();
  useUpcoming();
  const search = useSelector((store) => store.search.Gpt);
  //console.log(search);
  return (
    <div className="">
      <Header />
      {search ? (
        <GptComponent />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};
export default Browse;
