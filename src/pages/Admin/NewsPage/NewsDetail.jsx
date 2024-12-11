import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TheNewsLayout from "../../../components/element/TheNewsLayout";
import TheButton from "../../../components/element/TheButton";
import api from "../../../api/axios";

const defaultThumbnail =
  "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg";

function NewsDetail({ token }) {
  const navigate = useNavigate();
  const { postId } = useParams(); // URL params에서 postId 가져오기
  const [newsItem, setNewsItem] = useState({});

  // 뉴스 상세 데이터 가져오기
  const fetchDetail = async () => {
    try {
      const response = await api.get(`/admin/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("서버 응답 데이터:", response.data);
  
      if (response.data) {
        const { title, link, imageUrl } = response.data;
  
        const serverDomain = "http://172.16.5.51:8080";
  
        // 백슬래시 -> 슬래시 변환 + 서버 도메인 합치기
        const formattedImageUrl = imageUrl
          ? `${serverDomain}/image/${imageUrl.split('\\').pop()}`
          : defaultThumbnail;
  
        console.log("변환된 이미지 URL:", formattedImageUrl);
  
        setNewsItem({
          title,
          link,
          imageUrl: formattedImageUrl,
        });
      }
    } catch (error) {
      console.error("Failed to fetch news:", error.message);
      alert("상세 데이터 로딩 실패.");
    }
  };
  


  useEffect(() => {
    if (postId && token) {
      fetchDetail();
    }
  }, [postId, token]);

  const goToEditHandler = () => {
    navigate(`/admin/news/edit/${postId}`);
  };

  const deleteHandler = async () => {
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const isConfirmed = window.confirm("뉴스 항목을 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
      await api.delete(`/admin/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("뉴스 항목이 삭제되었습니다.");
      navigate("/admin/news");
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
          <ThumnailImg>
          <img
            src={newsItem.imageUrl || defaultThumbnail}
            alt={newsItem.imageUrl ? "썸네일 이미지" : "기본 이미지"}
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
    height: auto;
    border-radius: 10px;
    margin-bottom: 10px;
    object-fit: cover;
  }
`;

const Input = styled.div`
  height: auto;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 20px;
`;

const Span = styled.span`
  border-right: 2px solid lightgray;
  width: 130px;
`;

const TitleSpan = styled.span`
  display: block;
  max-width: 400px;
  height: 40px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

export default NewsDetail;
