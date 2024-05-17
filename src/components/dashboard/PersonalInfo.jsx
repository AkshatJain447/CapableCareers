import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, database } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Loader from "../loader/Loader";

const PersonalInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(database, "users"),
          where("email", "==", user.email)
        );
        const jobQ = query(
          collection(database, "JobList"),
          where("HR", "==", auth.currentUser.displayName)
        );

        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUserInfo(doc.data());
          });
          const jobsSnapshot = await getDocs(jobQ);
          var temp = [];
          jobsSnapshot.forEach((doc) => {
            temp.push(doc.data());
          });
          setJobList(temp);
        } catch (error) {
          console.error("Error getting documents: ", error);
        }
      }
    });

    return unsubscribe;
  }, [auth, database]);

  const DisplayDashboard = () => {
    return (
      <div className="p-6 px-10 border shadow-xl w-full m-4 lg:mx-10 rounded-xl">
        <h1 className=" font-semibold text-2xl underline mb-4">
          User's Personal Information:
        </h1>
        <p className="mt-2 text-lg">
          <span className="font-semibold">Name:</span> {userInfo.name}
        </p>
        <p className="mt-2 text-lg">
          <span className="font-semibold">User Id:</span> {userInfo.userId}
        </p>
        <p className="mt-2 text-lg">
          <span className="font-semibold">Email Id:</span> {userInfo.email}
        </p>
        <p className="mt-2 text-lg">
          <span className="font-semibold">Phone:</span> {userInfo.mobile}
        </p>
        <p className="mt-2 text-lg">
          <span className="font-semibold">Role:</span> {userInfo.role}
        </p>
        <button className="float-right border p-2 hover:scale-105 hover:border-secondary hover:text-secondary duration-200 shadow-sm hover:shadow-md font-semibold bg-gray-200 text-gray-800 hover:bg-white rounded-md cursor-pointer">
          Edit Personal Info
        </button>
      </div>
    );
  };

  return <>{userInfo ? <DisplayDashboard /> : <Loader />}</>;
};

export default PersonalInfo;
