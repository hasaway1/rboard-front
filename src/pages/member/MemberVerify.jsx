import { useRef, useState } from "react";
import { AsyncStatus } from "../../utils/constants";
import CommonInput from "../../components/member/CommonInput";
import useSessionStore from "../../stores/useSessionStore";
import { Navigate, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import BlockButton from '../../components/common/BlockButton';
import { verifyCode } from "../../utils/memberApi";

function MemberVerify() {
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const {signupSuccess, setSignupSuccess } = useSessionStore();
  const navigate = useNavigate();
  const codeRef = useRef();

  const doVerifyCode=async()=>{
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);    
    try {
      console.log("111111111111111111111111")
      await verifyCode(codeRef.current.getValue());
      setStatus(AsyncStatus.IDLE);
      setSignupSuccess(false);
      navigate("/member/login");
      return;
    } catch(err) {
      setStatus(AsyncStatus.FAIL);
      console.log(err);
    }
  }

  //if(!signupSuccess) return <Navigate to="/" />
  
  return (
    <div>
      <div>
        <h1>확인코드를 인증하세요</h1>
        {status===AsyncStatus.FAIL && <Alert variant="danger">가입코드를 검증하지 못했습니다</Alert>} 
        {status===AsyncStatus.IDLE && <Alert variant="success">가입확인메일을 발송했습니다. 이메일을 확인하세요</Alert>} 
        <div>
          <CommonInput label="확인코드" message="확인코드를 입력하세요" ref={codeRef} />
          <BlockButton label="확인코드 인증" onClick={doVerifyCode} styleName='dark' />
        </div>
      </div>
    </div>
  )
}

export default MemberVerify