import React from 'react';
import TheLayout from "../../../components/element/TheLayout";
import TheButton from "../../../components/element/TheButton";

// AdminPr 컴포넌트
function AdminPr() {
  return(
    <TheLayout 
      title={"PR"}
      hasSearch={true}
      childrenBtn={
        <>
          <TheButton 
            label="Add new PR"
            role="navigate"
            color="white"
            bgColor="#5060fb"
            width = "150px"
            height = "40px"
            href="/admin/"
          />

          <TheButton 
            label="Delete PR"
            role="delete" 
            color="white"
            bgColor="#ff4141"
            width = "150px"
            height = "40px"
          />
        </>

      }>
    </TheLayout>
  );
}

export default AdminPr;