import TheButton from "../../../components/element/TheButton";
import TheNewsLayout from "../../../components/element/TheNewsLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import TheNewsCELayout from "../../../components/element/TheNewsCELayout";
import api from "../../../api/axios";

const placeholdImg = "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg";

function NewsEdit({ token }) {
  const navigate = useNavigate();
  const { postId } = useParams(); // URL params에서 postId 가져오기
  const [newsItem, setNewsItem] = useState({});
  const [thumbnailSrc, setThumbnailSrc] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const fileInputRef = useRef(null);


  // const [PostId, setPostId] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  // 데이터 가져오기
  const fetchNewsItem = async () => {
    try {
      const response = await api.get(`/admin/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("뉴스 데이터:", response.data);
      setNewsItem(response.data); // 상태 업데이트
    } catch (error) {
      console.error("Failed to fetch news:", error.message);
      alert("데이터 로딩 실패.");
    }
  };

  useEffect(() => {
    if (postId && token) {
      fetchNewsItem();
    }
  }, [postId, token]);

  // newsItem 업데이트 후 상태 반영
  useEffect(() => {
    if (newsItem) {
      setThumbnailSrc(newsItem.imageUrl);
      setTitle(newsItem.title);
      setLink(newsItem.link);
    }
  }, [newsItem]);


  const clearThumbnailHandler = () => {
    setThumbnailSrc(placeholdImg);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


// 파일 선택
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

const imguploadHandler = async (file) => {
  try {
    const formData = new FormData();
    formData.append("ImgFile", file);
    // formData.append("tempPostId", tempPostId);

    const response = await api.post("/admin/posts/image/upload", formData, {
      params:{
        postId,
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


// 뉴스 수정 제출 핸들러
const submitHandler = async () => {

  if (!title.trim() || !link.trim()) {
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
      link: link.trim(),
      postId: postId,
      imageUrl: uploadedUrl,  // 수정된 URL 저장
    };

    console.log("뉴스 저장 데이터:", updatedData);

    const response = await api.post(`/admin/posts`, updatedData, {
      params: { postId },
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


  // 취소 버튼
  const cancelHandler = () => {
    alert("수정을 취소하시겠습니까?");
    navigate(`/admin/news/${postId}`);
  };

  return (
    <TheNewsLayout
      title={`no.${newsItem?.postId || "Unknown"} 뉴스 수정`}
      children={
        <>
          <TheNewsCELayout
            title={title}
            setTitle={setTitle}
            link={link}
            setLink={setLink}
            imageUrl={thumbnailSrc}
            setThumbnailSrc={imguploadHandler}
            onChange={thumbnailHandler}
            onClick={clearThumbnailHandler}
            ref={fileInputRef}
          />
        </>
      }
      childrenBtn={
        <>
          <TheButton
            label={"수정 완료"}
            role={"submit"}
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

export default NewsEdit;