import React, {FC} from "react";
import {Button} from "antd";
import styles from "./Confirm.module.scss";

const Confirm: FC = () => {

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
