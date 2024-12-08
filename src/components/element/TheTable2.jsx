import React from "react";
import styled from "styled-components";

function TheTable({ thead, data }) {
  return (
    <CustomTable>
      <TableHeader>
        <tr>
          {thead?.map((item, idx) => (
            <Th key={idx}>{item}</Th>
          ))}
        </tr>
      </TableHeader>
      <tbody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {Object.keys(row).map((key, index) => (
              <Td key={index}>{row[key]}</Td>
            ))}
          </TableRow>
        ))}
      </tbody>
    </CustomTable>
  );
}

export default TheTable;

const CustomTable = styled.table`
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f2f2f2;
`;

const Th = styled.th`
  padding: 12px 15px; /* Add padding for spacing */
  text-align: left; /* Align text to the left */
  font-size: 16px; /* Adjust font size */
  color: #333; /* Darker text color */
  font-weight: bold; /* Make header text bold */
  border-bottom: 2px solid #ddd; /* Add bottom border for header cells */
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9; /* Add alternating row colors */
  }
`;

const Td = styled.td`
  padding: 12px 15px; /* Padding for cells */
  text-align: left; /* Left-align cell text */
  font-size: 14px; /* Font size adjustment */
  color: #555; /* Slightly lighter color for content */
  border-bottom: 1px solid #ddd; /* Light border between rows */
  &:nth-child(1) {
    width: 20px;
  }
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    width: 33%;
  }
`;
