import TheButton from "../../../components/element/TheButton";
import TheNewsLayout from "../../../components/element/TheNewsLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import TheNewsCELayout from "../../../components/element/TheNewsCELayout";
import api from "../../../api/axios";

const placeholdImg = "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg";

function NewsCreate({ token }) {
  const navigate = useNavigate();
  const [thumbnailSrc, setThumbnailSrc] = useState(placeholdImg);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tempPostId, setTempPostId] = useState("");
  const fileInputRef = useRef(null);


  useEffect(() => {
    const createPost = async () => {
      try {
        const response = await api.post("/admin/posts/start", {}, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        // 서버 응답에서 생성된 데이터 확인
        console.log("서버 응답 전체 데이터:", response.data);
  
        if (response.data) {
          setTempPostId(response.data);
          console.log("생성된 tempPostId:", response.data);
        } else {
          console.error("서버 응답에 tempPostId가 없습니다.");
        }
      } catch (error) {
        console.error("POST /admin/posts/start 요청 실패:", error.message);
      }
    };
  
    createPost();
  }, [token]);

  const submitHandler = async () => {
    const updatedData = {
      title: title.trim(),
      link: url.trim(),
    };
  
    // 서버 요청 부분 주석 처리
    console.log("입력된 데이터:", updatedData);
    
    alert("콘솔에 입력값이 출력되었습니다.");
    navigate("/admin/news");
  };
  


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


  // 취소 버튼
  const cancelHandler = () => {
    alert("작성을 취소하시겠습니까?");
    navigate("/admin/news");
  };

  return (
    <TheNewsLayout
      title={`뉴스 생성`}
      children={
        <>
          <TheNewsCELayout
            title={title}
            setTitle={setTitle}
            url={url}
            setUrl={setUrl}
            imageUrl={thumbnailSrc}
            setThumbnailSrc={setThumbnailSrc}
            onChange={thumbnailHandler}
            onClick={clearThumbnailHandler}
            ref={fileInputRef}
          />
        </>
      }
      childrenBtn={
        <>
          <TheButton
            label={"저장 완료"}
            width={"150px"}
            height={"35px"}
            onClick={submitHandler}
          />
          <TheButton
            label={"취소"}
            color={"black"}
            $bgColor={"#e3e3e3"}
            width={"150px"}
            height={"35px"}
            onClick={cancelHandler}
          />
        </>
      }
    />
  );
}

export default NewsCreate;
