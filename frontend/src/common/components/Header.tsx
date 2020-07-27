import React, { FC } from "react";
import { message, PageHeader, Space } from "antd";
import Button from "./Button";
import { AppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { logout, token } from "../../features/Admin/Admin.slice";
import {
	table as tableState,
	name as nameState
} from "../../features/Order/Order.slice";

const Header: FC = () => {

	const dispatch = useDispatch<AppDispatch>();
	const name = useSelector(nameState);
	const table = useSelector(tableState);

	return (
		<PageHeader
			title="Excuze"
			extra={<Space size="middle" align="center">
				{name && <p key={0}><b>Naam:</b> {name}</p>}
				{table && <p key={1}><b>Tafel:</b> {table}</p>}
				{useSelector(token) && <Button
					key={2}
					onClick={() => {
						localStorage.clear();
						dispatch(logout());
						message.success("Je bent uitgelogd!");
					}}
				>Uitloggen</Button>}
			</Space>}
		/>
	);
};

export default Header;
