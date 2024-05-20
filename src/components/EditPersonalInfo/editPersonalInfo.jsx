import { IoMdClose } from "react-icons/io";
import { auth, database } from "../../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useRef } from "react";

const EditPersonalInfo = ({ userInfo, toggle }) => {
  var userName = useRef();
  var userMobile = useRef();
  var userEmail = useRef();
  var userPassword = useRef();

  const handleUpdate = () => {
    const userRef = doc(database, "users", `${auth.currentUser.email}`);
    updateDoc(userRef, {
      name: userName.current.value ? userName.current.value : userInfo.name,
      mobile: userMobile.current.value
        ? userMobile.current.value
        : userInfo.mobile,
      email: userEmail.current.value ? userEmail.current.value : userInfo.email,
      password: userPassword.current.value
        ? userPassword.current.value
        : userInfo.password,
    })
      .then(() => {
        alert("Information Updated Successfully");
      })
      .catch((err) => alert(err.message));
    toggle();
  };

  return (
    <>
      <div className="fixed left-0 top-0 bg-slate-700 opacity-[60%] w-full h-full grid place-content-center"></div>
      <div className="absolute left-0 top-[5%] right-0 ml-auto mr-auto grid place-content-center w-fit bg-white py-3 px-6 rounded-lg shadow-xl shadow-neutral-500">
        <>
          {/* Modal Header */}
          <div className=" flex justify-between items-center text-xl font-semibold text-black border-b pb-3">
            <h1>Edit Personal Info </h1>
            <IoMdClose
              className="hover:cursor-pointer text-2xl hover:text-red-600"
              onClick={toggle}
            />
          </div>
          {/* Modal Body */}
          <div className="p-1 lg:m-1">
            <label
              htmlFor="userName"
              className="text-md lg:text-lg mr-2 inline-block w-[85px] lg:text-right"
            >
              Name :
            </label>
            <input
              type="text"
              ref={userName}
              id="userName"
              placeholder="Enter Name"
              defaultValue={userInfo.name}
              className="border p-1 pl-2 rounded-sm text-md lg:text-lg md:w-[300px]"
            />
          </div>
          <div className="p-1 lg:m-1">
            <label
              htmlFor="userMobile"
              className="text-md lg:text-lg mr-2 inline-block w-[85px] lg:text-right"
            >
              Mobile :
            </label>
            <input
              ref={userMobile}
              type="text"
              id="userMobile"
              placeholder="Enter Mobile Number"
              defaultValue={userInfo.mobile}
              className="border p-1 pl-2 rounded-sm text-md lg:text-lg md:w-[300px]"
            />
          </div>
          <div className=" p-1 lg:m-1">
            <label
              htmlFor="userRole"
              className="text-md lg:text-lg mr-2 inline-block w-[85px] lg:text-right"
            >
              Role :
            </label>
            <input
              type="text"
              id="userRole"
              className="border p-1 pl-2 rounded-sm text-md lg:text-lg md:w-[300px]"
              value={userInfo.role}
              disabled
            />
          </div>
          <div className="p-1 lg:m-1">
            <label
              htmlFor="userEmail"
              className="text-md lg:text-lg mr-2 inline-block w-[85px] lg:text-right"
            >
              Email :
            </label>
            <input
              ref={userEmail}
              type="email"
              id="userEmail"
              placeholder="Enter Email Address"
              className="border p-1 pl-2 rounded-sm text-md lg:text-lg md:w-[300px]"
              defaultValue={userInfo.email}
            />
          </div>
          <div className="p-1 lg:m-1">
            <label
              htmlFor="userPassword"
              className="text-md lg:text-lg mr-2 inline-block w-[85px] lg:text-right"
            >
              Password :
            </label>
            <input
              ref={userPassword}
              type="password"
              id="userPassword"
              placeholder="Enter New Password"
              className="border p-1 pl-2 rounded-sm text-md lg:text-lg md:w-[300px]"
            />
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
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </>
      </div>
    </>
  );
};

export default EditPersonalInfo;
