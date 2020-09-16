import order from "../features/Order/Order.slice";
import admin from "../features/Admin/Admin.slice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  order,
  admin,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
