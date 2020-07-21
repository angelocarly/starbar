import React, { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { Button, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons/lib";
import Input from "../../../common/components/Input/Input";
import styles from "./Login.module.scss";
import { apiCall } from "../../../common/utils/fetch";
import { handleConstraintError } from "../../../common/utils/error";

const { Title } = Typography;

interface LoginProps {
	setToken: Dispatch<SetStateAction<string>>;
}

const Login: FC<LoginProps> = ({ setToken }: LoginProps) => {

	const [password, setPassword] = useState<string>("");

	const login = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		try {
			const result = await apiCall<string>("/api/login", {
				method: "POST",
				body: { password }
			});
			setToken(result);
		} catch (e) {
			handleConstraintError(e.message);
		}
	};

	return (
		<div className={styles.login}>
			<Space direction="vertical">
				<Title
					style={{ textAlign: "center" }}
					level={4}
				>Vul je wachtwoord in</Title>
				<form onSubmit={async (event) => await login(event)}>
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
