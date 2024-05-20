import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, database } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Loader from "../loader/Loader";
import ApplyJob from "../ApplyJob/ApplyJob";

const DashBoard = () => {
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
          where("Vacancies", ">", 0)
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

  const DisplayJob = ({ job }) => {
    const [applyModal, setApplyModal] = useState(false);

    const handleApplyBtn = () => {
      setApplyModal(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
      <div className="border border-gray-300 hover:shadow-lg duration-200 hover:border-gray-500 rounded-md p-1 mx-auto mb-3">
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
            <li className="my-2 text-justify">
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
            userInfo={userInfo}
            toggle={() => setApplyModal(!applyModal)}
          />
        )}
      </div>
    );
  };

  const DisplayDashboard = () => {
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

        <h1 className="mt-3 font-semibold text-lg underline">Jobs Posted:</h1>
        <div className="h-[400px] overflow-y-scroll">
          {jobList.map((job) => (
            <DisplayJob key={job.JobId} job={job} />
          ))}
        </div>
      </div>
    );
  };

  return <>{userInfo ? <DisplayDashboard /> : <Loader />}</>;
};
export default DashBoard;
