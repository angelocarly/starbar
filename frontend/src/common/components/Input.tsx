import React, { FC, ReactNode } from "react";
import { Input as AntInput, Form } from "antd";
import { Control, Controller, FieldError } from "react-hook-form";

interface InputProps {
    placeholder?: string,
	prefix?: ReactNode,
	type?: "password" | "number" | "text",
	control?: Control<Record<string, any>>,
	name?: string,
	error?: FieldError
}

const Input: FC<InputProps> = ({
	placeholder,
	prefix,
	type = "text",
	control,
	name,
	error
}: InputProps) => {
	return (
		<Controller
			control={control}
			name={name || ""}
			render={props => (
				<Form.Item
					validateStatus={error && "error"}
					help={error?.message}
				>
					<AntInput
						{...props}
						type={type}
						placeholder={placeholder}
						prefix={prefix}
					/>
				</Form.Item>
			)}
		/>
	);
};

export default Input;
