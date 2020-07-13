import menu from "../features/Menu/Menu.slice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    menu
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
