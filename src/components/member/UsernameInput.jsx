import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { idAvailable } from "../../utils/memberApi";

const UsernameInput = forwardRef((props, ref) =>{
  const myRef = useRef();
  const [message, setMessage] = useState(''); 

  const check=async ()=>{
    const inputValue= myRef.current.value;
    setMessage('');
    if(inputValue==='') {
      setMessage("아이디는 필수입력입니다");
      return false;
    } 
    if(!/^[0-9a-z]{6,10}$/.test(inputValue)) {
      setMessage("아이디는 소문자와 숫자 6~10자입니다");
      return false;
    } 
    try {
      await idAvailable(inputValue);
      return true;
    } catch (err) {
      setMessage("사용중인 아이디입니다");
      return false;
    }
  }

  const getValue=()=>myRef.current.value;

  const setValue=(param)=>myRef.current.value=param;

  useImperativeHandle(ref, () => ({ check, getValue, setValue}));

  return (
    <div className="mb-3 mt-3">
      <label className="form-label">아이디:</label>
      <input type='text' className="form-control" onBlur={check} ref={myRef} />
      {message!=='' && <span style={{color:'red'}}>{message}</span>}
    </div>
  )
});

export default UsernameInput;