import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth"; // 커스텀 훅
import React from "react";

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const decodedToken = useAuth(); // 디코딩된 토큰 데이터

  if (!token) {
    navigate("/admin/login");
    return null;
  }

  if (decodedToken && decodedToken.exp < Date.now() / 1000) {
    alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
    navigate("/admin/login");
    return null;
  }

  // 로그인 상태일 경우 페이지 렌더링 (디코딩된 토큰도 함께 넘김)
  return element ? React.cloneElement(element, { decodedToken }) : null;
};

export default PrivateRoute;
