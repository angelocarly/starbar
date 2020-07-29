import React from "react";
import { Button, List, Space } from "antd";
import styles from "../Menu.module.scss";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons/lib";
import { Consumption as ConsumptionModel } from "../../../../common/models/Model";
import { useDispatch, useSelector } from "react-redux";
import { addConsumption, order } from "../../Order.slice";
import { AppDispatch } from "../../../../app/store";

interface ConsumptionProps {
	consumption: ConsumptionModel;
}

const Consumption = ({ consumption }: ConsumptionProps) => {

	const dispatch = useDispatch<AppDispatch>();

	return (
		<List.Item>
			<div className={styles.content}>
				<b>{consumption.name}</b>
				<b className={styles.price}>€ {consumption.price}</b>
				<Space align="center" className={styles.amount}>
					<Button
						type="primary"
						shape="circle"
						onClick={() => dispatch(addConsumption({ id: consumption.id, add: true }))}
					><MinusOutlined/></Button>
					<b>{useSelector(order).orders[consumption.id] || 0}</b>
					<Button
						type="primary"
						shape="circle"
						onClick={() => dispatch(addConsumption({ id: consumption.id, add: false }))}
					><PlusOutlined/></Button>
				</Space>
			</div>
		</List.Item>
	);
};

export default Consumption;
