import { Card, Radio, InputNumber, Form, Checkbox, Row, Col, TimePicker } from "antd";
import { FormInstance } from "antd/es/form";
import { useTicketStore } from "../store/ticketStore";
import dayjs from "dayjs";
import { RefObject, useEffect, useState } from "react";

interface TicketSelectionFormProps {
  formRef: RefObject<FormInstance | null>;
}

const restaurantList = [
  { id: "empire", name: "Burger Empire", description: "Michelin-starred burger experience", image: "/images/empire.jpg" },
  { id: "grillhouse", name: "The Grillhouse", description: "Charcoal-grilled perfection", image: "/images/grillhouse.jpg" },
  { id: "diner", name: "Classic Diner", description: "Retro vibes with classic American burgers", image: "/images/diner.jpg" }
];

const TicketSelectionForm: React.FC<TicketSelectionFormProps> = ({ formRef }) => {
  const ticketStore = useTicketStore();
  const [ticketType, setTicketType] = useState(ticketStore.ticketDetails.ticketType)
  const [form] = Form.useForm();

  useEffect(() => {
    if (formRef) {
      (formRef).current = form;
    }
  }, [form, formRef]);

  const handleRestaurantSelect = (id: string) => {
    const restaurantDetails = restaurantList.find((res) => res.id === id);
    ticketStore.updateFormData({["restaurantDetails"]:restaurantDetails}); 
  };


  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ 
        ticketType: ticketStore.ticketDetails.ticketType,
        numPersons: ticketStore.ticketDetails.numPersons,
        numFamilyMembers: ticketStore.ticketDetails.numFamilyMembers,
        addOns: ticketStore.ticketDetails.addOns,
        restaurantId: ticketStore.restaurantDetails?.id,
        reservationTime: ticketStore.reservationTime ? dayjs(ticketStore.reservationTime, "HH:mm") : null
      }}
      name="ticketDetails"
    >
      {/* Ticket Type Selection */}
      <Form.Item
        label="Select a Ticket Type"
        name="ticketType"
        rules={[{ required: true, message: "Please select a ticket type." }]}
      >
        <Radio.Group onChange={(e) => setTicketType(e.target.value)} defaultValue={ticketStore.ticketDetails.ticketType}>
          <div style={{ display: "flex", gap: "20px" }}>
            {/* Standard Ticket */}
            <Card title="Standard Ticket" style={{ width: 250 }}>
              <p>Price: <strong>$50 per person</strong></p>
              <Radio value="standard">Select</Radio>
              {ticketType === "standard" && (
              <Form.Item
                label="Number of Persons"
                name="numPersons"
                dependencies={["ticketType"]}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      return getFieldValue("ticketType") === "standard" && (!value || value < 1)
                        ? Promise.reject("Please enter the number of persons.")
                        : Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber min={1} max={10} />
              </Form.Item>
              )}
            </Card>

            {/* Family Ticket */}
            <Card title="Family Ticket (20% Discount)" style={{ width: 250 }}>
              <p>Price: <strong>$40</strong> (min 3 people)</p>
              <Radio value="family">Select</Radio>
              {ticketType === "family" && (
              <Form.Item
                label="Number of Family Members"
                name="numFamilyMembers"
                dependencies={["ticketType"]}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      return getFieldValue("ticketType") === "family" && (!value || value < 3)
                        ? Promise.reject("Please enter the number of family members.")
                        : Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber min={3} max={20} />
              </Form.Item>
              )}
            </Card>
          </div>
        </Radio.Group>
      </Form.Item>

      {/* Checkbox for Restaurant Reservation */}
      <Form.Item name="addOns" valuePropName="checked">
        <Checkbox>Reserve a Table at a Restaurant</Checkbox>
      </Form.Item>

      {/* Restaurant Selection */}
      <Form.Item shouldUpdate>
        {({ getFieldValue }) =>
          getFieldValue("addOns") && (
            <>
              <h3>Select a Restaurant & Time</h3>
              <Form.Item name="restaurantId" rules={[{ required: true, message: "Please select a restaurant." }]} >
                <Radio.Group onChange={(e) => handleRestaurantSelect(e.target.value)}>
                  <Row gutter={[16, 16]} >
                    {restaurantList.map((restaurant) => (
                      <Col span={8} key={restaurant.id}>
                        <Card cover={<img alt={restaurant.name} src={restaurant.image} style={{ height: 120, objectFit: "cover" }} />}>
                          <Card.Meta title={restaurant.name} description={restaurant.description} />
                          <Radio value={restaurant.id}>{restaurant.name}</Radio>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Radio.Group>
              </Form.Item>

              <Form.Item initialValue={ ticketStore.reservationTime ? dayjs(ticketStore.reservationTime, "HH:mm") : null} name="reservationTime" rules={[{ required: true, message: "Please select a reservation time." }]}>
                <TimePicker format="HH:mm" />
              </Form.Item>
            </>
          )
        }
      </Form.Item>
    </Form>
  );
};

export default TicketSelectionForm;
