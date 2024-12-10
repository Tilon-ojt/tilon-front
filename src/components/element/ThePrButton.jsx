import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import styled from "styled-components";

// 액션 import
// import { submitAction, deleteAction,  } from "../../reducer/NewsBtn.js";

function ThePrButton({ label, type, payload }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 기본값 설정
  const isCancelBtn = type === "CancelN"; // 취소 버튼만 색상 변경

  const clickHandler = () => {
    switch (type) {
      case "NavigateN":
        // Create new ~ 버튼
        navigate('/admin/pr/create'); // "/admin/news/create" 페이지로 이동
        console.log("click create btn");
        break;

      case "CancelN":
        alert("작성을 취소합니다.");
        navigate('/admin/pr'); 
        break;

      case "SubmitN":
        // 작성 완료 or 수정 완료 버튼
        // dispatch(submitAction(payload));
        console.log("click submit btn");
        break;

      case "DeleteN":
        // 삭제 버튼
        // dispatch(deleteAction(payload));
        console.log("click delete btn");

        break;

      default:
        console.warn("Unknown action type");
    }
  };

  return (
    <Container onClick={clickHandler}>
      <Btn color={isCancelBtn ? "black" : "white"} 
           bgColor={isCancelBtn ? "#f5f5f5" : "#5060FB"}>
        {isCancelBtn ? "취소" : `${label}`}
      </Btn>
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;
`;

const Btn = styled.button`
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  width: 150px;
  height: 45px;
  border-radius: 6px;
  border: none;
  transition: all 0.3s;
  font-size: 14px;

  &:hover {
    background-color: #333;
    color: white;
  }
`;

export default ThePrButton;
