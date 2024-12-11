const getRefreshToken = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("refreshToken"))
    ?.split("=")[1];
};

export default getRefreshToken;
