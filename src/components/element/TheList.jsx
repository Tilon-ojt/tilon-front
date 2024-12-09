import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import TheTable2 from "./TheTable2";
import styled from "styled-components";

function TheList({
  title,
  thead,
  data,
  itemsPerPage,
  columns,
  idColumn, // ID 컬럼 이름
  onSelectionChange,
  selectedUsers, // 부모에서 전달된 selectedUsers 상태
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsersState, setSelectedUsersState] = useState(selectedUsers); // 초기화된 상태 사용

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage); // 전체 페이지 수 계산

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleCheckboxChange = (id) => {
    setSelectedUsersState((prev) => ({
      ...prev,
      [id]: !prev[id], // 개별 ID의 상태 반전
    }));
  };

  useEffect(() => {
    // 부모에서 전달받은 selectedUsers로 상태를 업데이트
    setSelectedUsersState(selectedUsers);
  }, [selectedUsers]);

  useEffect(() => {
    // 선택된 사용자만 필터링하여 전달
    const selectedUserIds = Object.keys(selectedUsersState).filter(
      (id) => selectedUsersState[id]
    );

    onSelectionChange?.(selectedUserIds); // 선택된 사용자 id 배열을 부모에게 전달
  }, [selectedUsersState]);

  const getTableData = (item) => {
    const rowData = {};
    columns.forEach((column) => {
      rowData[column] = item[column];
    });
    return {
      checkbox: (
        <input
          type="checkbox"
          checked={selectedUsersState[item[idColumn]] || false}
          onChange={() => handleCheckboxChange(item[idColumn])}
        />
      ),
      ...rowData,
    };
  };

  return (
    <Container>
      <Title>{title}</Title>
      <TheTable2
        thead={thead}
        data={currentItems.map((item) => getTableData(item))}
      />
      <Pagination>
        <ChevronLeft
          onClick={handlePrevPage}
          style={{
            cursor: "pointer",
            visibility: currentPage > 1 ? "visible" : "hidden", // 'visibility'로 처리
          }}
        />
        {pageNumbers.map((number) => (
          <PageButton
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </PageButton>
        ))}
        <ChevronRight
          onClick={handleNextPage}
          style={{
            cursor: "pointer",
            visibility: currentPage < totalPages ? "visible" : "hidden", // 'visibility'로 처리
          }}
        />
      </Pagination>
    </Container>
  );
}

export default TheList;

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
