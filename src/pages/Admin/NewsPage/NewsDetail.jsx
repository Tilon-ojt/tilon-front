import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TheNewsLayout from "../../../components/element/TheNewsLayout";
import TheButton from "../../../components/element/TheButton";
import api from "../../../api/axios";

const defaultThumbnail = "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg";

function NewsDetail({ token }) {
  const navigate = useNavigate();
  const { postId } = useParams(); // URL params에서 postId 가져오기
  const [newsItem, setNewsItem] = useState({});

  const fetchDetail = async () => {
    try {
      const response = await api.get(`/admin/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("모든 상세 데이터:", response.data);
      setNewsItem(response.data); // newsItem 상태 업데이트
    } catch (error) {
      console.error("Failed to fetch news:", error.message);
      alert("상세 데이터 로딩 실패.");
    }
  };
  
  useEffect(() => {
    console.log('postId:', postId);  // postId 값 확인
    console.log('token:', token);
    if (postId && token) {
      fetchDetail();
    }
  }, [postId, token]);
  

  // 수정 버튼
  const goToEditHandler = () => {
    navigate(`/admin/news/edit/${postId}`);
  };

  // 삭제 버튼
  const deleteHandler = async () => {
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 사용자 확인 팝업창 띄우기
    const isConfirmed = window.confirm("뉴스 항목을 삭제하시겠습니까?");

    if (!isConfirmed) {
      return;  // "아니오" 선택 시 삭제 취소
    }

    try {
      await api.delete(`/admin/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("뉴스 항목이 삭제되었습니다.");
      navigate("/admin/news");  // 삭제 완료 후 뉴스 목록 페이지로 이동
    } catch (error) {
      console.error("Failed to delete news:", error.message);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <TheNewsLayout
      title={`no.${postId}`}
      children={
        <>
          {/* <p>{newsItem.updatedAt}</p> */}
          <ThumnailImg>
            <img
              alt="썸네일 이미지"
              src={newsItem.imageUrl || defaultThumbnail}
            />
          </ThumnailImg>
          <Input>
            <Span>뉴스 제목</Span>
            <TitleSpan>{newsItem.title}</TitleSpan>
          </Input>
  
          <Input>
            <Span>연결 링크</Span>
            <a href={newsItem.link} target="_blank" rel="noreferrer">
              {newsItem.link || "링크가 없습니다"}
            </a>
          </Input>
        </>
      }
      childrenBtn={
        <>
          <TheButton
            label="수정하기"
            width="150px"
            height="40px"
            onClick={goToEditHandler}
          />
          <TheButton
            label="삭제하기"
            color="white"
            $bgColor="#ff4141"
            width="150px"
            height="40px"
            onClick={deleteHandler}
          />
        </>

      }
    />
  );
  
}

const ThumnailImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border: 2px solid lightgray;
    width: 400px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
`;

const Input = styled.div`

  /* border: 2px solid lightgray; */

  height: auto;
  display: flex;
  align-items: flex-start;
  /* justify-content: center; */
  flex-direction: row;
  gap: 20px;

`;

const Span = styled.span`
  border-right: 2px solid lightgray;
  /* width: 30%; */
  width: 130px;
`;

const TitleSpan = styled.span`
  display: block;
  max-width: 400px; /* 최대 너비 */
  height: 40px; /* 고정 높이 */
  line-height: 1.5; /* 텍스트 줄 간격 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘칠 경우 말줄임 표시 */
  white-space: nowrap; /* 텍스트가 한 줄로 유지됨 */
  word-break: break-all; /* 긴 단어도 깨서 출력 */
`
export default NewsDetail;
