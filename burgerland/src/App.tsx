import { Button, Layout, Menu, Spin } from "antd";
import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";

const { Header, Content, Footer } = Layout;
const LazyModal = lazy(() => import("./components/TicketBookingModal/TicketBookingModal"))

const App = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <img alt="Burger Land" style={{ height: 40, marginRight: 20 }} />
        <Menu theme="dark" mode="horizontal" style={{width:"100%" }} >
          <Menu.Item key="1">Prices</Menu.Item>
          <Menu.Item key="2">Restaurants</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "20px" }}>
        <Button type="primary" onClick={() => setIsModalOpen(true)} danger>
          {t("planYourDay")}
        </Button>
        {isModalOpen && (
          <Suspense fallback={<Spin />}>
            <LazyModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </Suspense>
        )}
      </Content>
      <Footer style={{ textAlign: "center" }}>©2025 Burger Land</Footer>
    </Layout>
  );
};

export default App;
