"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OrderSuccessDialogProps {
  open: boolean;
  onClose: () => void;
  orderData: any;
}

export default function OrderSuccessDialog({
  open,
  onClose,
  orderData,
}: OrderSuccessDialogProps) {
  if (!orderData) return null;

  const {
    orderId,
    user,
    products,
    finalAmount,
    shippingAddress,
    paymentStatus,
  } = orderData;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden 
        text-center p-4 rounded-2xl shadow-lg flex flex-col items-center "
      >
        {/* Header */}
        <DialogHeader className="w-full">
          <DialogTitle className="text-2xl text-center font-bold text-green-600">
            🎉 অভিনন্দন! 🎉
          </DialogTitle>
        </DialogHeader>

        <p className="text-gray-700 text-center text-sm leading-relaxed -my-2">
          প্রিয় <span className="font-semibold">{user?.name}</span>, আপনার অর্ডারটি
          সফলভাবে গ্রহণ করা হয়েছে।
        </p>

        {/* 🔹 Divider */}
        <div className="w-3/4 h-[1px] bg-gray-200"></div>

        {/* Order Info */}
        <div className="text-center">
          <p className="flex items-center justify-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-700">অর্ডার আইডিঃ</span>
            <span className="border border-green-500 text-green-700 bg-green-50 px-3 py-1 rounded-md font-bold text-base tracking-wider">
              {orderId}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-700">পেমেন্ট স্ট্যাটাসঃ</span>{" "}
            <span
              className={`capitalize font-medium ${
                paymentStatus === "Paid"
                  ? "text-green-600"
                  : paymentStatus === "Pending"
                  ? "text-yellow-600"
                  : "text-gray-600"
              }`}
            >
              {paymentStatus}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-700">সর্বমোটঃ</span>{" "}
            <span className="text-green-600 font-bold text-base">
              ৳{finalAmount}
            </span>
          </p>
        </div>

        {/* 🔹 Divider */}
        <div className="w-full h-[1px] bg-gray-200"></div>

        {/* Products List */}
        <div className="text-center w-full">
          <p className="font-semibold text-gray-800 text-sm">
            🛍️ অর্ডারকৃত পণ্যসমূহ
          </p>
          <ol
            className="list-decimal list-inside text-left text-gray-700 text-sm 
             max-h-32 overflow-y-auto px-3 mx-auto w-fit"
          >
            {products?.map((item: any, i: number) => (
              <li
                key={i}
                className="border-b border-gray-200 pb-1 last:border-none"
              >
                {item.quantity} × {item.product?.name}
              </li>
            ))}
          </ol>
        </div>

        {/* 🔹 Divider */}
        <div className="w-full h-[1px] bg-gray-200"></div>

        {/* Customer Info */}
        <div className="text-center text-sm">
          <p>
            <span className="font-semibold text-gray-700">কাস্টমারঃ</span>{" "}
            {user?.name || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-700">ইমেইলঃ</span>{" "}
            {user?.email || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-700">ডেলিভারি স্থানঃ</span>{" "}
            {shippingAddress || "N/A"}
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-gray-500 text-xs italic text-center leading-snug">
          আমাদের ডেলিভারি টিম অতি দ্রুত আপনার সঙ্গে যোগাযোগ করে অর্ডারটি কনফার্ম
          করবে।
        </p>

        {/* Action Button */}
        <Button onClick={onClose} className="w-full font-medium">
          ঠিক আছে
        </Button>
      </DialogContent>
    </Dialog>
  );
}
