import styled from "styled-components";
import TheButton from "../../../components/element/TheButton";
import TheNewsLayout from "../../../components/element/TheNewsLayout";
import { useState, useRef } from "react";

function NewsEdit() {
    const placeholdImg =
        "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg";

    const [thumbnailSrc, setThumbnailSrc] = useState(placeholdImg);
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

    const isAlert = () => {
        alert("작성을 취소하고 기존 페이지로 돌아갑니다.");
    };

    return (
        <TheNewsLayout
            title="뉴스 수정"
            children={
                <>
                    <ThumnailImg>
                        <img alt="썸네일 이미지" src={thumbnailSrc} />
                    </ThumnailImg>

                    <Input>
                        <span>썸네일 이미지 </span>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={thumbnailHandler}
                        />
                        <button onClick={clearThumbnailHandler}>✖</button>
                    </Input>

                    <Input>
                        <span>뉴스 제목 </span>
                        <input type="text" placeholder="제목을 입력하세요." />
                    </Input>

                    <Input>
                        <span>연결 링크 </span>
                        <input type="url" placeholder="연결 링크를 입력하세요." />
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
                    />
                    <TheButton
                        label={"취소"}
                        role={"navigate"}
                        color={"black"}
                        bgColor={"#e3e3e3"}
                        width={"150px"}
                        height={"35px"}
                        href={"/admin"}
                        onClick={isAlert}
                    />
                </>
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

    span {
        border-right: 2px solid lightgray;
        width: 130px;
    }

    input[type="file"]{
        width: 65%;
        height: 100%;
    }

    input[type="text"],
    input[type="url"]{
        width: 70%;
        height: 100%;
        padding: 0 5px;

        border: 1px solid lightgray;
        border-radius: 5px;

        &:focus{
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
