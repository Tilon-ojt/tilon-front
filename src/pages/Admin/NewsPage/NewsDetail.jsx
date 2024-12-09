import styled from "styled-components";
import React from "react";
import { useParams } from "react-router-dom";
import TheNewsLayout from "../../../components/element/TheNewsLayout";
import TheButton from "../../../components/element/TheButton";

const testImg="https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg";

const tbody = [
  { id: 1, title: "News 1", url: "https://www.naver.com/", thumbnailSrc: testImg },
  { id: 2, title: "News 2", url: "/news-2", thumbnailSrc: "thumb2.jpg" },
  { id: 3, title: "News 3", url: "/news-3", thumbnailSrc: "thumb3.jpg" },
  { id: 4, title: "News 4", url: "/news-4", thumbnailSrc: "thumb4.jpg" },
  { id: 5, title: "News 5", url: "/news-5", thumbnailSrc: "thumb5.jpg" },
];

function NewsDetail() {
  const { id } = useParams();

  const newsItem = tbody.find((item) => item.id === Number(id));

  if (!newsItem) return <div>뉴스가 존재하지 않습니다.</div>;

  return (
    <TheNewsLayout
      title={`no.${newsItem.id}`}
      children={
        <>
          <ThumnailImg>
            <img 
                alt="썸네일 이미지"
                src={newsItem.thumbnailSrc} />
          </ThumnailImg>
          {/* 확인용 */}
          {/* <span>{newsItem.thumbnailSrc}</span>  */}
          <Input>
            <Span>뉴스 제목</Span>
            <span>{newsItem.title}</span>
           </Input>
          <Input>
            <Span>연결 링크</Span>
            <a href={newsItem.url} target="_blank" rel="noreferrer">{newsItem.url}</a>
          </Input>
        </>
      }
      cildrenBtn={
        <TheButton
          label="수정하기"
          role="navigate"
          color="white"
          bgColor="#5060fb"
          width="300px"
          height="40px"
          href={`/admin/news/edit/${newsItem.id}`}
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

    /* border: 2px solid red; */

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
`
export default NewsDetail;