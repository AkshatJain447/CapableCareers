import { jobList } from "../Slider/Slider";

const NoticeBoard = () => {
  return (
    <div className=" border rounded-md my-5 mx-10 drop-shadow-md p-1 shadow-xl">
      <h1 className="text-lg md:text-xl lg:text-2xl text-white p-2 text-center font-semibold tracking-wide rounded-md m-2 bg-primaryDark">
        Notice Board
      </h1>
      <ul className="my-3 mx-6 text-[14px] text-justify md:text-[17px]">
        {jobList.map((job) => (
          <li key={job.JobId}>
            {job.JobId}. {job.jobTitle} at {job.Company}, Last date to apply:
            {job.Deadline}, Eligibility Criteria: {job.EligibilityCriteria}, Job
            Location: {job.JobLocation}, Total Vacancies: {job.Vacancies}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeBoard;
