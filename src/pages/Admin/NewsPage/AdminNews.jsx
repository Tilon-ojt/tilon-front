import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TheLayout from "../../../components/element/TheLayout";
import TheButton from "../../../components/element/TheButton";
import TheTable2 from "../../../components/element/TheTable2";
import api from "../../../api/axios";
import styled from "styled-components";


function AdminNews({token}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const [tbody, setTbody] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await api.get('/admin/posts', {
        params: { 
          category: "NEWS",
           page: "1"
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      console.log('모든 뉴스 데이터:', response.data.content);
      setTbody(response.data.content);
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
  
  

  const renderButtons = () => (
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
  );


  const Td = ({ children, onClick }) => <td onClick={onClick}>{children}</td>;

  return (
    <TheLayout
      title="News"
      hasSearch={true}
      onClick={searchHandler}
      childrenBtn={renderButtons()}
      childrenTable={
        <TheTable2 thead={["", "no", "title", "url", "latest update"]}>
        {/* <tbody> */}
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
        {/* </tbody> */}

      </TheTable2>
      }
    />
  );
}


export default AdminNews;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9; /* Add alternating row colors */
  }

  cursor: pointer;

  transition: all .35s;
  &:hover{
    background-color: #f0f8ff ;
  }

  Td{
  padding: 12px 15px; /* Padding for cells */
  text-align: left; /* Left-align cell text */
  font-size: 14px; /* Font size adjustment */
  color: #555; /* Slightly lighter color for content */
  border: 1px solid #ddd; /* Cell border for all rows */
  

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
}
`;
