import { useDispatch, useSelector } from "react-redux";
import { toggleSignUpBtn } from "../../store/stateStore";

const SignIn = () => {
  const isUser = useSelector((store) => store.stateStore.isUser);
  const dispatch = useDispatch();
  return (
    <li>
      <button
        className={`border py-[5px] px-2 rounded-md bg-slate-200 text-slate-900 drop-shadow-sm ${
          isUser ? `hover:bg-primaryText` : `hover:bg-secondary`
        } hover:text-white duration-300 hover:border-transparent`}
        onClick={() => dispatch(toggleSignUpBtn())}
      >
        Sign In
      </button>
    </li>
  );
};

export default SignIn;
