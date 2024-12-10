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

  // const submitHandler = async () => {
  //   try {
  //     const updatedData = {
  //       title: title.trim(),
  //       link: url.trim(),
  //       imageUrl: thumbnailSrc,
  //     };

  //     const response = await api.post(`/admin/posts`, updatedData, {
  //       params:{
  //           tempPostId : "1"
  //       },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     alert("저장이 완료되었습니다.");
  //     console.log("저장된 데이터:", response.data);
  //     navigate("/admin/news");
  //   } catch (error) {
  //     console.error("저장 요청 실패:", error.message);
  //     alert("저장에 실패했습니다. 다시 시도해주세요.");
  //   }
  // };

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
  

  // 취소 버튼
  const cancelHandler = () => {
    alert("수정을 취소하시겠습니까?");
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
            thumbnailSrc={thumbnailSrc}
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
