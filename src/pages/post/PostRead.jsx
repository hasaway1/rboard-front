import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import useSWR from 'swr';

import useAuthStore from '../../stores/useAuthStore';
import { erase, read} from '../../utils/postApi';
import { convertToInt } from '../../utils/constants';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import CommentList from '../../components/comment/CommentList';
import GoodButton from '../../components/post/GoodButton';
import CommentWrite from '../../components/comment/CommentWrite';

function PostRead() {
  // 1. 필요한 기늠 가져오기(라우팅, 커스텀훅, 로그인 이름)
  const navigate = useNavigate();
  const username = useAuthStore(state=>state.username);
  
  // 2. pno 파라미터를 읽어와 post를 fetch
  const [params] = useSearchParams();
  let pno = convertToInt(params.get('pno'), null);
  const {data, error, isLoading } = useSWR(['pno', pno], ()=>read(pno));

  // 3. 로그인 여부 및 작성자 여부를 나타내는 파생 상태(derived state)
  const isLogin = username!==undefined && username!==null;
  const isWriter = data && username && data.writer === username;

  // 4. 삭제 버튼 핸들러
  const handleDeletePost=()=>erase(pno).then(()=>navigate("/")).catch(()=>alert('삭제하지 못했습니다'));

  // 5.  조건 렌더링(conditional rendering)
  if (!pno) return <Navigate to="/" replace />;
  if(isLoading)  return <LoadingSpinner />;
  if(error) return <Alert variant='danger'>선택하신 게시물이 존재하지 않습니다</Alert>;

  return (
    <>
      <div className="read-title mb-2">{data.title}</div>
      <div className="mb-3" style={{display:'flex', justifyContent:'space-between'}}>
        <div>
          <span className='read-value'>{data.writer}</span>
          <span className='read-value'> | </span>
          <span className="read-key">글번호 </span>
          <span className='read-value'>{data.bno}</span>
          <span className='read-value'> | </span>
          <span className='read-value'>{data.writeTime}</span>
          <span className='read-value'> | </span> 
          <span className="read-key">조회 </span>
          <span className='read-value'>{data.readCnt}</span>
          <span className='read-value'> | </span> 
          <span className="read-key">추천 </span>
          <span className='read-value'>{data.goodCnt}</span>
        </div>
        { (isLogin && !isWriter) &&  <GoodButton pno={pno} goodCnt={data.goodCnt}>좋아요</GoodButton> }
      </div>

      <div style={{minHeight:"600px", backgroundColor:'#f1f1f1', padding:'5px', overflow:'auto'}} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content) }} />
      {
        isWriter &&
        <div className='mt-3 mb-3'>
          <Button variant="success" onClick={()=>navigate(`/post/update?pno=${pno}`)} className="me-3">변경으로</Button>
          <Button variant="danger" onClick={handleDeletePost}>삭제하기</Button>
        </div>
      }

      <div className='mt-3 mb-3'>
        { isLogin && <CommentWrite pno={pno} /> }
        <CommentList comments={data.comments} />
      </div>
    </>
  )
}

export default PostRead