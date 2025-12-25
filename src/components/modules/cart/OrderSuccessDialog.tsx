"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { toJpeg } from "html-to-image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

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
  console.log({ orderData });
  const router = useRouter();
  const popupRef = useRef<HTMLDivElement>(null);
  if (!orderData) return null;

  const {
    orderId,
    name,
    mobile,
    products,
    finalAmount,
    shippingAddress,
    paymentStatus,
    deliveryCharge,
    // discountAmount,
    totalAmount,
  } = orderData;
  console.log("Products of oderSuccessDialog", { products });

  const handleSaveAndClose = async () => {
    if (!popupRef.current) return;

    try {
      const dataUrl = await toJpeg(popupRef.current, {
        quality: 0.95,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `order-success-${orderId}.jpg`;
      link.click();

      onClose();
      router.push("/");
    } catch (error) {
      console.error("Image save failed", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          sm:max-w-lg
          max-h-[90vh]
          overflow-y-auto
          overflow-x-hidden
          text-center
          p-4
          rounded-2xl
          shadow-lg
          flex
          flex-col
          items-center
        "
      >
        {/* 🔹 Capture Area */}
        <div
          ref={popupRef}
          className="w-full px-2 pt-4 pb-2 space-y-3 bg-white text-center"
        >
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center text-2xl font-bold text-green-600">
              🎉 অভিনন্দন! 🎉
            </DialogTitle>
          </DialogHeader>

          <p className="text-gray-700 text-sm">
            প্রিয় <span className="font-semibold">{name}</span>, আপনার অর্ডারটি
            সফলভাবে গ্রহণ করা হয়েছে।
          </p>

          <div className="w-3/4 h-px bg-gray-200 mx-auto" />

          {/* Order Info */}
          <div className="space-y-1 text-sm">
            <p className="flex justify-center gap-2 flex-wrap">
              <span className="font-semibold">অর্ডার আইডিঃ</span>
              <span className="border border-green-500 text-green-700 bg-green-50 px-3 py-1 rounded-md font-bold">
                {orderId}
              </span>
            </p>

            <p>
              <span className="font-semibold">পেমেন্ট স্ট্যাটাসঃ </span>
              <span
                className={`font-medium ${
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
          </div>

          <div className="w-full h-px bg-gray-200" />

          {/* Products */}
          <div>
            <p className="font-semibold text-sm mb-2">🛍️ অর্ডারকৃত পণ্যসমূহ</p>

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
              {products?.map((item: any, i: number) => {
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
                  {currencyFormatter(totalAmount)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-700">ডেলিভারি চার্জ (+)</span>
                <span>{currencyFormatter(deliveryCharge)}</span>
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
                {currencyFormatter(finalAmount)}
              </span>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200" />

          {/* Customer Info */}
          <div className="text-sm space-y-1">
            <p>
              <span className="font-semibold">কাস্টমারঃ </span>
              {name}
            </p>
            <p>
              <span className="font-semibold">মোবাইলঃ </span>
              {mobile}
            </p>
            <p>
              <span className="font-semibold">ডেলিভারি স্থানঃ </span>
              {shippingAddress}
            </p>
          </div>

          <p className="text-xs italic text-gray-500">
            আমাদের ডেলিভারি টিম অতি দ্রুত আপনার সঙ্গে যোগাযোগ করবে।
          </p>
        </div>

        {/* 🔹 Action Button */}
        <Button
          onClick={handleSaveAndClose}
          className="w-full font-medium mt-3"
        >
          অর্ডার সেভ করুণ
        </Button>
      </DialogContent>
    </Dialog>
  );
}
