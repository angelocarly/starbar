import React, { FC } from "react";
import { PageHeader, Space } from "antd";
import Button from "./Button";
import { AppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { token as tokenState } from "../../features/Admin/Admin.slice";
import { Link, useLocation } from "react-router-dom";
import { name as nameState, table as tableState } from "../../features/Order/Order.slice";
import { logout } from "../../features/Admin/Admin.thunks";

const Header: FC = () => {

	const dispatch = useDispatch<AppDispatch>();
	const name = useSelector(nameState);
	const table = useSelector(tableState);
	const token = useSelector(tokenState);

	return (
		<PageHeader
			title={<Link to="/">Excuse</Link>}
			extra={<Space size="middle" align="center">
				{useLocation().pathname.startsWith("/admin") && <>
					<Link to="/admin/qr">Genereer QR Codes</Link>
					{ token && <Link to="/admin/password">Wachtwoord resetten</Link>}
					<Link to="/admin">Administratie</Link>
				</>}
				{name && <p key={0}><b>Naam:</b> {name}</p>}
				{table && <p key={1}><b>Tafel:</b> {table}</p>}
				{token && <Button
					key={2}
					onClick={() => dispatch(logout())}
				>Uitloggen</Button>}
			</Space>}
		/>
	);
};

export default Header;
