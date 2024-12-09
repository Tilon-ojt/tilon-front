import TheButton from "../../../components/element/TheButton";
import TheNewsLayout from "../../../components/element/TheNewsLayout";
import { useState, useRef } from "react";
import TheNewsCELayout from "../../../components/element/TheNewsCELayout";
import { useNavigate } from "react-router-dom";

function NewsCreate() {

    const navigate = useNavigate();

    const placeholdImg =
        "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg";
        
        const [thumbnailSrc, setThumbnailSrc] = useState(placeholdImg);
        const [title, setTitle] = useState("");
        const [url, setUrl] = useState("");
        const fileInputRef = useRef(null);

    // 썸네일 설정
    const thumbnailHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnailSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 썸네일 및 파일 초기화
    const clearThumbnailHandler = () => {
        setThumbnailSrc(placeholdImg); // 썸네일 이미지를 초기화
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // 파일 입력 필드 초기화
        }
    };

    // 저장 버튼
    const saveHandler=()=>{
       alert("저장되었습니다.");
       console.log(`${thumbnailSrc}-${title} - ${url}`);
       navigate("/admin/");
    }

    //취소 버튼
    const cancelHandler=()=>{
        alert("작성을 취소하시겠습니까?");
        navigate("/admin/");
    }

    return (
        <TheNewsLayout
            title="뉴스 작성"
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
                        label={"저장 완료"}
                        width={"150px"}
                        height={"35px"}
                        onClick={saveHandler}
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

export default NewsCreate;
