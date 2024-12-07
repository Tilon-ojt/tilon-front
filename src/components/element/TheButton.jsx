import styled from "styled-components";

const TheButton = ({
  label, // 버튼 이름
  role, // 버튼 역할 (navigate, save, delete)
  color, // 버튼 글자 색
  bgColor, // 버튼 배경 색
  width, // 버튼 가로 길이
  height, // 버튼 세로 길이
  href, // 이동 버튼일 때의 연결 링크
  action, // 저장 또는 삭제 동작에 사용할 데이터
  onClick, // 외부에서 전달받은 추가 클릭 핸들러
}) => {

  // 버튼 역할 지정 핸들러
  const roleHandler = () => {
    switch (role) {
      case "navigate":
        if (href) {
          window.location.href = href; // 지정된 링크로 이동
        } else {
          alert("이동할 링크가 없습니다");
        }
        break;
      case "submit":
        if (action) {
          localStorage.setItem("savedData", action); // 로컬 스토리지에 데이터 저장
          alert("데이터가 저장되었습니다!");
        } else {
          alert("저장할 데이터를 입력하세요");
        }
        break;
      case "delete":
        localStorage.removeItem("savedData"); // 로컬 스토리지 데이터 삭제
        alert("데이터가 삭제되었습니다");
        break;
      case "modalopen":
        alert("모달을 엽니다");
        break;
      default:
        alert("버튼 role 미지정");
    }
  };

  // 클릭 핸들러
  const clickHandler = () => {
    roleHandler(); // 역할 처리
    if (onClick) onClick(); // 외부 핸들러 실행
  };

  return (
    <ButtonStyled
      onClick={clickHandler}
      width={width}
      height={height}
      bgColor={bgColor}
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
  background-color: ${(props) => props.bgColor};

  &:hover {
    color: white;
    background-color: #333;
  }
`;

export default TheButton;
