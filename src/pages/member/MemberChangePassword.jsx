import { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';

import {changePassword} from '../../utils/memberApi';
import { AsyncStatus } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import ConfirmPasswordInput from '../../components/member/ConfirmPasswordInput';
import SignupInput from '../../components/member/SignupInput';
import BlockButton from '../../components/common/BlockButton';
import LoadingSpinner from '../../components/common/LoadingSpinner';


function MemberChangePassword() {
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const navigate = useNavigate();
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleChangePassword=async ()=>{
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    const r1 = currentPasswordRef.current.check();
    const r2 = newPasswordRef.current.check();
    const r3 = confirmPasswordRef.current.check();
    if (!(r1 && r2 && r3)) {
      setStatus(AsyncStatus.IDLE);
      return;
    }

    try {
      const requestForm = {currentPassword:currentPasswordRef.current.getValue(), newPassword:newPasswordRef.current.getValue()};
      await changePassword(requestForm);
      setStatus(AsyncStatus.SUCCESS);
      alert('비밀번호를 변경했습니다');
      navigate('/');
    } catch(err) {
      // 비밀번호를 변경에 실패한 경우 입력한 값들을 모두 지운다
      currentPasswordRef.current.setValue("")
      newPasswordRef.current.setValue("")
      currentPasswordRef.current.setValue("")
      setStatus(AsyncStatus.FAIL);
    }
  }

  if(status===AsyncStatus.SUBMITTING) return <LoadingSpinner />;

  return (
    <div>
      <h1>비밀번호 변경</h1>
      <div style={{height:400}}>
        <SignupInput name="password" ref={currentPasswordRef} type='password' />
        <SignupInput name="password" ref={newPasswordRef} type='password' />
        <ConfirmPasswordInput passwordRef={newPasswordRef} ref={confirmPasswordRef}  />
        {status===AsyncStatus.FAIL &&  <Alert variant='danger'>비밀번호를 변경하지 못했습니다</Alert>}
      </div>
      <BlockButton label="변 경" onClick={handleChangePassword} wait={status===AsyncStatus.SUBMITTING}/>
    </div>
  )
}

export default MemberChangePassword