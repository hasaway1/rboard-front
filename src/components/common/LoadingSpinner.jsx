import { Spinner } from 'react-bootstrap';

const LoadingSpinner=()=>{
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: "600px"}} >
      <Spinner animation="border" role="status" />
    </div>
  );
}

export default LoadingSpinner;
