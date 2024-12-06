import styled from "styled-components";

const TheTable2 = ({
    children,
    thead = []
}) => {
    return (
        <TableEl>
            <thead>
                <tr>
                {
                thead?.map((item, idx) => (
                    <td key={idx}>
                        {item}
                    </td>
                ))
            }  
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
            
        </TableEl>
    )
}

const TableEl = styled.table`
    & thead {
      background-color: #478eea;
    }
`

export default TheTable2;
 