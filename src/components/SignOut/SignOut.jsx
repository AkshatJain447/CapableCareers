import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { closeNavBar } from "../../store/stateStore";

const SignOut = () => {
  const isUser = useSelector((store) => store.stateStore.isUser);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert("Signed Out");
        dispatch(closeNavBar());
      })
      .catch((err) => alert(err.message));
  };

  return (
    <li>
      <button
        className={`border py-[5px] px-2 rounded-md bg-slate-200 text-slate-900 drop-shadow-sm ${
          isUser ? `hover:bg-primaryText` : `hover:bg-secondary`
        } hover:text-white duration-300 hover:border-transparent`}
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </li>
  );
};

export default SignOut;
