import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"; // 올바른 import 확인

// 리프레쉬토큰 없는 버전
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
        // 서버에 리프레쉬토큰을 쿠키로 저장
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

// 리프레쉬 토큰 있는 버전
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { jwtDecode } from "jwt-decode";
// import api from "../api/axios";
// import { setToken } from "../../../reducer/authSlice";

// const useAuth = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);

//   console.log(`useAuth 실행: ${token}`);

//   useEffect(() => {
//     const checkToken = async () => {
//       if (!token) {
//         console.log("토큰이 null일 때");
//         alert("로그인이 필요합니다.");
//         navigate("/admin/login");
//         return;
//       }

//       try {
//         // JWT 디코딩
//         const decoded = jwtDecode(token);
//         const now = Date.now() / 1000;

//         if (decoded.exp < now) {
//           console.log("세션 만료됨. 리프레쉬 토큰 요청");

//           try {
//             // 서버에 리프레쉬 토큰 요청
//             const response = await api.post(
//               "/user/refresh-token",
//               {},
//               { withCredentials: true }
//             ); // withCredentials로 쿠키 전송
//             const { accessToken } = response.data;

//             // 새로운 액세스 토큰 Redux에 저장
//             dispatch(setToken(accessToken));
//           } catch (refreshError) {
//             console.error("리프레쉬 토큰 요청 실패:", refreshError);
//             alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
//             navigate("/admin/login");
//           }
//         }
//       } catch (error) {
//         console.error("JWT 디코딩 실패:", error);
//         alert("유효하지 않은 토큰입니다. 다시 로그인 해주세요.");
//         navigate("/admin/login");
//       }
//     };

//     checkToken();
//   }, [token, dispatch, navigate]);

//   return token; // 토큰 반환
// };

// export default useAuth;
