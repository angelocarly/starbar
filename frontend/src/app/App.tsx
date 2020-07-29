import React, { FC, useEffect } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import styles from "./App.module.scss";
import Order from "../features/Order/Order";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QR from "../features/QR/QR";
import Header from "../common/components/Header";
import PasswordReset from "../features/PasswordReset/PasswordReset";
import { useDispatch, useSelector } from "react-redux";
import { setToken, token as tokenState } from "../features/Admin/Admin.slice";
import Categories from "../features/Admin/Categories/Categories";
import Login from "../features/Login/Login";
import { AppDispatch } from "./store";

const { Footer, Content } = Layout;

const App: FC = () => {

	const token = useSelector(tokenState);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(setToken(localStorage.getItem("access_token") || ""));
	}, [dispatch]);

	return (
		<Layout className={styles.layout}>
			<Router>
				<div className={styles.content}>
					<Header/>
					<Content>
						<Switch>
							<Route path="/admin/qr">
								<QR/>
							</Route>
							<Route path="/admin/password">
								{token ? <PasswordReset/> : <Login/>}
							</Route>
							<Route path="/admin">
								{token ? <Categories/> : <Login/>}
							</Route>
							<Route path="/">
								<Order/>
							</Route>
						</Switch>
					</Content>
				</div>
			</Router>
			<Footer className={styles.footer}>Excuze 2020</Footer>
		</Layout>
	);
};

export default App;
