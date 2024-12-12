import styled from "styled-components";

const TheLayout = ({
  title, 
  children,
  childrenBtn
}) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
      <ContentContainer>{children}</ContentContainer>
      <BtnContainer>{childrenBtn}</BtnContainer>
    </Container>
  );
}

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* height: calc(100vh - 62px); */
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

const ContentContainer = styled.div`
    /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 60px;
  gap: 40px;
`;

const BtnContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;




export default TheLayout;
