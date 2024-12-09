import styled from "styled-components";

const TheTable = ({
  children,
  thead = [],
  columnwidths = [], // 각 열의 너비 배열
}) => {
  return (
    <TableEl columnwidths={columnwidths}>
      <thead>
        <tr>
          {thead?.map((item, idx) => (
            <Th key={idx}>{item}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {children.map((row, idx) => (
          <tr key={idx}>
            {row}
          </tr>
        ))}
      </tbody>
    </TableEl>
  );
};

// 스타일 정의
const TableEl = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f9f9;
  table-layout: fixed;
  border: 1px solid #ddd;

  & thead {
    background-color: #222c44;
    color: white;
    text-align: center;
  }

  & tbody tr:hover {
    background-color: #f0f8ff;
    transition: background-color 0.3s;
    cursor: pointer;
  }

  & th,
  & td {
    padding: 5px 10px;
    border: 1px solid #ddd;
  }

  ${({ columnwidths }) =>
    columnwidths.length > 0 &&
  columnwidths.map(
      (width, idx) => `
        & th:nth-child(${idx + 1}),
        & td:nth-child(${idx + 1}) {
          width: ${width};
        }
      `
    )}
`;

const Th = styled.th`
  font-weight: normal;
`;

export default TheTable;

