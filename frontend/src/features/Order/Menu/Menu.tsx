import React, { FC, useEffect } from "react";
import { BackTop, Badge, Button, Collapse, notification } from "antd";
import Consumptions from "./Consumptions/Consumptions";
import styles from "./Menu.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  categories as categoriesState,
  fetchCategories,
  openConfirm,
  order as orderState,
  totalOrderCounts,
} from "../Order.slice";
import { AppDispatch } from "../../../app/store";

const Menu: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(categoriesState);
  const order = useSelector(orderState);
  const amounts = useSelector(totalOrderCounts);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Collapse className={styles.categories} defaultActiveKey={1} accordion>
        {categories.map((value, index) => (
          <Collapse.Panel
            key={value.id || index}
            header={
              <div className={styles.category}>
                <b>{value.name}</b>
                <Badge key={value.id || index} count={amounts[value.id]} />
              </div>
            }
          >
            <Consumptions consumptions={value.consumptions} />
          </Collapse.Panel>
        ))}
      </Collapse>
      <BackTop />
      <Button
        type="primary"
        className={styles.content}
        onClick={() => {
          if (Object.keys(order.orders).length) {
            dispatch(openConfirm());
          } else {
            notification.error({ message: "Selecteer minstens 1 consumptie" });
          }
        }}
      >
        <b>Bestellen</b>
      </Button>
    </>
  );
};

export default Menu;
