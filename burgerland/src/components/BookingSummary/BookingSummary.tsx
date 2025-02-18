import { useTranslation } from "react-i18next";
import { useTicketStore } from "../store/ticketStore";

const BookingSummary = () => {
  const ticketStore = useTicketStore();
  const { t } = useTranslation();
  const { clientInfo, ticketDetails, restaurantDetails} = ticketStore;

  return (
    <div>
    <h3>{t("bookingSummary")}</h3>
    <p><strong>{t("name")}:</strong> {clientInfo?.name}</p>
    <p><strong>{t("phone")}:</strong> {clientInfo?.phone}</p>
    <p>
      <strong>{t("peopleNumber")}:</strong>{" "}
      {ticketDetails?.numPersons ? ticketDetails.numPersons : ticketDetails.numFamilyMembers}
    </p>

    {ticketDetails.addOns && (
      <>
        <p><strong>{t("restaurant")}:</strong> {restaurantDetails?.name}</p>
      </>
    )}

    <h3>
      <strong>{t("total")}:</strong>{" "}
      {ticketDetails?.numPersons
        ? ticketDetails.numPersons * 50
        : (ticketDetails?.numFamilyMembers as number) * 40}$
    </h3>
  </div>
  );
};

export default BookingSummary;
