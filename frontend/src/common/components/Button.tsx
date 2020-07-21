import React, { FC, ReactNode } from "react";
import { Button as AntButton } from "antd";
import { ButtonHTMLType } from "antd/es/button/button";

interface ButtonProps {
	children: ReactNode,
	type?: ButtonHTMLType,
	onClick?: () => void,
}

const Button: FC<ButtonProps> = ({
	type,
	children,
	onClick,
}: ButtonProps) => {
	return <AntButton
		type="primary"
		htmlType={type}
		onClick={onClick}
	>
		{children}
	</AntButton>;
};

export default Button;
