import React, { FC, useEffect } from "react";
import Categories from "./Categories/Categories/Categories";
import Login from "./Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { setToken, token } from "./Admin.slice";

const Admin: FC = () => {

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(setToken(localStorage.getItem("access_token") || ""));
	}, [dispatch]);

	return useSelector(token)
		? <Categories/>
		: <Login/>;
};
export default Admin;
