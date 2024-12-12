import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import TheLayout from "../../../components/element/TheLayout";
import TheButton from "../../../components/element/TheButton";
import TheTable2 from "../../../components/element/TheTable2";
import api from "../../../api/axios";
import styled from "styled-components";


function AdminNews({token}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const [tbody, setTbody] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");


  useEffect(() => {
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/admin/login");
    } else {
      fetchNews(currentPage);
    }
  }, [currentPage, token]);

  const fetchNews = async (page) => {
    try {
      const token = sessionStorage.getItem("jwt");
      console.log("jwt: ", token);

      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await api.get('/admin/posts', {
        params: { 
          category: "NEWS",
          page: page,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("뉴스 목록 조회:", response.data);
      setTbody(response.data.content);
      setTotalPages(response.data.totalPages);

    } catch (error) {
      console.error("Failed to fetch news:", error.message);
      alert("뉴스 데이터 로딩 실패.");
    }
  };

  useEffect(() => {
    if(token){
      fetchNews();
    }
  }, []);


  const pageHandler =(page)=>{
    if(page>=1 && page <= totalPages){
      setCurrentPage(page);
    }
  }

  const searchHandler = () => {
    console.log("Search button clicked");
    alert("Search!");
  };

  const goToCreateHandler = () => {
    console.log("Navigate to create news page");
    navigate(`/admin/news/create`);
  };

  const goToDetailHandler = (postId) => {
    console.log(`Navigate to detail page for postId: ${postId}`);
    navigate(`/admin/news/${postId}`);
  };

  const handleCheckboxChange = (postId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(postId)
        ? prevSelected.filter((id) => id !== postId)
        : [...prevSelected, postId]
    );
  };

  const handleRowClick = (postId, e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    goToDetailHandler(postId);
  };
  

  // 삭제 핸들러
  const deleteHandler = async () => {  
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
  
    try {
      for (const postId of selectedRows) {
        await api.delete(`/admin/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      setTbody((prevData) =>
        prevData.filter((newsItem) => !selectedRows.includes(newsItem.postId))
      );
      
      setSelectedRows([]);
      alert("선택한 항목이 삭제되었습니다.");
    } catch (error) {
      console.error("Failed to delete news:", error.message);
      alert("삭제에 실패했습니다.");
    }
  };
  

  const Td = ({ children, onClick }) => <td onClick={onClick}>{children}</td>;

  return (
    <TheLayout
      title="News"
      hasSearch={true}
      onClick={searchHandler}
      childrenBtn={
        <>
        <TheButton
          label="Add new News"
          width="150px"
          height="40px"
          onClick={goToCreateHandler}
        />
        <TheButton
          label="Delete News"
          role="delete"
          color="white"
          $bgColor="#ff4141"
          width="150px"
          height="40px"
          onClick={deleteHandler}
        />
      </>
      }
      childrenTable={
        <>
          <TheTable2 thead={["", "no", "title", "url", "latest update"]}>
            {tbody.map((item) => (
              <TableRow
                key={item.postId}
                selected={selectedRows.includes(item.postId)}
                onClick={(e) => handleRowClick(item.postId, e)} 
              >
              <Td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item.postId)}
                  onChange={(e) => handleCheckboxChange(item.postId)}
                  onClick={(e) => e.stopPropagation()}  // 클릭 시 링크 이동 방지
                 />
              </Td>
                 <Td>{item.postId}</Td>
                 <Td>{item.title}</Td>
                 <Td>{item.link}</Td>
                 <Td>{item.updatedAt}</Td>
               </TableRow>
              ))}
          </TheTable2>

          <Pagination>

            <ArrowBtn>
              <ChevronLeft  
                  onClick={() => pageHandler(currentPage - 1)} 
                  disabled={currentPage === 1}
              />
            </ArrowBtn>



            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => pageHandler(idx + 1)}
                disabled={currentPage === idx + 1}
              >
                {idx + 1}
              </button>
            ))}
            <ArrowBtn>
              <ChevronRight 
                onClick={() => pageHandler(currentPage + 1)} 
                disabled={currentPage === totalPages}
              />
            </ArrowBtn>
          </Pagination>
        </>
      }
    />
  );
}

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  cursor: pointer;
  transition: all 0.35s;

  &:hover {
    background-color: #f0f8ff;
  }

  td {
    padding: 12px 15px;
    text-align: left;
    font-size: 14px;
    color: #555;
    border: 1px solid #ddd;
    height: 20px; /* 셀 높이를 고정 */
    max-width: 150px; /* 셀 너비 최대 값 */
    overflow: hidden;
    text-overflow: ellipsis; /* 넘칠 경우 말줄임 처리 */
    white-space: nowrap; /* 내용이 한 줄로 유지됨 */
    word-break: break-all; /* 긴 단어도 깨서 출력 */
  }

  &:nth-child(1) {
    width: 2%;
  }
  &:nth-child(2) {
    min-width: 50px;
    width: 3%;
  }
  &:nth-child(3) {
    min-width: 100px;
    width: 35%;
  }
  &:nth-child(4) {
    min-width: 100px;
    width: 40%;
  }
  &:nth-child(5) {
    min-width: 20%;
  }

`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;


  button {
    cursor: pointer;
    background-color: transparent;
    margin: 0 5px;
    border: none;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 100%;


    &:hover {
      background-color: #007bff;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

`;

const ArrowBtn = styled.div`
  cursor: pointer;
`

export default AdminNews;
