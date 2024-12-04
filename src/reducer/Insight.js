// reducer/Insight.js
const initialState = {
    insightShow: false,
    selectedInsight: null, // 선택된 인사이트 저장
};

export const OPEN_PAGE = "OPEN_PAGE";
export const CLOSE_PAGE = "CLOSE_PAGE";
export const SELECT_INSIGHT = "SELECT_INSIGHT";

const insightReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_PAGE:
            return { ...state, insightShow: true };
        case CLOSE_PAGE:
            return { ...state, insightShow: false, selectedInsight: null }; // 닫을 때 선택 초기화
        case SELECT_INSIGHT:
            return { ...state, selectedInsight: action.payload }; // 선택된 인사이트 저장
        default:
            return state;
    }
};

export default insightReducer;
