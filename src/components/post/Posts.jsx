import { Link } from 'react-router-dom';
import styles from './Posts.module.css';

const Posts=({posts})=>{
  return (
    <table className='table table-hover'>
      <thead>
        <tr>
          <th>번호</th><th>제목</th><th>작성자</th><th>작성일</th><th>읽기</th>
        </tr>
      </thead>
      <tbody>
        {
          posts.map(post=>{
            return (
              <tr key={post.pno}>
                <td className={styles.pno}>{post.pno}</td>
                <td className={styles.title}>
                  <Link to={`/post/read?pno=${post.pno}`}>{post.title}</Link>
                </td>
                <td className={styles.writer}>{post.writer}</td>
                <td className={styles.writeTime}>{post.writeTime}</td>
                <td className={styles.readCnt}>{post.readCnt}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
};

export default Posts;
