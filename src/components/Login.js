import { useRef, useState } from "react";
import Header from "./Header";
import { validation } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const [signIn, setSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const toggleSignin = () => {
    setSignIn(!signIn);
  };
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const handleValidation = () => {
    // console.log(email.current.value);
    // console.log(password.current.value);
    const message = validation(email.current.value, password.current.value);
    // console.log(message);
    setErrorMsg(message);

    if (message) return null;

    if (!signIn) {
      //Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://specials-images.forbesimg.com/imageserve/62af107cfb61140c4b0ae103/960x0.jpg?fit=scale", //Homelander pic
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          //   console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //Sign In logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //   console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fcfcd5ee-d40a-43d7-bebc-9e9aae7f7798/web/IN-en-20250922-TRIFECTA-perspective_4fd75b17-c493-446a-a3de-3d1ab753c304_small.jpg"
        />
        <div className="absolute inset-0 bg-black z-10 opacity-50 "></div>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-12 absolute z-20 w-3/12 mx-auto my-36 right-0 left-0 bg-[rgba(0,0,0,0.7)] text-white"
      >
        <h2 className="my-2 py-2 font-bold text-2xl">
          {signIn ? "Sign In" : "Sign Up"}
        </h2>
        {!signIn ? (
          <input
            ref={name}
            className="bg-gray-700 p-2 my-2 w-full"
            type="text"
            placeholder="Name"
          />
        ) : null}
        <input
          ref={email}
          className="bg-gray-700 p-2 my-2 w-full"
          type="text"
          placeholder="Email"
        />
        <input
          ref={password}
          className="bg-gray-700 p-2 my-2 w-full"
          type="password"
          placeholder="Password"
        />
        <p className="text-red-600 font-semibold">{errorMsg}</p>

        <button
          className="bg-red-600 p-2 my-2 w-full"
          onClick={handleValidation}
        >
          {signIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-2 font-semibold cursor-pointer" onClick={toggleSignin}>
          {signIn
            ? "Are you new to Netflix? Sign Up NOW!"
            : "Already Registered? Sign In NOW!"}
        </p>
      </form>
    </div>
  );
};

export default Login;
