export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

const initialState = {
    isShow: false
}

const AdminModal = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isShow: true
            }
        case CLOSE_MODAL:
            return {
                ...state,
                isShow: false
            }
        default:
            return state;
    }
}

export default AdminModal;