import { useParams } from "react-router-dom";
import styled from "styled-components";
import TheNewsButton from "../../../components/element/TheNewsButton";
import { useState, useEffect } from "react";

// 예제 데이터 (AdminNews에서 전달받는다고 가정)
const exampleNewsList = [
  { id: "1", title: "First News", thumbnail: null, url: "https://example.com/1" },
  { id: "2", title: "Second News", thumbnail: null, url: "https://example.com/2" },
  { id: "3", title: "Third News", thumbnail: null, url: "https://example.com/3" },
];

function EditNews() {
  const { id } = useParams(); // URL에서 ID 가져오기
  const [newsData, setNewsData] = useState(null); // 선택한 뉴스 데이터 저장
  const [thumbnail, setThumbnail] = useState(null);

  // 뉴스 데이터 초기화
  useEffect(() => {
    const selectedNews = exampleNewsList.find((news) => news.id === id);
    if (selectedNews) {
      setNewsData(selectedNews);
      setThumbnail(selectedNews.thumbnail);
    }
  }, [id]);

  // 썸네일 선택 핸들러
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 썸네일 삭제 핸들러
  const handleRemoveThumbnail = () => {
    setThumbnail(null);
    document.querySelector('input[type="file"]').value = ""; // 인풋 리셋
  };

  // 데이터가 로드되지 않은 경우 로딩 상태 표시
  if (!newsData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>
        <PageLabel>Edit News</PageLabel>
      </Header>

      <Body>
        <Thumnail>
          {thumbnail ? (
            <div>
              <img alt="thumbnail" src={thumbnail} />
            </div>
          ) : (
            <img
              alt="default"
              src="https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
            />
          )}
        </Thumnail>

        <Input>
          <span>썸네일</span>
          <input type="file" onChange={handleThumbnailChange} />
          {thumbnail && <RemoveBtn onClick={handleRemoveThumbnail}>×</RemoveBtn>}
        </Input>

        <Input>
          <span>제목</span>
          <input
            type="text"
            value={newsData.title}
            onChange={(e) =>
              setNewsData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="제목을 입력하세요."
          />
        </Input>

        <Input>
          <span>URL</span>
          <input
            type="url"
            value={newsData.url}
            onChange={(e) =>
              setNewsData((prev) => ({ ...prev, url: e.target.value }))
            }
            placeholder="연결 링크를 입력하세요."
          />
        </Input>
      </Body>

      <Btn>
        <TheNewsButton type="SubmitN" label="수정 완료" />
        <TheNewsButton type="CancelN" />
      </Btn>
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

const PageLabel = styled.span`
  font-size: 2rem;
  color: #333;
  font-weight: bold;
`;

const Btn = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Body = styled.div`
  height: 60vh;
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
  padding: 20px;
  border: 1px solid lightgray;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Thumnail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  div {
    position: relative;
  }

  img {
    border: 2px solid lightgray;
    border-radius: 10px;
    width: 400px;
    height: auto;
  }
`;

const RemoveBtn = styled.button`
  display: flex;
  align-items: center;
  font-size: 25px;
  opacity: 0.5;
  border: none;
  background-color: transparent;
  transition: all 0.35s;

  &:hover {
    opacity: 1;
  }
`;

const Input = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;

  span {
    width: 5vw;
    border-right: 2px solid lightgray;
    margin-right: 30px;
  }

  input[type="text"],
  input[type="url"] {
    width: 60%;
    height: 10px;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;

    &:focus {
      outline: none;
      border: 2px solid lightgray;
    }
  }
`;

export default EditNews;
