const Course = ({ course }) => {
  return (
    <div className="w-[90%] md:w-[45%] xl:w-[30%] p-4 border m-3 hover:border-gray-500 hover:shadow-md duration-150 rounded-md">
      <iframe
        width="90%"
        src={course.src}
        allowFullScreen
        className="m-auto"
      ></iframe>
      <ul>
        <li className="p-1 pt-2">
          <span className="font-semibold">Course Title:</span> {course.title}
        </li>
        <li className="p-1">
          <span className="font-semibold">Duration:</span> {course.duration}
        </li>
        <li className="p-1">
          <span className="font-semibold">Course Description:</span>
          {course.desc}
        </li>
      </ul>
    </div>
  );
};

export default Course;
