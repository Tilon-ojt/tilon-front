import React from 'react';
import TheLayout from "../../../components/element/TheLayout";
import TheButton from "../../../components/element/TheButton";

// AdminInsight 컴포넌트
function AdminInsight() {
  return(
    <TheLayout 
      title={"INSIGHT"}
      hasSearch={true}
      childrenBtn={
        <>
          <TheButton 
            label="Add new Insight"
            role="navigate"
            color="white"
            bgColor="#5060fb"
            width = "150px"
            height = "40px"
            href="/admin/"
          />

          <TheButton 
            label="Delete Insight"
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

export default AdminInsight;