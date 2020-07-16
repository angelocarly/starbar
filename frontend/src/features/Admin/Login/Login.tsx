import React, { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { UserOutlined } from "@ant-design/icons/lib";
import Input from "../../../common/components/Input";
import styles from "./Login.module.scss";
import { apiCall } from "../../../common/utils/fetch";
import { handleConstraintError } from "../../../common/utils/error";
import { Space, Typography } from "antd";
import Button from "../../../common/components/Button";

const { Title } = Typography;

interface LoginProps {
	setToken: Dispatch<SetStateAction<string>>;
}

const Login: FC<LoginProps> = ({ setToken }: LoginProps) => {

	const [password, setPassword] = useState<string>("");

	const login = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		try {
			const result = await apiCall<string>("/login", {
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
						/>
						<Button type="submit">Log in</Button>
					</Space>
				</form>
			</Space>
		</div>
	);
};

export default Login;
