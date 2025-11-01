"use client";

import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import Coupon from "@/components/modules/cart/Coupon";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import ProductBanner from "@/components/modules/products/banner";
import NMContainer from "@/components/ui/core/NMContainer";
import { Suspense } from "react";

const CartPage = () => {
  return (
    <NMContainer>
      <Suspense fallback={<div>Loading your banner...</div>}>
        <ProductBanner title="Cart Page" path="Home - Cart" />
      </Suspense>
      {/* ✅ Wrap cart content inside Suspense */}
      <Suspense fallback={<div>Loading your cart...</div>}>
        <div className="grid grid-cols-12 gap-8 my-5">
          <CartProducts />
          <Address></Address>
          <Coupon />
          <PaymentDetails></PaymentDetails>
        </div>
      </Suspense>
    </NMContainer>
  );
};

export default CartPage;
