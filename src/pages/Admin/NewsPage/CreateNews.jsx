import styled from "styled-components";
import TheNewsButton from "../../../components/element/TheNewsButton";
import { useState } from "react";

function CreateNews() {
  const [thumbnail, setThumbnail] = useState(null);

  // 썸네일 선택 핸들러
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
        // setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // 썸네일 삭제 핸들러
  const handleRemoveThumbnail = () => {
    setThumbnail(null);
    document.querySelector('input[type="file"]').value = ''; // 인풋 리셋
  };

  return (
    <Container>
      <Header>
        <PageLabel>Create new News</PageLabel>
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
          {thumbnail && (
              <RemoveBtn onClick={handleRemoveThumbnail}>×</RemoveBtn>
          )}
        </Input>

        <Input>
          <span>제목</span>
          <input type="text" placeholder="제목을 입력하세요." />
        </Input>

        <Input>
          <span>URL</span>
          <input type="url"  placeholder="연결 링크를 입력하세요."/>
        </Input>
      </Body>

      <Btn>
        <TheNewsButton type="SubmitN" label="작성 완료" />
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
  border:none;
  background-color: transparent;
  transition: all .35s;

  &:hover{
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

  &:focus{
    outline: none;
    border: 2px solid lightgray;
  }

}


`;

export default CreateNews;
