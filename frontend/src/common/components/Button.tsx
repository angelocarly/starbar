import React, { CSSProperties, FC, ReactNode } from "react";
import { Button as AntButton } from "antd";
import { ButtonHTMLType } from "antd/es/button/button";

interface ButtonProps {
  children: ReactNode;
  htmlType: ButtonHTMLType;
  onClick: () => void;
  shape: "circle";
  icon: ReactNode;
  type: "primary";
  style: CSSProperties;
}

const Button: FC<Partial<ButtonProps>> = ({
  type = "primary",
  htmlType,
  children,
  onClick,
  shape,
  icon,
  style,
}: Partial<ButtonProps>) => {
  return (
    <AntButton
      style={style}
      type={type}
      shape={shape}
      htmlType={htmlType}
      onClick={onClick}
      icon={icon}
    >
      {children}
    </AntButton>
  );
};

export default Button;
