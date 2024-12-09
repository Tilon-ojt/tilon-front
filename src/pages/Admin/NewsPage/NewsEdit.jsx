import styled from "styled-components";
import TheButton from "../../../components/element/TheButton";
import TheNewsLayout from "../../../components/element/TheNewsLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const testImg = "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg";

const tbody = [
  { id: 1, title: "News 1", url: "https://www.naver.com/", thumbnailSrc: testImg },
  { id: 2, title: "News 2", url: "/news-2", thumbnailSrc: "thumb2.jpg" },
  { id: 3, title: "News 3", url: "/news-3", thumbnailSrc: "thumb3.jpg" },
  { id: 4, title: "News 4", url: "/news-4", thumbnailSrc: "thumb4.jpg" },
  { id: 5, title: "News 5", url: "/news-5", thumbnailSrc: "thumb5.jpg" },
];

function NewsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 선택한 뉴스 데이터 찾기
  const newsItem = tbody.find((item) => item.id === Number(id));

  const placeholdImg = "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg";

  const [thumbnailSrc, setThumbnailSrc] = useState(newsItem ? newsItem.thumbnailSrc : placeholdImg);
  const [title, setTitle] = useState(newsItem ? newsItem.title : "");
  const [url, setUrl] = useState(newsItem ? newsItem.url : "");
  const fileInputRef = useRef(null);

  const thumbnailHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailSrc(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const clearThumbnailHandler = () => {
    setThumbnailSrc(placeholdImg);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`뉴스 수정 완료!\n제목: ${title}\n링크: ${url}`);

//     // 여기에 수정된 정보를 저장하는 기능 필요
//     navigate("/admin");
//   };

  const isAlert = () => {
    alert("작성을 취소하고 기존 페이지로 돌아갑니다.");
    navigate("/admin");
  };

  return (
    <TheNewsLayout
      title={`no.${newsItem.id} 뉴스 수정`}
      children={
        <>
          <ThumnailImg>
            <img alt="썸네일 이미지" src={thumbnailSrc} />
          </ThumnailImg>

          <Input>
            <span>썸네일 이미지</span>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={thumbnailHandler}
            />
            <button onClick={clearThumbnailHandler}>✖</button>
          </Input>

          <Input>
            <span>뉴스 제목</span>
            <input
              type="text"
              placeholder="제목 입력"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Input>

          <Input>
            <span>연결 링크</span>
            <input
              type="url"
              placeholder="URL 입력"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Input>

        </>
      }
      cildrenBtn={
        <>
          <TheButton
            label={"수정 완료"}
            role={"submit"}
            color={"white"}
            bgColor={"#5060fb"}
            width={"150px"}
            height={"35px"}
            // onClick={handleSubmit}
          />
          <TheButton
            label={"취소"}
            role={"navigate"}
            color={"black"}
            bgColor={"#e3e3e3"}
            width={"150px"}
            height={"35px"}
            onClick={isAlert}
          />
        </>
      }
    />
  );
}

const ThumnailImg = styled.div`
  height: 300px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;

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

  span {
    border-right: 2px solid lightgray;
    width: 130px;
  }

  input[type="file"] {
    width: 65%;
    height: 100%;
  }
  input[type="text"],
  input[type="url"] {
    width: 70%;
    height: 100%;
    padding: 0 5px;
    border: 1px solid lightgray;
    border-radius: 5px;

    &:focus {
      outline: none;
      border: 1.5px solid lightgray;
    }
  }

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

export default NewsEdit;
