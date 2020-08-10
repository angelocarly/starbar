import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    back,
    name as nameState,
    orders as ordersState,
    postOrder,
    table as tableState,
    viaQR as viaQRState
} from "../Order.slice";
import {AppDispatch} from "../../../app/store";
import {useForm} from "react-hook-form";
import Input from "../../../common/components/Input";
import {Space, Table} from "antd";
import Button from "../../../common/components/Button";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers";

const schema = yup.object().shape({
    name: yup.string().required("Geef een naam in"),
    table: yup.string().required("Geef een tafelnummer in"),
}).defined();

type ConfirmSchema = yup.InferType<typeof schema>;

const Confirm: FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const name = useSelector(nameState);
    const table = useSelector(tableState);
    const viaQR = useSelector(viaQRState);
    const orders = useSelector(ordersState);
    const {control, handleSubmit, errors} = useForm<ConfirmSchema>({
        resolver: yupResolver(schema),
        defaultValues: {name, table}
    });

    return (
        <form onSubmit={handleSubmit(data => {
            dispatch(postOrder(data));
        })}>
            <Input
                type="text"
                placeholder="Naam"
                control={control}
                name="name"
                error={errors.name}
            />
            <Input
                type="text"
                placeholder="Tafelnummer"
                control={control}
                name="table"
                disabled={viaQR}
                error={errors.table}
            />
            <Table
                rowKey={item => item.name}
                columns={[
                    {title: "Naam", dataIndex: "name"},
                    {title: "Aantal", dataIndex: "amount"},
                    {
                        title: "Prijs",
                        dataIndex: "totalPrice",
                        render: (_, data) => <Space align="center">€ {data.totalPrice.toFixed(2)}</Space>
                    },
                ]}
                dataSource={orders}
                summary={() => (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0}> </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}><b>Totale prijs:</b></Table.Summary.Cell>
                        <Table.Summary.Cell index={2}>
                            <b>€  {orders.map(o => o.totalPrice).reduce((a, b) => a + b, 0).toFixed(2)}</b>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                )}
            />
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Button onClick={() => dispatch(back())}>Terug</Button>
                <Button htmlType="submit">Bevestigen</Button>
            </div>
        </form>
    );
};

export default Confirm;
