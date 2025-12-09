import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGpt } from "../utils/searchSlice";
import { support_lang } from "../utils/constants";
import { changeLang } from "../utils/configSLice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const search = useSelector((store) => store.search.Gpt);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  const handleSearch = () => {
    dispatch(toggleGpt());
  };
  const handleSelect = (e) => {
    dispatch(changeLang(e.target.value));
    // console.log(e.target.value);
  };
  return (
    <div className="absolute z-20 w-screen px-8 py-2 flex justify-between bg-gradient-to-b from-black">
      <img
        className="w-36 m-auto object-cover md:w-44 md:m-0"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      />
      {user && (
        <div className="flex py-2">
          {search && (
            <select
              className="text-white h-10 rounded-lg px-1 py-2 text-center bg-red-600"
              onChange={handleSelect}
            >
              {support_lang.map((lang) => (
                <option key={lang.idenfier} value={lang.idenfier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="text-white h-10 rounded-lg px-4 py-2 ml-6  mr-6 bg-sky-600"
            onClick={handleSearch}
          >
            {search ? "Home Page" : "GPT Search"}{" "}
          </button>
          <div className="group">
            <img
              className="w-10 h-10 rounded-full cursor-pointer"
              src={
                user?.photoURL
                  ? user.photoURL
                  : "https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?semt=ais_hybrid&w=740&q=80"
              }
              alt="profile"
            />
            <div className="absolute right-0 mt-2 hidden group-hover:block bg-black text-white rounded-lg shadow-lg">
              <button
                className="block text-left px-2 mr-6 py-2 hover:bg-gray-700 rounded"
                onClick={handleClick}
              >
                LogOut
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
