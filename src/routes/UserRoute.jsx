import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

function UserRoute({element}) {
  const {username, role} = useAuthStore();

  if(username===undefined) return; 
  if(username===null) return <Navigate to="/member/login" replace/>
  if(role!=='ROLE_USER') return <Navigate to="/e403" replace />
  return element;
}

export default UserRoute