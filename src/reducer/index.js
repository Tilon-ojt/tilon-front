import { combineReducers } from "redux";
import AdminModal from "./AdminModal";
import insightReducer from "./Insight";

const rootReducer = combineReducers({
    adminModal: AdminModal,
    insightPage: insightReducer,
});

export default rootReducer;