import { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import {findUsername} from '../../utils/memberApi';
import { AsyncStatus } from "../../utils/constants";
import SignupInput from '../../components/member/SignupInput';
import BlockButton from '../../components/common/BlockButton';


function MemberFindUsername() {
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const [username, setUsername] = useState('');
  const emailRef = useRef();

  const handleFindUsername=async ()=>{ 
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    if (!emailRef.current.check()) {
      setStatus(AsyncStatus.IDLE);
      return;
    }

    try {
      const response = await findUsername(emailRef.current.getValue());
      setUsername(response.data);
      setStatus(AsyncStatus.SUCCESS);
    } catch(err) {
      setStatus(AsyncStatus.FAIL);
      console.log(err);
    }
  }

  return (
    <div>
      <h1>아이디 찾기</h1>
      <div style={{height:200}}>
        <SignupInput name="email" ref={emailRef} />
        {status===AsyncStatus.SUCCESS &&  <Alert variant='success'>당신의 아이디 : {username}</Alert>}
        {status===AsyncStatus.FAIL && <Alert variant='danger'>아이디를 찾지 못했습니다</Alert>}
      </div>
      <BlockButton label="아이디 찾기" onClick={handleFindUsername} wait={status===AsyncStatus.SUBMITTING} />
    </div>
  )
}

export default MemberFindUsername