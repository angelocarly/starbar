import React, { FC } from "react";
import { Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { FormInstance } from "antd/lib/form";
import { closeCreateCategory, createCategoryOpen } from "../Admin.slice";
import { createCategory } from "../Admin.thunks";

interface CreateCategoryProps {
	form: FormInstance
}

const CreateCategory: FC<CreateCategoryProps> = ({ form }: CreateCategoryProps) => {

	const dispatch = useDispatch<AppDispatch>();

	return (
		<Form form={form}>
			<Modal
				title="Nieuwe categorie"
				visible={useSelector(createCategoryOpen)}
				onOk={async () => {
					const { name } = (await form.validateFields()) as { name: string };
					dispatch(createCategory(name));
				}}
				onCancel={() => dispatch(closeCreateCategory())}
				cancelText="Annuleren"
				okText="Aanmaken"
				centered
			>
				<Form.Item name="name"
					rules={[
						{ required: true, message: "Vul een naam in aub.!" },
						{ type: "string", message: "Ongeldige waarde" }
					]}>
					<Input placeholder="Naam"/>
				</Form.Item>
			</Modal>
		</Form>
	);
};

export default CreateCategory;
