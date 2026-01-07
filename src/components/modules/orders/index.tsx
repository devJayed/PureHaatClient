"use client";

import { NMTable } from "@/components/ui/core/NMTable";
import { ORDER_STATUSES } from "@/constants/status";
import { getStatusColor } from "@/lib/utils";
import { updateOrderStatus } from "@/services/Order";
import { IOrder } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

type TOrdersProps = {
  orders: IOrder[];
};

const ManageOrders = ({ orders }: TOrdersProps) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // console.log("Orders:", orders);

  const handleUpdateStatus = async (id: string, status: string) => {
    // console.log({id, status});
    try {
      setLoadingId(id);
      const res = await updateOrderStatus(id, { status });
      // console.log({"orders index.tsx": res });
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
      header: () => <div className="min-w-6">OrderID</div>,
      cell: ({ row }) => <span>{row.original.orderId}</span>,
    },
    {
      accessorKey: "customerName",
      header: () => <div className="min-w-12">Customer</div>,
      cell: ({ row }) => <span>{row.original.name}</span>,
    },
    {
      accessorKey: "totalAmount",
      header: () => <div className="min-w-6 text-right">Amount</div>,
      cell: ({ row }) => (
        <div className="text-right font-semibold">
          ৳{row.original.totalAmount.toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="min-w-12">Activity(Admin)</div>,
      cell: ({ row }) => {
        return (
          <div className="flex flex-col items-center gap-2">
            <select
              className={`border rounded px-2 py-1 text-sm font-medium transition-colors duration-200 text-center ${getStatusColor(
                row.original.status
              )}`}
              value={row.original.status}
              disabled={loadingId === row.original._id}
              onChange={(e) =>
                handleUpdateStatus(row.original._id, e.target.value)
              }
            >
              {ORDER_STATUSES.map((status) => (
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
      accessorKey: "paymentStatus",
      header: () => <div className="min-w-12">Status(Delivery)</div>,
      cell: ({ row }) => {
        const status = row.original.paymentStatus;

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
      header: () => <div className="min-w-6">Date</div>,
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
