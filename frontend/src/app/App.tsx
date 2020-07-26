import React, { FC } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Admin from "../features/Admin/Admin";
import styles from "./App.module.scss";
import Order from "../features/Order/Order";
import Router from "./Router";
import Header from "../common/components/Header";

const { Content, Footer } = Layout;

const App: FC = () => {
	return (
		<Layout className={styles.layout}>
			<div className={styles.container}>
				<Header/>
				<Content className={styles.content}>
					<Router routes={{
						"/": <Order/>,
						"/admin": <Admin/>
					}}/>
				</Content>
				<Footer className={styles.footer}>Excuze 2020</Footer>
			</div>
		</Layout>
	);
};

export default App;
