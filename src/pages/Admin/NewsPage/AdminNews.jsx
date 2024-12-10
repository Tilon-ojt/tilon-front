import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TheLayout from "../../../components/element/TheLayout";
import TheButton from "../../../components/element/TheButton";
import TheTable from "../../../components/element/TheTable";
import api from "../../../api/axios";


function AdminNews({token}) {
  const thead = ["", "no", "Title", "Link", "latest update"];
  const columnwidths = ["2%", "3%", "35%", "40%", "20%"];
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const [tbody, setTbody] = useState([]);

  console.log("jwt: ", token);
  

  useEffect(() => {
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/admin/login");
    } else {
      fetchNews();
    }
  }, [token]);

  const fetchNews = async () => {
    try {
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }
  
      const response = await api.get("/admin/posts", {
        params: { 
          category: "NEWS",
          page: "1"
         },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
  
      console.log("뉴스 목록 조회:", response.data);
      setTbody(response.data.content);
  
    } catch (error) {
      console.error("Failed to fetch news:", error.message);
      alert("뉴스 데이터 로딩 실패.");
    }
  };
  
  
  const searchHandler = () => {
    console.log("Search button clicked");
    alert("Search!");
  };

  const goToCreateHandler = () => {
    console.log("Navigate to create news page");
    navigate(`/admin/news/create`);
  };

  const goToEditHandler = (postId) => {
    console.log(`Navigate to edit page for postId: ${postId}`);
    navigate(`/admin/news/${postId}`);
  };

  const handleCheckboxChange = (postId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(postId)
        ? prevSelected.filter((id) => id !== postId)
        : [...prevSelected, postId]
    );
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
        bgColor="#ff4141"
        width="150px"
        height="40px"
        onClick={deleteHandler}
      />
    </>
  );

  const renderTableRows = () =>
    tbody.map((row) => (
      <React.Fragment key={row.postId}>
        <Td>
          <input
            type="checkbox"
            checked={selectedRows.includes(row.postId)}
            onChange={() => handleCheckboxChange(row.postId)}
          />
        </Td>
        <Td onClick={() => goToEditHandler(row.postId)}>{row.postId}</Td>
        <Td onClick={() => goToEditHandler(row.postId)}>{row.title}</Td>
        <Td onClick={() => goToEditHandler(row.postId)}>{row.link}</Td>
        <Td onClick={() => goToEditHandler(row.postId)}>{row.updatedAt}</Td>
      </React.Fragment>
    ));

  const Td = ({ children, onClick }) => <td onClick={onClick}>{children}</td>;

  return (
    <TheLayout
      title="News"
      hasSearch={true}
      onClick={searchHandler}
      childrenBtn={renderButtons()}
      childrenTable={
        <TheTable
          thead={thead}
          columnwidths={columnwidths}
          withCheckbox={true}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        >
          {renderTableRows()}
        </TheTable>
      }
    />
  );
}

export default AdminNews;
