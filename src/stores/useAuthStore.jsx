import { create } from 'zustand';
import { getUsername } from '../utils/authApi';

const useAuthStore = create((set) => ({
  // undefined : 아직 체크안 한 상태, null : 비로그인
  username: undefined,
  role: undefined,

  checkAuth: async () => {
    try {
      const res = await getUsername();
      const {username, role} = res.data;
      set({username, role});
    } catch (err) {
      if(err.status!==409)
        console.log(err);
      set({username:null, role:null});
    }
  },

  setLogin: ({username, role}) => set({username, role}),

  setLogout: () => set({username:null, role:null})
}));

export default useAuthStore;