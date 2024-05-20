import { IoMdClose } from "react-icons/io";
import { database } from "../../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const ApplyJob = ({ job, userInfo, toggle }) => {
  const handleApply = () => {
    const jobRef = doc(database, "JobList", `${job.JobId}`);
    updateDoc(jobRef, {
      Vacancies: job.Vacancies - 1,
    })
      .then(() => {
        alert("Applied Successfully");
      })
      .catch((err) => alert(err.message));
    toggle();
  };

  return (
    <>
      <div className="fixed left-0 top-0 bg-slate-700 opacity-[60%] w-full h-full grid place-content-center"></div>
      <div className="absolute left-0 top-[5%] right-0 ml-auto mr-auto grid place-content-center w-[90%] md:w-2/3 bg-white py-3 px-6 rounded-lg shadow-xl shadow-neutral-500">
        <>
          {/* Modal Header */}
          <div className=" flex justify-between items-center text-xl font-semibold text-black border-b pb-3">
            <h1>Applying for {job.jobTitle}</h1>
            <IoMdClose
              className="hover:cursor-pointer text-2xl hover:text-red-600"
              onClick={toggle}
            />
          </div>
          {/* Modal Body */}
          <div className="flex flex-col lg:flex-row lg:gap-16 justify-around m-2">
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
            </ul>
          </div>
          <h1 className="text-center lg:text-left font-semibold md:text-xl mb-4 underline">
            Applicant's Personal Information
          </h1>
          <div className="flex flex-col lg:flex-row text-left lg:gap-16 justify-around m-3 p-2 md:px-10 border shadow-md rounded-xl">
            <ul className="lg:w-2/4 lg:mr-2">
              <li className="my-2">
                <span className="font-semibold">Name: </span>
                {userInfo.name}
              </li>
              <li className="my-2">
                <span className="font-semibold">User Id: </span>
                {userInfo.userId}
              </li>
              <li className="my-2">
                <span className="font-semibold">Email Id:</span>
                {userInfo.email}
              </li>
            </ul>
            <ul className="lg:w-1/3 lg:mr-2">
              <li className="my-2">
                <span className="font-semibold">Phone: </span>
                {userInfo.mobile ? userInfo.mobile : "Not Provided"}
              </li>
              <li className="my-2">
                <span className="font-semibold">Role: </span>
                {userInfo.role}
              </li>
            </ul>
          </div>
          <div className="flex justify-end items-center gap-3 mb-3">
            <button
              className="border-2 rounded-lg p-2 px-4 hover:border-red-400 hover:border-2 hover:text-red-600 font-semibold box-border transition-all duration-200"
              onClick={toggle}
            >
              Cancel
            </button>
            <button
              className="border rounded-lg p-2 px-4 bg-teal-600 text-white"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </>
      </div>
    </>
  );
};

export default ApplyJob;
