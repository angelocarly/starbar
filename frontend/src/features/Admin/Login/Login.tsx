import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Button, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons/lib";
import Input from "../../../common/components/Input/Input";
import styles from "./Login.module.scss";

const { Title } = Typography;

interface LoginProps {
	setToken: Dispatch<SetStateAction<string>>;
}

const Login: FC<LoginProps> = ({ setToken }: LoginProps) => {

	const [password, setPassword] = useState<string>("");

	const login = async () => {
		setToken(await fetch("/login", {
			method: "POST",
			body: {

			}
		}));
	};

	return (
		<div className={styles.login}>
			<Space direction="vertical">
				<Title
					style={{ textAlign: "center" }}
					level={4}
				>Vul je wachtwoord in</Title>
				<form onSubmit={() => setToken(password)}>
					<Space>
						<Input
							placeholder="Wachtwoord"
							prefix={<UserOutlined/>}
							value={password}
							onChange={value => setPassword(value)}
						/>
						<Button type="primary" htmlType="submit">Log in</Button>
					</Space>
				</form>
			</Space>
		</div>
	);
};

export default Login;