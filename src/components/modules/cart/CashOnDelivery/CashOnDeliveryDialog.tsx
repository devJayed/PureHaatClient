"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MapPinPlus, Phone, User } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import Address from "@/components/modules/cart/Address";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  CartProduct,
  clearCart,
  orderedProductsSelector,
  orderSelector,
  updateMobile,
  updateName,
  updateShippingAddress,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "@/components/ui/button";
import { createOrder } from "@/services/cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import OrderSuccessDialog from "../OrderSuccessDialog";
import { cashOnDeliverySchema } from "./cashOnDeliveryValidation";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

type CODFormValues = {
  name: string;
  mobile: string;
  shippingAddress: string;
  city: string;
};

const CashOnDeliveryDialog = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(orderedProductsSelector);
  const order = useAppSelector(orderSelector);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const form = useForm<CODFormValues>({
    resolver: zodResolver(cashOnDeliverySchema),
    mode: "onChange",
  });

  const {
    formState: { isSubmitting, isValid },
  } = form;

  /**
   * ✅ SINGLE SOURCE OF TRUTH
   * Order is submitted here using FORM DATA
   */
  const onSubmit: SubmitHandler<CODFormValues> = async (data) => {
    // console.log({ data });
    const toastId = toast.loading("অর্ডার হচ্ছে...");

    try {
      // 1️⃣ Persist in Redux (optional, for later use)
      dispatch(updateName(data.name));
      dispatch(updateMobile(data.mobile));
      dispatch(updateShippingAddress(data.shippingAddress));

      // 2️⃣ Build payload using FORM values
      const payload = {
        ...order,
        name: data.name,
        mobile: data.mobile,
        shippingAddress: data.shippingAddress,
        city: data.city,
      };
      console.log({ payload });

      const res = await createOrder(payload);

      if (!res.success) {
        throw new Error(res.message);
      }

      toast.success(res.message, { id: toastId });
      setOrderData(res.data);
      // Show Success Popup
      setShowSuccess(true);
      dispatch(clearCart());
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || "অর্ডার ব্যর্থ হয়েছে", { id: toastId });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[98vw] sm:w-[96vw] md:w-[94vw] max-w-none h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-2xl font-bold text-center">
              ক্যাশ অন ডেলিভারি
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* ================= CUSTOMER INFO ================= */}
              <div className="space-y-4 max-w-lg">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        আপনার নাম <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div
                          className=" group flex items-center
            border rounded-md overflow-hidden
            transition-colors
            hover:border-amber-600
            focus-within:border-amber-600
            focus-within:ring-0"
                        >
                          <div className="bg-gray-200 px-4 py-3 border-r flex items-center justify-center">
                            <User
                              className=" w-5 h-5
        text-gray-600
        transition-colors
        group-hover:text-amber-600
        group-focus-within:text-amber-600"
                            />
                          </div>
                          <Input
                            {...field}
                            placeholder="আপনার নাম লিখুন"
                            className="w-full py-5
             border-0 shadow-none
      focus:outline-none focus:ring-0
      focus-visible:ring-0"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Mobile */}
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        মোবাইল নম্বর <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div
                          className="group flex items-center
            border rounded-md overflow-hidden
            transition-colors
            hover:border-amber-600
            focus-within:border-amber-600
            focus-within:ring-0"
                        >
                          <div className="bg-gray-200 px-4 py-3 border-r flex items-center justify-center">
                            <Phone
                              className=" text-gray-600
        transition-colors
        group-hover:text-amber-600
        group-focus-within:text-amber-600"
                            />
                          </div>
                          <Input
                            {...field}
                            placeholder="01XXXXXXXXX"
                            className="w-full py-5
             border-0 shadow-none
      focus:outline-none focus:ring-0
      focus-visible:ring-0"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={form.control}
                  name="shippingAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        ডেলিভারি এড্রেস <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div
                          className=" group flex items-center
            border rounded-md overflow-hidden
            transition-colors
            hover:border-amber-600
            focus-within:border-amber-600
            focus-within:ring-0"
                        >
                          <div className="bg-gray-200 px-4 py-3 border-r flex items-center justify-center">
                            <MapPinPlus
                              className="w-5 h-5 text-gray-600
        transition-colors
        group-hover:text-amber-600
        group-focus-within:text-amber-600"
                            />
                          </div>
                          <Input
                            {...field}
                            placeholder="জেলা, উপজেলা, লোকেশন"
                            className="w-full py-5
             border-0 shadow-none
      focus:outline-none focus:ring-0
      focus-visible:ring-0"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Shipping Method */}
                <Address control={form.control} />
              </div>

              {/* <hr /> */}
              {/* <Coupon /> */}
              <hr />

              {/* ================= Product Summary ================= */}
              <div className="w-full bg-white border rounded-md overflow-hidden">
                {/* ---------- Table Header ---------- */}
                <div
                  className="
      grid grid-cols-[24px_1fr_48px_64px_64px]
      gap-1 px-3 py-2
      text-xs font-semibold text-gray-500
      bg-gray-100
      border-b
    "
                >
                  <span className="text-center">SL</span>
                  <span>Product</span>
                  <span className="text-center">Qty</span>
                  <span className="text-right">Unit (৳)</span>
                  <span className="text-right">Total (৳)</span>
                </div>

                {/* ---------- Product Rows ---------- */}
                {products.map((product: CartProduct, index: number) => {
                  const qty = product.orderQuantity ?? 1;
                  const unitPrice = product.offerPrice ?? product.price;

                  return (
                    <div
                      key={product._id}
                      className="
          grid grid-cols-[24px_1fr_48px_64px_64px]
          gap-1 px-3 py-3
          items-center
          text-sm
          border-b last:border-b-0
          hover:bg-amber-50
          transition-colors
        "
                    >
                      {/* SL */}
                      <span className="text-center font-semibold text-gray-700">
                        {index + 1}
                      </span>

                      {/* Product */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0">
                          <Image
                            src={product.images?.[0]?.url || "/placeholder.png"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="truncate font-medium text-gray-800">
                          {product.name}
                        </span>
                      </div>

                      {/* Qty */}
                      <span className="text-center font-medium">{qty}</span>

                      {/* Unit Price */}
                      <span className="text-right">{unitPrice}</span>

                      {/* Total */}
                      <span className="text-right font-semibold">
                        {qty * unitPrice}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* ================= PAYMENT SUMMARY ================= */}
              <PaymentDetails />

              {/* ================= SUBMIT ================= */}
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
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
    focus:outline-none focus:ring-1 focus:ring-amber-400 focus:ring-offset-1
    disabled:cursor-not-allowed 
    disabled:bg-gray-300
disabled:from-gray-300 disabled:to-gray-400"
              >
                {isSubmitting ? "অর্ডার হচ্ছে..." : "অর্ডার কনফার্ম করুন"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {/* ✅ Success Popup */}
      <OrderSuccessDialog
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        orderData={orderData}
      />
    </>
  );
};

export default CashOnDeliveryDialog;
