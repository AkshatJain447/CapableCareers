// icons
import { FaGoogle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

//hooks
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { v4 as uuid } from "uuid";

//Store Actions
import { toggleRegisterBtn } from "../../store/stateStore";

//Firebase
import { auth, database } from "../../firebase/firebaseConfig";
import { collection, setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const Register = () => {
  const dispatch = useDispatch();
  const usersRef = collection(database, "users");
  const uniqueUserId = uuid().slice(0, 10);
  const googleProvider = new GoogleAuthProvider();

  var userName = useRef();
  var userMobile = useRef();
  var userRole = useRef();
  var userEmail = useRef();
  var userPassword = useRef();

  const handleRegisterForm = (event) => {
    event.preventDefault();
    const userId = userEmail.current.value;

    const userObj = {
      userId: uniqueUserId,
      name: userName.current.value,
      mobile: userMobile.current.value,
      role: userRole.current.value,
      email: userId,
      password: userPassword.current.value,
      profilePic: "../../assets/profile1.jpg",
    };

    createUserWithEmailAndPassword(auth, userId, userPassword.current.value)
      .then(() => {
        setDoc(doc(usersRef, userId), userObj).then(() => {
          alert("User registered successfully!");
          userName.current.value = "";
          userMobile.current.value = "";
          userRole.current.value = "Employer";
          userEmail.current.value = "";
          userPassword.current.value = "";
          dispatch(toggleRegisterBtn());
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleGoogleRegistration = () => {
    signInWithPopup(auth, googleProvider)
      .then((userInfo) => {
        setDoc(
          doc(usersRef, userInfo.user.email),
          {
            userId: userInfo.user.uniqueUserId,
            name: userInfo.user.displayName,
            email: userInfo.user.email,
            profilePic: userInfo.user.photoURL,
          },
          { merge: true }
        ).then(() => {
          alert("User registered successfully!");
          dispatch(toggleRegisterBtn());
        });
      })
      .catch((err) => err.message);
  };

  return (
    <div className="grid grid-cols-1 grid-rows-1 max-w-[95%] z-3 place-content-center place-items-center">
      <div className="absolute top-0 left-0 bg-gray-800 opacity-50 w-full h-full z-2"></div>
      <div className="absolute top-[10%] ml-3 rounded-md bg-white w-fit h-fit drop-shadow-lg p-3">
        <div>
          <h1 className="flex justify-between items-center text-2xl border-b p-2 text-center font-semibold">
            Create New Account
            <IoMdClose
              className="cursor-pointer text-gray-500 hover:text-red-600 duration-150"
              onClick={() => dispatch(toggleRegisterBtn())}
            />
          </h1>
        </div>
        <form className="p-2" onSubmit={(event) => handleRegisterForm(event)}>
          <div className="p-1 lg:m-1">
            <label
              htmlFor="userName"
              className="text-md lg:text-lg mr-2 inline-block w-[85px] lg:text-right"
            >
              Name :
            </label>
            <input
              type="text"
              ref={userName}
              id="userName"
              placeholder="Enter Name"
              className="border p-1 pl-2 rounded-sm text-md lg:text-lg md:w-[300px]"
            />
          </div>
          <div className="p-1 lg:m-1">
            <label
              htmlFor="userMobile"
              className="text-md lg:text-lg mr-2 inline-block w-[85px] lg:text-right"
            >
              Mobile :
            </label>
            <input
              ref={userMobile}
              type="text"
              id="userMobile"
              placeholder="Enter Mobile Number"
              className="border p-1 pl-2 rounded-sm text-md lg:text-lg md:w-[300px]"
            />
          </div>
          <div className=" p-1 lg:m-1">
            <label
              htmlFor="userRole"
              className="text-md lg:text-lg mr-2 inline-block w-[85px] lg:text-right"
            >
              Role :
            </label>
            <select
              ref={userRole}
              name="userRole"
              id="userRole"
              className="border p-1 pl-2 rounded-sm text-md lg:text-lg md:w-[300px]"
            >
              <option value="Employer">Employer</option>
              <option value="JobSeeker">Job Seeker</option>
            </select>
          </div>
          <div className="p-1 lg:m-1">
            <label
              htmlFor="userEmail"
              className="text-md lg:text-lg mr-2 inline-block w-[85px] lg:text-right"
            >
              Email :
            </label>
            <input
              ref={userEmail}
              type="email"
              id="userEmail"
              placeholder="Enter Email Address"
              className="border p-1 pl-2 rounded-sm text-md lg:text-lg md:w-[300px]"
            />
          </div>
          <div className="p-1 lg:m-1">
            <label
              htmlFor="userPassword"
              className="text-md lg:text-lg mr-2 inline-block w-[85px] lg:text-right"
            >
              Password :
            </label>
            <input
              ref={userPassword}
              type="password"
              id="userPassword"
              placeholder="Enter Password"
              className="border p-1 pl-2 rounded-sm text-md lg:text-lg md:w-[300px]"
            />
          </div>
          <button className="block p-2 border rounded-md text-md lg:text-lg px-4 mt-2 mx-auto hover:text-secondary hover:border-secondary duration-200">
            Register
          </button>
        </form>
        <div className="flex lg:grid place-items-center place-content-center gap-1">
          <span className="italic">Or register with</span>
          <FaGoogle
            className="text-2xl hover:text-red-600 cursor-pointer duration-200"
            onClick={handleGoogleRegistration}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
