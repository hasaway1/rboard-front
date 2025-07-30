const BlockButton = ({label, onClick, wait})=> {
  return (
    <div className='d-grid gap-3 mt-3 mb-3'>
      <button type='button' className='btn btn-outline-primary btn-block' onClick={onClick}>
        {wait && <span className="spinner-border spinner-border-sm"></span> }
        {label}
      </button>
    </div>
  )
};

export default BlockButton;
