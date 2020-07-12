import React, {FC} from "react";
import {Layout, PageHeader} from "antd";
import {createBrowserHistory} from "history";
import "antd/dist/antd.css";
import Admin from "../features/Admin/Admin";
import styles from "./App.module.scss";
import Menu from "../features/Menu/Menu";
import Confirm from "../features/Menu/Confirm/Confirm";

const { Content, Footer } = Layout;

const App: FC = () => {

	const { location } = createBrowserHistory();

	return (
		<Layout className={styles.layout}>
			<PageHeader title="Excuze"/>
			<Content className={styles.content}>
				{
					location.pathname === "/" ?
						<Menu/> :
					location.pathname === "/confirm" ?
						<Confirm/> :
					location.pathname === "/admin" ?
						<Admin/> :
						<div>categories</div>
				}
			</Content>
			<Footer className={styles.footer}>Excuze 2020</Footer>
		</Layout>
	);
};

export default App;
