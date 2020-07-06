import React, { FC, ReactNode } from "react";
import { Input as AntInput } from "antd";

interface InputProps {
    value: string,
    onChange: (value: string) => void
    placeholder?: string,
	prefix?: ReactNode
}

const Input: FC<InputProps> = ({
	value,
	onChange,
	placeholder,
	prefix
}: InputProps) => {
	return (
		<AntInput
			value={value}
			onChange={event => onChange(event.target.value)}
			placeholder={placeholder}
			prefix={prefix}
		/>
	);
};

export default Input;