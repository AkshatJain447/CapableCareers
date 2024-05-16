import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";

const UserDashboard = ({ userInfo }) => {
  var [greet, setGreet] = useState("Good Morning");
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
      <div className="flex justify-center gap-12 items-center m-4 p-8 px-20 border shadow-xl w-fit rounded-xl">
        <img
          className=" h-40 w-40 rounded-full"
          src={`${userInfo.profilePic}`}
          alt="profilePic"
        />
        <div>
          <p className=" text-3xl font-semibold">{`${greet}, ${userInfo.name}`}</p>
          <p className=" text-2xl font-semibold">{`${userInfo.name}'s dashboard`}</p>
        </div>
      </div>
      <div className="border shadow-lg"></div>
    </div>
  );
};

const SigninMsg = () => {
  return (
    <div className=" my-12 lg:my-24 font-semibold text-2xl lg:text-3xl text-center grid place-content-center">
      User is Signed out, please SignIn to proceed
    </div>
  );
};

const Employer = () => {
  var [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedIn(true);
        const q = query(
          collection(database, "users"),
          where("email", "==", user.email)
        );

        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUserInfo(doc.data());
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

export default Employer;
