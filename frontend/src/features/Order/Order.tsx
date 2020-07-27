import React, {FC, useEffect} from "react";
import Confirm from "./Confirm/Confirm";
import Menu from "./Menu/Menu";
import {useDispatch, useSelector} from "react-redux";
import {confirmOpen, setTable, successOpen as successOpenState, setViaQR} from "./Order.slice";
import Success from "./Success";
import {useLocation} from "react-router-dom";
import {AppDispatch} from "../../app/store";

const Order: FC = () => {

	const successOpen = useSelector(successOpenState);

	const dispatch = useDispatch<AppDispatch>();

	// Set the table based on the url query
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const table = query.get("table");
	useEffect(() => {
		if( table ) {
			dispatch(setTable(table || ""))
			dispatch(setViaQR(true))
		}
	}, [dispatch]);

	return useSelector(confirmOpen)
		? <Confirm/>
		: successOpen
			? <Success/>
			: <Menu/>;
};

export default Order;
