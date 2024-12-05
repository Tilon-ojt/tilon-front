import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {

    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/admin/login');
      return;
    }

    // JWT 디코딩 및 만료 시간 확인
    const decodedToken = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decodedToken.exp < now) {
      alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
      navigate('/admin/login');
    }
  }, [token, navigate]);
};

export default useAuth;
