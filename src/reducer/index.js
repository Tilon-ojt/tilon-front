import { combineReducers } from "redux";
import AdminModal from "./AdminModal";

const rootReducer = combineReducers({
    adminModal: AdminModal,
});

export default rootReducer;