import React, {FC, useEffect, useState} from "react";
import {Button, Collapse} from "antd";
import Consumptions from "./Consumptions";
import styles from "./Menu.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {categories, fetchCategories} from "./Menu.slice";
import {AppDispatch} from "../../app/store";
import Confirm from "./Confirm/Confirm";

const Menu: FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    const [confirm, setConfirm] = useState<boolean>(false);
    const cats = useSelector(categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    return confirm ?
        <Confirm/> :
        (
        <>
            <form onSubmit={ () => setConfirm(true)}>

                <Collapse defaultActiveKey={1} accordion>
                    {
                        cats.map((value, index) => <Collapse.Panel
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
