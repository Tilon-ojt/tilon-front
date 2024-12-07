import React from "react";
import TheLayout from "../../../components/element/TheLayout";
import TheButton from "../../../components/element/TheButton";
import TheTable from "../../../components/element/TheTable";

function AdminNews() {


  const thead = ["No", "Title", "URL"];
  const columnWidths = ["10px", "10px", "200px", "300px"]; // 각 열의 너비 설정

  const tbody = [
    [1, "News 1", "/news-1"],
    [2, "News 2", "/news-2"],
    [3, "News 3", "/news-3"],
    [1, "News 1", "/news-1"],
    [2, "News 2", "/news-2"],
    [3, "News 3", "/news-3"],
    [1, "News 1", "/news-1"],
    [2, "News 2", "/news-2"],
    [3, "News 3", "/news-3"],
    [1, "News 1", "/news-1"],
    [2, "News 2", "/news-2"],
    [3, "News 3", "/news-3"],
    [3, "News 3", "/news-3"],
    [3, "News 3", "/news-3"],
    [3, "News 3", "/news-3"],
    [3, "News 3", "/news-3"],
    [3, "News 3", "/news-3"],
    [3, "News 3", "/news-3"],
    [3, "News 3", "/news-3"],
    [3, "News 3", "/news-3"],
    [3, "News 3", "/news-3"],
    [3, "News 3", "/news-3"],
  
  ];

  const Td = ({ children }) => <td>{children}</td>;

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
            row.map((cell, idx) => <Td key={idx}>{cell}</Td>)
          ))}
        </TheTable>
      }
    />
  );
}


export default AdminNews;
