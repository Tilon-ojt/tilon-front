import { combineReducers } from "redux";
import AdminModal from "./AdminModal";
import insightReducer from "./Insight";
import NewsBtnReducer from "./NewsBtn";
import HeaderBar from "./HeaderBar";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
    adminModal: AdminModal,
    insightPage: insightReducer,
    headerbar: HeaderBar,
    auth: authSlice,
    AdminNews : NewsBtnReducer
});

export default rootReducer;