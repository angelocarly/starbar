import React, { useEffect } from "react";
import { Category } from "../../../common/models/Model";
import { Form, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
	cancelEdit,
	categories,
	selectedCategoryId,
	startEdit,
	openCreateCategory,
} from "../Admin.slice";
import EditableField from "./EditableField";
import { ColumnProps } from "antd/es/table";
import Consumptions from "./Consumptions/Consumptions";
import ModifyButtons from "./ModifyButtons";
import CreateCategory from "./CreateCategory";
import CreateConsumption from "./Consumptions/CreateConsumption";
import Button from "../../../common/components/Button";
import { CreateCategoryRequest } from "../Admin.models";
import { deleteCategory, fetchCategories, updateCategory } from "../Admin.thunks";

const Categories = () => {

	const dispatch = useDispatch<AppDispatch>();
	const selected = useSelector(selectedCategoryId);
	const isEditing = (record: Category) => record.id === selected;
	const [form] = Form.useForm();
	const [consumptionForm] = Form.useForm();
	const [createCategoryForm] = Form.useForm();
	const [createConsumptionForm] = Form.useForm();

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const columns: ColumnProps<Category>[] = [
		{
			title: "Categorie",
			dataIndex: "name",
			onCell: (record: Category) => ({
				record,
				inputType: "text",
				dataIndex: "name",
				title: "name",
				editing: isEditing(record),
			}),
		},
		{
			dataIndex: "edit",
			render: (_: any, record: Category) => <ModifyButtons<Category>
				record={record}
				isEditing={isEditing}
				saveOnClick={async () => {
					const { name } = (await form.validateFields()) as CreateCategoryRequest;
					dispatch(updateCategory(name));
				}}
				cancelOnClick={() => dispatch(cancelEdit())}
				editOnClick={() => {
					form.setFieldsValue({ name: record.name });
					dispatch(startEdit(record.id));
				}}
				deleteOnClick={() => dispatch(deleteCategory(record.id))}
			/>
		},
	];

	return (<>
		<Form form={form} component={false}>
			<Table
				rowKey={category => category.id}
				components={{ body: { cell: EditableField } }}
				bordered
				dataSource={useSelector(categories)}
				columns={columns}
				expandable={{ expandedRowRender: category => <Consumptions
					category={category}
					form={consumptionForm}
					createForm={createConsumptionForm}
				/> }}
				footer={() => <Button onClick={() => {
					createCategoryForm.setFieldsValue({ name: "" });
					dispatch(openCreateCategory());
				}}>Nieuwe categorie</Button>}
				pagination={false}
				expandRowByClick
			/>
		</Form>
		<CreateCategory form={createCategoryForm}/>
		<CreateConsumption form={createConsumptionForm}/>
	</>);
};

export default Categories;
