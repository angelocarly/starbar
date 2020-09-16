import React, { FC } from "react";
import { UserOutlined } from "@ant-design/icons/lib";
import Input from "../../common/components/Input";
import styles from "./Login.module.scss";
import { Space, Typography } from "antd";
import Button from "../../common/components/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { login } from "../Admin/Admin.thunks";

const { Title } = Typography;

const Login: FC = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: { password: "" },
  });
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={styles.login}>
      <Space direction="vertical">
        <Title style={{ textAlign: "center" }} level={4}>
          Vul je wachtwoord in
        </Title>
        <form
          onSubmit={handleSubmit(({ password }) => {
            dispatch(login(password));
          })}
        >
          <Space align="baseline">
            <Input
              control={control}
              type="password"
              name="password"
              placeholder="Wachtwoord"
              prefix={<UserOutlined />}
            />
            <Button htmlType="submit">Log in</Button>
          </Space>
        </form>
      </Space>
    </div>
  );
};

export default Login;
