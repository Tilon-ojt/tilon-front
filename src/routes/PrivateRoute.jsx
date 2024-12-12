import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from "react";

/**
 * PrivateRoute는 로그인 상태를 확인하고, 인증된 사용자에게만 지정된 컴포넌트를 렌더링합니다.
 * props로 AccessToken 넘겨줌
 *
 * @param {Object} props - 컴포넌트가 받을 props.
 * @param {React.ReactElement} props.element - 로그인된 상태에서 렌더링할 React 컴포넌트.
 * @returns {React.ReactElement} - 인증 상태에 따라 렌더링되는 컴포넌트 또는 리다이렉트.
 */
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
