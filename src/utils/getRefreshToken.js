/**
 * 쿠키에서 "refreshToken" 값을 추출하여 반환합니다.
 *
 * @returns {string | undefined} 쿠키에 저장된 "refreshToken" 값.
 *          해당 쿠키가 존재하지 않으면 `undefined`를 반환합니다.
 */
const getRefreshToken = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("refreshToken"))
    ?.split("=")[1];
};

export default getRefreshToken;
