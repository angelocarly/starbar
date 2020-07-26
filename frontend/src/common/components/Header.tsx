import React, { FC } from "react";
import { message, PageHeader } from "antd";
import Button from "./Button";
import { AppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { logout, token } from "../../features/Admin/Admin.slice";

const Header: FC = () => {

	const dispatch = useDispatch<AppDispatch>();

	return (
		<PageHeader
			title="Excuze"
			extra={useSelector(token) && <Button onClick={() => {
				localStorage.clear();
				dispatch(logout());
				message.success("Je bent uitgelogd!");
			}}>Uitloggen</Button>}
		/>
	);
};

export default Header;
