import styled from "styled-components";

// AdminLogin 컴포넌트
function AdminMain() {
  return (
    <Container>
      <Title>AdminXXXX</Title>
    </Container>
  );
}


// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;  /* 화면을 꽉 채우도록 설정 */
  margin-left:300px;
  margin-top:62px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0;  /* 기본 margin을 없애기 위한 설정 */
`;
export default AdminMain;
