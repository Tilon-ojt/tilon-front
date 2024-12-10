import styled from "styled-components";

const TheLayout = ({
  title, 
  hasSearch, // 검색창 유무
  childrenBtn,
  childrenTable,
  onClick
}) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        {hasSearch ? (        
          <Search>
            <Input placeholder="제목으로 검색..."/>
            <Btn>
                <img
                    alt="search"
                    src="https://icons.veryicon.com/png/o/education-technology/education-app/search-137.png"
                    onClick={onClick}
                />
            </Btn>
          </Search>
        ):(null)}
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


const Search = styled.div`
    width: 350px;
    border-radius: 4px;
    border: 1px solid gray;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 5px;

`

const Input = styled.input`
    width: 300px;
    font-size:16px;
    padding:0 10px;
    border: none;

    &:focus{
        outline: none;
    }
`

const Btn = styled.div`
 img{
    width: 30px;
    height: 30px;

    opacity: 0.7;
    transition: all .3s;

    &:hover{
        opacity: 1;
    }
 }
`

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;


const Body = styled.div`
  /* border: 1px solid red; */
  height: auto;
  width: 70vw;
  margin-top: 20px;
  margin-bottom: 60px;
`;


export default TheLayout;
