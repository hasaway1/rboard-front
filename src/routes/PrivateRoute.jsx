import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const PrivateRoute = ({ element }) => {
  const username = useAuthStore(state=>state.username);

  if (username === undefined) 
    return; 

  return username ? element : <Navigate to="/member/login" replace />;
};

export default PrivateRoute;