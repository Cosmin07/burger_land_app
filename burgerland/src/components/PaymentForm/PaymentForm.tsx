import { Form, Input, FormInstance, Row, Col } from "antd";
import { RefObject } from "react";
import { useTranslation } from "react-i18next";

interface PaymentFormProps {
    formRef: RefObject<FormInstance | null>;
  }

const PaymentForm: React.FC<PaymentFormProps> = ({formRef}) => {
    const [form] = Form.useForm();
     const { t } = useTranslation();
  if (formRef) formRef.current = form;

  return (
    <Form layout="vertical" form={form} name="paymentInfo" >
       <Form.Item
        label={t("cardNumber")}
        name="cardNumber"
        rules={[
          { required: true, message: t("required") },
          { pattern: /^[0-9\s]{16,19}$/, message: t("invalidCardNumber") },
        ]}
      >
        <Input placeholder="**** **** **** ****" maxLength={19} />
      </Form.Item>

      <Form.Item
        label={t("cardholderName")}
        name="cardholderName"
        rules={[{ required: true, message: t("required") }]}
      >
        <Input placeholder={t("nameOnCard")} />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={t("expiryDate")}
            name="expiryDate"
            rules={[
              { required: true, message: t("required") },
              { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: t("invalidExpiry") },
            ]}
          >
            <Input placeholder="MM/YY" maxLength={5} />
          </Form.Item>
        </Col>

        {/* CVV */}
        <Col span={12}>
          <Form.Item
            label={t("cvv")}
            name="cvv"
            rules={[
              { required: true, message: t("required") },
              { pattern: /^[0-9]{3,4}$/, message: t("invalidCVV") },
            ]}
          >
            <Input placeholder="***" maxLength={4} />
          </Form.Item>
        </Col>
      </Row>

      {/* Billing Address */}
      <Form.Item
        label={t("billingAddress")}
        name="billingAddress"
        rules={[{ required: true, message: t("required") }]}
      >
        <Input.TextArea rows={2} placeholder={t("enterBillingAddress")} />
      </Form.Item>
    </Form>
  );
};

export default PaymentForm;
