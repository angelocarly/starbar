import React, { FC, useEffect } from "react";
import { Input, Form, Space, message } from "antd";
import styles from "./PasswordReset.module.scss";
import { useForm } from "antd/es/form/Form";
import Button from "../../common/components/Button";
import { resetPassword } from "./PasswordReset.service";

const PasswordReset: FC = () => {

	const [form] = useForm();

	useEffect(() => {
		form.setFieldsValue({
			password: ""
		});
	}, [form]);

	return (
		<div className={styles.container}>
			<Form form={form}>
				<Space align="baseline">
					<Form.Item
						name="password"
						rules={[
							{ required: true, message: "Vul een wachtwoord in" },
							{ min: 8, message: "Wachtwoord te kort" },
						]}
					>
						<Input placeholder="Wachtwoord"/>
					</Form.Item>
					<Button onClick={async () => {
						const { password } = await form.validateFields();
						await resetPassword(password);
						message.success(`Je nieuw wachtwoord is ${password}`);
					}}>Reset wachtwoord</Button>
				</Space>
			</Form>
		</div>
	);
};

export default PasswordReset;
