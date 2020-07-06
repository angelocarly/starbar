import React, { useState } from "react";
import {Button, Space, Typography} from "antd";
import { UserOutlined } from "@ant-design/icons/lib";
import Input from "../../common/components/Input/Input";
import styles from "./Login.module.scss";

const { Title } = Typography;

const Login = () => {

	const [password, setPassword] = useState<string>("");

	return (
		<div className={styles.login}>
			<Space direction="vertical">
				<Title
					style={{ textAlign: "center" }}
					level={4}
				>Vul je wachtwoord in</Title>
				<Space>
					<Input
						placeholder="Wachtwoord"
						prefix={<UserOutlined/>}
						value={password}
						onChange={value => setPassword(value)}
					/>
					<Button type="primary" onClick={() => {}}>Log in</Button>
				</Space>
			</Space>
		</div>
	);
};

export default Login;