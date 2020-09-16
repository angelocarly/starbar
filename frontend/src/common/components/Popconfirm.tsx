import React, { FC } from "react";
import { Popconfirm as AntPopconfirm } from "antd";

interface PopconfirmProps {
  title: string;
  onConfirm: () => void;
  onCancel?: () => void;
  children: any;
}

const Popconfirm: FC<PopconfirmProps> = ({
  title,
  onConfirm,
  onCancel,
  children,
}: PopconfirmProps) => {
  return (
    <AntPopconfirm
      title={title}
      onConfirm={(event) => {
        event?.stopPropagation();
        onConfirm();
      }}
      onCancel={onCancel}
      cancelText="Nee"
      okText="Ja"
    >
      {children}
    </AntPopconfirm>
  );
};

export default Popconfirm;
