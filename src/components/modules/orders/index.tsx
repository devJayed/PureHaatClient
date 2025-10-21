"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { NMTable } from "@/components/ui/core/NMTable";
import { toast } from "sonner";
import { IOrder } from "@/types";
import { updateOrderStatus } from "@/services/Order";
import { Button } from "@/components/ui/button";

type TOrdersProps = {
  orders: IOrder[];
};

const STATUSES: Array<IOrder["status"]> = [
  "Pending",
  "Processing",
  "Completed",
  "Cancelled",
];

const ManageOrders = ({ orders }: TOrdersProps) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      setLoadingId(id);
      const res = await updateOrderStatus(id, { status });
      console.log({res});
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
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            row.original.paymentStatus === "Paid"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {row.original.paymentStatus}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="min-w-[130px]">Order Status</div>,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <select
            className="border rounded p-1 text-sm"
            value={row.original.status}
            disabled={loadingId === row.original._id}
            onChange={(e) =>
              handleUpdateStatus(row.original._id, e.target.value)
            }
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {loadingId === row.original._id && (
            <span className="text-xs text-gray-500 animate-pulse">
              Updating...
            </span>
          )}
        </div>
      ),
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
        <h1 className="text-xl font-bold">Manage Orders</h1>
      </div>

      <NMTable data={orders} columns={columns} />
    </div>
  );
};

export default ManageOrders;
