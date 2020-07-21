import React, { FC } from "react";
import Confirm from "./Confirm/Confirm";
import Menu from "./Menu/Menu";
import { useSelector } from "react-redux";
import { confirmOpen, successOpen as successOpenState } from "./Order.slice";
import Success from "./Success";

const Order: FC = () => {

	const successOpen = useSelector(successOpenState);

	return useSelector(confirmOpen)
		? <Confirm/>
		: successOpen
			? <Success/>
			: <Menu/>;
};

export default Order;
