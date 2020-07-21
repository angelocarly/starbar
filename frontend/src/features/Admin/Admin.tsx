import React, { FC } from "react";
import Categories from "./Categories";
import Login from "./Login/Login";
import { useSelector } from "react-redux";
import { token } from "./Admin.slice";

const Admin: FC = () => useSelector(token) ? <Categories/> : <Login/>;
export default Admin;
