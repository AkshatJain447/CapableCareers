// Images
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.png";
import card3 from "../../assets/card3.png";

import Slider from "../Slider/Slider";
import CarouselTransition from "../Carousel/Carousel";
import NoticeBoard from "../NoticeBoard/NoticeBoard";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Slider />
      <CarouselTransition />
      <NoticeBoard />
      <div className="flex flex-col lg:flex-row items-center gap-7 justify-evenly my-12">
        <Link
          to={"/jobs"}
          className="w-[90%] md:w-[40%] lg:w-1/4 border xl:h-[350px] lg:border-0 lg:hover:border hover:scale-105 duration-200 hover:shadow-xl py-3 px-6 border-gray-300 rounded-md cursor-pointer"
        >
          <div className="h-[80%] grid place-content-center">
            <img src={card1} alt="Card1" />
          </div>
          <div>
            <h5 className="text-2xl font-semibold text-center">
              Looking for Job
            </h5>
            <h6 className="text-lg text-center">
              Find Your Next Career Opportunity
            </h6>
          </div>
        </Link>
        <Link
          to={"/training"}
          className="w-[90%] md:w-[40%] lg:w-1/4 border xl:h-[350px] lg:border-0 lg:hover:border hover:scale-105 duration-200 hover:shadow-xl py-3 px-6 border-gray-300 rounded-md cursor-pointer"
        >
          <div className="h-[80%] grid place-content-center">
            <img src={card2} alt="Card2" />
          </div>
          <div>
            <h5 className="text-2xl font-semibold text-center">
              Training Programs
            </h5>
            <h6 className="text-lg text-center">Career Empowerment Courses</h6>
          </div>
        </Link>
        <Link
          to={"/events"}
          className="w-[90%] md:w-[40%] lg:w-1/4 border xl:h-[350px] lg:border-0 lg:hover:border hover:scale-105 duration-200 hover:shadow-xl py-3 px-6 border-gray-300 rounded-md cursor-pointer"
        >
          <div className="h-[80%] grid place-content-center">
            <img src={card3} alt="Card3" />
          </div>
          <div>
            <h5 className="text-2xl font-semibold text-center">
              Events and Workshops
            </h5>
            <h6 className="text-lg text-center">
              Career Development Workshops
            </h6>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Home;
