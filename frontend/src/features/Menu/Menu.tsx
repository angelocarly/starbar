import React, {FC, useEffect, useState} from "react";
import {Category as CategoryModel} from "../../common/models/Model";
import {Collapse} from "antd";
import Consumptions from "./Consumptions";
import {Order} from "./Order";

const Menu: FC = () => {

    const [categories, setCategories] = useState<CategoryModel[]>([]);

    useEffect(() => {
        fetch("/menu")
            .then(async c => setCategories(await c.json()));
    }, []);

    const [order, setOrder] = useState<Order>({orders: {}} as Order);
    const addConsumption = (id: number, add: boolean) => {

        let amount = order.orders[id];
        if (!amount) {
            amount = 0
        }

        amount += add ? -1 : 1;
        if (amount < 0) amount = 0;

        if ( amount > 0) {
            order.orders[id] = amount;
        } else {
            delete order.orders[id];
        }

        setOrder(order);

    }

    return (
        <>
            <Collapse defaultActiveKey={1} accordion>
                {
                    categories.map((value, index) => <Collapse.Panel
                        key={value.id || index}
                        header={value.name}
                    >
                        <Consumptions consumptions={value.consumptions} addConsumption={addConsumption} order={order}/>
                    </Collapse.Panel>)
                }
            </Collapse>
        </>
    );
};

export default Menu;
