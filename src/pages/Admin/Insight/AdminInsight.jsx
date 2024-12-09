import React, { useState } from "react";
import TheLayout from "../../../components/element/TheLayout";
import TheButton from "../../../components/element/TheButton";
import TheTable from "../../../components/element/TheTable";
import { useNavigate } from "react-router-dom";

function AdminInsight() {
  const thead = ["", "no", "Title", "writer", "date"];
  const columnwidths = ["2%", "3%" , "75%","10%", "10%"];

  const initialTbody = [
    { id: 1, title: "INSIGHT 1", writer: "KDHong", date: "2024.12.2"},
    { id: 2, title: "INSIGHT 2", writer: "KDHong", date: "2024.12.4"},
  ];

  const [selectedRows, setSelectedRows] = useState([]);
  const [tbody, setTbody] = useState(initialTbody);

  const navigate = useNavigate();

  const searchHandler = (e) => {
    alert("Search!");
  };

  const goToCreateHandler = () => {
    navigate(`/admin/insight/create`);
  };

  const goToEditHandler = (id) => {
    navigate(`/admin/insight/${id}`);
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
      title="INSIGHT"
      hasSearch={true}
      onClick={searchHandler}
      childrenBtn={
        <>
          <TheButton
            label="Add new INSIGHT"
            width="150px"
            height="40px"
            onClick={goToCreateHandler}
          />
          <TheButton
            label="Delete INSIGHT"
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
              <Td onClick={() => goToEditHandler(row.id)}>{row.writer}</Td>
              <Td onClick={() => goToEditHandler(row.id)}>{row.date}</Td>
            </React.Fragment>
          ))}
        </TheTable>
      }
    />
  );
}

export default AdminInsight;
