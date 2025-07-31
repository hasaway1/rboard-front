import Swal from "sweetalert2";
import useSWR, { mutate } from "swr";
import { Alert } from "react-bootstrap";
import { useRef, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';

import { AsyncStatus } from "../../utils/constants";
import useSessionStore from "../../stores/useSessionStore";
import { changeProfile, read } from '../../utils/memberApi';
import PhotoInput from "../../components/member/PhotoInput";
import LoadingSpinner from '../../components/common/LoadingSpinner';

function MemberRead() {
  const {passwordVerified} = useSessionStore();
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const [hasProfile, setHasProfile] = useState(false);
  const profileRef = useRef();
  const navigate = useNavigate();

  // 훅 조건부 실행
  // - 비밀번호를 확인되지 않는 경우 -> 저 아래 57라인에서 /member/check-password로 이동되지만, 그 전에 useSWR API 호출이 먼저 실행된다
  // - useSWR 훅은 키를 null로 지정할 경우  훅을 실행하지 않는다
  const { data, error, isLoading } = useSWR(passwordVerified ? ['me'] : null, () => read());

  const selectProfile=()=>{
    setHasProfile(true);
  }

  const doChangeProfile=async()=>{
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    if(!profileRef.current.getValue()) {
      setStatus(AsyncStatus.IDLE);
      return;
    }
    try {
      const formData = new FormData();
      formData.append('profile', profileRef.current.getValue());
      const {data} = await changeProfile(formData);
      // 부모의 swr 캐시를 갱신
      mutate('me', data, false);
      profileRef.current.setValue();
      Swal.fire({icon:'success', text:"프사를 변경했습니다" });
    } catch(err) {
      Swal.fire({icon:'error', text:"프사를 변경하지 못했습니다" });
    } finally {
       setStatus(AsyncStatus.IDLE);
    }
  }
  
  if(!passwordVerified) return <Navigate to="/member/check-password" replace />
  if(isLoading)  return <LoadingSpinner />;
  if(error) return <Alert variant='danger'>서버가 응답하지 않습니다</Alert>;
  
  return (
    <div>
      <table className='table table-border'>
        <tbody>
          <tr>
            <td colSpan={2}>
              <PhotoInput ref={profileRef} value={data.profile} onChange={selectProfile} />
              <button className='btn btn-primary' onClick={doChangeProfile} disabled={!hasProfile}>프사 변경</button>
            </td>
          </tr>
          <tr>
            <td>아이디</td>
            <td>{data.username}</td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>{data.email}</td>
          </tr>
          <tr>
            <td>레벨</td>
            <td>{data.level}</td>
          </tr>
          <tr>
            <td>가입입</td>
            <td>{`${data.joinday} (${data.days}일)`}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button className='btn btn-success' onClick={()=>navigate('/member/change-password')}>비밀번호 변경으로</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MemberRead