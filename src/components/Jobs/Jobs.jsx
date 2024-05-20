import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import Job from "../job/Job";

const Jobs = () => {
  const [jobsList, setJobsList] = useState([]);
  useEffect(() => {
    const q = query(
      collection(database, "JobList"),
      where("Vacancies", ">", 0)
    );
    onSnapshot(q, (snapshot) => {
      const jobsArr = [];
      snapshot.forEach((doc) => {
        jobsArr.push(doc.data());
      });
      setJobsList(jobsArr);
    });
  }, []);
  return (
    <>
      <h1 className=" text-3xl font-semibold tracking-wide w-[95%] lg:w-[85%] bg-primaryDark text-white py-2 px-6 my-4 m-auto shadow-md rounded-md">
        Looking for Job, here are all active jobs:
      </h1>
      <ul className="shadow-xl border border-gray-100 w-[95%] text-justify lg:w-[85%] mb-5 mx-auto rounded-lg p-1">
        {jobsList.map((job) => (
          <Job key={job.JobId} job={job} />
        ))}
      </ul>
    </>
  );
};

export default Jobs;
