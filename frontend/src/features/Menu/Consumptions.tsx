import React from 'react';
import {List} from "antd";
import {Consumption as ConsumptionModel} from "../../common/models/Model";
import Consumption from "./Consumption";
import {Order} from "./Order";

interface ConsumptionsProps {
    consumptions: ConsumptionModel[]
    addConsumption: (id: number, add: boolean) => void;
    order: Order;
}

const Consumptions = ({consumptions, addConsumption, order}: ConsumptionsProps) => {
    return (
        <List
            dataSource={consumptions}
            renderItem={item =>
                <Consumption consumption={item} addConsumption={addConsumption} order={order}/>
            }
        />
    );
}

export default Consumptions;
