import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import AdminAddModal from "../../../components/common/AdminAddModal";
import { OPEN_MODAL } from '../../../reducer/AdminModal';
import api from '../../../api/axios';

import './UserList.css';

function UserList({ adminInfo, getUserList }) {

    const isShow = useSelector((state) => state.adminModal.isShow);
    const dispatch = useDispatch();
    const openModal = () => {
        dispatch({ type: OPEN_MODAL });
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const [adminIds, setAdminIds] = useState([]); // 선택된 체크박스 ID 관리
    const itemsPerPage = 14;

    useEffect(() => {
        // 현재 페이지에 해당하는 항목들 계산
        const indexOfLastItem = currentPage * itemsPerPage; // 1 * 14 = 14 / 2 * 14 = 28
        const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 14 - 14 = 0 / 28 - 14 = 14
        setCurrentItems(adminInfo.slice(indexOfFirstItem, indexOfLastItem)); // 0, 14 (0부터 10개) / 14, 28
    }, [currentPage, adminInfo]); // adminInfo도 의존성으로 추가

    // 체크박스 클릭 핸들러
    // 이미 선택된 목록에 있는지 확인 후 없으면 추가하고 있으면 선택해제 시킴
    // 상태 업데이트 함수(set~)는 콜백 함수로 현재 상태값을 전달
    const handleCheckboxChange = (id) => {
        setAdminIds((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((selectedId) => selectedId !== id) // 선택 해제
                : [...prevSelected, id] // 선택 추가
        );
    };

    // 페이지 변경 함수
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(adminInfo.length / itemsPerPage);

    // 페이지 번호 클릭 함수
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 페이지 번호 배열 생성
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const token = useSelector((state) => state.auth.token);

    const deleteUesr = async () => {
        console.log(`삭제될 유저 번호: ${JSON.stringify(adminIds, null, 2)}`);
        try {
            const response = await api.delete('/admin/account', {
                data: { adminIds }, // DELETE 요청 본문에 JSON 데이터로 전달
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
            );
            console.log('삭제 성공:', response.data);
            getUserList();

        } catch (error) {
            console.error('삭제 실패:', error);
        }
    };

    return (
        <div className="admin-info-box">
            <h2>관리자 정보</h2>
            <div className="btn-container">
                <button className="add-button" onClick={openModal}>추가</button>
                <button
                    className="delete-button"
                    onClick={deleteUesr}
                >
                    삭제
                </button>
            </div>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>이름</th>
                        <th>아이디</th>
                        <th>가입날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((info) => (
                        <tr key={info.adminId}>
                            <td style={{ width: '20px' }}>
                                <input
                                    type="checkbox"
                                    className="info-checkbox"
                                    checked={adminIds.includes(info.adminId)}
                                    onChange={() => handleCheckboxChange(info.adminId)}
                                />
                            </td>
                            <td>{info.nickName}</td>
                            <td>{info.empName}</td>
                            <td>{info.updatedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 페이지 네비게이션 */}
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1} className='page-btn'>
                    <ChevronLeft />
                </button>

                {/* 페이지 번호 표시 */}
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => goToPage(number)}
                        className={`page-number-btn ${currentPage === number ? 'active' : ''}`}
                    >
                        {number}
                    </button>
                ))}

                <button onClick={nextPage} disabled={currentPage === totalPages} className='page-btn'>
                    <ChevronRight />
                </button>
            </div>
            {isShow ? <AdminAddModal getUserList={getUserList}/> : null}
        </div>
    );
}

export default UserList;