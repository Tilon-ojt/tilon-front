import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostEdit from "../PostEdit/PostEdit";
import TheButton2 from "../../../components/element/TheButton2";
import { useNavigate } from "react-router-dom";

function EditDetail({ token }) {
  const [adminInfo, setAdminInfo] = useState([]);
  const navigate = useNavigate();  // useNavigate 훅을 컴포넌트 내부에서 호출

  useEffect(() => {
    // 필요한 데이터 로딩 로직
  }, []);

  const openModal = () => {
    // Modal을 열기 위한 함수 (필요시 구현)
  };

  const cancelAction = () => {
    // 취소 버튼 클릭 시 /admin/pr로 이동
    navigate('/admin/pr');
  };

  return (
    <Container>
      <PostEdit />
      
      <ButtonContainer>
        <TheButton2 $warning onClick={openModal}>
          수정
        </TheButton2>
        <TheButton2 $secondary onClick={cancelAction}>
          취소
        </TheButton2>
      </ButtonContainer>
    </Container>
  );
}

export default EditDetail;

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 62px);
  margin-left: 300px;
  position: relative;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0px;
  right: 300px;
  gap: 20px;
  z-index: 10;
`;
