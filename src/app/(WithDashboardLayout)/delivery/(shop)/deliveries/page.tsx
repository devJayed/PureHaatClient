import ManageDeliveries from "@/components/modules/deliveries";
import { getMyShopOrders } from "@/services/Order";

const DeliveryPage = async () => {
  const { data, meta } = await getMyShopOrders();

  // console.log({ data });

  return (
    <div>
      <div>
        <ManageDeliveries orders={data} />
      </div>
    </div>
  );
};

export default DeliveryPage;
