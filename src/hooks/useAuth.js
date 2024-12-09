import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"; // 올바른 import 확인

const useAuth = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  console.log(`useAuth 실행: ${token}`);

  useEffect(() => {
    if (!token) {
      console.log(`토큰이 null일떄`);

      alert("로그인이 필요합니다.");
      navigate("/admin/login");
      return;
    }

    try {
      // JWT 디코딩
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("JWT 디코딩 실패:", error);
      alert("유효하지 않은 토큰입니다. 다시 로그인 해주세요.");
      navigate("/admin/login");
    }
  }, [token, navigate]);

  return token; // 토큰 반환
};

export default useAuth;
