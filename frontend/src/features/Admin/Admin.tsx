import React, { FC, useEffect } from "react";
import Categories from "./Categories/Categories";
import Login from "./Login/Login";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./Admin.slice";
import { AppDispatch } from "../../app/store";

// Hier menu object/state bijhouden en doorgeven aan views
const Admin: FC = () => {

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return localStorage.getItem("access_token")
		? <Categories/>
		: <Login/>;
};
export default Admin;
