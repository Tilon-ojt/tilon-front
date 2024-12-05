import styled from "styled-components";

// AdminLogin 컴포넌트
function AdminNews() {
  return (
    <Container>
      <Title>News</Title>
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
  font-size: 2rem;
  color: #333;
  display:flex;
  padding: 20px;
  border: 1px solid red;
`;
export default AdminNews;
