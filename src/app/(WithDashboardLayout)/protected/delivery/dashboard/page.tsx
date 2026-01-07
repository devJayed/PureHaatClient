import DeliverySummaryCards from "@/components/modules/deliveries/DeliverySummaryCards";
import { getMyShopOrders } from "@/services/Order";

const DeliveryHomePage = async () => {
  const { data: orders = [] } = await getMyShopOrders();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Delivery Dashboard</h1>

      {/* Delivery Summary Cards */}
      <DeliverySummaryCards orders={orders} />

      {/* Future delivery analytics */}
      <div className="min-h-[400px] rounded-xl bg-muted" />
    </div>
  );
};

export default DeliveryHomePage;
