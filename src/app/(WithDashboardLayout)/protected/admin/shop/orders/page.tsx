import ManageOrders from "@/components/modules/orders";
import { getMyShopOrders } from "@/services/Order";

const OrderPage = async () => {
  const { data = [], meta } = await getMyShopOrders();

  console.log("Data:", { data });

  return (
    <div>
      <div>
        <ManageOrders orders={data} />
      </div>
    </div>
  );
};

export default OrderPage;
