import React, { FC } from "react";
import { Form, Input, InputNumber, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateConsumption, createConsumptionOpen } from "../../Admin.slice";
import { AppDispatch } from "../../../../app/store";
import { FormInstance } from "antd/es/form";
import { createConsumption } from "../../Admin.thunks";

interface CreateConsumptionProps {
	form: FormInstance
}

const CreateConsumption: FC<CreateConsumptionProps> = ({ form }: CreateConsumptionProps) => {

	const dispatch = useDispatch<AppDispatch>();

	return (
		<Form form={form}>
			<Modal
				title="Nieuwe consumptie"
				visible={useSelector(createConsumptionOpen)}
				onOk={async () => {
					const consumption = (await form.validateFields()) as { name: string, price: number };
					dispatch(createConsumption(consumption));
				}}
				onCancel={() => dispatch(closeCreateConsumption())}
				cancelText="Annuleren"
				okText="Aanmaken"
				centered
			>
				<Form.Item
					name="name"
					rules={[{
						required: true,
						message: "Vul een naam in aub.!"
					}]}
				>
					<Input placeholder="Naam"/>
				</Form.Item>
				<Form.Item
					name="price"
					rules={[
						{ required: true, message: "Vul een prijs in aub.!" },
					]}
				>
					<InputNumber
						formatter={value => `€ ${value}`}
						parser={value => value ? value.replace(/€\s?|(,*)/g, "") : ""}
						placeholder="Prijs"
					/>
				</Form.Item>
			</Modal>
		</Form>
	);
};

export default CreateConsumption;
