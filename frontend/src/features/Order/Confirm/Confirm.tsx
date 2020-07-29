import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	orders,
	postOrder,
	name as nameState,
	table as tableState,
	viaQR as viaQRState,
	back
} from "../Order.slice";
import { AppDispatch } from "../../../app/store";
import { useForm } from "react-hook-form";
import Input from "../../../common/components/Input";
import { Space, Table } from "antd";
import Button from "../../../common/components/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";

const schema = yup.object().shape({
	name: yup.string().required("Geef een naam in"),
	table: yup.string().required("Geef een tafelnummer in"),
}).defined();

type ConfirmSchema = yup.InferType<typeof schema>;

const Confirm: FC = () => {

	const dispatch = useDispatch<AppDispatch>();
	const name = useSelector(nameState);
	const table = useSelector(tableState);
	const viaQR = useSelector(viaQRState);
	const { control, handleSubmit, errors } = useForm<ConfirmSchema>({
		resolver: yupResolver(schema),
		defaultValues: { name, table }
	});

	return (
		<form onSubmit={handleSubmit(data => {
			dispatch(postOrder(data));
		})}>
			<Input
				type="text"
				placeholder="Naam"
				control={control}
				name="name"
				error={errors.name}
			/>
			<Input
				type="text"
				placeholder="Tafelnummer"
				control={control}
				name="table"
				disabled={viaQR}
				error={errors.table}
			/>
			<Table
				rowKey={item => item.name}
				columns={[
					{ title: "Naam", dataIndex: "name" },
					{ title: "Aantal", dataIndex: "amount" },
					{
						title: "Prijs",
						dataIndex: "totalPrice",
						render: (_, data) => <Space align="center">€ {data.totalPrice}</Space>
					},
				]}
				dataSource={useSelector(orders)}
			/>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Button onClick={() => dispatch(back())}>Terug</Button>
				<Button htmlType="submit">Bevestigen</Button>
			</div>
		</form>
	);
};

export default Confirm;
