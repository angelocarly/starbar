import React, { FC } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Admin from "../features/Admin/Admin";
import styles from "./App.module.scss";
import Order from "../features/Order/Order";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QR from "../features/QR/QR";
import Header from "../common/components/Header";
import PasswordReset from "../features/PasswordReset/PasswordReset";

const { Footer, Content } = Layout;

const App: FC = () => {
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
								<PasswordReset/>
							</Route>
							<Route path="/admin">
								<Admin/>
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
