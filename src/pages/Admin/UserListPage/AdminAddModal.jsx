import React, { useState } from "react";
import { CLOSE_MODAL } from "../../../reducer/AdminModal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import api from "../../../api/axios";

function AdminAddModal({ getUserList }) {
  const [nickname, setnickname] = useState("");
  const [empName, setEmpName] = useState("");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handlenicknameChange = (e) => {
    setnickname(e.target.value);
  };

  // 아아디 유효성검사
  const handleEmpNameChange = (e) => {
    const value = e.target.value; // 사용자가 입력한 값을 가져옴
    // 입력값이 영문자 및 숫자로만 이루어졌는지 검사
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setEmpName(value); // 조건이 참이면 상태 업데이트
    }
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const submitHandler = () => {
    if (!nickname.trim() || !empName.trim()) {
      alert("이름과 아이디를 모두 입력해주세요.");
      return;
    }
    console.log({ nickname, empName });
    userInput(); // 유저 저장 함수 호출
  };

  // 유저 저장
  const userInput = async () => {
    console.log(`닉네임: ${nickname}, 아이디: ${empName}`);

    try {
      const response = await api.post(
        "/admin/accounts",
        { nickname, empName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      if (response.status === 201) {
        dispatch({ type: CLOSE_MODAL });
        alert("아이디 생성 성공");
        getUserList();
        console.log("정상 처리되었습니다.");
      } else {
        dispatch({ type: CLOSE_MODAL });
        alert("아이디 생성 실패");
      }
    } catch (error) {
      console.log("에러:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitHandler();
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>관리자 추가</ModalTitle>
        <Label>
          <P>이름 :</P>
          <Input
            autocomplete="off" // 이전에 입력한 데이터 보이지않도록 설정
            autoFocus // 자동으로 눌러저있도록 설정
            type="text"
            name="nickname"
            value={nickname}
            onChange={handlenicknameChange}
          />
        </Label>
        <Label>
          <P>아이디 :</P>
          <Input
            autocomplete="off"
            type="text"
            name="empName"
            value={empName}
            onChange={handleEmpNameChange}
            required
            placeholder="영문과 숫자만 입력 가능합니다"
            onKeyDown={handleKeyPress} // 엔터 키 입력 감지
          />
        </Label>
        <ModalButtons>
          <SubmitButton type="submit" onClick={submitHandler}>
            추가
          </SubmitButton>
          <CancelButton type="button" onClick={closeModal}>
            취소
          </CancelButton>
        </ModalButtons>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default AdminAddModal;

// 아래 스타일은 그대로 유지됩니다.
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const P = styled.p`
  padding-left: 10px;
  width: 80px;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

const Label = styled.label`
  display: flex;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 70%;
  height: 34px;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const SubmitButton = styled.button`
  background-color: #4362ff;
  width: 200px;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #273fba;
  }
`;

const CancelButton = styled.button`
  background-color: #c5c5c5;
  color: white;
  width: 200px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #929191;
  }
`;
