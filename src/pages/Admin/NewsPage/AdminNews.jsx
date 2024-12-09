import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import TheLayout from "../../../components/element/TheLayout";
import TheButton from "../../../components/element/TheButton";
import TheTable from "../../../components/element/TheTable";
import { useNavigate } from "react-router-dom";

// AdminNews 컴포넌트
function AdminNews({ token }) {
  const navigate = useNavigate(); // useNavigate 훅 사용
  console.log(`전달받은 토큰: ${JSON.stringify(token, null, 2)}`);

  // 예제 데이터 (뉴스 리스트)
  const exampleNewsList = [
    {
      id: "1",
      title: "First News",
      thumbnail: null,
      url: "https://example.com/1",
    },
    {
      id: "2",
      title: "Second News",
      thumbnail: null,
      url: "https://example.com/2",
    },
    {
      id: "3",
      title: "Third News",
      thumbnail: null,
      url: "https://example.com/3",
    },
  ];
function AdminNews() {
  const thead = ["", "no", "Title", "Link", "latest update"];
  const columnwidths = ["2%", "3%", "35%", "40%", "20%"];

  const [selectedRows, setSelectedRows] = useState([]);
  const [tbody, setTbody] = useState([]);
  const navigate = useNavigate();

  // Axios로 데이터 불러오기
  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log("Fetching news data...");
        const token = localStorage.getItem("token");
        console.log("Token:", token);
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

        console.log("Fetched news data:", newsData);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        alert("데이터를 불러오지 못했습니다.");
        console.error("Fetch error:", error.message);
      }
    };

    fetchNews();
  }, []);

  const searchHandler = (e) => {
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

  const Td = ({ children, onClick }) => <td onClick={onClick}>{children}</td>;

  // 뉴스 삭제 버튼 핸들러
  const deleteHandler = async () => {
    console.log("Delete button clicked");

    if (selectedRows.length === 0) {
      console.log("No news items selected for deletion");
      alert("삭제할 항목을 선택하세요.");
      return;
    }

    if (!window.confirm("선택한 항목을 삭제하시겠습니까?")) {
      console.log("User cancelled the delete confirmation dialog");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      for (const postId of selectedRows) {
        console.log(`Deleting news item with postId: ${postId}`);
        await axios.delete(`/admin/post/category=News/${postId}`, {
          headers: {
            Authorization:` Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      setTbody((prevData) =>
        prevData.filter((newsItem) => !selectedRows.includes(newsItem.postId))
      );
      setSelectedRows([]);

      console.log("Selected news items have been deleted.");
      alert("선택한 항목이 삭제되었습니다.");
    } catch (error) {
      console.error("Failed to delete news:", error);
      console.error("Delete error:", error.message);
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
          columnwidths={columnwidths}
          withCheckbox={true}
          selectedRows={selectedRows}
          setSelectedRows={(rows) => {
            console.log("Selected rows updated:", rows);
            setSelectedRows(rows);
          }}
        >
          {tbody.map((row) => (
            <React.Fragment key={row.postId}>
              <Td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.postId)}
                  onChange={() => {
                    console.log(`Checkbox toggled for postId: ${row.postId}`);
                    setSelectedRows((prevSelected) =>
                      prevSelected.includes(row.postId)
                        ? prevSelected.filter((id) => id !== row.postId)
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
}
export default AdminNews;