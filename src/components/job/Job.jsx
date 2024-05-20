import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import ApplyJob from "../ApplyJob/ApplyJob";

const Job = ({ job }) => {
  const [applyModal, setApplyModal] = useState(false);
  const [user, setUser] = useState(null);
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
            if (doc.data().role === "JobSeeker") {
              setUser(doc.data());
              setLoggedIn(true);
            }
          });
        } catch (error) {
          console.error("Error getting documents: ", error);
        }
      } else {
        setLoggedIn(false);
      }
    });

    return unsubscribe;
  }, [auth, database]);

  const handleApplyBtn = () => {
    if (loggedIn) {
      setApplyModal(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      alert("user not signed in as seeker");
    }
  };
  return (
    <>
      <div className="border border-gray-300 hover:shadow-lg duration-200 hover:border-gray-500 rounded-md p-1 m-2 mb-3">
        <h5 className="text-xl font-semibold tracking-wide text-left bg-primaryDark text-white w-fit py-1 px-3 rounded-md m-3 shadow">
          Job Position: {job.jobTitle}
        </h5>
        <div className="flex flex-col lg:flex-row lg:gap-16 justify-around m-3">
          <ul className="lg:w-2/3">
            <li className="my-2">
              <span className="font-semibold">Job Id: </span> {job.JobId}
            </li>
            <li className="my-2">
              <span className="font-semibold">Company/Organization: </span>
              {job.Company}
            </li>
            <li className="my-2">
              <span className="font-semibold">Job Description: </span>
              {job.Description}
            </li>
          </ul>
          <ul className="lg:w-1/3 lg:mr-2">
            <li className="my-2">
              <span className="font-semibold">Application Deadline: </span>
              {job.Deadline}
            </li>
            <li className="my-2">
              <span className="font-semibold">Vacancy: </span>
              {job.Vacancies}
            </li>
            <li className="my-2">
              <span className="font-semibold">Eligibility: </span>
              {job.EligibilityCriteria}
            </li>
            <li className="my-2">
              <span className="font-semibold">Location: </span>
              {job.JobLocation}
            </li>
            <li className="my-2">
              <button
                className="float-right border p-2 hover:scale-105 hover:border-secondary hover:text-secondary duration-200 shadow-sm hover:shadow-md font-semibold bg-gray-200 text-gray-800 hover:bg-white rounded-md cursor-pointer"
                onClick={handleApplyBtn}
              >
                Apply Now
              </button>
            </li>
          </ul>
        </div>
        {applyModal && (
          <ApplyJob
            job={job}
            userInfo={user}
            toggle={() => setApplyModal(!applyModal)}
          />
        )}
      </div>
    </>
  );
};

export default Job;
