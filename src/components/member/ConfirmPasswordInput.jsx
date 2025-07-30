import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const ConfirmPasswordInput = forwardRef(({passwordRef}, ref) =>{
  const myRef = useRef();
  const [message, setMessage] = useState(''); 

  const check=(p)=>{
    const inputValue= myRef.current.value;
    setMessage('');
    if(inputValue==='') {
      setMessage('새비밀번호는 필수입력입니다');
      return false;
    } 
    if(inputValue!==passwordRef.current.getValue()) {
      setMessage('새비밀번호가 일치하지 않습니다');
      return false;
    }
    return true;
  }

  const getValue=()=>myRef.current.value;

  const setValue=(param)=>myRef.current.value=param;

  useImperativeHandle(ref, () => ({ check, getValue, setValue}));

  return (
    <div className="mb-3 mt-3">
      <label className="form-label">비밀번호 확인:</label>
      <input type='password' className="form-control" onBlur={check} ref={myRef} />
      {message!=='' && <span style={{color:'red'}}>{message}</span>}
    </div>
  )
});

export default ConfirmPasswordInput;