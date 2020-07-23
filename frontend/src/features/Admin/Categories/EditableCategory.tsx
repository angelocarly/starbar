import React from "react";
import { Form, Input, InputNumber } from "antd";

interface EditableCategoryProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	title: any;
	inputType: "number" | "text";
	index: number;
	children: React.ReactNode;
}

const EditableCategory: React.FC<EditableCategoryProps> = ({
	editing,
	dataIndex,
	title,
	inputType,
	children,
	...restProps
}: EditableCategoryProps) => {

	const inputNode = inputType === "number" ? <InputNumber/> : <Input/>;

	return (
		<td {...restProps}>
			{
				editing
					? <Form.Item
						name={dataIndex}
						style={{ margin: 0 }}
						rules={[
							{ required: true, message: `Please Input ${title}!` },
						]}
					>{inputNode}</Form.Item>
					: children
			}
		</td>
	);
};

export default EditableCategory;
