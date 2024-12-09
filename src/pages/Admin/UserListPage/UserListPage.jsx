import AdminAddModal from "../../../components/common/AdminAddModal";
import TheButton2 from "../../../components/element/TheButton2";
import TheList from "../../../components/element/TheList";
import { OPEN_MODAL } from "../../../reducer/AdminModal";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import styled from "styled-components";
import "./UserListPage.css";

function UserListPage({ token }) {
  const isShow = useSelector((state) => state.adminModal.isShow);
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch({ type: OPEN_MODAL });
  };

  const [adminInfo, setAdminInfo] = useState([]);
  const [adminIds, setAdminIds] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState({}); // selectedUsers 상태 추가

  console.log(`전달받은 jwt: ${JSON.stringify(token, null, 2)}`);

  useEffect(() => {
    getUserList();
  }, []);

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

  // 체크박스에 선택된 id 받아오기
  const handleSelectionChange = (selectedUserIds) => {
    setAdminIds(selectedUserIds);
  };

  useEffect(() => {
    console.log(`전달받은 id들: ${adminIds}`);
  }, [adminIds]);

  // admin 삭제
  const deleteUesr = async () => {
    const isConfirmed = window.confirm("선택한 사용자를 삭제하시겠습니까?");
    if (isConfirmed) {
      // console.log(`삭제될 유저 번호: ${JSON.stringify(adminIds, null, 2)}`);
      console.log(`삭제될 유저 번호: ${adminIds}`);

      try {
        const response = await api.delete("/admin/account", {
          data: { adminIds },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("삭제 성공:", response.data);
        alert("해당 유저가 삭제되었습니다.");
        getUserList();
      } catch (error) {
        alert(`유저삭제 실패`);
        console.error("삭제 실패:", error);
      }
    } else {
      console.log("삭제가 취소되었습니다.");
    }
  };

  // 비밀번호 초기화
  const resetPassword = async () => {
    if (adminIds.length !== 1) {
      alert("한 번에 하나의 계정만 비밀번호를 초기화할 수 있습니다.");
      return;
    }
    const adminId = parseInt(adminIds[0], 10); // 숫자로 변환
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
        setSelectedUsers({}); // 초기화 상태로 변경
      } catch (error) {
        alert(`초기화 실패`);
        console.error("초기화 실패:", error);
      }
    } else {
      console.log("초기화가 취소되었습니다.");
    }
  };

  return (
    <Container>
      {/* <UserList adminInfo={adminInfo} getUserList={getUserList} /> */}
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
      <TheList
        title="유저 관리"
        thead={["", "번호", "이름", "아이디", "가입날짜"]}
        data={adminInfo}
        itemsPerPage={10}
        columns={["adminId", "nickname", "empName", "updatedAt"]}
        onSelectionChange={handleSelectionChange} // 부모 컴포넌트로 선택된 아이디 전달
        idColumn={"adminId"}
        selectedUsers={selectedUsers} // selectedUsers를 자식 컴포넌트에 전달
      />
      {isShow ? <AdminAddModal getUserList={getUserList} /> : null}
    </Container>
  );
}

export default UserListPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 62px);
  margin-left: 300px;
  margin-top: 62px;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  right: 20px;
  gap: 10px;
  z-index: 10;
`;
