import OrdersTable from "@/components/modules/orders/OrdersTable";
import { getMyShopOrders } from "@/services/Order";

const DeliveryPage = async () => {
  const res = await getMyShopOrders();
  console.log({res});
  const data = res?.data ?? []; // 👈 make sure it's always array

  return (
    <div>
      <OrdersTable data={data} />
    </div>
  );
};

export default DeliveryPage;
