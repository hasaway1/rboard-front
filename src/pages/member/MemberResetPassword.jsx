import { useRef, useState } from "react";
import { Alert } from "react-bootstrap";

import { AsyncStatus } from "../../utils/constants";
import { resetPassword } from "../../utils/memberApi";
import SignupInput from '../../components/member/SignupInput';
import BlockButton from '../../components/common/BlockButton';

function MemberResetPassword() {
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const usernameRef = useRef();

  const handleResetUsername=async ()=>{
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    if (!vUsername.check()) {
      setStatus(AsyncStatus.IDLE);
      return;
    }

    try {
      await resetPassword(vUsername.value);
      setStatus(AsyncStatus.SUCCESS);
    } catch(err) {
      setStatus(AsyncStatus.FAIL);
    }
  }

  return (
    <div>
      <h1>비밀번호 찾기</h1>
      <p>&#x2714; 비밀번호의 경우 암호화 저장되어 분실 시 찾아드릴 수 없는 정보 입니다.</p>
      <p>&#x2714; 본인 확인을 통해 비밀번호를 재설정 하실 수 있습니다.</p>
      {status===AsyncStatus.SUCCESS &&  <Alert variant='success'>임시비밀번호를 가입 이메일로 보냈습니다</Alert>}
      {status===AsyncStatus.FAIL && <Alert variant='danger'>사용자 정보를 확인하지 못했습니다</Alert>}
      <SignupInput name="username" ref={usernameRef} />
      <BlockButton label="비밀번호 찾기" onClick={handleResetUsername} wait={status===AsyncStatus.SUBMITTING} />
    </div>
  )
}

export default MemberResetPassword