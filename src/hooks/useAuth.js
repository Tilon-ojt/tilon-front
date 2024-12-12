// 리프레쉬 토큰 있는 버전 (쿠키 사용)
import getRefreshToken from "../utils/getRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../reducer/authSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import api from "../api/axios";

/**
 *
 * @returns 로그인된 상태인지 체크, 엑세스토큰 만료시간 확인, 리프레시 요청
 */
const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const location = useLocation(); // 현재 경로 정보 가져오기

  // console.log(`useAuth 실행: ${token}`);

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        console.log("토큰이 null일 때");
        alert("로그인이 필요합니다.");
        navigate("/admin/login");
        return;
      }

      // JWT 디코딩
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        console.log("기간 만료됨. 리프레쉬 토큰 요청");
        refreshTokenCall();
      }
    };

    checkToken();
  }, [token, dispatch, navigate]);

  const refreshTokenCall = async () => {
    // 리프레시 토큰을 쿠키에서 가져오는 함수
    const refreshtoken = getRefreshToken();
    console.log(`가지고있는 쿠키: ${refreshtoken}`);
    try {
      // 서버에 리프레쉬 토큰 요청
      const response = await api.post("/auth/refresh-token", null, {
        headers: {
          "Refresh-Token": refreshtoken, // 파싱된 리프레시 토큰 값 사용
        },
      });

      if (response.status === 200) {
        const { accessToken } = response.data;

        // 새로운 액세스 토큰 Redux에 저장
        dispatch(setToken(accessToken));
        // console.log(`토큰이 생성되려고하는지 확인해봐야함!!`);

        // 현재 페이지로 리다이렉트
        navigate(location.pathname); // 현재 페이지로 리다이렉트
      }
    } catch (refreshError) {
      console.error("리프레쉬 토큰 요청 실패:", refreshError);
      alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
      sessionStorage.removeItem("jwt");
      document.cookie =
        "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      navigate("/admin/login");
    }
  };

  return token; // 토큰 반환
};

export default useAuth;
