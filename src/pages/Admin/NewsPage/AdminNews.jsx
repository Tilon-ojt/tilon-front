import React, { useState } from "react";
import TheLayout from "../../../components/element/TheLayout";
import TheButton from "../../../components/element/TheButton";
import TheTable from "../../../components/element/TheTable";
import { useNavigate } from "react-router-dom";

function AdminNews() {
  const thead = ["", "no", "Title", "URL"];
  const columnWidths = ["2%", "3%", "35%", "60%"];

  const initialTbody = [
    { id: 1, title: "News 1", url: "/news-1", thumbnailSrc: "~~1" },
    { id: 2, title: "News 2", url: "/news-2", thumbnailSrc: "~~2" },
    { id: 3, title: "News 3", url: "/news-3", thumbnailSrc: "~~3" },
    { id: 4, title: "News 4", url: "/news-4", thumbnailSrc: "~~4" },
    { id: 5, title: "News 5", url: "/news-5", thumbnailSrc: "~~5" },
  ];

  const [selectedRows, setSelectedRows] = useState([]);
  const [tbody, setTbody] = useState(initialTbody);

  const navigate = useNavigate();

  const searchHandler = (e) => {
    alert("Search!");
  };

  const goToCreateHandler = () => {
    navigate(`/admin/news/create`);
  };

  const goToEditHandler = (id) => {
    navigate(`/admin/news/${id}`);
    console.log(`/admin/news/${id}`);
  };

  const Td = ({ children, onClick }) => (
    <td onClick={onClick}>{children}</td>
  );

  // 삭제 버튼 핸들러 수정
  const deleteHandler = () => {
    setTbody((prevData) =>
      prevData.filter((newsItem) => !selectedRows.includes(newsItem.id))
    );
    setSelectedRows([]);
    console.log(`Deleted selected news items: ${selectedRows}`);
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
            <React.Fragment key={row.id}>
              <Td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => {
                    setSelectedRows((prevSelected) =>
                      prevSelected.includes(row.id)
                        ? prevSelected.filter((selected) => selected !== row.id)
                        : [...prevSelected, row.id]
                    );
                  }}
                />
              </Td>
              <Td onClick={() => goToEditHandler(row.id)}>{row.id}</Td>
              <Td onClick={() => goToEditHandler(row.id)}>{row.title}</Td>
              <Td onClick={() => goToEditHandler(row.id)}>{row.url}</Td>
            </React.Fragment>
          ))}
        </TheTable>
      }
    />
  );
}

export default AdminNews;
