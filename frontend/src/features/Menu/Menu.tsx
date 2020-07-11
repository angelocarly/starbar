import React, {FC, useEffect} from "react";
import {Button, Collapse} from "antd";
import Consumptions from "./Consumptions";
import styles from "./Menu.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {categories, fetchCategories} from "./Menu.slice";
import {AppDispatch} from "../../app/store";

const Menu: FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    // const postOrder = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    //     event.preventDefault();
    //     try {
    //         let orderRequest: OrderRequest = {orders: [], name: "test", table: "test"};
    //         orderRequest.orders = Object.entries(order.orders).map(([key, value]) => {
    //             return {
    //                 id: parseInt(key),
    //                 amount: value
    //             }
    //         })
    //         const result = await apiCall<string>("/order", {
    //             method: "POST",
    //             body: orderRequest
    //         });
    //     } catch (e) {
    //         handleConstraintError(e.message);
    //     }
    // };

    return (
        <>
            <form >
                {/*onSubmit={async (event) => await postOrder(event)}>*/}

                <Collapse defaultActiveKey={1} accordion>
                    {
                        useSelector(categories).map((value, index) => <Collapse.Panel
                            key={value.id || index}
                            header={value.name}
                        >
                            <Consumptions consumptions={value.consumptions}/>
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
