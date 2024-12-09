import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import TheLayout from "../../../components/element/TheLayout";
import TheButton from "../../../components/element/TheButton";
import TheTable from "../../../components/element/TheTable";
import { useNavigate } from "react-router-dom";

function AdminNews() {
  const thead = ["", "no", "Title", "Link", "latest update"];
  const columnWidths = ["2%", "3%", "35%", "40%", "20%"];

  const [selectedRows, setSelectedRows] = useState([]);
  const [tbody, setTbody] = useState([]);
  const navigate = useNavigate();

  // Axios로 데이터 불러오기
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/admin/post?category=NEWS", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const newsData = response.data.map((item) => ({
          postId: item.postId,
          title: item.title,
          url: item.link || "-",
          latestDate: format(new Date(item.updated_at), "yyyy-MM-dd HH:mm"),
        }));
        setTbody(newsData);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        alert("데이터를 불러오지 못했습니다.");
      }
    };

    fetchNews();
  }, []);

  const searchHandler = (e) => {
    alert("Search!");
  };

  const goToCreateHandler = () => {
    navigate(`/admin/news/create`);
  };

  const goToEditHandler = (postId) => {
    navigate(`/admin/news/${postId}`);
    console.log(`/admin/news/${postId}`);
  };

  const Td = ({ children, onClick }) => <td onClick={onClick}>{children}</td>;

  // 뉴스 삭제 버튼 핸들러
  const deleteHandler = async () => {

    // 체크 안 하고 클릭 시
    if (selectedRows.length === 0) {
      alert("삭제할 항목을 선택하세요.");
      return;
    }
    
    // 체크 후 클릭 시
    if (!window.confirm("선택한 항목을 삭제하시겠습니까?")) {
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
  
      // 선택된 각 postId에 대해 DELETE 요청
      for (const postId of selectedRows) {
        await axios.delete(`/admin/post/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
  
      // 로컬 상태 업데이트
      setTbody((prevData) =>
        prevData.filter((newsItem) => !selectedRows.includes(newsItem.postId))
      );
      setSelectedRows([]);
  
      alert("선택한 항목이 삭제되었습니다.");
    } catch (error) {
      console.error("Failed to delete news:", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };
  

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
            bgColor="#ff4141"
            width="150px"
            height="40px"
            onClick={deleteHandler}
          />
        </>
      }
      childrenTable={
        <TheTable
          thead={thead}
          columnWidths={columnWidths}
          withCheckbox={true}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        >
          {tbody.map((row) => (
            <React.Fragment key={row.postId}>
              <Td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.postId)}
                  onChange={() => {
                    setSelectedRows((prevSelected) =>
                      prevSelected.includes(row.postId)
                        ? prevSelected.filter((selected) => selected !== row.postId)
                        : [...prevSelected, row.postId]
                    );
                  }}
                />
              </Td>
              <Td onClick={() => goToEditHandler(row.postId)}>{row.postId}</Td>
              <Td onClick={() => goToEditHandler(row.postId)}>{row.title}</Td>
              <Td onClick={() => goToEditHandler(row.postId)}>{row.url}</Td>
              <Td onClick={() => goToEditHandler(row.postId)}>{row.latestDate}</Td>
            </React.Fragment>
          ))}
        </TheTable>
      }
    />
  );
}

export default AdminNews;
