import React from "react";
import { List } from "antd";
import { Consumption as ConsumptionModel } from "../../../../common/models/Model";
import Consumption from "./Consumption";

interface ConsumptionsProps {
    consumptions: ConsumptionModel[];
}

const Consumptions = ({ consumptions }: ConsumptionsProps) => {
	return (
		<List
			dataSource={consumptions}
			renderItem={item => <Consumption consumption={item}/>}
		/>
	);
};

export default Consumptions;
