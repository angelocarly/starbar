import order from "../features/Order/Order.slice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	order
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
