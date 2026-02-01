"use client";

import { currencyFormatter } from "@/lib/currencyFormatter";
import {
  couponSelector,
  discountAmountSelector,
  grandTotalSelector,
  shippingCostSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";

export default function PaymentDetails() {
  const subTotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const discountAmount = useAppSelector(discountAmountSelector);
  const coupon = useAppSelector(couponSelector);

  return (
    <div className="w-full border border-gray-200 bg-white rounded-sm p-5">
      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-gray-500">সাব-টোটাল</p>
          <p className="font-semibold">{currencyFormatter(subTotal)}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-500">ডেলিভারি চার্জ (+)</p>
          <p className="font-semibold">{currencyFormatter(shippingCost)}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-500">ডিসকাউন্ট (-)</p>
          <p className="font-semibold">{currencyFormatter(discountAmount)}</p>
        </div>

        <hr />

        <div className="flex justify-between mt-2">
          <p className="text-gray-500 font-bold">সর্বমোট</p>
          <p className="font-bold">{currencyFormatter(grandTotal)}</p>
        </div>
      </div>
    </div>
  );
}
