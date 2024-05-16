import { createSlice } from "@reduxjs/toolkit";

const StateStore = createSlice({
  name: "StateStore",
  initialState: {
    navState: false,
    registerState: false,
    signUpState: false,
    isUser: false,
    aboutBtnState: false,
  },
  reducers: {
    openNavBar(state, action) {
      return { ...state, navState: action.payload };
    },
    closeNavBar(state, action) {
      return { ...state, navState: action.payload };
    },
    toggleRegisterBtn(state) {
      return { ...state, registerState: !state.registerState };
    },
    toggleSignUpBtn(state) {
      return { ...state, signUpState: !state.signUpState };
    },
    setisUser(state, action) {
      return { ...state, isUser: action.payload };
    },
    toggleAboutButton(state) {
      return { ...state, aboutBtnState: !state.aboutBtnState };
    },
  },
});

export const {
  openNavBar,
  closeNavBar,
  toggleAboutButton,
  toggleRegisterBtn,
  toggleSignUpBtn,
  setisUser,
} = StateStore.actions;
export default StateStore;
