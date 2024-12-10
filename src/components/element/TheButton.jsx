import styled from "styled-components";

const TheButton = ({
  label, // 버튼 이름
  color="white", // 버튼 글자 색
  $bgColor="#5060fb",// 버튼 배경 색
  width, // 버튼 가로 길이
  height, // 버튼 세로 길이
  onClick, // 클릭 핸들러
}) => {

  return (
    <ButtonStyled
      onClick={onClick}
      width={width}
      height={height}
      $bgColor={$bgColor}
      color={color}
    >
      {label}
    </ButtonStyled>
  );
};

// styled-components로 스타일 정의
const ButtonStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: all 0.35s;
  cursor: pointer;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  background-color: ${(props) => props.$bgColor};

  &:hover {
    color: white;
    background-color: #333;
  }
`;

export default TheButton;
