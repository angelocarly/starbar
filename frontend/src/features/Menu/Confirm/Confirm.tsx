import React, {FC, FormEvent} from "react";
import {Button, Input, Table} from "antd";
import styles from "./Confirm.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {categories, order as ordertype, setName, setTable} from "../Menu.slice";
import {Consumption} from "../../../common/models/Model";
import {OrderRequest} from "../Order";
import {apiCall} from "../../../common/utils/fetch";
import {handleConstraintError} from "../../../common/utils/error";
import {AppDispatch} from "../../../app/store";

const Confirm: FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    let order = useSelector(ordertype);
    const cats = useSelector(categories);

    const postOrder = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            let orderRequest: OrderRequest = {name: order.name, orders: [], table: order.table};
            orderRequest.orders = Object.entries(order.orders).map(([key, value]) => {
                return {
                    id: parseInt(key),
                    amount: value
                }
            })
            await apiCall<string>("/order", {
                method: "POST",
                body: orderRequest
            });
        } catch (e) {
            handleConstraintError(e.message);
        }
    };

    // Map all the categories' consumptions to an array, used for consumption lookup
    const consumptions: Record<number, Consumption> = {};
    cats.forEach((cat) => {
        cat.consumptions.forEach((c) => {
            consumptions[c.id] = c;
        })
    })

    return (
        <>
            <form onSubmit={async (event: FormEvent<HTMLFormElement>) => await postOrder(event)}>

                <p>
                    Name:
                    <Input
                        type="text"
                        value={order.name}
                        onChange={event => dispatch(setName({ name: event.target.value }))}
                    />
                </p>
                <p>
                    Table:
                    <Input
                        type="text"
                        value={order.table}
                        onChange={event => dispatch(setTable({ table: event.target.value }))}
                    />
                </p>
                <Table columns={[
                    {
                        title: "Name",
                        dataIndex: "name"
                    },
                    {
                        title: "Amount",
                        dataIndex: "amount"
                    },
                    {
                        title: "Price",
                        dataIndex: "totalPrice"
                    },
                ]} dataSource={
                    // Combine all the required fields for the table
                    Object.entries(order.orders).map((data: [string, number]) => {
                        const consumption = consumptions[parseInt(data[0])];
                        const count = data[1];
                        return {
                            ...consumption,
                            amount: count,
                            totalPrice: count * consumption.price,
                        }
                    })
                }/>

                <Button
                    type="primary"
                    className={styles.content}
                    htmlType="submit">
                    Confirm
                </Button>
            </form>
        </>
    );
};

export default Confirm;
