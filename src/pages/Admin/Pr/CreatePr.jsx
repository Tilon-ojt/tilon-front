import React, { useState } from "react";
import PostEditor from "../PostEdit/PostEditor"; 
import styled from "styled-components";
import TheNewsButton from "../../../components/element/TheNewsButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePr() {
    const [title, setTitle] = useState(""); // 제목 상태
    const [content, setContent] = useState(""); // 내용 상태
    const navigate = useNavigate(); 



    // 게시글 저장 함수 (PostEditor에서 받은 title와 content 사용)
    const handleSave = async ({ title, content }) => {
        try {
            const response = await axios.post("http://localhost:8000/api/save", {
                title,
                content,
            });

            if (response.status === 200) {
                alert("게시글이 성공적으로 저장되었습니다.");
                navigate("/admin/pr/create"); // 성공 시 다른 페이지로 이동
            } else {
                alert("게시글 저장 실패");
            }
        } catch (error) {
            console.error("저장 실패:", error);
            alert("서버와 연결 중 문제가 발생했습니다.");
        }
    };

    // 취소 버튼 클릭 시 폼 리셋 함수
    const cancelForm = () => {
        setTitle("");
        setContent("");
    };

    return (
        <Container>
            <Header>
                <PageLabel>Create new Pr</PageLabel>
            </Header>
            <Body>
                <PostEditor onSave={handleSave} /> {/* PostEditor에서 onSave로 전달된 데이터 처리 */}
            </Body>
            <Btn>
                <TheNewsButton
                    type="SubmitN"
                    label="작성 완료"
                    onClick={() => handleSave({ title, content })} // submit 클릭 시 handleSave 호출
                    navigateTo="/admin/pr/create"  
                />
                <TheNewsButton
                    type="CancelN"
                    label="취소"
                    onClick={cancelForm}
                    navigateTo="/admin/news"  
                />
            </Btn>
        </Container>
    );
}

// 스타일 정의
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    margin-left: 300px;
    margin-top: 62px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70vw;
    margin-bottom: 10px;
`;

const PageLabel = styled.span`
    font-size: 2rem;
    color: #333;
    font-weight: bold;
`;

const Btn = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

const Body = styled.div`
    height: 60vh;
    width: 70vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
    padding: 20px;
    border: 1px solid lightgray;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    box-sizing: border-box;
`;

export default CreatePr;
