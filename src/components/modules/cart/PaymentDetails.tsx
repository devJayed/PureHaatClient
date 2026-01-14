"use client";

import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";
import {
  citySelector,
  clearCart,
  couponSelector,
  discountAmountSelector,
  grandTotalSelector,
  mobileSelector,
  nameSelector,
  orderedProductsSelector,
  orderSelector,
  shippingAddressSelector,
  shippingCostSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createOrder } from "@/services/cart";
import { useState } from "react";
import { toast } from "sonner";
import OrderSuccessDialog from "./OrderSuccessDialog";

export default function PaymentDetails() {
  const subTotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const order = useAppSelector(orderSelector);
  const city = useAppSelector(citySelector);
  const name = useAppSelector(nameSelector);
  const mobile = useAppSelector(mobileSelector);
  // const email = useAppSelector(emailSelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const cartProducts = useAppSelector(orderedProductsSelector);

  const coupon = useAppSelector(couponSelector);
  const discountAmount = useAppSelector(discountAmountSelector);

  const dispatch = useAppDispatch();

  const [showSuccess, setShowSuccess] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const handleOrder = async () => {
    // console.log("Order Now button clicked.");
    const orderLoading = toast.loading("Order is being placed...");
    try {
      // console.log({ order });
      if (!name) {
        throw new Error("আপনার নাম প্রদান করুন!");
      }
      if (!mobile) {
        throw new Error("মোবাইল নম্বর প্রদান করুন!");
      }
      // if (!email) {
      //   throw new Error("Email is missing");
      // }

      // shipping address validation
      if (!shippingAddress) {
        throw new Error("এড্রেস (জেলা, থানা ও লোকেশন) প্রদান করুন!");
      }
      // Shipping method validation
      if (!city) {
        throw new Error("শিপিং মেথড সিলেক্ট করুন!");
      }

      if (cartProducts.length === 0) {
        throw new Error("Cart is empty, what are you trying to order?");
      }
      // console.log({order});

      let orderDataToSend;
      if (coupon.code) {
        orderDataToSend = { ...order, coupon: coupon.code };
      } else {
        orderDataToSend = order;
      }

      const res = await createOrder(orderDataToSend);
      // console.log("Order response:", res);

      // console.log("res.data", res.data);

      if (res.success) {
        toast.success(res.message, { id: orderLoading });
        setOrderData(res.data);
        dispatch(clearCart());
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
      <div className="w-full border border-gray-200 bg-white rounded-sm p-5 md:p-6">
        {/* <h1 className="text-2xl font-bold">পেমেন্ট বিস্তারিত</h1> */}

        {coupon.isLoading && <div>Loading...</div>}

        {!coupon.isLoading && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-500 ">সাব-টোটাল</p>
                <p className="font-semibold">{currencyFormatter(subTotal)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500 ">ডেলিভারি চার্জ (+)</p>
                <p className="font-semibold">
                  {currencyFormatter(shippingCost)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500 ">ডিসকাউন্ট (-)</p>
                <p className="font-semibold">
                  {currencyFormatter(discountAmount)}
                </p>
              </div>

              <hr />
            </div>

            <div className="flex justify-between mt-2 mb-6">
              <p className="text-gray-500 ">সর্বমোট = </p>
              <p className="font-semibold">{currencyFormatter(grandTotal)}</p>
            </div>
          </>
        )}

        <Button
          onClick={handleOrder}
          className="w-full
    bg-gradient-to-r from-amber-500 to-amber-600
    hover:from-amber-600 hover:to-amber-700
    text-white
    text-lg font-semibold
    py-5
    rounded-xl
    shadow-md hover:shadow-lg
    transition-all duration-200 ease-in-out
    cursor-pointer
    active:scale-[0.98]
    focus:outline-none focus:ring-1 focus:ring-amber-400 focus:ring-offset-1"
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
