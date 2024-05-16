import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { toggleAboutButton } from "../../store/stateStore";

const About = () => {
  const dispatch = useDispatch();
  return (
    <div className=" grid grid-cols-1 grid-rows-1 max-w-[95%] z-3 place-content-center place-items-center">
      <div className="absolute top-0 left-0 bg-gray-800 opacity-50 w-full h-full z-2"></div>
      <div className="absolute top-[10%] ml-3 rounded-md bg-white lg:w-1/2 h-fit drop-shadow-lg p-3">
        <div>
          <h1 className="flex justify-between items-center text-2xl border-b p-2 text-center font-semibold">
            About Us
            <IoMdClose
              className="cursor-pointer text-gray-500 hover:text-red-600 duration-150"
              onClick={() => dispatch(toggleAboutButton())}
            />
          </h1>
        </div>
        <div className="text-justify p-2 h-[400px] overflow-scroll lg:overflow-auto md:h-fit">
          <p className="text-sm lg:text-[17px]">
            We are a passionate team of three members, all pursuing our
            Bachelor's degrees in Computer Science and Engineering. Our journey
            together began with a shared desire to make a positive impact on the
            lives of individuals facing disabilities.
          </p>
          <h4 className="my-2 text-md lg:text-lg font-semibold">Our Mission</h4>
          <p className="text-sm lg:text-[17px]">
            Driven by empathy and a sense of responsibility towards creating an
            inclusive society, we embarked on a journey to design an application
            aimed at alleviating the challenges encountered by disabled persons.
            Through our collective skills and dedication, we strive to develop
            innovative solutions that empower individuals with disabilities to
            lead fulfilling lives and participate fully in society.
          </p>
          <h4 className="my-2 text-md lg:text-lg font-semibold">Our Vision</h4>
          <p className="text-sm lg:text-[17px]">
            Our vision is to create a world where disability is not a barrier to
            success and happiness. We envision a future where technology serves
            as a powerful tool for promoting accessibility, independence, and
            equal opportunities for all. With our app, we aim to break down
            barriers, foster inclusivity, and provide practical solutions that
            enhance the quality of life for individuals with disabilities.
            Together, we aspire to inspire positive change and make a lasting
            difference in the lives of those we seek to serve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
