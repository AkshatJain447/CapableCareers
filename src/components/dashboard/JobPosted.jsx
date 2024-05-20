import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { auth, database } from "../../firebase/firebaseConfig";

const DisplayJob = ({ job }) => {
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
        </ul>
      </div>
    </div>
  );
};

const JobPosted = () => {
  const [jobList, setJobList] = useState([]);
  useEffect(() => {
    const fetchJobList = async () => {
      const q = query(
        collection(database, "JobList"),
        where("HR", "==", auth.currentUser.displayName)
      );
      const querySnapshot = await getDocs(q);
      var temp = [];
      querySnapshot.forEach((job) => {
        temp.push(job.data());
      });
      setJobList(temp);
    };
    fetchJobList();
  }, [database]);
  return (
    <div className=" lg:w-4/5 ">
      {jobList.map((job) => (
        <DisplayJob key={job.JobId} job={job} />
      ))}
    </div>
  );
};

export default JobPosted;
