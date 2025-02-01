import React from "react";
import { Navigate} from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";
const LoginRoute = ({children}) => {
  
  const token = useAuth().token;
  return !token ? children : <Navigate to="/"/>;
};
export default LoginRoute;
