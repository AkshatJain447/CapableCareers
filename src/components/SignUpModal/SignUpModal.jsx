// icons
import { FaGoogle } from "react-icons/fa";
import { IoMdClose, IoIosInformationCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

//Store Actions
import { toggleSignUpBtn, closeNavBar } from "../../store/stateStore";

//hooks
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

//Firebase
import { auth } from "../../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

const SignUp = () => {
  const [linkSent, setLinkSent] = useState(false);
  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();

  var userEmail = useRef();
  var userPassword = useRef();

  const handleSignUpForm = (event) => {
    event.preventDefault();
    const userId = userEmail.current.value;
    const userPass = userPassword.current.value;

    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithEmailAndPassword(auth, userId, userPass)
        .then(() => {
          setTimeout(() => {
            dispatch(toggleSignUpBtn());
            userEmail.current.value = "";
            userPassword.current.value = "";
          }, 2000);
          console.log(auth.currentUser);
        })
        .catch((err) => {
          alert(err.message);
        });
    });
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified === false) {
        setLinkSent(true);
        sendEmailVerification(user).catch((err) => console.error(err.message));
      }
    });
  };

  const handleGoogleSignUp = () => {
    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithPopup(auth, googleProvider)
        .then(() => {
          dispatch(toggleSignUpBtn());
          dispatch(closeNavBar());
        })
        .catch((err) => alert(err.message));
    });
  };

  return (
    <div className="grid grid-cols-1 grid-rows-1 max-w-[95%] z-3 place-content-center place-items-center">
      <div className="absolute top-0 left-0 bg-gray-800 opacity-50 w-full h-full z-2"></div>
      <div className=" absolute top-[10%] ml-3 rounded-md bg-white w-fit h-fit drop-shadow-lg p-3">
        <div>
          <h1 className="flex justify-between items-center text-2xl border-b p-2 text-center font-semibold">
            Sign In
            <IoMdClose
              className="cursor-pointer text-gray-500 hover:text-red-600 duration-150"
              onClick={() => dispatch(toggleSignUpBtn())}
            />
          </h1>
        </div>
        <form className="p-2" onSubmit={(event) => handleSignUpForm(event)}>
          <div className="p-1 m-1">
            <label
              htmlFor="userEmail"
              className="text-lg mr-2 inline-block w-[85px] lg:text-right"
            >
              Email :
            </label>
            <input
              ref={userEmail}
              type="email"
              id="userEmail"
              placeholder="Enter Email Address"
              className="border p-1 pl-2 rounded-sm text-lg md:w-[300px]"
            />
          </div>
          <div className="p-1 m-1">
            <label
              htmlFor="userPassword"
              className="text-lg mr-2 inline-block w-[85px] lg:text-right"
            >
              Password :
            </label>
            <input
              ref={userPassword}
              type="password"
              id="userPassword"
              placeholder="Enter Password"
              className="border p-1 pl-2 rounded-sm text-lg md:w-[300px]"
            />
          </div>
          <div className="md:w-[300px] text-sm italic m-auto text-slate-500 text-center">
            <IoIosInformationCircleOutline className="inline mr-1" />
            Please sign up with email and password first for email verification
          </div>
          <button className="block p-2 border rounded-md text-lg px-4 mt-2 mx-auto hover:text-secondary hover:border-secondary duration-200">
            Sign In
          </button>
          <div
            className={`${
              linkSent ? "flex" : "hidden"
            } justify-center items-center gap-1 mt-1 text-sm text-secondary`}
          >
            <FaCheck /> <span>Verification link sent to your email</span>
          </div>
        </form>
        <div className="grid place-items-center place-content-center gap-1">
          <span className="italic">Or Sign In with</span>
          <FaGoogle
            className="text-2xl hover:text-red-600 cursor-pointer duration-200"
            onClick={handleGoogleSignUp}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
