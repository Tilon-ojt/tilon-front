import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TheButton from "../../../components/element/TheButton";
import TheNewsLayout from "../../../components/element/TheNewsLayout";
import TheNewsCELayout from "../../../components/element/TheNewsCELayout";
import api from "../../../api/axios";

function NewsEdit({ token }) {
  const navigate = useNavigate();
  const { postId } = useParams(); // 수정 시 필요한 postId 가져오기
  const [thumbnailSrc, setThumbnailSrc] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await api.get(`/admin/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          const { title, link, imageUrl } = response.data;
          setTitle(title);
          setUrl(link);
          setThumbnailSrc(imageUrl); // 기존 이미지 URL 설정
        }
      } catch (error) {
        console.error("게시글 데이터 로드 실패:", error.message);
        alert("게시글을 불러오는 중 문제가 발생했습니다.");
        navigate("/admin/news");
      }
    };

    fetchPostData();
  }, [postId, token, navigate]);


  // 기존 이미지 삭제 핸들러
  const deleteImageHandler = async () => {
    if (thumbnailSrc) {
      try {
        const response = await api.delete("/admin/posts/image/delete", {
          params: { fileName: thumbnailSrc }, // 수정 시 postId 전달
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.success) {
          console.log("기존 이미지 삭제 성공");
          setThumbnailSrc(null); // 기존 이미지 URL 상태 초기화
        } else {
          throw new Error("이미지 삭제 실패");
        }
      } catch (error) {
        console.error("기존 이미지 삭제 실패:", error.message);
      }
    }
  };

  // 이미지 선택 핸들러
  const thumbnailHandler = async (e) => {
    const file = e.target.files[0];

    if (file) {
      // 기존 이미지가 있으면 삭제
      if (thumbnailSrc) {
        await deleteImageHandler();
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const selectedImageUrl = e.target.result;
        setThumbnailSrc(selectedImageUrl); // 새로운 이미지의 미리보기 URL 설정
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 업로드 핸들러
  const imguploadHandler = async (file) => {
    try {
      const formData = new FormData();
      formData.append("ImgFile", file);
      const response = await api.post("/admin/posts/image/upload", formData, {
        params: { postId }, // 수정 시 postId 전달
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.imageUrl) {
        return response.data.imageUrl;
      } else {
        throw new Error("서버 응답 데이터에 imageUrl이 없습니다.");
      }
    } catch (error) {
      console.error("이미지 업로드 실패:", error.message);
      return null;
    }
  };

  // 수정 저장 핸들러
  const submitHandler = async () => {
    if (!title.trim() || !url.trim()) {
      alert("제목과 링크가 비어있습니다.");
      return;
    }

    try {
      let uploadedUrl = thumbnailSrc; // 기존 이미지 URL 사용

      if (selectedFile) {
        // 새 이미지를 업로드한 경우
        uploadedUrl = await imguploadHandler(selectedFile);

        if (!uploadedUrl) {
          alert("이미지 업로드 실패");
          return;
        }
      }

      const updatedData = {
        title: title.trim(),
        category: "NEWS",
        adminId: "5",
        status: "PUBLISHED",
        link: url.trim(),
        postId, // 수정 작업이므로 postId 포함
        imageUrl: uploadedUrl,
      };

      const response = await api.put(`/admin/posts/${postId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("수정 저장 응답:", response.data);
      alert("수정이 완료되었습니다.");
      navigate("/admin/news");
    } catch (error) {
      console.error("수정 요청 실패:", error.message);
      alert("수정 중 문제가 발생했습니다.");
    }
  };

  // 취소 버튼 핸들러
  const cancelHandler = () => {
    alert("수정을 취소하시겠습니까?");
    navigate("/admin/news");
  };

  return (
    <TheNewsLayout
      title={`뉴스 수정`}
      children={
        <TheNewsCELayout
          title={title}
          setTitle={setTitle}
          link={url}
          setLink={setUrl}
          imageUrl={thumbnailSrc} // 기존 이미지 URL 전달
          onChange={thumbnailHandler}
          ref={fileInputRef}
        />
      }
      childrenBtn={
        <>
          <TheButton
            label={"수정 완료"}
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
