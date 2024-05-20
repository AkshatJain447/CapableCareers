import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, database } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Loader from "../loader/Loader";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  var [jobList, setJobList] = useState([]);

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
    const lastJobPosted = jobList.reduce((prevJob, currentJob) => {
      return prevJob.JobId > currentJob.JobId ? prevJob : currentJob;
    }, {});

    return (
      <div className="lg:w-4/5">
        <h1 className="font-semibold text-lg underline">User Information: </h1>
        <p className="mt-2">
          <span className="font-semibold">Username:</span> {userInfo.name}
        </p>
        <p className="mt-2">
          <span className="font-semibold">Employer ID:</span> {userInfo.userId}
        </p>
        <p className="mt-2">
          <span className="font-semibold">Email:</span> {userInfo.email}
        </p>

        <h1 className="mt-3 font-semibold text-lg underline">
          Total Jobs Posted: {jobList.length}
        </h1>
        <span className="mr-10">
          <span className="font-semibold">Active Jobs:</span> {jobList.length}
        </span>
        <span>
          <span className="font-semibold">Inactive Jobs:</span> {0}
        </span>

        <h1 className="mt-3 font-semibold text-lg underline">
          Last Job Posted:{" "}
        </h1>
        <div className="border border-gray-300 hover:shadow-lg duration-200 hover:border-gray-500 rounded-md p-1 m-2 mb-3">
          <h5 className="text-xl font-semibold tracking-wide text-left bg-primaryDark text-white w-fit py-1 px-3 rounded-md m-3 shadow">
            Job Position: {lastJobPosted.jobTitle}
          </h5>
          <div className="flex flex-col lg:flex-row lg:gap-16 justify-around m-3">
            <ul className="lg:w-2/3">
              <li className="my-2">
                <span className="font-semibold">Job Id: </span>{" "}
                {lastJobPosted.JobId}
              </li>
              <li className="my-2">
                <span className="font-semibold">Company/Organization: </span>
                {lastJobPosted.Company}
              </li>
              <li className="my-2 text-justify">
                <span className="font-semibold">Job Description: </span>
                {lastJobPosted.Description}
              </li>
            </ul>
            <ul className="lg:w-1/3 lg:mr-2">
              <li className="my-2">
                <span className="font-semibold">Application Deadline: </span>
                {lastJobPosted.Deadline}
              </li>
              <li className="my-2">
                <span className="font-semibold">Vacancy: </span>
                {lastJobPosted.Vacancies}
              </li>
              <li className="my-2">
                <span className="font-semibold">Eligibility: </span>
                {lastJobPosted.EligibilityCriteria}
              </li>
              <li className="my-2">
                <span className="font-semibold">Location: </span>{" "}
                {lastJobPosted.JobLocation}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return <>{userInfo ? <DisplayDashboard /> : <Loader />}</>;
};

export default Dashboard;
