import OrderSummaryCards from "@/components/modules/orders/OrderSummaryCards.tsx";
import { getMyShopOrders } from "@/services/Order";

const AdminHomePage = async () => {
  const { data: orders = [] } = await getMyShopOrders();

  return (
    <div className="space-y-6">
      {/* Order Summary Cards */}
      <OrderSummaryCards orders={orders} />

      {/* Placeholder for future analytics */}
      <div className="min-h-[400px] rounded-xl bg-muted" />
    </div>
  );
};

export default AdminHomePage;
