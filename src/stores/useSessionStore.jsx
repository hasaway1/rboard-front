import { create } from "zustand";

const useSessionStore = create((set, get) => ({
  signupSuccess: false,
  passwordVerified: false,

  setSignupSuccess:()=>set({signupSuccess:true}),
  setPasswordVerified:(param) => set({isPasswordVerified:param }),

}));

export default useSessionStore