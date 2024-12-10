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
  

  const goToEditHandler = () => {
    navigate(`/admin/news/edit/${postId}`);
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
            <span>{newsItem.title}</span>
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
        <TheButton
          label="수정하기"
          color="white"
          bgColor="#5060fb"
          width="300px"
          height="40px"
          onClick={goToEditHandler}
        />
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
  height: 25px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background: #f5f5f5;
      border-radius: 100%;
    }
  }
`;

const Span = styled.span`
  border-right: 2px solid lightgray;
  width: 130px;
`;

export default NewsDetail;
