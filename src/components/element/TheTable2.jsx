import React from "react";
import styled from "styled-components";

function TheTable2({ thead, children }) {
  return (
    <CustomTable>
      <TableHeader>
        <tr>
          {thead?.map((item, idx) => (
            <Th key={idx}>{item}</Th>
          ))}
        </tr>
      </TableHeader>
      <tbody>{children}</tbody>
    </CustomTable>
  );
}

export default TheTable2;

const CustomTable = styled.table`
  width: 100%;
  border-collapse: collapse; /* 구분선 겹침 제거 */
  border: 1px solid #ddd; /* 테이블 전체 테두리 */
`;

const TableHeader = styled.thead`
  background-color: #d5d5d5;
`;

const Th = styled.th`
  padding: 12px 15px; /* Add padding for spacing */
  text-align: left; /* Align text to the left */
  font-size: 16px; /* Adjust font size */
  color: #333; /* Darker text color */
  font-weight: bold; /* Make header text bold */
  border: 1px solid #ddd; /* Header cell border */
`;

// const TableRow = styled.tr`
//   &:nth-child(even) {
//     background-color: #f9f9f9; /* Add alternating row colors */
//   }
// `;

// const Td = styled.td`
//   padding: 12px 15px; /* Padding for cells */
//   text-align: left; /* Left-align cell text */
//   font-size: 14px; /* Font size adjustment */
//   color: #555; /* Slightly lighter color for content */
//   border: 1px solid #ddd; /* Cell border for all rows */
//   &:nth-child(1) {
//     width: 20px;
//   }
//   &:nth-child(2) {
//     width: 60px;
//   }
//   &:nth-child(3) {
//     width: 200px;
//   }
// `;
