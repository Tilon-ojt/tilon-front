// actionsAndReducer.js

// 초기 상태
const initialState = {
    data: [], // 데이터를 저장할 배열
  };
  
  // 액션 타입 정의
  const SUBMIT_N = "SUBMIT_N";
  const DELETE_N = "DELETE_N";
  
  // 액션 생성자
  export const submitAction = (payload) => ({
    type: SUBMIT_N,
    payload,
  });
  
  export const deleteAction = (payload) => ({
    type: DELETE_N,
    payload,
  });
  
  
  // 리듀서
  const NewsBtnReducer = (state = initialState, action) => {
    switch (action.type) {
      case SUBMIT_N:
        return {
          ...state,
          data: state.data.map((item) =>
            item.id === action.payload.id ? { ...item, ...action.payload } : item
          ), // ID로 항목을 찾아 업데이트
        };
      case DELETE_N:
        return {
          ...state,
          data: state.data.filter((item) => item.id !== action.payload.id), // ID로 항목을 찾아 삭제
        };

      default:
        return state;
    }
  };
  
  export default NewsBtnReducer;
  