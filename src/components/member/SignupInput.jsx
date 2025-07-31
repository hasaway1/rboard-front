import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Patterns } from "../../utils/constants";

const SignupInput = forwardRef(({name="", type='text'}, ref) =>{
  const myRef = useRef();
  const [message, setMessage] = useState(''); 

  const check=()=>{
    const inputValue= myRef.current.value;
    setMessage('');
    if(inputValue==='') {
      setMessage(Patterns[name].emptyMessage);
      return false;
    } 
    if(name && !Patterns[name].regexp.test(inputValue)) {
      setMessage(Patterns[name].patternMessage);
      return false;
    } 
    return true;
  }

  const getValue=()=>myRef.current.value;

  const setValue=(param)=>myRef.current.value=param;

  // 자식 컴포넌트가 부모로부터 받은 ref에 대해, 어떤 값이나 메서드를 노출할지 사용자 정의
  // 부모 -> 자식: ref 전달
  // 자식 -> 부모: ref.current를 통해 특정 기능이나 상태 노출
  useImperativeHandle(ref, () => ({ check, getValue, setValue}));

  return (
    <div className="mb-3 mt-3">
      <label className="form-label">{Patterns[name].label}:</label>
      <input type={type} className="form-control" onBlur={check} ref={myRef} />
      {message!=='' && <span style={{color:'red'}}>{message}</span>}
    </div>
  )
});

export default SignupInput;