import { combineReducers } from "redux";
import AdminModal from "./AdminModal";
import insightReducer from "./Insight";
import HeaderBar from "./HeaderBar";

const rootReducer = combineReducers({
    adminModal: AdminModal,
    insightPage: insightReducer,
    headerbar: HeaderBar,
});

export default rootReducer;