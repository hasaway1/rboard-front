import { useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import {checkPassword} from '../../utils/memberApi';
import { AsyncStatus } from '../../utils/constants';
import SignupInput from '../../components/member/SignupInput';
import BlockButton from '../../components/common/BlockButton';
import Swal from "sweetalert2";
import useSessionStore from "../../stores/useSessionStore";

function MemberCheckPassword() {
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const {passwordVerified, setPasswordVerified} = useSessionStore();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleCheckPassword=async ()=>{
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    if (!passwordRef.current.getValue()) {
      setStatus(AsyncStatus.IDLE);
      return;
    }
    
    try {
      await checkPassword(passwordRef.current.getValue());
      setPasswordVerified(true);
      navigate("/member/read");
      return;
    } catch(err) {
      Swal.fire({icon:'error', text:"잘못된 비밀번호입니다. 다시 입력해주세요" });
      passwordRef.current.setValue("");
    } finally {
      setStatus(AsyncStatus.IDLE);
    }
  }

  if(passwordVerified) return <Navigate to="/member/read" replace />;

  return (
    <div>
      <SignupInput name="password" ref={passwordRef} type='password' />
      <BlockButton label="확 인" onClick={handleCheckPassword} wait={status===AsyncStatus.SUBMITTING} />
    </div>
  )
}

export default MemberCheckPassword