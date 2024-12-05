import React, { useState } from "react";
import { CLOSE_MODAL } from "../../reducer/AdminModal";
import { useDispatch } from "react-redux";

import "./AdminAddModal.css";
import api from "../../api/axios";

function AdminAddModal({}) {
    // 입력 데이터 상태 관리
    const [formData, setFormData] = useState({
        name: "",
        employeeId: "",
    });

    // 입력 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch({ type: CLOSE_MODAL});
    }

    const submitHandler = () => {
        console.log(formData);
        // userInput();       
        
    }

    // 유저저장
    const userInput = async() => {
        try {
            const response = await api.post("/api/...", formData);

            if(response.data == 200) {
                console.log("정상");
                
            } else {
                console.log("오류발생");
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>관리자 추가</h2>
                <label>
                    이름 :
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    사번 :
                    <input
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                    />
                </label>
                <div className="modal-buttons">
                    <button type="submit" className="submit-button" onClick={submitHandler}>
                        추가
                    </button>
                    <button type="button" className="cancel-button" onClick={closeModal}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminAddModal;