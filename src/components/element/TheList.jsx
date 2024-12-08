import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import TheTable from "./components/element/TheTable";
import styled from "styled-components";

// 예시
{
  /* <UserList
title="관리자 목록"
thead={["", "이름", "아이디", "가입날짜"]}
data={adminInfo}
itemsPerPage={11}
columns={["nickName", "empName", "updatedAt"]}
onSelectionChange={handleSelectionChange} // 부모 컴포넌트로 선택된 아이디 전달
/> */
}

function UserList({
  title,
  thead,
  data,
  itemsPerPage,
  columns,
  onSelectionChange,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState({});

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prev) => {
      const newSelectedUsers = {
        ...prev,
        [id]: !prev[id], // 기존 값 반전
      };
      return newSelectedUsers;
    });
  };

  useEffect(() => {
    // 선택된 사용자만 필터링하여 전달
    const selectedUserIds = Object.keys(selectedUsers).filter(
      (id) => selectedUsers[id]
    );
    onSelectionChange(selectedUserIds); // 선택된 사용자 id 배열을 부모에게 전달
  }, [selectedUsers]);

  const getTableData = (item) => {
    const rowData = {};
    columns.forEach((column) => {
      rowData[column] = item[column];
    });
    return {
      checkbox: (
        <Checkbox
          type="checkbox"
          checked={selectedUsers[item.id] || false}
          onChange={() => handleCheckboxChange(item.id)}
        />
      ),
      ...rowData,
    };
  };

  return (
    <Container>
      <Title>{title}</Title>
      <ButtonContainer />
      <TheTable
        thead={thead}
        data={currentItems.map((item) => getTableData(item))}
      />
      <Pagination>
        <ChevronLeft />
        {pageNumbers.map((number) => (
          <PageButton
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </PageButton>
        ))}
        <ChevronRight />
      </Pagination>
    </Container>
  );
}

export default UserList;

// 스타일 컴포넌트
const Container = styled.div`
  padding: 20px;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: black;
  align-self: flex-start;
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 0;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;
  z-index: 20;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  bottom: -20px;
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

const Checkbox = styled.input`
  width: 20px;
  cursor: pointer;
`;
