import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const CommonInput = forwardRef(({label, type='text'}, ref) =>{
  const myRef = useRef();
  const [message, setMessage] = useState(''); 

  const check=()=>{
    const inputValue= myRef.current.value;
    setMessage('');
    if(inputValue==='') {
      setMessage(message);
      return false;
    } 
    return true;
  }

  const getValue=()=>myRef.current.value;

  const setValue=(param)=>myRef.current.value=param;

  useImperativeHandle(ref, () => ({ check, getValue, setValue}));

  return (
    <div className="mb-3 mt-3">
      <label className="form-label">{label}:</label>
      <input type={type} className="form-control" onBlur={check} ref={myRef} />
      {message!=='' && <span style={{color:'red'}}>{message}</span>}
    </div>
  )
});

export default CommonInput;
