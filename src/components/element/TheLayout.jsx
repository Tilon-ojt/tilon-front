import styled from "styled-components";
import TheSearch from "../element/TheSearch";

const TheLayout = ({
  title, 
  hasSearch, 
  childrenBtn,
  childrenTable
}) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        {hasSearch ? (<TheSearch/>):(null)}
        <BtnContainer>{childrenBtn}</BtnContainer>
      </Header>
      <Body>{childrenTable}</Body>
    </Container>
  );
}

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  font-weight: bold;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;


const Body = styled.div`
  height: auto;
  width: 70vw;
  margin-top: 20px;
  margin-bottom: 60px;
`;


export default TheLayout;
