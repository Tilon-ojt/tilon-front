import React from 'react';
// import TheLayout from "../../../components/element/TheLayout";
// import TheButton from "../../../components/element/TheButton";
import TheLayout from '../../components/element/TheLayout';
import TheButton from '../../components/element/TheButton';
import TheTable from '../../components/element/TheTable';

// Test용
function AdminAdmin() {

  const thead = ["id", "name"];

  const tbody = [
    [1,  "/news-1"],
    [2, "/news-2"],
    [3, "/news-3"],
  ];

  const Td = ({ children }) => <td>{children}</td>;

  return(
    <TheLayout 
      title={"User 관리"}
      hasSearch={false}
      childrenBtn={
        <>
          <TheButton 
            label="Add new User"
            role="modalopen"
            color="white"
            bgColor="#5060fb"
            width = "150px"
            height = "40px"
            href="/admin/"
          />

          <TheButton 
            label="Delete User"
            role="delete" 
            color="white"
            bgColor="#ff4141"
            width = "150px"
            height = "40px"
          />
        </>

      }
      
      childrenTable={
        <TheTable thead={thead} withCheckbox={true} isNavigate={false}>
          {tbody.map((row) => (
            row.map((cell, idx) => <Td key={idx}>{cell}</Td>)
          ))}
        </TheTable>
      }
      >


    </TheLayout>
  );
}

export default AdminAdmin;