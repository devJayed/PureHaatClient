
import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import Coupon from "@/components/modules/cart/Coupon";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import ProductBanner from "@/components/modules/products/banner";
import NMContainer from "@/components/ui/core/NMContainer";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const CartPage = () => {
  return (
    <Suspense fallback={<div>Loading cart page...</div>}>
      <NMContainer>
        <ProductBanner title="Cart Page" path="Home - Cart" />

        {/* ✅ Wrap cart content inside Suspense */}

        <div className="grid grid-cols-12 gap-8 my-5">
          <CartProducts />
          <Address></Address>
           
            <Coupon />

          <PaymentDetails></PaymentDetails>
        </div>
      </NMContainer>
    </Suspense>
  );
};

export default CartPage;
