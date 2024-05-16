import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/navbar/navbar";
import Register from "../components/Register/Register";
import SignUp from "../components/SignUpModal/SignUpModal";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { setisUser } from "../store/stateStore";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setisUser(true));
      } else {
        dispatch(setisUser(false));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const registerState = useSelector((store) => store.stateStore.registerState);
  const signUpState = useSelector((store) => store.stateStore.signUpState);
  const aboutBtnState = useSelector((store) => store.stateStore.aboutBtnState);
  return (
    <div
      className={`${
        signUpState || registerState || aboutBtnState
          ? "overflow-hidden max-h-[100vh]"
          : ""
      }`}
    >
      <Navbar></Navbar>
      <Outlet />
      <Footer />
      {/* toggle between about, register and signUp */}
      {aboutBtnState && <About />}
      {registerState && <Register />}
      {signUpState && <SignUp />}
    </div>
  );
}

export default App;
