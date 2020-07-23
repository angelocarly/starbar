import React, {FC} from "react";
import {Layout, PageHeader} from "antd";
import "antd/dist/antd.css";
import Admin from "../features/Admin/Admin";
import styles from "./App.module.scss";
import Order from "../features/Order/Order";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

const { Footer } = Layout;

const App: FC = () => {
	return (
		<Layout className={styles.layout}>
			<PageHeader title="Excuze"/>
			<Router>
				<Link to="/">Home</Link>
				<Link to="/admin">Admin</Link>

				<Switch>
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
