import useAuth from "../hooks/useAuth"; // 커스텀 훅
import React from "react";

const PrivateRoute = ({ element }) => {
  const token = useAuth();

  // 문제없을경우 토큰을 넘겨준다.
  return element ? React.cloneElement(element, { token }) : null;
};

export default PrivateRoute;
