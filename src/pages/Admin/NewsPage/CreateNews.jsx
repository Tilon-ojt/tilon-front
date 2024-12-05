import styled from "styled-components";
import TheButtonAdd from "../../../components/element/TheButtonAddEdit";
import TheButtonSubmit from "../../../components/element/TheButtonSubmit";
import TheButtonCancel from "../../../components/element/TheButtonCancel";

// AdminNews 컴포넌트
function CreateNews() {
  return (
    <Container>
      <Header>
        <Title>CreateNews</Title>
      </Header>
      <List>
        {/* 리스트 항목을 추가할 영역 */}
      </List>

      <Btn>
        <TheButtonAdd title={"수정하기"} link={"/admin/news/edit"}/>
        <TheButtonSubmit title={"저장"}/>
        <TheButtonSubmit title={"수정완료"}/>
        <TheButtonCancel link={"/admin/news"}/>
      </Btn>
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

const Btn = styled.div`
  display: flex;
  flex-direction: row;
  gap:20px;
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

export default CreateNews;
