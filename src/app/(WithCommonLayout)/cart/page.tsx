"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import CartProducts from "@/components/modules/cart/CartProducts";
import ProductBanner from "@/components/modules/products/banner";
import NMContainer from "@/components/ui/core/NMContainer";

import { useAppSelector } from "@/redux/hooks";

import CashOnDeliveryDialog from "@/components/modules/cart/CashOnDelivery/CashOnDeliveryDialog";
import { orderedProductsSelector } from "@/redux/features/cartSlice";

const CartPage = () => {
  const products = useAppSelector(orderedProductsSelector);
  const [open, setOpen] = useState(false);

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
      <CashOnDeliveryDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default CartPage;
