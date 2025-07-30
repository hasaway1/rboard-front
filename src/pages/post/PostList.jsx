import { useSearchParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import useSWR from 'swr';

import LoadingSpinner from "../../components/common/LoadingSpinner";
import Posts from "../../components/post/Posts";
import Paginations from '../../components/post/Paginations';
import { readAll } from '../../utils/postApi';
import { convertToInt } from '../../utils/constants';



function PostList() {
  const [params] = useSearchParams();
  let pageno = convertToInt(params.get('pageno'), 1);
  const {data, error, isLoading } = useSWR(['posts', pageno], ()=>readAll(pageno));

  if(isLoading) return <LoadingSpinner />
  if(error) return <Alert variant='danger'>서버가 응답하지 않습니다</Alert>
  
  const { posts, ...pagination } = data;

  return (
    <div>
      <Posts posts={posts} />
      <Paginations pagination={pagination} />
    </div>
  )
}

export default PostList