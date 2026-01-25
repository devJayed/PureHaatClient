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

import Address from "@/components/modules/cart/Address";
import Coupon from "@/components/modules/cart/Coupon";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import { Button } from "@/components/ui/button";
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
  orderedProductsSelector,
  updateMobile,
  updateName,
  updateShippingAddress,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { cashOnDeliverySchema } from "./cashOnDeliveryValidation";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const CashOnDeliveryDialog = ({ open, setOpen }: Props) => {
  const handleName = (name: string) => {
    dispatch(updateName(name));
  };
  const handleMobile = (mobile: string) => {
    dispatch(updateMobile(mobile));
  };
  // const handleEmail = (email: string) => {
  //   dispatch(updateMobile(email));
  // };
  const handleShippingAddress = (shippingAddress: string) => {
    dispatch(updateShippingAddress(shippingAddress));
  };
  const products = useAppSelector(orderedProductsSelector);
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(cashOnDeliverySchema),
    mode: "onChange",
  });

  const {
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleName(data.name);
    handleMobile(data.mobile);
    handleShippingAddress(data.shippingAddress);

    // place order here later
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[98vw] sm:w-[96vw] md:w-[94vw] max-w-none h-[95vh] max-h-none overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-lg font-bold flex items-center  justify-center">
            ক্যাশ অন ডেলিভারি
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Customer Info */}
            <div className="space-y-4 max-w-lg">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      আপনার নাম <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex border rounded-md overflow-hidden">
                        <div className="bg-gray-300 px-4 py-3">
                          <User className="w-5 h-5" />
                        </div>
                        <Input
                          {...field}
                          placeholder="আপনার নাম"
                          className="border-0 focus-visible:ring-0"
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
                    <FormLabel>
                      মোবাইল নম্বর <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex border rounded-md overflow-hidden">
                        <div className="bg-gray-200 px-4 py-3 border-r">
                          <Phone className="w-5 h-5" />
                        </div>
                        <Input
                          {...field}
                          placeholder="01XXXXXXXXX"
                          className="border-0 focus-visible:ring-0"
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
                    <FormLabel>
                      ডেলিভারি এড্রেস <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex border rounded-md overflow-hidden">
                        <div className="bg-gray-200 px-4 py-3 border-r">
                          <MapPinPlus className="w-5 h-5" />
                        </div>
                        <Input
                          {...field}
                          placeholder="জেলা, উপজেলা, লোকেশন"
                          className="border-0 focus-visible:ring-0"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Address />
            </div>

            <hr />

            <Coupon />

            <hr />

            {/* Product Summary */}
            <div>
              {products.map((product: CartProduct, index: number) => {
                const qty = product.orderQuantity ?? 1;
                const unitPrice = product.offerPrice ?? product.price;

                return (
                  <div
                    key={product._id}
                    className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-2 py-2"
                  >
                    <div className="relative w-12 h-12">
                      <span className="absolute top-0 left-0 w-5 h-5 bg-amber-600 text-white text-xs flex items-center justify-center rounded-full">
                        {index + 1}
                      </span>
                      <Image
                        src={product.images?.[0]?.url || "/placeholder.png"}
                        alt="product"
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <span className="truncate">{product.name}</span>
                    <span className="text-center">{qty}</span>
                    <span className="text-right">{unitPrice}</span>
                    <span className="text-right font-semibold">
                      {qty * unitPrice}
                    </span>
                  </div>
                );
              })}
            </div>

            <PaymentDetails />

            {/* Submit */}
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full text-lg py-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
            >
              {isSubmitting ? "অর্ডার হচ্ছে..." : "অর্ডার কনফার্ম করুন"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CashOnDeliveryDialog;
