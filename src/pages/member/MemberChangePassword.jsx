import Swal from "sweetalert2";
import { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { AsyncStatus } from '../../utils/constants';
import {changePassword} from '../../utils/memberApi';
import SignupInput from '../../components/member/SignupInput';
import BlockButton from '../../components/common/BlockButton';
import ConfirmPasswordInput from '../../components/member/ConfirmPasswordInput';

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
      Swal.fire({icon:'success', text:"비밀번호를 변경했습니다" }).then(()=>navigate('/'));
    } catch(err) {
      Swal.fire({icon:'error', text:"비밀번호를 변경하지 못했습니다" });
      currentPasswordRef.current.setValue("")
      newPasswordRef.current.setValue("")
      currentPasswordRef.current.setValue("")
    } finally {
      setStatus(AsyncStatus.IDLE);
    }
  }

  return (
    <div>
      <h1>비밀번호 변경</h1>
      <SignupInput name="password" ref={currentPasswordRef} type='password' />
      <SignupInput name="password" ref={newPasswordRef} type='password' />
      <ConfirmPasswordInput passwordRef={newPasswordRef} ref={confirmPasswordRef}  />
      <BlockButton label="변 경" onClick={handleChangePassword} wait={status===AsyncStatus.SUBMITTING}/>
    </div>
  )
}

export default MemberChangePassword