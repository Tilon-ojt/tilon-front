import { combineReducers } from "redux";
import AdminModal from "./AdminModal";
import insightReducer from "./Insight";
import NewsBtnReducer from "./NewsBtn";

const rootReducer = combineReducers({
    adminModal: AdminModal,
    insightPage: insightReducer,
    AdminNews : NewsBtnReducer
});

export default rootReducer;