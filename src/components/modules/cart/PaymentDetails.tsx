"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { currencyFormatter } from "@/lib/currencyFormatter";
import {
  citySelector,
  clearCart,
  grandTotalSelector,
  orderedProductsSelector,
  orderSelector,
  shippingAddressSelector,
  shippingCostSelector,
  subTotalSelector,
  couponSelector,
  discountAmountSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createOrder } from "@/services/cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import OrderSuccessDialog from "./OrderSuccessDialog";

export default function PaymentDetails() {
  const subTotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const order = useAppSelector(orderSelector);
  const city = useAppSelector(citySelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const cartProducts = useAppSelector(orderedProductsSelector);

  const coupon = useAppSelector(couponSelector);
  const discountAmount = useAppSelector(discountAmountSelector);

  const user = useUser();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [showSuccess, setShowSuccess] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const handleOrder = async () => {
    console.log("Order Now button clicked.");
    const orderLoading = toast.loading("Order is being placed...");
    try {
      if (!user.user) {
        router.push("/login");
        throw new Error("Please login first.");
      }

      if (!city) {
        throw new Error("City is missing");
      }

      if (!shippingAddress) {
        throw new Error("Shipping address is missing");
      }

      if (cartProducts.length === 0) {
        throw new Error("Cart is empty, what are you trying to order?");
      }

      let orderDataToSend;
      if (coupon.code) {
        orderDataToSend = { ...order, coupon: coupon.code };
      } else {
        orderDataToSend = order;
      }

      const res = await createOrder(orderDataToSend);
      console.log("Order response:", res);

      if (res.success) {
        toast.success(res.message, { id: orderLoading });
        dispatch(clearCart());
        setOrderData(res.data);
        setShowSuccess(true);
      } else {
        toast.error(res.message, { id: orderLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };

  return (
    <>
      <div className="border border-gray-200 bg-white rounded-lg brightness-105 shadow-sm col-span-4 h-fit p-5">
        <h1 className="text-2xl font-bold">পেমেন্ট বিস্তারিত</h1>

        {coupon.isLoading && <div>Loading...</div>}

        {!coupon.isLoading && (
          <>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <p className="text-gray-500 ">সাব-টোটাল</p>
                <p className="font-semibold">{currencyFormatter(subTotal)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500 ">ডিসকাউন্ট</p>
                <p className="font-semibold">
                  {currencyFormatter(discountAmount)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500 ">ডেলিভারি চার্জ </p>
                <p className="font-semibold">
                  {currencyFormatter(shippingCost)}
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-10 mb-5">
              <p className="text-gray-500 ">সর্বমোট = </p>
              <p className="font-semibold">{currencyFormatter(grandTotal)}</p>
            </div>
          </>
        )}

        <Button
          onClick={handleOrder}
          className="w-full text-xl font-semibold py-5"
        >
          Order Now
        </Button>
      </div>

      {/* ✅ Success Popup */}
      <OrderSuccessDialog
        open={showSuccess}
        onClose={() => setShowSuccess(false)}

      orderData={orderData}
      />
    </>
  );
}
