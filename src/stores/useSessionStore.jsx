import { create } from "zustand";

const useSessionStore = create((set, get) => ({
  signupSuccess: false,
  passwordVerified: false,

  setSignupSuccess:()=>set({signupSuccess:true}),
  setPasswordVerified:(param) => set({passwordVerified:param }),

}));

export default useSessionStore