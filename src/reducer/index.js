import { combineReducers } from "redux";
import AdminModal from "./AdminModal";
import HeaderBar from "./HeaderBar";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  adminModal: AdminModal,
  headerbar: HeaderBar,
  auth: authSlice,
});

export default rootReducer;
