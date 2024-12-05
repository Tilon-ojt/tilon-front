import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function TheButtonAdd({ title, link }) {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleClick = () => {
        navigate(link); // React Router로 페이지 이동
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
    background-color: #3142E6;
    border-radius: 6px;
    border: none;
    transition: all 0.3s;

    color: white;
    font-size: 14px;

    &:hover {
        background-color: #27324E;
    }
`;


export default TheButtonAdd;
