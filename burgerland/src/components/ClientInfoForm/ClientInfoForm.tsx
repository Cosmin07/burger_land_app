import { RefObject } from "react";
import { Form, Input, DatePicker, FormInstance } from "antd";
import { useTicketStore } from "../store/ticketStore";
import { requiredField } from "../utils/validation";
import { useTranslation } from "react-i18next";
import dayjs, { Dayjs } from "dayjs";


interface ClientInfoFormProps {
  formRef: RefObject<FormInstance | null>;
}

const ClientInfoForm: React.FC<ClientInfoFormProps> = ({ formRef }) => {
  const { clientInfo } = useTicketStore();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  if (formRef) formRef.current = form;


  return (
    <Form form={form} layout="vertical" name="clientInfo" initialValues={clientInfo ? clientInfo : undefined} >
      <Form.Item name="name" label={t('fullName')} rules={[requiredField(t('requiredField'))]}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label={t('phone')} rules={[requiredField(t('requiredField'))]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label={t('email')} rules={[
        {
          type: 'email',
          message: t('invalidEmail'),
        }
      ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="date"
        label="Select Date"
        initialValue={clientInfo.date ? dayjs(clientInfo.date) : null}
        rules={[{ required: true, message: "Please select a date" }]}
      >
        <DatePicker format="YYYY-MM-DD" disabledDate={(current: Dayjs) => current && current.isBefore(dayjs(), "day") } />
      </Form.Item>
    </Form>
  );
};

export default ClientInfoForm;
