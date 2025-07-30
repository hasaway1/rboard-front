import { Button } from 'react-bootstrap'
import useAuthStore from '../../stores/useAuthStore';
import { erase } from '../../utils/commentApi';
import { mutate } from 'swr';

const CommentList = ({comments})=>{
	const {username} = useAuthStore();

	const remove=async (cno,pno)=>{
		try {
			const res = await erase(cno, pno);
			mutate(['pno', pno], (prevData) => ({...prevData, comments: res.data }), false);
		} catch(err) {
			console.log(err)
		}
	}

  return (
		<>
		{
			comments.map(comment=>{
				return (
					<div key={comment.cno}>
						<div className='upper'style={{display:"flex", justifyContent: "space-between"}}>
							<div>
								<strong>{comment.writer}</strong>&nbsp;&nbsp;
								{
									(comment.writer===username) && <Button variant="outline-danger" size="sm" onClick={()=>remove(comment.cno, comment.pno)}>삭제</Button>
								}			
							</div>
						<div>{comment.writeTime}</div>
						</div>
						<div className='lower'>{comment.content}</div>
						<hr />
					</div>	
				)			
			})
		}
		</>
  )
};

export default CommentList;