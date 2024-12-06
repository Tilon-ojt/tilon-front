import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TheSearch from "../../../components/element/TheSearch";
import Btn from "../../../components/element/TheNewsButton";

// AdminNews 컴포넌트
function AdminNews() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 예제 데이터 (뉴스 리스트)
  const exampleNewsList = [
    { id: "1", title: "First News", thumbnail: null, url: "https://example.com/1" },
    { id: "2", title: "Second News", thumbnail: null, url: "https://example.com/2" },
    { id: "3", title: "Third News", thumbnail: null, url: "https://example.com/3" },
  ];

  return (
    <Container>
      <Header>
        <Title>News</Title>
        <TheSearch />
        <BtnContainer>
          <Btn type="NavigateN" label="Create new News" />
          <Btn type="DeleteN" label="Delete News" />
        </BtnContainer>
      </Header>

      <List>
        <Type> no  Title URL</Type>
        <hr/> 
        {exampleNewsList.map((news) => (
          <ListItem key={news.id}>
            <input type="checkbox"/>
            <ItemContent key={news.id} onClick={() => navigate(`/admin/news/edit/${news.id}`)}>
              <span>{news.id}</span>
              <span>{news.title}</span>
              <span>{news.url}</span>
            </ItemContent>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
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

const Type = styled.span`
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
  overflow-y: auto;
`;

const ListItem = styled.div`

  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  padding-left: 15px;
  border-radius: 5px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s;

  span {
    margin: 20px;
    font-size: 0.9rem;
    color: #666;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const ItemContent = styled.div`
  // border: 1px solid lightgray;
  padding: 15px;
  width: 100%;
`

export default AdminNews;
