import { useRef, useState } from "react";
import { database } from "../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const Footer = () => {
  const [sendMsgState, setSendMsgState] = useState(false);
  const collectionRef = collection(database, "messages");
  const userName = useRef();
  const userEmail = useRef();
  const userMsg = useRef();

  const handleSubmitBtn = (event) => {
    event.preventDefault();
    addDoc(collectionRef, {
      name: userName.current.value,
      email: userEmail.current.value,
      message: userMsg.current.value,
    })
      .then(() => {
        setSendMsgState(true);
        userName.current.value = "";
        userEmail.current.value = "";
        userMsg.current.value = "";
        setTimeout(() => {
          setSendMsgState(false);
        }, 3000);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className=" bg-primaryDark text-white flex flex-col md:flex-row justify-evenly p-3 shadow-md">
      <div className="text-center md:text-left mb-4 md:mb-auto md:w-1/3 md:mt-auto">
        <h5 className="text-lg md:text-xl font-semibold tracking-wide">
          Coding Knights
        </h5>
        <p className="text-sm md:text-md italic tracking-wide">
          www.codingKnights.org
        </p>
        <p className="text-sm md:text-[16px] my-3">
          University Institute of Engineering(UIE), Chandigarh University,
          Gharuan, Mohali, Punjab, 140413, India
        </p>
        <p className="text-sm md:text-[16px] my-2">
          Ph No. 7300716447, 9721216557, 9050666469
        </p>
        <div className="italic text-sm">
          All rights reserved. © 2024 Coding Knights. Unauthorized duplication
          or distribution is prohibited.
        </div>
      </div>
      <div className="border rounded-lg border-gray-500 py-1 px-3 tracking-wide">
        <form onSubmit={(event) => handleSubmitBtn(event)} id="contactForm">
          <legend className="text-xl font-semibold">Contact Us :</legend>
          <fieldset className="m-3">
            <div className="my-2">
              <label
                htmlFor="userName"
                className="w-[110px] md:text-right md:mr-2 inline-block"
              >
                Name
              </label>
              <input
                type="text"
                ref={userName}
                className="w-[250px] rounded-sm p-1"
                id="userName"
                required
                placeholder="Enter your name"
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="userEmail"
                className="w-[110px] md:text-right md:mr-2 inline-block"
              >
                Email address
              </label>
              <input
                type="email"
                ref={userEmail}
                className="w-[250px] rounded-sm p-1"
                id="userEmail"
                aria-describedby="emailHelp"
                required
                placeholder="Enter email"
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="messageArea"
                className="w-[110px] md:text-right md:mr-2 inline-block"
              >
                Message
              </label>
              <textarea
                name="messageArea"
                ref={userMsg}
                className="w-[250px] rounded-sm p-1 text-black"
                cols="30"
                rows="2"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="border border-gray-400 block m-auto hover:bg-primaryText duration-200 hover:text-white hover:border-transparent cursor-pointer py-2 px-4 rounded-[5px]"
            >
              Submit
            </button>
            <div
              className={`${
                sendMsgState ? "block" : "hidden"
              } text-secondary text-sm italic text-center mt-1`}
            >
              message send successfully
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
export default Footer;
