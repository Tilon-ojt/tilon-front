import { ChevronRight, ChevronLeft, CircleAlert } from "lucide-react";
import TheButton2 from "../../../components/element/TheButton2";
import TheModal from "../../../components/element/TheModal";
import TheTable2 from "../../../components/element/TheTable2";
import { OPEN_MODAL } from "../../../reducer/AdminModal";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import AdminAddModal from "./AdminAddModal";
import styled from "styled-components";
import api from "../../../api/axios";
import getRefreshToken from "../../../utils/getRefreshToken";

function UserListPage2({ token }) {
  // console.log(`전달받은 jwt: ${JSON.stringify(token, null, 2)}`);
  useEffect(() => {
    getUserList();
  }, []);

  const isShow = useSelector((state) => state.adminModal.isShow);
  const [passwordCheckModalIsShow, setPasswordCheckModalIsShow] =
    useState(false);
  const [UserResetModal, setUserResetModal] = useState(false);
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch({ type: OPEN_MODAL });
  };
  const [password, setPassword] = useState("");
  const [adminInfo, setAdminInfo] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 체크박스 클릭 시, clickRow 이벤트를 실행하지 않도록 처리
  const handleCheckboxChange = (id, event) => {
    event.stopPropagation(); // 이벤트 전파를 막아서 clickRow가 실행되지 않게 함
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  // 페이지네이션 계산
  const indexOfLastItem = currentPage * itemsPerPage; // 1 * 10 = 10
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 10 - 10 = 0
  const currentItems = adminInfo.slice(indexOfFirstItem, indexOfLastItem); // 0, 10 -> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const totalPages = Math.ceil(adminInfo.length / itemsPerPage);

  // 페이지 이동 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  // TableRow 클릭 시
  const clickRow = (adminId, event) => {
    console.log(`선택한 row id : ${adminId}`);
    if (event.target.type !== "checkbox") {
      // 체크박스를 클릭한 경우에는 클릭을 처리하지 않음
      setSelectedUserIds((prev) =>
        prev.includes(adminId)
          ? prev.filter((userId) => userId !== adminId)
          : [...prev, adminId]
      );
    }
  };

  // admin 목록 받아오기
  const getUserList = async () => {
    try {
      // console.log(`jwt가져오기 : ${token}`);

      const response = await api.get("/admin/accounts", {
        headers: {
          Authorization: `Bearer ${token}`, // JWT 포함
        },
      });

      // console.log("유저목록:", response.data);
      setAdminInfo(response.data);
    } catch (error) {
      alert(`유저목록 가져오기 실패`);
      console.error("실패:", error);
    }
  };

  // 초기화 필터
  const UserResetModalFilter = async () => {
    if (selectedUserIds.length === 0) {
      alert("초기화할 사용자를 선택해주세요.");
      return;
    } else if (selectedUserIds.length !== 1) {
      alert("한 번에 하나의 계정만 비밀번호를 초기화할 수 있습니다.");
      return;
    } else {
      setUserResetModal(true);
    }
  };

  // 비밀번호 초기화
  const resetPassword = async () => {
    const adminId = parseInt(selectedUserIds[0], 10); // 숫자로 변환
    try {
      const response = await api.put(
        `/admin/accounts/${adminId}/reset-password`, // 단일 ID만 사용
        null,
        {
          // data: { adminIds: selectedUserIds, password: password },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("초기화 성공:", response.data);
      alert("비밀번호가 초기화되었습니다.");
      setPassword("");
      setSelectedUserIds([]); // 초기화 상태로 변경
      setUserResetModal(false);
    } catch (error) {
      alert(`초기화 실패`);
      console.error("초기화 실패:", error);
    }
  };

  // admin 삭제
  const deleteUserModal = async () => {
    if (selectedUserIds.length === 0) {
      alert("삭제할 사용자가 선택되지 않았습니다.");
      return;
    } else {
      setPasswordCheckModalIsShow(true);
    }
  };

  const deleteUser = async () => {
    console.log(`삭제 또는 탈퇴할 사용자 ID: ${selectedUserIds}`);
    const refreshtoken = getRefreshToken();
    try {
      const response = await api.delete("/admin/account", {
        data: { adminIds: selectedUserIds, password: password },
        headers: {
          "Refresh-Token": refreshtoken, // 파싱된 리프레시 토큰 값 사용
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("삭제, 탈퇴 성공:", response.data);
      alert("정상적으로 처리되었습니다.");
      setPassword("");
      getUserList(); // 유저목록 갱신
      setPasswordCheckModalIsShow(false); // 모달 닫기
    } catch (error) {
      if (error.request.state === 500) {
        // 요청이 전송되었으나 응답을 받지 못한 경우
        alert("서버 오류가 발생했습니다.");
      } else if (error.response.status === 401) {
        alert(`비밀번호가 일치하지 않습니다.`);
      }
    }
  };

  return (
    <Container>
      <ButtonContainer>
        <TheButton2 $primary onClick={openModal}>
          추가
        </TheButton2>
        <TheButton2 $danger onClick={deleteUserModal}>
          삭제
        </TheButton2>
        <TheButton2 $dark onClick={UserResetModalFilter}>
          비밀번호 초기화
        </TheButton2>
      </ButtonContainer>
      <Title>유저 관리</Title>
      <TheTable2 thead={["", "번호", "이름", "아이디", "가입날짜"]}>
        {currentItems.map((item) => (
          <TableRow
            key={item.adminId}
            selected={selectedUserIds.includes(item.adminId)}
            onClick={(e) => clickRow(item.adminId, e)} // clickRow를 호출할 때 이벤트 객체를 넘김
          >
            <Td>
              <input
                type="checkbox"
                style={{ cursor: "pointer" }}
                checked={selectedUserIds.includes(item.adminId)}
                onChange={(e) => handleCheckboxChange(item.adminId, e)} // 체크박스 클릭 시 handleCheckboxChange 실행
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

      {/* 계정 추기 모달 */}
      {isShow && <AdminAddModal getUserList={getUserList} />}

      {/* 계정 삭제 모달 */}
      {passwordCheckModalIsShow && (
        <TheModal title={"계정삭제"}>
          <CircleAlert size={80} style={{ color: "red", width: "100%" }} />
          <P style={{ color: "red", width: "100%", marginBottom: "0" }}>
            삭제버튼을 누르면, 계정은 삭제되며 복구되지 않습니다.
          </P>
          <P
            style={{
              width: "100%",
              marginTop: "0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            비밀번호 입력 후 "삭제"를 눌러주세요.
          </P>
          <Label>
            <P>비밀번호 :</P>
            <Input
              autoFocus
              autoComplete="off"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="현재 비밀번호를 입력하세요"
            />
          </Label>
          <ButtonContainer2>
            <TheButton2 $danger width="200px" onClick={deleteUser}>
              삭제
            </TheButton2>
            <TheButton2
              width="200px"
              onClick={() => setPasswordCheckModalIsShow(false)}
            >
              취소
            </TheButton2>
          </ButtonContainer2>
        </TheModal>
      )}
      {/* 비밀번호 초기화 모달 */}
      {UserResetModal && (
        <TheModal title={"비밀번호 초기화"}>
          <CircleAlert size={80} style={{ color: "red", width: "100%" }} />
          <P
            style={{
              color: "red",
              width: "100%",
              marginBottom: "0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            초기화된 비밀번호는 복구되지 않습니다.
          </P>
          <P
            style={{
              width: "100%",
              marginTop: "0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            비밀번호 입력 후 "초기화"를 눌러주세요.
          </P>
          <Label>
            <P>비밀번호 :</P>
            <Input
              autoFocus
              autoComplete="off"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="현재 비밀번호를 입력하세요"
            />
          </Label>
          <ButtonContainer2>
            <TheButton2 $dark width="200px" onClick={() => resetPassword()}>
              초기화
            </TheButton2>
            <TheButton2 width="200px" onClick={() => setUserResetModal(false)}>
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
  margin-left: 300px;
  margin-top: 62px;
  position: relative;
  padding: 100px;
  padding-top: 60px;

  @media (max-width: 1090px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media (max-width: 850px) {
    margin-left: 150px;
  }

  @media (max-width: 700px) {
    margin-left: 0px;
    padding-left: 4px;
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
  position: absolute;
  top: 620px;
  left: 45%;

  @media (max-width: 700px) {
    left: 30%;
  }
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
  cursor: pointer;
  &:hover {
    background-color: #d9e5ff;
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
    min-width: 80px;
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
