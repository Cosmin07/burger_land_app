import { Modal, Steps, Button, FormInstance, message } from "antd";
import { useRef } from "react";
import { useTicketStore } from "../store/ticketStore";
import ClientInfoForm from "../ClientInfoForm/ClientInfoForm";
import TicketSelectionForm from "../TicketSelectionForm/TicketSelectionForm";
import BookingSummary from "../BookingSummary/BookingSummary";
import PaymentForm from "../PaymentForm/PaymentForm";
import { useTranslation } from "react-i18next";

const TicketBookingModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { step, setStep, updateFormData, resetState } = useTicketStore();
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const clientFormRef = useRef<FormInstance>(null);
  const ticketFormRef = useRef<FormInstance>(null);
  const paymentFormRef = useRef<FormInstance>(null);

  const steps = [
    { title: t('personalInfo'), content: <ClientInfoForm formRef={clientFormRef} /> },
    { title: t("selectTickets"), content: <TicketSelectionForm formRef={ticketFormRef}  /> },
    { title: t("summary"), content: <BookingSummary /> }, 
    { title: t("payment"), content: <PaymentForm formRef={paymentFormRef} /> },
  ];

  const formRefs = [clientFormRef, ticketFormRef, paymentFormRef];

  const handleNext = async () => {
    const currentForm = formRefs[step]?.current;
    if (currentForm) {
      try {
        await currentForm.validateFields();
      } catch (error) {
        console.error("Validation failed:", error);
        return; 
      }

      const hasErrors = currentForm.getFieldsError().some((field) => field.errors.length > 0);
      if (hasErrors) return;
    }
  
    const values = currentForm ? currentForm.getFieldsValue() : {};
    const formStepKeys = ["clientInfo", "ticketDetails", null, "paymentInfo"]; 
    const formName = formStepKeys[step];

    if (formName) {
      updateFormData({ [formName]: values });
    }
    setStep(step + 1); 
  };

  const handleCancel = () => {
    onClose();
    resetState();
  }

  const doneHandler = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Loaded!',
        duration: 4,
      });
    }, 2000);
    setTimeout(() => {
      handleCancel();
    }, 3000);
  };

  return (
    <Modal open={open} onCancel={handleCancel} footer={null} width={800} >
      <Steps current={step}>
        {steps.map((s, index) => (
          <Steps.Step key={index} title={s.title} />
        ))}
      </Steps>
      <div style={{ margin: "20px 0" }}>{steps[step]?.content}</div>
      {contextHolder}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button disabled={step === 0} onClick={() => setStep(step - 1)}>{t('back')}</Button>
        {step < steps.length - 1 && (
          <Button type="primary" onClick={handleNext} >{t('next')}</Button>
        )}
        {step === steps.length - 1 && (
          <Button type="primary" onClick={() => {handleNext(); doneHandler()}}>
            Done
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default TicketBookingModal;
