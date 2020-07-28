import React, { FC } from "react";
import { Form, Table } from "antd";
import { Category, Consumption } from "../../../../common/models/Model";
import { ColumnProps } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../app/store";
import { FormInstance } from "antd/es/form/Form";
import EditableField from "../EditableField";
import {
	cancelConsumptionEdit,
	selectedConsumptionId,
	startConsumptionEdit,
	openCreateConsumption
} from "../../Admin.slice";
import ModifyButtons from "../ModifyButtons";
import Button from "../../../../common/components/Button";
import { CreateConsumptionRequest } from "../../Admin.models";
import { deleteConsumption, updateConsumption } from "../../Admin.thunks";

interface ConsumptionsProps {
	category: Category,
	form: FormInstance,
	createForm: FormInstance,
}

const Consumptions: FC<ConsumptionsProps> = ({
	category,
	form,
	createForm
}: ConsumptionsProps) => {

	const selected = useSelector(selectedConsumptionId);
	const isEditing = (record: Consumption): boolean => record.id === selected;
	const dispatch = useDispatch<AppDispatch>();

	const columns: ColumnProps<Consumption>[] = [
		{ title: "Naam", dataIndex: "name",
			onCell: (record: Consumption) => ({
				record,
				inputType: "text",
				dataIndex: "name",
				title: "Naam",
				editing: isEditing(record),
			}),
		},
		{
			title: "Prijs",
			render: (_, record) => <p style={{ margin: 0 }}>€ {record.price}</p>,
			onCell: (record: Consumption) => ({
				record,
				inputType: "number",
				dataIndex: "price",
				title: "Prijs",
				editing: isEditing(record),
			}),
		},
		{
			dataIndex: "edit",
			render: (_: any, record: Consumption) => <ModifyButtons<Consumption>
				record={record}
				isEditing={isEditing}
				saveOnClick={async () => {
					const { name, price } = (await form.validateFields()) as CreateConsumptionRequest;
					dispatch(updateConsumption({ name, price }));
				}}
				cancelOnClick={() => dispatch(cancelConsumptionEdit())}
				editOnClick={() => {
					form.setFieldsValue({
						name: record.name,
						price: record.price
					});
					dispatch(startConsumptionEdit(record.id));
				}}
				deleteOnClick={() => dispatch(deleteConsumption(record.id))}
			/>
		}
	];

	return (
		<Form form={form} component={false}>
			<Table
				components={{ body: { cell: EditableField } }}
				columns={columns}
				dataSource={category.consumptions}
				footer={() => <Button onClick={() => {
					createForm.setFieldsValue({ name: "", price: null });
					dispatch(openCreateConsumption(category.id));
				}}>Nieuwe consumptie</Button>}
				pagination={false}
			/>
		</Form>
	);
};

export default Consumptions;
