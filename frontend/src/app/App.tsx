import React, { FC } from "react";
import { Layout, PageHeader } from "antd";
import { createBrowserHistory } from "history";
import "antd/dist/antd.css";
import Login from "../features/Login/Login";

const { Content, Footer } = Layout;

const App: FC = () => {

	const { location } = createBrowserHistory();

	return (
		<Layout style={{ height: "100vh" }}>
			<PageHeader title="Login"/>
			<Content>
				{
					location.pathname === "/admin" ?
						<Login/> :
						<div>categories</div>
				}
			</Content>
			<Footer style={{ textAlign: "center" }}>Excuse 2020</Footer>
		</Layout>
	);
};

export default App;
