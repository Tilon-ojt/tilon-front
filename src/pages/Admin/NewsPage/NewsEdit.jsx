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


  const [PostId, setPostId] = useState("");

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

  // const thumbnailHandler = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => setThumbnailSrc(e.target.result);
  //     reader.readAsDataURL(file);
  //   }
  // };

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
    console.log("서버 업로드 시작...");

    const formData = new FormData();
    formData.append("ImgFile", file);
    formData.append("PostId", PostId);

    const response = await api.post(
      "/admin/posts/image/upload",
      formData,
      {
        params: { PostId },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("------image url:", response.data);
    const imageUrl = response.data;
    setThumbnailSrc(imageUrl);  // 이미지 URL 상태 업데이트

    return imageUrl;

  } catch (error) {
    console.error("이미지 업로드 실패:", error.message);
    return null;
  }
};

  // 수정 완료 버튼
  const submitHandler = async () => {
    try {
      const updatedData = {
        title: title.trim(),
        link: link.trim(),
        imageUrl: thumbnailSrc,
      };

      const response = await api.put(`/admin/posts/${postId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("수정된 데이터:", response.data);
      alert("수정이 완료되었습니다.");
      navigate("/admin/news");
    } catch (error) {
      console.error("수정 요청 실패:", error.message);
      alert("수정에 실패했습니다. 다시 시도해주세요.");
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