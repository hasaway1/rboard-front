import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const PublicRoute = ({ element }) => {
  const { username} = useAuthStore();

  return username ? <Navigate to="/" replace /> : element;
};

export default PublicRoute;