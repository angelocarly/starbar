import React from "react";
import { Category } from "../../../common/models/Model";
import { Form, Popconfirm, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { cancelEdit, categories, selectedCategoryId, startEdit, updateCategory } from "../Admin.slice";
import EditableCategory from "./EditableCategory";
import { ColumnProps } from "antd/es/table";

const Categories = () => {

	const dispatch = useDispatch<AppDispatch>();
	const selected = useSelector(selectedCategoryId);
	const isEditing = (record: Category) => record.id === selected;
	const [form] = Form.useForm();

	const columns: ColumnProps<Category>[] = [
		{ title: "Categorie", dataIndex: "name",
			onCell: (record: Category) => ({
				record,
				inputType: "text",
				dataIndex: "name",
				title: "name",
				editing: isEditing(record),
			}),
		},
		{
			dataIndex: "operation",
			render: (_: any, record: Category) => isEditing(record)
				? <span>
					<a
						href="javascript:"
						onClick={async () => {
							const { name } = (await form.validateFields()) as { name: string };
							dispatch(updateCategory(name));
						}} style={{ marginRight: 8 }}
					>Opslaan</a>
					<Popconfirm
						title="Zeker dat je wil annuleren?"
						onConfirm={() => dispatch(cancelEdit())}
					><a>Annuleren</a></Popconfirm>
				</span>
				: <a onClick={() => {
					form.setFieldsValue({ name: record.name });
					dispatch(startEdit(record.id));
				}}>Bewerken</a>,
		},
	];

	return (
		<Form form={form} component={false}>
			<Table
				components={{ body: { cell: EditableCategory } }}
				bordered
				dataSource={useSelector(categories)}
				columns={columns}
				rowClassName="editable-row"
			/>
		</Form>
	);
};

export default Categories;
