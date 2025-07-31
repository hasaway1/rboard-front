import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const PhotoInput=forwardRef(({value="", onChange}, ref) =>{
  const myRef = useRef();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(value);

  const handleChange=(e)=>{
    const selectedFile = e.target.files[0];
    if(!selectedFile) 
      return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    // 부모에게 알림
    onChange?.(); 
  }

  const getValue=()=>file;

  const setValue=()=>{
    myRef.current.value="";
    setFile(null);
  }

  useImperativeHandle(ref, ()=>({ getValue, setValue}));

  return (
    <>
      {preview && <img src={preview} style={{ height: '200px', objectFit: 'cover' }} alt="미리보기" />}
      <div className="mb-3 mt-3">
        <label className="form-label">프로필 사진:</label>
        <input type="file" className="form-control" onChange={handleChange} ref={myRef} />
      </div>
    </>
  )
});

export default PhotoInput;
