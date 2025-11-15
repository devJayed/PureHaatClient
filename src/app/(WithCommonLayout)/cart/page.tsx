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
        <div className="mt-2 sm:mt-4">
          <ProductBanner title="Cart Page" path="Home - Cart" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10">

          {/* Left Section */}
          <div className="lg:col-span-8 space-y-6">
            <CartProducts />
          </div>

          {/* Right Section */}
          <div className="lg:col-span-4 space-y-6">
            <Address />
            <Coupon />
            <PaymentDetails />
          </div>

        </div>
      </NMContainer>
    </Suspense>
  );
};

export default CartPage;
