import { useRef, useState } from "react";
import { Alert } from "react-bootstrap";

import {signup} from '../../utils/memberApi';
import { AsyncStatus } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import useSessionStore from "../../stores/useSessionStore";
import PhotoInput from "../../components/member/PhotoInput";
import UsernameInput from "../../components/member/UsernameInput";
import SignupInput from "../../components/member/SignupInput";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ConfirmPasswordInput from "../../components/member/ConfirmPasswordInput";
import BlockButton from '../../components/common/BlockButton';


function MemberSignup() {
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const {setSignupSuccess} = useSessionStore();

  const navigate = useNavigate();
  const profileRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();


  const handleMemberSignup=async()=>{
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    const r1 = usernameRef.current.check();
    const r2 = passwordRef.current.check();
    const r3 = confirmPasswordRef.current.check();
    const r4 = emailRef.current.check();
    if (!(r1 && r2 && r3 && r4)) {
      setStatus(AsyncStatus.IDLE);
      return;
    }

    const formData = new FormData();
    formData.append('username', usernameRef.current.getValue());
    formData.append('password', passwordRef.current.getValue());
    formData.append('email', emailRef.current.getValue());
    formData.append('profile', profileRef.current.getValue());

    try {
      await signup(formData);
      setSignupSuccess(true);
      navigate("/member/verify");
      setStatus(AsyncStatus.IDLE);
      return;
    } catch(err) {
      setStatus(AsyncStatus.FAIL);
      console.log(err);
    }
  };

  if(status===AsyncStatus.SUBMITTING) return <LoadingSpinner />
  return (
    <>
      {status===AsyncStatus.FAIL &&  <Alert variant='danger'>회원 가입에 실패했습니다</Alert>}
      <PhotoInput ref={profileRef} read={false} />
      <UsernameInput ref={usernameRef} />
      <SignupInput name="email" ref={emailRef} />
      <SignupInput name="password" ref={passwordRef} type='password' />
      <ConfirmPasswordInput passwordRef={passwordRef} ref={confirmPasswordRef}  />
      <BlockButton label="회원 가입" onClick={handleMemberSignup} wait={status===AsyncStatus.SUBMITTING} />
    </>
  )
}

export default MemberSignup