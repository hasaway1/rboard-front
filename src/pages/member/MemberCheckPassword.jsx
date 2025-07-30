import { useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import {checkPassword} from '../../utils/memberApi';
import { AsyncStatus } from '../../utils/constants';
import SignupInput from '../../components/member/SignupInput';
import BlockButton from '../../components/common/BlockButton';
import LoadingSpinner from '../../components/common/LoadingSpinner';

function MemberCheckPassword() {
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const {signupSuccess} = useSessionStore();
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
      setPasswordVerified();
      navigate("/member/read");
      return;
    } catch(err) {
      setStatus(AsyncStatus.FAIL);
      console.log(err);
    } 
  }

  if(signupSuccess) return <Navigate to="/member/read" replace />;
  if(status===AsyncStatus.SUBMITTING) return <LoadingSpinner />;

  return (
    <div>
      {status===AsyncStatus.FAIL &&  <Alert variant='danger'>비밀번호를 확인하지 못했습니다</Alert>}
      <SignupInput name="password" ref={currentPasswordRef} type='password' />
      <BlockButton label="확 인" onClick={handleCheckPassword} wait={status===AsyncStatus.SUBMITTING} />
    </div>
  )
}

export default MemberCheckPassword