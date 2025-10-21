"use client";

import ManageOrders from "@/components/modules/orders";

type Props = {
  data: any[];
};

export default function OrdersTable({ data }: Props) {
  return (
    <div>
      <ManageOrders orders={data || []} />
    </div>
  );
}
