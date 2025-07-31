import './PostWrite.css';
import 'react-quill-new/dist/quill.snow.css';

import useSWR from 'swr';
import Swal from "sweetalert2";
import { Alert } from 'react-bootstrap';
import ReactQuill from "react-quill-new";
import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

import { read, update } from '../../utils/postApi';
import useAuthStore from '../../stores/useAuthStore';
import { convertToInt } from '../../utils/constants';
import { AsyncStatus, modules } from '../../utils/constants';
import CommonInput from '../../components/member/CommonInput';
import BlockButton from "../../components/common/BlockButton";

function PostUpdate() {
  // 1. 작성 상태, 제목 커스텀 훅, 내용 상태, 라우팅, 로그인 객체 
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const [content, setContent] = useState('');
  const titleRef = useRef();

  const navigate = useNavigate();
  const username = useAuthStore(state=>state.username);
 
  // 2. pno 파라미터를 읽어와 post를 fetch
  const [params] = useSearchParams();
  let pno = convertToInt(params.get('pno'), null);
  const {data, error, isLoading } = useSWR(['pno', pno], ()=>read(pno));

  // 3. 파생 상태 : 작성자 여부
  const isSubmitting = status === AsyncStatus.SUBMITTING;
  const isWriter = data && username && data.writer === username;

  // 4. 변경할 수 있는 제목과 내용 상태를 변경
  useEffect(() => {
    if (data) {
      titleRef.current.setValue(data.title);
      setContent(data.content);
    }
  }, [data]);

  // 5. 글 변경
  const doUpdatePost =async()=>{
    if (isSubmitting) return;
    setStatus(AsyncStatus.SUBMITTING);

    if (!titleRef.current.check()) {
      setStatus(AsyncStatus.IDLE);
      return;
    }
    
    try {
      const requestForm = {title:titleRef.current.getValue(), content:content, pno:pno};
      await update(requestForm);
      navigate(`/post/read?pno=${pno}`);
    } catch(err) {
      Swal.fire({icon:'error', text:"댓글을 작성하지 못했습니다"});
    } finally {
      setStatus(AsyncStatus.IDLE)
    }
  }

  // 6.  조건 렌더링(conditional rendering)
  if (!pno) return <Navigate to="/" replace />;
  if(error) return <Alert variant='danger'>서버가 응답하지 않습니다</Alert>
  if(!isWriter) return <Navigate to="/" replace />;

  return (
    <>
      <CommonInput label="제목" ref={titleRef} />
      <ReactQuill theme="snow" name="content" module={modules} value={content} onChange={(value)=>setContent(value)}/>
      <BlockButton label="변 경" onClick={doUpdatePost} wait={isSubmitting} />
    </>
  )
}

export default PostUpdate