import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api/axios";
import { OPEN_MODAL } from "../../../reducer/AdminModal";
import TheButton2 from "../../../components/element/TheButton2";
import TheTable2 from "../../../components/element/TheTable2";
import styled from "styled-components";
import { ChevronRight, ChevronLeft } from "lucide-react";
import AdminAddModal from "../../../components/common/AdminAddModal";
import TheModal from "../../../components/element/TheModal";

function UserListPage2({ token }) {
  console.log(`전달받은 jwt: ${JSON.stringify(token, null, 2)}`);
  useEffect(() => {
    getUserList();
  }, []);

  // 리프레시 토큰을 쿠키에서 가져오는 함수
  const getRefreshToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("refreshToken="))
      ?.split("=")[1];
  };

  const refreshtoken = getRefreshToken();
  console.log(`가지고있는 쿠키: ${refreshtoken}`);

  const isShow = useSelector((state) => state.adminModal.isShow);
  const [passwordCheckModalIsShow, setPasswordCheckModalIsShow] =
    useState(false);
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch({ type: OPEN_MODAL });
  };
  const [password, setPassword] = useState("");
  const [adminInfo, setAdminInfo] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    console.log("선택된 유저 ID:", selectedUserIds);
  }, [selectedUserIds]);

  // 체크박스 상태 변경
  const handleCheckboxChange = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  // 페이지네이션 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adminInfo.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(adminInfo.length / itemsPerPage);

  // 페이지 이동 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const clickRow = (adminId) => {
    console.log(`선택한 row id : ${adminId}`);
  };

  // admin 목록 받아오기
  const getUserList = async () => {
    try {
      console.log(`jwt가져오기 : ${token}`);

      const response = await api.get("/admin/accounts", {
        headers: {
          Authorization: `Bearer ${token}`, // JWT 포함
        },
      });

      console.log("유저목록:", response.data);
      setAdminInfo(response.data);
    } catch (error) {
      console.error("실패:", error);
    }
  };

  // admin 삭제
  const deleteUesr = async () => {
    if (selectedUserIds.length === 0) {
      alert("삭제할 사용자가 선택되지 않았습니다.");
      return;
    } else {
      setPasswordCheckModalIsShow(true);
    }
  };

  // 비밀번호 초기화
  const resetPassword = async () => {
    if (selectedUserIds.length !== 1) {
      alert("한 번에 하나의 계정만 비밀번호를 초기화할 수 있습니다.");
      return;
    } else if (selectedUserIds.length === 0) {
      alert("초기화할 사용자를 선택해주세요.");
      return;
    }
    const adminId = parseInt(selectedUserIds[0], 10); // 숫자로 변환
    const isConfirmed = window.confirm("비밀번호를 초기화하시겠습니까?");
    if (isConfirmed) {
      try {
        const response = await api.put(
          `/admin/accounts/${adminId}/reset-password`, // 단일 ID만 사용
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("초기화 성공:", response.data);
        alert("비밀번호가 초기화되었습니다.");
        getUserList(); // 유저 목록 갱신
        setSelectedUserIds([]); // 초기화 상태로 변경
      } catch (error) {
        alert(`초기화 실패`);
        console.error("초기화 실패:", error);
      }
    } else {
      console.log("초기화가 취소되었습니다.");
    }
  };

  const ClosePasswordCheckModal = () => {
    console.log(`취소 누름`); // 로그 추가
    setPasswordCheckModalIsShow(false); // 모달 닫기
  };

  const deleteUser = async () => {
    const isConfirmed = window.confirm(`선택한 사용자를 삭제하시겠습니까?`);
    if (isConfirmed) {
      console.log(`삭제 또는 탈퇴할 사용자 ID: ${selectedUserIds}`);
      try {
        const response = await api.delete("/admin/account", {
          data: { adminIds: selectedUserIds, password: password },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("삭제, 탈퇴 성공:", response.data);
        alert("정상적으로 처리되었습니다.");
        setPassword("");
        getUserList(); // 유저목록 갱신
        ClosePasswordCheckModal();
      } catch (error) {
        alert(`실패`);
        console.error("실패:", error);
      }
    }
  };

  return (
    <Container>
      <ButtonContainer>
        <TheButton2 $primary onClick={openModal}>
          추가
        </TheButton2>
        <TheButton2 $danger onClick={deleteUesr}>
          삭제
        </TheButton2>
        <TheButton2 $dark onClick={resetPassword}>
          비밀번호 초기화
        </TheButton2>
      </ButtonContainer>
      <Title>유저 관리</Title>
      <TheTable2 thead={["", "번호", "이름", "아이디", "가입날짜"]}>
        {currentItems.map((item) => (
          <TableRow
            key={item.adminId}
            selected={selectedUserIds.includes(item.adminId)}
            onClick={() => clickRow(item.adminId)}
          >
            <Td>
              <input
                type="checkbox"
                checked={selectedUserIds.includes(item.adminId)}
                onChange={() => handleCheckboxChange(item.adminId)}
              />
            </Td>
            <Td>{item.adminId}</Td>
            <Td>{item.nickname}</Td>
            <Td>{item.empName}</Td>
            <Td>{item.updatedAt}</Td>
          </TableRow>
        ))}
      </TheTable2>
      <Pagination>
        <ChevronLeft
          onClick={handlePrevPage}
          style={{
            cursor: "pointer",
            visibility: currentPage > 1 ? "visible" : "hidden",
          }}
        />
        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </PageButton>
        ))}
        <ChevronRight
          onClick={handleNextPage}
          style={{
            cursor: "pointer",
            visibility: currentPage < totalPages ? "visible" : "hidden",
          }}
        />
      </Pagination>
      {isShow && <AdminAddModal getUserList={getUserList} />}
      {passwordCheckModalIsShow && (
        <TheModal title={"비밀번호 확인"}>
          <Label>
            <P>비밀번호 :</P>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="현재 비밀번호를 입력하세요"
            />
          </Label>
          <ButtonContainer2>
            <TheButton2 $primary width="200px" onClick={deleteUser}>
              확인
            </TheButton2>
            <TheButton2
              $secondary
              width="200px"
              onClick={ClosePasswordCheckModal}
            >
              취소
            </TheButton2>
          </ButtonContainer2>
        </TheModal>
      )}
    </Container>
  );
}

export default UserListPage2;

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 62px);
  margin-left: 300px;
  margin-top: 62px;
  position: relative;
  padding: 100px;
  padding-top: 60px;

  @media (max-width: 1090px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: 60px;
  right: 100px;
  gap: 10px;
  z-index: 10;

  @media (max-width: 1090px) {
    right: 20px;
  }
`;

const Title = styled.h2`
  color: black;
  align-self: flex-start;
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 0;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 50%;
  &.active {
    background-color: #007bff;
    color: white;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9; /* Add alternating row colors */
  }
`;

const Td = styled.td`
  padding: 12px 15px; /* Padding for cells */
  text-align: left; /* Left-align cell text */
  font-size: 14px; /* Font size adjustment */
  color: #555; /* Slightly lighter color for content */
  border: 1px solid #ddd; /* Cell border for all rows */
  &:nth-child(1) {
    width: 20px;
  }
  &:nth-child(2) {
    min-width: 50px;
    width: 50px;
  }
  &:nth-child(3) {
    min-width: 100px;
    width: 100px;
  }
  &:nth-child(5) {
    min-width: 130px;
  }
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

const P = styled.p`
  padding-left: 10px;
  width: 80px;
`;

const ButtonContainer2 = styled.div`
  display: flex;
  gap: 5px;
`;
