import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import api from "../../../api/axios";
import { OPEN_MODAL } from "../../../reducer/AdminModal";
import TheButton2 from "../../../components/element/TheButton2";
import TheTable2 from "../../../components/element/TheTable2";
import styled from "styled-components";
import { ChevronRight, ChevronLeft } from "lucide-react";

function AdminPr({ token }) {
  const navigate = useNavigate(); // useNavigate 훅 추가
  console.log(`전달받은 jwt: ${JSON.stringify(token, null, 2)}`);

  useEffect(() => {
    getUserList();
  }, []);

  const dispatch = useDispatch();
  const openModal = () => {
    dispatch({ type: OPEN_MODAL });
    navigate("/admin/pr/write");
  };

  const [postInfo, setPostInfo] = useState([]);
  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    console.log("선택된 Post ID:", selectedPostIds);
  }, [selectedPostIds]);

  // 체크박스 상태 변경
  const handleCheckboxChange = (id) => {
    setSelectedPostIds((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  // 페이지네이션 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = postInfo.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(postInfo.length / itemsPerPage);

  // 페이지 이동 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  // 게시물 수정 페이지로 이동하는 함수
  const goToEditHandler = (postId) => {
    console.log(`선택한 게시물 ID: ${postId}`);
    navigate(`/admin/pr/${postId}`); // 해당 게시물의 수정 페이지로 이동
  };

  // admin 목록 받아오기
  const getUserList = async () => {
    try {
      const token = sessionStorage.getItem("jwt"); // 세션 저장소에서 토큰 가져오기
      console.log("JWT:", token);

      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await api.get("/admin/posts", {
        params: { 
          category: "PR", 
          page: currentPage 
        },
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      });

      console.log("게시글 목록:", response.data);
      setPostInfo(response.data.content); // 응답 데이터 설정

    } catch (error) {
      console.error("유저 목록 가져오기 실패:", error.message);
      alert("유저 데이터를 불러오는 데 실패했습니다.");
    }
  };

  // admin 삭제
  const deletePost = async () => {
    if (selectedPostIds.length === 0) {
      alert("삭제할 사용자가 선택되지 않았습니다.");
      return;
    } 
  };


  return (
    <Container>
      <ButtonContainer>
        <TheButton2 $primary onClick={openModal}>
          생성
        </TheButton2>
        <TheButton2 $danger onClick={deletePost}>
          삭제
        </TheButton2>
      </ButtonContainer>
      <Title>PR</Title>
      <TheTable2 thead={["", "번호", "제목", "내용", "작성날짜"]}>
        {currentItems.map((item) => (
          <TableRow key={item.postId}>
            <Td>
              <input
                type="checkbox"
                checked={selectedPostIds.includes(item.postId)}
                onChange={() => handleCheckboxChange(item.postId)}
              />
            </Td>
            <Td>{item.postId}</Td>
            <Td onClick={() => goToEditHandler(item.postId)} style={{ cursor: "pointer" }}>
              {item.title}
            </Td>
            
            <Td onClick={() => goToEditHandler(item.postId)} style={{ cursor: "pointer" }}>
              {item.content}
            </Td>
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
    </Container>
  );
}

export default AdminPr;

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
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: 60px;
  right: 100px;
  gap: 10px;
  z-index: 10;
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
  font-size: 14px; /* Font size for cells */
  border-bottom: 1px solid #e9e9e9; /* Add borders between rows */
`;

const TitleTd = styled.td`
  padding: 12px 15px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #e9e9e9;
  cursor: pointer; /* 제목 셀에만 포인터 커서 */
`;

const ContentTd = styled.td`
  padding: 12px 15px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #e9e9e9;
  cursor: pointer; /* 내용 셀에만 포인터 커서 */
`;
