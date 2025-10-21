"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { NMTable } from "@/components/ui/core/NMTable";
import { toast } from "sonner";
import { IOrder } from "@/types";
import { Button } from "@/components/ui/button";
import { updatePaymentStatus } from "@/services/Order";
import { getStatusColor } from "@/lib/utils";
import { PAYMENT_STATUSES } from "@/constants/status";

type TOrdersProps = {
  orders: IOrder[];
};

const ManageDeliveries = ({ orders }: TOrdersProps) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleUpdatePaymentStatus = async (
    id: string,
    paymentStatus: string
  ) => {
    try {
      setLoadingId(id);
      const res = await updatePaymentStatus(id, { paymentStatus });
      // console.log({ res });
      if (res.success) {
        toast.success("✅ Order status updated successfully!");
      } else {
        toast.error(res.message || "Failed to update order status");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  const columns: ColumnDef<IOrder>[] = [
    {
      accessorKey: "orderId",
      header: () => <div className="min-w-[120px]">Order ID</div>,
      cell: ({ row }) => <span>{row.original.orderId}</span>,
    },
    {
      accessorKey: "customerName",
      header: () => <div className="min-w-[150px]">Customer</div>,
      cell: ({ row }) => <span>{row.original.user?.name}</span>,
    },
    {
      accessorKey: "totalAmount",
      header: () => <div className="min-w-[100px] text-right">Amount</div>,
      cell: ({ row }) => (
        <div className="text-right font-semibold">
          ৳{row.original.totalAmount.toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: () => <div className="min-w-[100px]">Payment</div>,
      cell: ({ row }) => {
        return (
          <div className="flex flex-col items-center gap-2">
            <select
              className={`border rounded px-2 py-1 text-sm font-medium transition-colors duration-200 text-center ${getStatusColor(
                row.original.paymentStatus
              )}`}
              value={row.original.paymentStatus}
              disabled={loadingId === row.original._id}
              onChange={(e) =>
                handleUpdatePaymentStatus(row.original._id, e.target.value)
              }
            >
              {PAYMENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {loadingId === row.original._id && (
              <div className="text-xs text-gray-500 animate-pulse">
                Updating...
              </div>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: () => <div className="min-w-[100px]">Order Status</div>,
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded border text-sm font-medium min-w-[100px] text-center ${getStatusColor(
                status
              )}`}
            >
              {status}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "createdAt",
      header: () => <div className="min-w-[130px]">Date</div>,
      cell: ({ row }) => (
        <span>
          {new Date(row.original.createdAt).toLocaleDateString("en-GB")}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Manage My Deliveries</h1>
      </div>

      <NMTable data={orders} columns={columns} />
    </div>
  );
};

export default ManageDeliveries;
