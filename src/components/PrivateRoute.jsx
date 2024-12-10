import useAuth from "../hooks/useAuth"; // 커스텀 훅
import React from "react";

import { Navigate } from "react-router-dom";
const PrivateRoute = ({ element }) => {
  const token = useAuth();

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // 토큰이 유효하면 element 렌더링
  return React.cloneElement(element, { token });
};

export default PrivateRoute;
