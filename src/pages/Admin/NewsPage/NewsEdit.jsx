import TheButton from "../../../components/element/TheButton";
import TheNewsLayout from "../../../components/element/TheNewsLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import TheNewsCELayout from "../../../components/element/TheNewsCELayout";

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

  //취소 버튼
  const cancelHandler=()=>{
      alert("작성을 취소하시겠습니까?");
      navigate("/admin/");
  }


  return (
    <TheNewsLayout
      title={`no.${newsItem.id} 뉴스 수정`}
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
            color={"black"}
            bgColor={"#e3e3e3"}
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
