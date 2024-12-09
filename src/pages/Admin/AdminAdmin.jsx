import React, { useState } from "react";
import TheLayout from "../../components/element/TheLayout";
import TheButton from "../../components/element/TheButton";
import TheTable from "../../components/element/TheTable";

function AdminAdmin() {
  const thead = ["", "userid", "name"];
  const columnWidths = ["2%", "49%", "49%"];

  const initialTbody = [
    { id: 1, userid: "KDHong1", name: "홍길동" },
    { id: 2, userid: "KDHong2", name: "홍길동" },
    { id: 3, userid: "KDHong3", name: "홍길동" },
    { id: 4, userid: "KDHong4", name: "홍길동" },
    { id: 5, userid: "KDHong5", name: "홍길동" },
  ];

  const [selectedRows, setSelectedRows] = useState([]);
  const [tbody, setTbody] = useState(initialTbody);

  const searchHandler = () => {
    alert("Search!");
  };

  const goToCreateHandler = () => {
    alert("modal을 띄웁니다");
  };

  const deleteHandler = () => {
    setTbody((prevData) =>
      prevData.filter((userItem) => !selectedRows.includes(userItem.id))
    );
    setSelectedRows([]);
    console.log(`Deleted selected user items: ${selectedRows}`);
  };

  const Td = ({ children }) => <td>{children}</td>;

  return (
    <TheLayout
      title="User 관리"
      hasSearch={false}
      onClick={searchHandler}
      childrenBtn={
        <>
          <TheButton
            label="Add new User"
            width="150px"
            height="40px"
            onClick={goToCreateHandler}
          />
          <TheButton
            label="Delete User"
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
              <Td>{row.userid}</Td>
              <Td>{row.name}</Td>
            </React.Fragment>
          ))}
        </TheTable>
      }
    />
  );
}

export default AdminAdmin;
