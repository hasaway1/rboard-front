import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

const Paginations = ({pagination}) => {
  const {prev,start,end,next,pageno} = pagination;
  const navigate = useNavigate();

  // 파생속성
  const pages = [];
  for (let i = start; i <= end; i++)
    pages.push(i);

  return (
    <Pagination style={{justifyContent:'center'}} className="mt-5">
      {prev > 0 && <Pagination.Item onClick={() => navigate(`/?pageno=${prev}`)}>이전으로</Pagination.Item>}
      {
        pages.map(i => (<Pagination.Item key={i} active={pageno === i} onClick={()=>navigate(`/?pageno=${i}`)}>{i}</Pagination.Item>))
      }
      {next > 0 && <Pagination.Item onClick={()=>navigate(`/?pageno=${next}`)}>다음으로</Pagination.Item>}
    </Pagination>
  );
};

export default Paginations;
