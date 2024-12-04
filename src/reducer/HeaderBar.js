export const OPEN_MENU = "OPEN_MENU";
export const CLOSE_MENU = "CLOSE_MENU";

const initialState = {
    isShow: false
}

const HeaderBar = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MENU:
            return {
                ...state,
                isShow: true
            }
        case CLOSE_MENU:
            return {
                ...state,
                isShow: false
            }
        default:
            return state;
    }
}

export default HeaderBar;