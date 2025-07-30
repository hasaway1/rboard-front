import 'react-quill-new/dist/quill.snow.css';
import './PostWrite.css';

import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';

import BlockButton from '../../components/common/BlockButton';
import {add} from '../../utils/postApi';
import { AsyncStatus, modules } from '../../utils/constants';
import CommonInput from '../../components/member/CommonInput';

function PostWrite() {
  // 1. 필요한 기능 가져오기(작성 상태, 제목 커스텀 훅, 내용 상태, 라우팅)
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const [content, setContent] = useState('');
  const titleRef = useRef();
  const navigate = useNavigate();

  // 2. 파생 속성 : 글 작성 처리 중?
  const isSubmitting = status === AsyncStatus.SUBMITTING;

  const handleWritePost =async()=>{
    // 3.1 처리 중이면 작업 중지 → 처리 중으로 상태 변경
    if(isSubmitting) return;
    setStatus(AsyncStatus.SUBMITTING);

    // 3.2 제목 검증
    if (!titleRef.current.check()) {
      setStatus(AsyncStatus.IDLE);
      return;
    }

    // 3.3 글 작성 처리
    const requestForm = {title:titleRef.current.getValue(), content:content};
    try {
      const response = await add(requestForm);
      setStatus(AsyncStatus.SUCCESS);
      navigate(`/post/read?pno=${response.data.pno}`);
    } catch(err) {
      setStatus(AsyncStatus.FAIL);
    }
  }

  return (
    <>
      <CommonInput label="제목" ref={titleRef} />
      <ReactQuill theme="snow" name="content" modules={modules}  value={content} onChange={(value)=>setContent(value)}/>
      <BlockButton label="글쓰기" onClick={handleWritePost} wait={status===AsyncStatus.SUBMITTING} />
    </>
  )
}

export default PostWrite