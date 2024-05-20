import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, database } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Loader from "../loader/Loader";
import EditPersonalInfo from "../EditPersonalInfo/editPersonalInfo";

const PersonalInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editInfo, setEditInfo] = useState(false);

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
            setUserInfo(doc.data());
          });
        } catch (error) {
          console.error("Error getting documents: ", error);
        }
      }
    });

    return unsubscribe;
  }, [auth, database]);

  const handleEditInfo = () => {
    setEditInfo(!editInfo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const DisplayDashboard = () => {
    return (
      <>
        <div className=" lg:w-4/5 p-6 md:px-10 border shadow-xl m-4 lg:mx-10 rounded-xl">
          <h1 className=" text-center lg:text-left font-semibold md:text-xl lg:text-2xl underline mb-4">
            User's Personal Information
          </h1>
          <p className="mt-2 lg:text-lg">
            <span className="font-semibold">Name:</span> {userInfo.name}
          </p>
          <p className="mt-2 lg:text-lg overflow-x-scroll md:overflow-hidden">
            <span className="font-semibold ">User Id: </span>
            {userInfo.userId}
          </p>
          <p className="mt-2 lg:text-lg">
            <span className="font-semibold">Email Id:</span> {userInfo.email}
          </p>
          <p className="mt-2 lg:text-lg">
            <span className="font-semibold">Phone:</span>{" "}
            {userInfo.mobile ? userInfo.mobile : "Not Provided"}
          </p>
          <p className="mt-2 lg:text-lg">
            <span className="font-semibold">Role:</span> {userInfo.role}
          </p>
          <div className="flex mt-2 md:mt-auto md:justify-end">
            <button
              className=" border p-2 hover:scale-105 hover:border-secondary hover:text-secondary duration-200 shadow-sm hover:shadow-md font-semibold bg-gray-200 text-gray-800 hover:bg-white rounded-md cursor-pointer"
              onClick={handleEditInfo}
            >
              Edit Personal Info
            </button>
          </div>
        </div>
        {editInfo && (
          <EditPersonalInfo userInfo={userInfo} toggle={handleEditInfo} />
        )}
      </>
    );
  };

  return <>{userInfo ? <DisplayDashboard /> : <Loader />}</>;
};

export default PersonalInfo;
