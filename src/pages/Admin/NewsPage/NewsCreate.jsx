import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TheButton from "../../../components/element/TheButton";
import TheNewsLayout from "../../../components/element/TheNewsLayout";
import TheNewsCELayout from "../../../components/element/TheNewsCELayout";
import api from "../../../api/axios";

function NewsCreate({ token }) {
  const navigate = useNavigate();
  const [thumbnailSrc, setThumbnailSrc] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tempPostId, setTempPostId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  // tempPostId 생성
  useEffect(() => {
    const createPost = async () => {
      try {
        const response = await api.post("/admin/posts/start", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data) {
          console.log("tempPostId 생성:", response.data);
          setTempPostId(response.data);
        } else {
          console.error("tempPostId가 응답에 없습니다.");
        }
      } catch (error) {
        console.error("tempPostId 생성 요청 실패:", error.message);
      }
    };

    createPost();
  }, [token]);

  // 이미지 선택 핸들러
  const thumbnailHandler = async (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("선택한 파일:", file);
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const selectedImageUrl = e.target.result;
        setThumbnailSrc(selectedImageUrl);
        console.log("로컬 미리보기 URL:", selectedImageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

// 이미지 업로드 핸들러
const imguploadHandler = async (file) => {
  try {
    const formData = new FormData();
    formData.append("ImgFile", file);
    // formData.append("tempPostId", tempPostId);

    const response = await api.post("/admin/posts/image/upload", formData, {
      params:{
        tempPostId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("서버 응답 데이터:", response.data);

    // 서버 응답에서 전달된 이미지 URL을 수정 없이 반환
    if (response.data && response.data.imageUrl) {
      return response.data.imageUrl;  // 수정 없이 그대로 반환
    } else {
      throw new Error("서버 응답 데이터에 imageUrl이 없습니다.");
    }
  } catch (error) {
    console.error("이미지 업로드 실패:", error.message);
    return null;
  }
};


// 뉴스 저장 제출 핸들러
const submitHandler = async () => {
  if (!tempPostId) {
    alert("tempPostId가 설정되지 않았습니다.");
    return;
  }

  if (!title.trim() || !url.trim()) {
    alert("제목과 링크가 비어있습니다.");
    return;
  }

  if (!selectedFile) {
    alert("이미지가 선택되지 않았습니다.");
    return;
  }

  try {
    // 서버에 이미지 업로드 요청
    const uploadedUrl = await imguploadHandler(selectedFile);

    if (!uploadedUrl) {
      alert("이미지 업로드 실패");
      return;
    }

    const updatedData = {
      title: title.trim(),
      category: "NEWS",
      adminId: "5",
      status: "PUBLISHED",
      link: url.trim(),
      tempPostId: tempPostId,
      imageUrl: uploadedUrl,  // 수정된 URL 저장
    };

    console.log("뉴스 저장 데이터:", updatedData);

    const response = await api.post(`/admin/posts`, updatedData, {
      params: { tempPostId },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("서버 저장 응답:", response.data);
    alert("뉴스 저장 완료!");
    navigate("/admin/news");
  } catch (error) {
    console.error("서버 요청 실패:", error.message);
    alert("뉴스 저장 중 문제가 발생했습니다.");
  }
};


  // 취소 버튼 핸들러
  const cancelHandler = () => {
    alert("작성을 취소하시겠습니까?");
    navigate("/admin/news");
  };

  return (
    <TheNewsLayout
      title={`뉴스 생성`}
      children={
        <TheNewsCELayout
          title={title}
          setTitle={setTitle}
          link={url}
          setLink={setUrl}
          imageUrl={thumbnailSrc}  // 수정된 부분: 이미지 URL 전달
          onChange={thumbnailHandler}
          ref={fileInputRef}
        />
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
