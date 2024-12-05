import styled from "styled-components";

function TheButtonDel({ title, onDelete }) {
    // 삭제 처리 함수 (콘솔로 확인만)
    const handleClick = () => {
        if (onDelete) {
            console.log(`Deleting: ${title}`);  // 삭제하려는 항목 제목을 콘솔에 출력
            onDelete();  // 전달된 onDelete 함수 호출 (삭제 작업)
        }
    };

    return (
        <Container onClick={handleClick}>
            <Btn>Delete {title}</Btn>
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

export default TheButtonDel;
