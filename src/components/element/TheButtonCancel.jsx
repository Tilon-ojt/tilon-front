import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function TheButtonCancel({ link }) {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleClick = () => {
        navigate(link); // React Router로 페이지 이동
    };

    return (
        <Container onClick={handleClick}>
            <Btn>취소</Btn>
        </Container>
    );
}

const Container = styled.div`
    cursor: pointer; /* 클릭 가능한 UI로 변경 */
`;

const Btn = styled.button`
    width: 150px;
    height: 45px;
    background-color: lightgray;
    border-radius: 6px;
    border: none;
    transition: all 0.3s;

    color: black;
    font-size: 14px;

    &:hover {
        background-color: gray;
    }
`;


export default TheButtonCancel;
