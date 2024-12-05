import React, { useState } from "react";
import { CLOSE_MODAL } from "../../reducer/AdminModal";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import api from "../../api/axios";

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
    display: block;
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

function AdminAddModal() {
    const [formData, setFormData] = useState({
        empName: "",
        password: "",
    });

    const dispatch = useDispatch();

    const handleEmpNameChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            empName: e.target.value,
        }));
    };

    const handlePasswordChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            password: e.target.value,
        }));
    };

    const closeModal = () => {
        dispatch({ type: CLOSE_MODAL });
    };

    const submitHandler = () => {
        console.log(formData);
        userInput(); // 유저 저장 함수 호출
    };

    // 유저 저장
    const userInput = async () => {
        console.log(`입력한 데이터 : ${ formData }`);

        // try {
        //     const response = await api.post("/api/...", formData);

        //     if (response.status === 200) {
        //         console.log("정상 처리되었습니다.");
        //     } else {
        //         console.log("오류가 발생했습니다.");
        //     }
        // } catch (error) {
        //     console.log("에러:", error);
        // }
    };

    return (
        <ModalOverlay>
            <ModalContainer>
                <ModalTitle>관리자 추가</ModalTitle>
                <Label>
                    아이디:
                    <Input
                        type="text"
                        name="empName"
                        value={formData.empName}
                        onChange={handleEmpNameChange}
                        required
                    />
                </Label>
                <Label>
                    비밀번호:
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handlePasswordChange}
                        required
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
