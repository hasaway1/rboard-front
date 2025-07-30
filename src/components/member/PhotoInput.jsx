import { forwardRef, useImperativeHandle, useState } from "react";

const PhotoInput=forwardRef(({value="", read=true}, ref) =>{
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(value);

  const handleChange=(e)=>{
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }

  const getValue=()=>file;

  useImperativeHandle(ref, ()=>({ getValue}));

  return (
    <>
      {preview && <img src={preview} style={{ height: '200px', objectFit: 'cover' }} alt="미리보기" />}
      {!read && 
        <div className="mb-3 mt-3">
          <label className="form-label">프로필 사진:</label>
          <input type="file" className="form-control" onChange={handleChange} />
        </div>
      }
    </>
  )
});

export default PhotoInput;
