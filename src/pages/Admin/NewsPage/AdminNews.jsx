import React from "react";
import TheLayout from "../../../components/element/TheLayout";
import TheButton from "../../../components/element/TheButton";
import TheTable from "../../../components/element/TheTable";
import { useNavigate } from "react-router-dom";

function AdminNews() {
  const thead = ["no", "Title", "URL"];
  const columnWidths = ["10px", "10px", "200px", "300px"];

  // Test Data
  const tbody = [
    { id: 1, title: "News 1", url: "/news-1", thumbnailSrc:"~~1"},
    { id: 2, title: "News 2", url: "/news-2",  thumbnailSrc:"~~2"},
    { id: 3, title: "News 3", url: "/news-3",  thumbnailSrc:"~~3" },
    { id: 4, title: "News 4", url: "/news-4",  thumbnailSrc:"~~4" },
    { id: 5, title: "News 5", url: "/news-5", thumbnailSrc:"~~5" },
  ];

  const navigate = useNavigate();

  const clickHandler = (id) => {
    navigate(`/admin/news/${id}`);
  };

  // const Td =({children})=><td onClick={clickHandler}>{children}</td>
  const Td = ({ children, onClick }) => (
    <td onClick={onClick}>{children}</td>
  );
  return (
    <TheLayout
      title={"News"}
      hasSearch={true}
      childrenBtn={
        <>
          <TheButton
            label="Add new News"
            role="navigate"
            color="white"
            bgColor="#5060fb"
            width="150px"
            height="40px"
            href="/admin/news/create"
          />
          <TheButton
            label="Delete News"
            role="delete"
            color="white"
            bgColor="#ff4141"
            width="150px"
            height="40px"
          />
        </>
      }
      childrenTable={
        <TheTable
          thead={thead}
          columnWidths={columnWidths}
          withCheckbox={true}>
          {tbody.map((row) => (
            <>
              <Td onClick={() => clickHandler(row.id)}>{row.id}</Td>
              <Td onClick={() => clickHandler(row.id)}>{row.title}</Td>
              <Td onClick={() => clickHandler(row.id)}>{row.url}</Td>
            </>
          ))}
        </TheTable>
      }
    />
  );
}

export default AdminNews;
