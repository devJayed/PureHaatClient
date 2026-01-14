import Category from "@/components/modules/home/Category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import ProductCarousel from "@/components/modules/products/productCarousel/ProductCarousel";
// import { Suspense } from "react";
// import { getNewToken } from "@/services/AuthService";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  // const result = await getNewToken();
  // console.log(result);

  return (
    <div>
      {/* converting category as nav bar */}
      {/* <Suspense fallback={<div>Loading cart page...</div>}> */}

      <ProductCarousel />

      {/* <HeroSection /> */}
      <Category />
      <FeaturedProducts />
      {/* <FlashSale /> */}
      {/* </Suspense> */}
    </div>
  );
};

export default HomePage;
