import { useRef } from "react";
import { auth, database } from "../../firebase/firebaseConfig";
import { collection, setDoc, doc } from "firebase/firestore";
import { v4 as uuid } from "uuid";

const PostNew = () => {
  const jobListRef = collection(database, "JobList");

  const uniqueJobId = uuid().slice(0, 10);
  const jobTitle = useRef();
  const company = useRef();
  const jobdesc = useRef();
  const deadlineDate = useRef();
  const deadlineTime = useRef();
  const vacancy = useRef();
  const eligibility = useRef();
  const location = useRef();
  const status = useRef();

  const handleClearBtn = (event) => {
    jobTitle.current.value = "";
    company.current.value = "";
    jobdesc.current.value = "";
    deadlineDate.current.value = "";
    deadlineTime.current.value = "";
    vacancy.current.value = "";
    eligibility.current.value = "";
    location.current.value = "";
    status.current.value = "";
  };

  const handleSubmitBtn = (event) => {
    event.preventDefault();
    const jobData = {
      jobTitle: jobTitle.current.value,
      Company: company.current.value,
      Description: jobdesc.current.value,
      Deadline: deadlineDate.current.value + " " + deadlineTime.current.value,
      Vacancies: vacancy.current.value,
      EligibilityCriteria: eligibility.current.value,
      JobLocation: location.current.value,
      ApplicationStatus: status.current.value,
      HR: auth.currentUser.displayName,
      JobId: uniqueJobId,
    };
    setDoc(doc(jobListRef, uniqueJobId), jobData)
      .then(() => {
        alert("Success");
        handleClearBtn();
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <div className=" w-fit border mx-auto shadow-md p-1 md:p-3 rounded-md">
      <h1 className="font-semibold lg:text-2xl border-b mx-2 pb-2">
        Job Post Form
      </h1>
      <form className="m-2">
        <div className=" border p-2 rounded-md m-1">
          <label
            className="block md:inline-block md:w-[170px] p-2 md:text-right font-semibold"
            htmlFor="jobTitle"
          >
            Job title:
          </label>
          <input
            ref={jobTitle}
            className="border p-2 rounded-sm md:mx-2 md:w-[300px] lg:w-[400px]"
            type="text"
            id="jobTitle"
            placeholder="Enter job title"
          />
        </div>
        <div className=" border p-2 rounded-md m-1">
          <label
            className="block md:inline-block md:w-[170px] p-2 md:text-right font-semibold"
            htmlFor="company"
          >
            Company/Organization:
          </label>
          <input
            ref={company}
            className="border p-2 rounded-sm md:mx-2  md:w-[300px] lg:w-[400px]"
            type="text"
            id="company"
            placeholder="Enter company/organization"
          />
        </div>
        <div className=" md:flex items-center border p-2 rounded-md m-1">
          <label
            className="block md:inline-block md:w-[170px] p-2 md:text-right font-semibold"
            htmlFor="description"
          >
            Job Description:
          </label>
          <textarea
            ref={jobdesc}
            className="border p-2 rounded-sm md:mx-2 md:w-[300px] lg:w-[400px]"
            rows={2}
            cols={25}
            id="description"
            placeholder="Enter job description"
          />
        </div>
        <div className=" border p-2 rounded-md m-1">
          <label
            className="block md:inline-block md:w-[170px] p-2 md:text-right font-semibold"
            htmlFor="deadline"
          >
            Application Deadline:
          </label>
          <input
            ref={deadlineDate}
            className="border p-2 rounded-sm md:mx-2 lg:w-[190px]"
            type="date"
            id="deadline"
          />
          <input
            ref={deadlineTime}
            className="border p-2 rounded-sm md:mx-2 lg:w-[190px]"
            type="time"
            id="deadline"
          />
        </div>
        <div className=" border p-2 rounded-md m-1">
          <label
            className="block md:inline-block md:w-[170px] p-2 md:text-right font-semibold"
            htmlFor="vacancy"
          >
            Total Vacancy:
          </label>
          <input
            ref={vacancy}
            className="border p-2 rounded-sm md:mx-2 md:w-[150px]"
            type="number"
            id="vacancy"
            placeholder="Enter a value"
          />
        </div>
        <div className=" border p-2 rounded-md m-1">
          <label
            className="block md:inline-block md:w-[170px] p-2 md:text-right font-semibold"
            htmlFor="eligibility"
          >
            Eligibility:
          </label>
          <input
            ref={eligibility}
            className="border p-2 rounded-sm md:mx-2 md:w-[300px] lg:w-[400px]"
            type="text"
            id="eligibility"
            placeholder="Enter eligibility criteria"
          />
        </div>
        <div className=" border p-2 rounded-md m-1">
          <label
            className="block md:inline-block md:w-[170px] p-2 md:text-right font-semibold"
            htmlFor="location"
          >
            Location:
          </label>
          <input
            ref={location}
            className="border p-2 rounded-sm md:mx-2 md:w-[300px] lg:w-[400px]"
            type="text"
            id="location"
            placeholder="Enter job location"
          />
        </div>
        <div className=" border p-2 rounded-md m-1 ">
          <label
            className="block md:inline-block md:w-[170px] p-2 md:text-right font-semibold"
            htmlFor="status"
          >
            Status:
          </label>
          <input
            ref={status}
            className="border p-2 rounded-sm md:mx-2 md:w-[300px] lg:w-[400px]"
            type="text"
            id="status"
            placeholder="Enter job status"
          />
        </div>
        <div className="flex md:justify-end items-center">
          <button
            className=" border hover:border-none p-1 md:p-3 rounded-md shadow-md md:text-lg w-12 md:w-24 mx-2 mt-3 hover:text-white hover:border-white hover:bg-red-500 transition-all duration-150 hover:shadow-lg"
            onClick={(event) => {
              event.preventDefault();
              handleClearBtn();
            }}
          >
            Clear
          </button>
          <button
            className=" border hover:border-none p-1 md:p-3 rounded-md shadow-md md:text-lg w-12 md:w-24 mx-2 mt-3 hover:text-white hover:border-white hover:bg-teal-600 transition-all duration-150 hover:shadow-lg"
            onClick={(e) => handleSubmitBtn(e)}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostNew;
