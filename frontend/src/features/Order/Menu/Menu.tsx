import React, {FC, useEffect} from "react";
import {BackTop, Button, Collapse} from "antd";
import Consumptions from "./Consumptions/Consumptions";
import styles from "./Menu.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {categories as categoriesState, fetchCategories, openConfirm} from "../Order.slice";
import {AppDispatch} from "../../../app/store";

const Menu: FC = () => {

	const dispatch = useDispatch<AppDispatch>();
	const categories = useSelector(categoriesState);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);


	return <>
		<Collapse defaultActiveKey={1} accordion>
			{
				categories.map((value, index) => <Collapse.Panel
					key={value.id || index}
					header={value.name}
				>
					<Consumptions consumptions={value.consumptions}/>
				</Collapse.Panel>)
			}
		</Collapse>
		<BackTop/>
		<Button
			type="primary"
			className={styles.content}
			onClick={() => dispatch(openConfirm())}
		>Order</Button>
	</>;
};

export default Menu;
