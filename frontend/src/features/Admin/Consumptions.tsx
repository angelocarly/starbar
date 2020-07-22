import React from "react";
import {List} from "antd";
import {useSelector} from "react-redux";
import {categories as categoriesState} from "../Order/Order.slice";
import EditTile from "./Edit/EditTile";
import {selectedCategory} from "./Admin.slice";
import styles from "./Admin.module.scss";

const Consumptions = () => {

    const categories = useSelector(categoriesState);
    const categoryId = useSelector(selectedCategory);

    return (

        <List
            dataSource={categories.find((item) => item.id === categoryId)?.consumptions}
            className={styles.list}
            bordered
            renderItem={item =>
                <List.Item>
                    <EditTile name={item.name} id={item.id}/>
                </List.Item>
            }
        />
    );
};

export default Consumptions;
