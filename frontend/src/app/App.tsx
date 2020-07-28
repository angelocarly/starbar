import React, { FC } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Admin from "../features/Admin/Admin";
import styles from "./App.module.scss";
import Order from "../features/Order/Order";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import QR from "../features/Admin/QR/QR";
import Header from "../common/components/Header";

const { Footer } = Layout;

const App: FC = () => {
	return (
		<Layout className={styles.layout}>
			<Router>
				<Header/>
				<Switch>
					<Route path="/admin/qr">
						<Link to="/admin">Admin</Link>
						<QR/>
					</Route>
					<Route path="/admin">
						<Admin/>
					</Route>
					<Route path="/">
						<Order/>
					</Route>
				</Switch>
			</Router>
			<Footer className={styles.footer}>Excuze 2020</Footer>
		</Layout>
	);
};

export default App;
