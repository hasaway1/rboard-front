import Swal from "sweetalert2";
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {login} from '../../utils/authApi'
import { AsyncStatus } from '../../utils/constants';
import useAuthStore from '../../stores/useAuthStore';
import SignupInput from '../../components/member/SignupInput';
import BlockButton from '../../components/common/BlockButton';

function MemberLogin() {
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const setLogin = useAuthStore(state=>state.setLogin);

  const doLogin=async ()=>{
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    const r1 = await usernameRef.current.check();
    const r2 = passwordRef.current.check();
    if(!(r1 && r2)) {
      setStatus(AsyncStatus.IDLE);
      return;
    }

    const requestForm = {username:usernameRef.current.getValue(), password:passwordRef.current.getValue()};
    try {
      const response = await login(requestForm);
      setLogin(response.data);
      navigate("/");
    } catch(err) {
      if(err.status===401)
        Swal.fire({icon:'error', title:"로그인 실패", text:"이메일 또는 비밀번호를 다시 확인하세요" });
      else if(err.status===403)
        Swal.fire({icon:'error', title:"로그인 실패", text:"확인되지 않은 계정입니다. 이메일을 확인하세요." });
      else
        console.log(err);
    } finally {
      setStatus(AsyncStatus.IDLE);
    }
  };
  
  return (
    <div>
      <h1>로그인</h1>
      <SignupInput name="username" ref={usernameRef} />
      <SignupInput name="password" ref={passwordRef} type='password' />
      <BlockButton label="로그인" onClick={doLogin} wait={status===AsyncStatus.SUBMITTING} />
    </div>
  )
}

export default MemberLogin