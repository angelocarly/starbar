import React from "react";
import { Form, Input, InputNumber } from "antd";

interface EditableFieldProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	title: any;
	inputType: "number" | "text";
	index: number;
	children: React.ReactNode;
}

const EditableField: React.FC<EditableFieldProps> = ({
	editing,
	dataIndex,
	title,
	inputType,
	children,
	...restProps
}: EditableFieldProps) => {

	const inputNode = inputType === "number" ? <InputNumber/> : <Input/>;

	return (
		<td {...restProps}>
			{
				editing
					? <Form.Item
						name={dataIndex}
						style={{ margin: 0 }}
						rules={[
							{
								type: inputType === "number" ? "number" : "string",
								min: inputType === "number" ? 0 : undefined,
								message: "Ongeldige waarde"
							},
							{
								required: true,
								message: `Vul een ${title.toLowerCase()} in aub.!`
							},
						]}
					>{inputNode}</Form.Item>
					: children
			}
		</td>
	);
};

export default EditableField;
