import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import Course from "../Course/Course";

const Training = () => {
  const collectionRef = collection(database, "Courses");
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    onSnapshot(collectionRef, (snapshot) => {
      const courseArr = [];
      snapshot.forEach((doc) => {
        courseArr.push(doc.data());
      });
      setCourseList(courseArr);
    });
  }, []);
  return (
    <div>
      <h1 className=" text-3xl font-semibold tracking-wide w-[95%] lg:w-[85%] bg-primaryDark text-white py-2 px-6 my-4 m-auto shadow-md rounded-md">
        Looking for Trainings/Courses, here are various courses to sparpen your
        skills:
      </h1>
      <div className="shadow-xl border border-gray-100 w-[95%] text-justify lg:w-[85%] mb-5 mx-auto rounded-lg p-1 flex flex-col md:flex-row flex-wrap justify-evenly">
        {courseList.map((course) => (
          <Course key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Training;
