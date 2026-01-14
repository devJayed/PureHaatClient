"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import Coupon from "@/components/modules/cart/Coupon";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import ProductBanner from "@/components/modules/products/banner";
import NMContainer from "@/components/ui/core/NMContainer";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  updateMobile,
  updateName,
  updateShippingAddress,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MapPinPlus, Phone, User } from "lucide-react";

import {
  CartProduct,
  orderedProductsSelector,
} from "@/redux/features/cartSlice";
import Image from "next/image";

const CartPage = () => {
  const products = useAppSelector(orderedProductsSelector);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

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

  return (
    <>
      <NMContainer>
        <div className="">
          <ProductBanner title="Cart Page" path="Home - Cart" />
        </div>

        <div className="grid grid-cols-1 mt-2 sm:mt-3">
          {/* Left Section – Only Cart Products */}
          <div className="lg:col-span-8 space-y-6">
            <CartProducts />

            {/* Cash on Delivery Button */}
            {products.length === 0 && ""}
            <Button
              // variant="default"
              disabled={products.length === 0}
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
              onClick={() => setOpen(true)}
            >
              ক্যাশ অন ডেলিভারি
            </Button>
          </div>
        </div>
      </NMContainer>

      {/* Cash on Delivery (COD) Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[98vw] sm:w-[96vw] md:w-[94vw] max-w-none h-[95vh] max-h-none overflow-y-auto transition-all duration-300">
          <DialogHeader>
            <DialogTitle className="sm:text-2xl text-lg font-bold flex items-center  justify-center">
              ক্যাশ অন ডেলিভারি
            </DialogTitle>
          </DialogHeader>

          {/* Basic info starts  */}
          <div className="space-y-2 w-full max-w-lg">
            {/* Name */}
            <div className="space-y-2">
              <Label className="font-bold text-lg">
                আপনার নাম <span className="text-red-500">*</span>
              </Label>

              <div className="flex items-center border hover:border-amber-600 rounded-md overflow-hidden hover:text-amber-600 ">
                <div className="bg-gray-300 h-full px-4 py-3 flex items-center justify-center">
                  <User className="w-5 h-5 " />
                </div>
                <Input
                  placeholder="আপনার নাম"
                  className="border-0
    shadow-none
    focus:border-0
    focus:ring-0
    focus-visible:ring-0
    focus-visible:ring-offset-0"
                  onChange={(e) => handleName(e.target.value)}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label className="font-bold text-lg">
                মোবাইল নম্বর <span className="text-red-500">*</span>
              </Label>

              <div className="flex items-center border hover:border-amber-600 rounded-md overflow-hidden hover:text-amber-600">
                <div className="bg-gray-200 h-full px-4 py-3 flex items-center justify-center border-r">
                  <Phone className="w-5 h-5" />
                </div>
                <Input
                  placeholder="মোবাইল নম্বর"
                  className="border-0
    shadow-none
    focus:border-0
    focus:ring-0
    focus-visible:ring-0
    focus-visible:ring-offset-0"
                  onChange={(e) => handleMobile(e.target.value)}
                />
              </div>
            </div>
            {/* Address */}
            <div className="space-y-2">
              <Label className="font-bold text-lg">
                এড্রেস{" "}
                <span className="text-sm text-gray-400">
                  (জেলা, উপজেলা ও লোকেশন)
                </span>{" "}
                <span className="text-red-500">*</span>
              </Label>

              <div className="flex items-center border hover:border-amber-600 rounded-md overflow-hidden hover:text-amber-600 ">
                <div className="bg-gray-200 h-full px-4 py-3 flex items-center justify-center border-r">
                  <MapPinPlus className="w-5 h-5" />
                </div>
                <Input
                  placeholder="ডেলিভারি এড্রেস"
                  className="border-0
    shadow-none
    focus:border-0
    focus:ring-0
    focus-visible:ring-0
    focus-visible:ring-offset-0"
                  onChange={(e) => handleShippingAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Address Shipping Charge Selection  */}
            <div>
              <Address />
            </div>
          </div>
          {/* Basic info ends  */}
          {/* coupon  */}
          <hr />
          <div>
            <Coupon />
          </div>
          <hr />
          <div className="grid grid-cols-1 gap-6">
            <div>
              {/* Header */}
              <div
                className="
      grid grid-cols-[auto_1fr_auto_auto_auto]
      text-xs text-gray-500 font-medium
      px-2 pb-2
    "
              >
                <span className="w-14 text-center">SL</span>
                <span className="w-full text-center">Description</span>
                <span className="w-8 text-center">Qty</span>
                <span className="w-20 text-right">Unit (BDT)</span>
                <span className="w-20 text-right">Total (BDT)</span>
              </div>

              {/* Product Rows */}
              {products?.map((product: CartProduct, index: number) => {
                const qty = product.orderQuantity ?? 1;
                const unitPrice = product.offerPrice ?? product.price;
                const totalPrice = qty * unitPrice;

                return (
                  <div
                    key={product._id}
                    className="
            grid grid-cols-[auto_1fr_auto_auto_auto]
            items-center gap-2
            py-2 px-2
          "
                  >
                    {/* SL + Image */}
                    <div className="flex items-center gap-1 w-14">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <span
                          className="
                absolute top-0 left-0
                w-5 h-5 rounded-full
                bg-amber-600 text-white
                text-xs font-bold
                flex items-center justify-center
              "
                        >
                          {index + 1}
                        </span>

                        <Image
                          src={product?.images?.[0]?.url || "/placeholder.png"}
                          width={40}
                          height={40}
                          alt="product"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>

                    {/* Description (takes remaining space) */}
                    <div className="min-w-0">
                      <h1 className="text-base sm:text-md truncate">
                        {product.name}
                      </h1>
                    </div>

                    {/* Qty */}
                    <span className="w-8 text-center font-medium">{qty}</span>

                    {/* Unit Price */}
                    <span className="w-20 text-right whitespace-nowrap">
                      {unitPrice}
                    </span>

                    {/* Total Price */}
                    <span className="w-20 text-right font-semibold whitespace-nowrap">
                      {totalPrice}
                    </span>
                  </div>
                );
              })}
            </div>

            <div>
              <PaymentDetails />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartPage;
