import styled from "styled-components";
import TheInput from "../../../components/element/TheInput";

// AdminLogin 컴포넌트
function AdminNews() {
  return (
    <Container>
      <Header>
        <Title>News</Title>
        <TheInput/>
      </Header>
      <List></List>
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

const Header = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align=content: center;
  padding: 10px 20px;
  border: 1px solid red;
  gap: 20px;
`;

const Title = styled.span`
  font-size: 2rem;
  color: #333;
`;


const List = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align=content: center;
  padding: 10px 20px;
  border: 1px solid red;
  gap: 20px;
`;

export default AdminNews;
