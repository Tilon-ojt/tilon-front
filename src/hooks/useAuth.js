// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { jwtDecode } from "jwt-decode"; // 올바른 import 확인

// 리프레쉬토큰 없는 버전
// const useAuth = () => {
//   const navigate = useNavigate();
//   const token = useSelector((state) => state.auth.token);

//   console.log(`useAuth 실행: ${token}`);

//   useEffect(() => {
//     if (!token) {
//       console.log(`토큰이 null일떄`);

//       navigate("/admin/login");
//       alert("로그인이 필요합니다.");
//       return;
//     }

//     try {
//       // JWT 디코딩
//       const decoded = jwtDecode(token);
//       const now = Date.now() / 1000;

//       if (decoded.exp < now) {
//         alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
//         // 서버에 리프레쉬토큰을 쿠키로 저장
//         navigate("/admin/login");
//       }
//     } catch (error) {
//       console.error("JWT 디코딩 실패:", error);
//       alert("유효하지 않은 토큰입니다. 다시 로그인 해주세요.");
//       navigate("/admin/login");
//     }
//   }, []);

//   return token; // 토큰 반환
// };

// export default useAuth;

// 리프레쉬 토큰 있는 버전 (쿠키 사용)
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";
import { setToken } from "../reducer/authSlice";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  console.log(`useAuth 실행: ${token}`);

  // 리프레시 토큰을 쿠키에서 가져오는 함수
  const getRefreshToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookie="))
      ?.split("=")[1];
  };

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

        navigate("/admin/news"); // 새로운 토큰 발급 후 관리자 홈으로 이동
      }
    } catch (refreshError) {
      console.error("리프레쉬 토큰 요청 실패:", refreshError);
      alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
      sessionStorage.removeItem("jwt");
      document.cookie =
        "cookie=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      navigate("/admin/login");
    }
  };

  return token; // 토큰 반환
};

export default useAuth;

// 리프레쉬 토큰 있는 버전 (세션 사용)
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { jwtDecode } from "jwt-decode";
// import api from "../api/axios";
// import { setAccessToken, setRefreshToken } from "../reducer/authSlice";
// import store from "../store";

// const useAuth = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const AccessToken = useSelector((state) => state.auth.AccessToken);
//   const RefreshToken = useSelector((state) => state.auth.RefreshToken);

//   useEffect(() => {
//     const checkToken = async () => {
//       if (!AccessToken) {
//         console.log("토큰이 null일 때");
//         alert("로그인이 필요합니다.");
//         navigate("/admin/login");
//         return;
//       }

//       try {
//         // JWT 디코딩
//         const decoded = jwtDecode(AccessToken);
//         const now = Date.now() / 1000;

//         if (decoded.exp < now) {
//           console.log("기간 만료됨. 리프레쉬 토큰 요청");

//           try {
//             // 서버에 리프레쉬 토큰 요청
//             const response = await api.post("/auth/refresh-token", null, {
//               headers: {
//                 "Refresh-Token": RefreshToken, // 파싱된 리프레시 토큰 값 사용
//               },
//             });

//             if (response.status === 200) {
//               const { accessToken, refreshToken } = response.data;
//               // 세션에 엑세스토큰 저장
//               dispatch(setAccessToken(accessToken)); // Redux 상태에 저장
//               console.log(
//                 "Redux 상태 확인:",
//                 store.getState().auth.accessToken
//               ); // 상태 확인

//               // 세션에 리프레쉬 토큰 저장
//               dispatch(setRefreshToken(refreshToken));
//               console.log("refreshToken:", store.getState().auth.refreshToken); // 상태 확인

//               navigate("/admin/news"); // 새로운 토큰 발급 후 관리자 홈으로 이동
//             }
//           } catch (refreshError) {
//             console.error("리프레쉬 토큰 요청 실패:", refreshError);
//             alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
//             sessionStorage.removeItem("jwt");
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
//   }, [AccessToken, dispatch, navigate]);

//   return AccessToken; // 토큰 반환
// };

// export default useAuth;
