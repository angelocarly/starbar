import React, { FC, ReactNode } from "react";
import { Input as AntInput } from "antd";
import { Control, Controller } from "react-hook-form";

interface InputProps {
    placeholder?: string,
	prefix?: ReactNode,
	type?: "password" | "number" | "text",
	control?: Control<Record<string, any>>,
	name?: string
}

const Input: FC<InputProps> = ({
	placeholder,
	prefix,
	type = "text",
	control,
	name
}: InputProps) => {
	return (
		<Controller
			control={control}
			name={name || ""}
			render={props => (
				<AntInput
					{...props}
					type={type}
					placeholder={placeholder}
					prefix={prefix}
				/>
			)}
		/>
	);
};

export default Input;
