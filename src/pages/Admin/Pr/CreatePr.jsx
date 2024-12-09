// CreatePr.js
import React, { useState } from "react";
import PostEditor from "../PostEdit/PostEditor"; // PostEditor 컴포넌트 임포트
import styled from "styled-components";
import TheNewsButton from "../../../components/element/TheNewsButton";
import axios from "axios";

function CreatePr() {
  const [thumbnail, setThumbnail] = useState(null);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  // 썸네일 선택 핸들러
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 게시글 저장 함수
  const handleSave = async ({ subject, content }) => {
    try {
      const response = await axios.post("http://localhost:8000/api/save", {
        subject,
        content,
      });

      if (response.status === 200) {
        alert("게시글이 성공적으로 저장되었습니다.");
      } else {
        alert("게시글 저장 실패");
      }
    } catch (error) {
      console.error("저장 실패:", error);
      alert("서버와 연결 중 문제가 발생했습니다.");
    }
  };

  // 취소 버튼 클릭 시 폼 리셋 함수
  const cancelForm = () => {
    setSubject("");
    setContent("");
  };

  return (
    <Container>
      <Header>
        <PageLabel>Create new Pr</PageLabel>
      </Header>
      <Body>
        <PostEditor onSave={handleSave} />
      </Body>
      <Btn>
        <TheNewsButton type="SubmitN" label="작성 완료" onClick={handleSave} />
        <TheNewsButton type="CancelN" label="취소" onClick={cancelForm} />
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
  box-sizing: border-box;
`;

export default CreatePr;
