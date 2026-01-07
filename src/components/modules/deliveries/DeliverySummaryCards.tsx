"use client";

import { getStatusColor } from "@/lib/utils";
import { IOrder } from "@/types";

type Props = {
  orders: IOrder[];
};

const PAYMENT_STATUS_CONFIG = [
  { label: "Pending" },
  { label: "On-the-Way" },
  { label: "Paid" },
  { label: "Cancelled" },
];

const DeliverySummaryCards = ({ orders }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {PAYMENT_STATUS_CONFIG.map((status) => {
        const filteredOrders = orders.filter(
          (o) => o.paymentStatus === status.label
        );

        const totalAmount = filteredOrders.reduce(
          (sum, o) => sum + o.finalAmount,
          0
        );

        return (
          <div
            key={status.label}
            className={`rounded-xl border shadow-sm p-4 ${getStatusColor(
              status.label
            )}`}
          >
            <h3 className="text-sm font-semibold">{status.label}</h3>

            <p className="text-2xl font-bold mt-2">{filteredOrders.length}</p>

            <p className="text-xs mt-1">৳ {totalAmount.toFixed(2)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DeliverySummaryCards;
