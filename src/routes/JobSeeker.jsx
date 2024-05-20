import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import { Link, Outlet } from "react-router-dom";

const UserDashboard = ({ userInfo }) => {
  var [greet, setGreet] = useState("Good Morning");
  var [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const time = new Date();
    if (time.getHours() < 12) {
      setGreet("Good Morning");
    } else if (time.getHours() >= 12 && time.getHours() < 18) {
      setGreet("Good Afternoon");
    } else {
      setGreet("Good Evening");
    }
  }, [Date]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center gap-2 md:gap-12 items-center m-4 p-2 md:p-8 md:px-20 border shadow-xl w-fit rounded-xl">
        <img
          className="h-12 w-12 md:h-24 md:w-24 lg:h-40 lg:w-40 rounded-full"
          src={`${userInfo.profilePic}`}
          alt="profilePic"
        />
        <div>
          <p className=" md:text-2xl lg:text-3xl font-semibold">{`${greet}, ${userInfo.name}`}</p>
          <p className=" lg:text-2xl font-semibold">{`${userInfo.name}'s dashboard`}</p>
        </div>
      </div>
      <div className="border shadow-xl lg:flex m-5 p-3 rounded-lg w-[80%]">
        <ul className="lg:border-r-[1px] p-4 lg:text-lg text-center border-gray-900 mr-4  lg:w-1/5">
          <li
            className={`${
              activeTab === "dashboard"
                ? "bg-orange-400 text-white font-semibold"
                : ""
            } mb-2 border p-1 rounded-md shadow-md`}
          >
            <Link
              to={"/jobSeeker/dashboard"}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </Link>
          </li>
          <li
            className={` ${
              activeTab === "personalInfo"
                ? "bg-orange-400 text-white font-semibold"
                : ""
            } mb-2 border p-1 rounded-md shadow-md`}
          >
            <Link
              to={"personalInfo"}
              onClick={() => setActiveTab("personalInfo")}
            >
              Personal Info
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
};

const SigninMsg = () => {
  return (
    <div className=" my-12 lg:my-24 font-semibold text-2xl lg:text-3xl text-center grid place-content-center">
      User is either Signed out or not a job seeker, please SignIn accordingly
      to proceed
    </div>
  );
};

const JobSeeker = () => {
  var [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(database, "users"),
          where("email", "==", user.email)
        );

        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            var userVerify = doc.data();
            setUserInfo(userVerify);
            if (userVerify.role === "JobSeeker") {
              setLoggedIn(true);
            }
            setLoading(false);
          });
        } catch (error) {
          console.error("Error getting documents: ", error);
        }
      } else {
        setLoggedIn(false);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [auth, database]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : loggedIn ? (
        userInfo ? (
          <UserDashboard userInfo={userInfo} />
        ) : (
          <Loader />
        )
      ) : (
        <SigninMsg />
      )}
    </>
  );
};
export default JobSeeker;
