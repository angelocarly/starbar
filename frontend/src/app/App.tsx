import React, {FC} from "react";
import {Layout, PageHeader} from "antd";
import "antd/dist/antd.css";
import Admin from "../features/Admin/Admin";
import styles from "./App.module.scss";
import Order from "../features/Order/Order";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import QR from "../features/Admin/QR/QR";

const { Footer } = Layout;

const App: FC = () => {
	return (
		<Layout className={styles.layout}>
			<PageHeader title="Excuze"/>
			<Router>
				<Switch>
					<Route path="/admin/qr">
						<QR/>
					</Route>
					<Route path="/admin">
						<Admin/>
					</Route>
					<Route path="/">
						<Order/>
						<Footer className={styles.footer}>Excuze 2020</Footer>
						<Link to="/admin">Admin</Link>
					</Route>
				</Switch>
			</Router>
		</Layout>
	);
};

export default App;
