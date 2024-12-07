import styled from "styled-components";

const TheTable = ({
  children,
  thead = [],
  withCheckbox = false, // 체크박스 열 추가 여부
  columnWidths = [], // 각 열의 너비 배열
}) => {
  return (
    <TableEl columnWidths={columnWidths}>
      <thead>
        <tr>
          {withCheckbox && <ThCheckbox />}
          {thead?.map((item, idx) => (
            <Th key={idx}>{item}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {children.map((row, idx) => (
          <tr key={idx}>
            {withCheckbox && (
              <Td>
                <input type="checkbox" />
              </Td>
            )}
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
  table-layout: fixed; /* 고정된 열 너비를 적용 */
  border: 1px solid #ddd;

  & thead {
    background-color: #222c44;
    color: white;
    text-align: left;
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

  ${({ columnWidths }) =>
    columnWidths.length > 0 &&
    columnWidths.map(
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

const ThCheckbox = styled.th`
  width: 40px;
`;

const Td = styled.td`
  text-align: center;
`;

export default TheTable;
