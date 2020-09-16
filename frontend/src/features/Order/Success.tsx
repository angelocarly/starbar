import React, { FC } from "react";
import Button from "../../common/components/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { Result } from "antd";
import { orderAgain } from "./Order.slice";

const Success: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Result
      status="success"
      title="Uw bestelling werd opgenomen!"
      subTitle="Deze wordt zo dadelijk gebracht"
      extra={
        <Button onClick={() => dispatch(orderAgain())}>
          Opnieuw bestellen
        </Button>
      }
    />
  );
};

export default Success;
