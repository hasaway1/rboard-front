import { Alert } from 'react-bootstrap';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {login} from '../../utils/authApi'
import { AsyncStatus } from '../../utils/constants';
import useAuthStore from '../../stores/useAuthStore';
import SignupInput from '../../components/member/SignupInput';
import BlockButton from '../../components/common/BlockButton';

function MemberLogin() {
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const [result, setResult] = useState(0);
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
      // 로그인에 성공하면 store에 아이디를 업데이트한 다음 /경로로 이동
      const response = await login(requestForm);
      setLogin(response.data);
      setStatus(AsyncStatus.IDLE);
      navigate("/");
      return;
    } catch(err) {
      setStatus(AsyncStatus.FAIL);
      setResult(err.status);
      console.log(err);
    } 
  };
  
  return (
    <div>
      <h1>로그인</h1>
      <div style={{height:300}}>
        <SignupInput name="username" ref={usernameRef} />
        <SignupInput name="password" ref={passwordRef} type='password' />
        {(status===AsyncStatus.FAIL && result===401) && <Alert variant='danger'>로그인 실패 : 이메일 또는 비밀번호를 다시 확인하세요.</Alert>}
        {(status===AsyncStatus.FAIL && result===403) && <Alert variant='danger'>로그인 실패 : 확인되지 않은 계정입니다. 이메일을 확인하세요.</Alert>}
      </div>
      <BlockButton label="로그인" onClick={doLogin} wait={status===AsyncStatus.SUBMITTING} />
    </div>
  )
}

export default MemberLogin