import React from 'react';
import {Button, List, Space} from "antd";
import styles from "./Menu.module.scss";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons/lib";
import {Consumption as ConsumptionModel} from "../../common/models/Model";
import {Order} from "./Order";

interface ConsumptionProps {
    consumption: ConsumptionModel;
    addConsumption: (id: number, add: boolean) => void;
    order: Order;
}

const Consumption = ({consumption, addConsumption, order}: ConsumptionProps) => {
    return (
        <List.Item>
            <div className={styles.content}>

                <p>
                    {consumption.name}
                </p>
                <div className={styles.price}>
                    € {consumption.price}
                </div>
                <Space className={styles.amount}>
                    <Button
                        type="primary"
                        shape="circle"
                        onClick={() => addConsumption(consumption.id, true)}
                    >
                        <MinusOutlined/>
                    </Button>
                    {
                        console.log(order.orders)
                    }
                    <Button
                        type="primary"
                        shape="circle"
                        onClick={() => addConsumption(consumption.id, false)}
                    >
                        <PlusOutlined/>
                    </Button>
                </Space>
            </div>
        </List.Item>
    )
};

export default Consumption;
