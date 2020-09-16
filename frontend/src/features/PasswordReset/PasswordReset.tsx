import React, { FC, useEffect, useState } from "react";
import { Form, Input, message, Space } from "antd";
import styles from "./PasswordReset.module.scss";
import { useForm } from "antd/es/form/Form";
import Button from "../../common/components/Button";
import { resetPassword } from "./PasswordReset.service";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { setToken } from "../Admin/Admin.slice";
import { logout } from "../Admin/Admin.thunks";
import { handleConstraintError } from "../../common/utils/error";

const PasswordReset: FC = () => {
  const [form] = useForm();
  const [confirmValid, setConfirmValid] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  const validateConfirm = (): void => {
    setConfirmValid(
      form.getFieldValue("password") === form.getFieldValue("confirm")
    );
  };

  useEffect(() => {
    form.setFieldsValue({
      password: "",
      confirm: "",
    });
  }, [form]);

  return (
    <div className={styles.container}>
      <Form
        form={form}
        onFinish={async () => {
          const { password } = await form.validateFields();
          if (confirmValid) {
            try {
              const response = await resetPassword(password);
              if (response?.token) {
                dispatch(setToken(response?.token));
                message.success(`Uw nieuw wachtwoord is ${password}`);
              } else {
                dispatch(logout());
                message.error("Uw wachtwoord is aangepast, log opnieuw in");
              }
            } catch ({ message }) {
              handleConstraintError(message);
            }
          }
        }}
        onFieldsChange={() => validateConfirm()}
      >
        <Space align="baseline">
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vul een wachtwoord in" },
              { min: 8, message: "Wachtwoord te kort" },
            ]}
          >
            <Input type="password" placeholder="Wachtwoord" />
          </Form.Item>
          <Form.Item
            name="confirm"
            validateStatus={confirmValid ? "" : "error"}
            help={confirmValid ? "" : "Wachtwoorden zijn verschillend"}
          >
            <Input type="password" placeholder="Bevestig wachtwoord" />
          </Form.Item>
          <Button htmlType="submit">Reset wachtwoord</Button>
        </Space>
      </Form>
    </div>
  );
};

export default PasswordReset;
