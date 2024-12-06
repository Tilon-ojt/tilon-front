import styled from "styled-components";
import TheSearch from "../../../components/element/TheSearch";
import Btn from "../../../components/element/TheNewsButton";

// AdminNews 컴포넌트
function AdminNews() {
  return (
    <Container>
      <Header>
        <Title>News</Title>
        <TheSearch />
        <BtnContainer>
          <Btn type="NavigateN" label={"Create new News"}/>
          <Btn type="DeleteN" label={"Delete News"}/>
          {/* <Btn type="CancelN" label={"취소"}/> */}
        </BtnContainer>
      </Header>
      <List>
        {/* 리스트 항목을 추가할 영역 */}
      </List>
    </Container>
  );
}

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh; /* 화면을 꽉 채우도록 설정 */
  padding: 20px;
  box-sizing: border-box;

  margin-left: 300px;
  margin-top: 62px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70vw;
`;

const Title = styled.span`
  font-size: 2rem;
  color: #333;
  font-weight: bold;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const List = styled.div`
  height: 70vh;
  width: 70vw;
  margin-top: 50px;
  padding: 20px; 
  border: 1px solid lightgray;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff; 
`;

export default AdminNews;


