import React, {FC, FormEvent, useEffect, useState} from "react";
import {Category as CategoryModel} from "../../common/models/Model";
import {Button, Collapse} from "antd";
import Consumptions from "./Consumptions";
import styles from "./Menu.module.scss";
import {Order, OrderRequest} from "./Order";
import {apiCall} from "../../common/utils/fetch";
import {handleConstraintError} from "../../common/utils/error";

const Menu: FC = () => {

    const [categories, setCategories] = useState<CategoryModel[]>([]);

    useEffect(() => {
        fetch("/menu")
            .then(async c => setCategories(await c.json()));
    }, []);

    const [order, setOrder] = useState<Order>({orders: {}} as Order);
    // Update the amount of a consumption
    const addConsumption = (id: number, add: boolean) => {

        let amount = order.orders[id];
        if (!amount) {
            amount = 0
        }

        amount += add ? -1 : 1;
        if (amount < 0) amount = 0;

        if (amount > 0) {
            order.orders[id] = amount;
        } else {
            delete order.orders[id];
        }

        setOrder({...order});

    }

    const postOrder = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            let orderRequest: OrderRequest = {orders: [], name: "test", table: "test"};
            orderRequest.orders = Object.entries(order.orders).map(([key, value]) => {
                return {
                    id: parseInt(key),
                    amount: value
                }
            })
            const result = await apiCall<string>("/order", {
                method: "POST",
                body: orderRequest
            });
        } catch (e) {
            handleConstraintError(e.message);
        }
    };

    return (
        <>
            <form onSubmit={async (event) => await postOrder(event)}>

                <Collapse defaultActiveKey={1} accordion>
                    {
                        categories.map((value, index) => <Collapse.Panel
                            key={value.id || index}
                            header={value.name}
                        >
                            <Consumptions consumptions={value.consumptions} addConsumption={addConsumption}
                                          order={order}/>
                        </Collapse.Panel>)
                    }
                </Collapse>

                <Button
                    type="primary"
                    className={styles.content}
                    htmlType="submit">
                    Order
                </Button>
            </form>
        </>
    );
};

export default Menu;
