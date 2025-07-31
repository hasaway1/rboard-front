import Swal from "sweetalert2";
import { Alert } from "react-bootstrap";
import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { verifyCode } from "../../utils/memberApi";
import { AsyncStatus } from "../../utils/constants";
import useSessionStore from "../../stores/useSessionStore";
import CommonInput from "../../components/member/CommonInput";
import BlockButton from '../../components/common/BlockButton';

function MemberVerify() {
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const {signupSuccess, setSignupSuccess } = useSessionStore();
  const navigate = useNavigate();
  const codeRef = useRef();

  const doVerifyCode=async()=>{
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);    
    try {
      await verifyCode(codeRef.current.getValue());
      setSignupSuccess(false);
      navigate("/member/login");
    } catch(err) {
      Swal.fire({icon:'error', text:"잘못된 가입확인코드입니다" });
    } finally {
      setStatus(AsyncStatus.IDLE);
    }
  }

  if(!signupSuccess) return <Navigate to="/" />
  
  return (
    <div>
      <div>
        {status===AsyncStatus.IDLE && <Alert variant="success">가입확인메일을 발송했습니다. 이메일을 확인하세요</Alert>} 
        <div>
          <CommonInput label="확인코드" message="확인코드를 입력하세요" ref={codeRef} />
          <BlockButton label="확인코드 인증" onClick={doVerifyCode} styleName='dark' wait={status===AsyncStatus.SUBMITTING} />
        </div>
      </div>
    </div>
  )
}

export default MemberVerify