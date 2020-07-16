import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orders,
	postOrder,
	name as nameState,
	table as tableState
} from "../Order.slice";
import { AppDispatch } from "../../../app/store";
import { OrderEntry } from "../Order.models";
import { useForm } from "react-hook-form";
import Input from "../../../common/components/Input";
import { Table } from "antd";
import Button from "../../../common/components/Button";

const Confirm: FC = () => {

	const dispatch = useDispatch<AppDispatch>();
	const name = useSelector(nameState);
	const table = useSelector(tableState);
	const { control, handleSubmit } = useForm({
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
			/>
			<Input
				type="text"
				placeholder="Tafelnummer"
				control={control}
				name="table"
			/>
			<Table<OrderEntry>
				columns={[
					{ title: "Naam", dataIndex: "name" },
					{ title: "Aantal", dataIndex: "amount" },
					{ title: "Prijs", dataIndex: "totalPrice" },
				]} 
				dataSource={useSelector(orders)}/>
			<Button type="submit">Bevestigen</Button>
		</form>
	);
};

export default Confirm;
