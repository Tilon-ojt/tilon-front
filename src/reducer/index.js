import { combineReducers } from "redux";
import AdminModal from "./AdminModal";
import insightReducer from "./Insight";
import HeaderBar from "./HeaderBar";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
    adminModal: AdminModal,
    insightPage: insightReducer,
    headerbar: HeaderBar,
    auth: authSlice,
});

export default rootReducer;