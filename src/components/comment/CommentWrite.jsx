import { mutate } from "swr";
import Swal from "sweetalert2";
import { useRef, useState } from 'react';

import { add } from '../../utils/commentApi';
import { Button, Form } from 'react-bootstrap'
import { AsyncStatus } from '../../utils/constants';

const CommentWrite=({pno})=>{
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const contentRef = useRef();

  const doWrite = async(pno)=>{
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);
    const requestForm =  {pno: pno, content:contentRef.current.value};
    try {
      const res = await add(requestForm);
      mutate(['pno', pno], (prevData) => ({...prevData, comments: res.data }), false);
      contentRef.current.value="";
    } catch(err) {
      Swal.fire({icon:'error', text:"댓글을 작성하지 못했습니다"});
    } finally {
      setStatus(AsyncStatus.IDLE);
    }
  };

  const check=()=>{
    setMessage('');
    if(contentRef.current.value) {
      setMessage('필수입력입니다');
      return true;
    }
    return false;
  };

  return (
    <>
      <hr />
      <Form.Group className="mb-3">
        <Form.Label>댓글 작성:</Form.Label>
        <Form.Control as="textarea" rows={5} style={{resize: 'none'}} onBlur={check} ref={contentRef} placeholder={message} />
      </Form.Group>
      <div style={{display:'flex', justifyContent:'right'}} >
        <Button variant='primary' onClick={()=>doWrite(pno)}>작성하기</Button>
      </div>
      <hr />
    </>
  )
};

export default CommentWrite;