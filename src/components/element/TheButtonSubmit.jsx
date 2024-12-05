import styled from "styled-components";

function TheButtonSubmit({title}) {

    const handleClick = () => {
        // submit 기능
    };

    return (
        <Container onClick={handleClick}>
            <Btn>{title}</Btn>
        </Container>
    );
}

const Container = styled.div`
    cursor: pointer; /* 클릭 가능한 UI로 변경 */
`;

const Btn = styled.button`
    width: 150px;
    height: 45px;
    background-color: yellowgreen;
    border-radius: 6px;
    border: none;
    transition: all 0.3s;

    color: white;
    font-size: 14px;

    &:hover {
        background-color: green;
    }
`;


export default TheButtonSubmit;
