"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { IOrder } from "@/types";

type Props = {
  order: IOrder;
  children: React.ReactNode;
};

const ViewOrdersModal = ({ order, children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        {/* Order Summary */}
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-500">Order ID</p>
              <p>{order.orderId}</p>
            </div>

            <div>
              <p className="font-medium text-gray-500">Order Date</p>
              <p>{new Date(order.createdAt).toLocaleDateString("en-GB")}</p>
            </div>

            <div>
              <p className="font-medium text-gray-500">Customer Name</p>
              <p>{order.name}</p>
            </div>

            <div>
              <p className="font-medium text-gray-500">Mobile</p>
              <p>{order.mobile}</p>
            </div>

            <div>
              <p className="font-medium text-gray-500">Payment Method</p>
              <p>{order.paymentMethod}</p>
            </div>

            <div>
              <p className="font-medium text-gray-500">Payment Status</p>
              <p>{order.paymentStatus}</p>
            </div>
          </div>
          <hr className="my-3" />
          {/* Shipping Address */}
          <div>
            <p className="font-medium text-gray-500">Shipping Address</p>
            <p>{order.shippingAddress}</p>
          </div>
          <hr className="my-3" />
          {/* Products */}
          <div>
            <p className="font-semibold text-sm mb-2 text-center">
              🛍️ অর্ডারকৃত পণ্যসমূহ
            </p>

            <div className="text-sm max-h-40 overflow-y-auto px-4 space-y-2">
              {/* Header */}
              <div
                className="
        grid grid-cols-[auto_1fr_auto_auto_auto]
        text-gray-500 font-medium text-xs
        pb-1
      "
              >
                <span className="text-center w-6">SL</span>
                <span className="text-center full">Description</span>
                <span className="text-center w-10">Qty</span>
                <span className="text-right w-18">Unit (BDT)</span>
                <span className="text-right w-18">Total (BDT)</span>
              </div>

              {/* Product Rows */}
              {order.products?.map((item: any, i: number) => {
                const quantity = item.quantity;
                const unitPrice =
                  item.offerPrice ?? item.unitPrice ?? item.product?.price ?? 0;

                return (
                  <div
                    key={i}
                    className="
            grid grid-cols-[auto_1fr_auto_auto_auto]
            items-center
            text-gray-700
          "
                  >
                    {/* Serial */}
                    <span className="text-center font-medium w-6">{i + 1}</span>

                    {/* Description (flexible column) */}
                    <span className="truncate">{item.product?.name}</span>

                    {/* Quantity */}
                    <span className="text-center font-medium w-10">
                      {quantity}
                    </span>

                    {/* Unit Price */}
                    <span className="text-right w-18">{unitPrice}</span>

                    {/* Total */}
                    <span className="text-right font-semibold text-gray-800 w-18">
                      {quantity * unitPrice}
                    </span>
                  </div>
                );
              })}
            </div>

            <hr className="my-3" />

            {/* Summary */}
            <div className="px-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold">সাব টোটাল</span>
                <span className="font-semibold text-green-600">
                  {currencyFormatter(order.totalAmount)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-700">ডেলিভারি চার্জ (+)</span>
                <span>{currencyFormatter(order.deliveryCharge)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-700">ডিসকাউন্ট (-)</span>
                <span>{currencyFormatter(0)}</span>
              </div>
            </div>

            <hr className="my-3" />

            {/* Grand Total */}
            <div className="flex justify-between items-center px-4">
              <span className="font-semibold">সর্বমোট</span>
              <span className="text-green-600 font-bold">
                {currencyFormatter(order.finalAmount)}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewOrdersModal;
